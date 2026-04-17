/**
 * PayBakong Checkout Logic (v66.7)
 * [V66.7] 1:1 Parity with Local Production logic & data attributes.
 * [V66.7] Robust error handling for empty data values.
 */

const LOGO_PATH = "assets/img/bank_logo/bakong_logo.png";

// [V66.7] 完整多语言字典
const I18N = {
    km: {
        timer_hint: "សូមបង់ប្រាក់ក្នុងកំឡុងពេលនេះ ប្រព័ន្ធនឹងទូទាត់ដោយស្វ័យប្រវត្ត",
        pay_success: "ការបង់ប្រាក់បានជោគជ័យ!",
        save_qr: "រក្សាទុកកូដ QR ទៅកាន់អាល់ប៊ុម",
        order_expired: "ការបញ្ជាទិញបានហួសពេល!",
        retry_btn: "ព្យាយាមម្តងទៀត",
        help_guide: "ការណែនាំ",
        waiting_pay: "កំពុងរង់ចាំការបង់ប្រាក់...",
        auto_close: "ទំព័រនឹងបិទដោយស្វ័យប្រវត្តក្នុងរយៈពេល {{sec}} វិនាទី...",
        close_page: "បិទទំព័រនេះ",
        copy: "ចម្លង",
        copied: "បានចម្លង!",
        support: "ជំនួយអតិថិជន",
    },
    en: {
        timer_hint: "Please pay within this time, system will auto-credit",
        pay_success: "Payment Success!",
        save_qr: "Save QR to Album",
        order_expired: "Order Expired!",
        retry_btn: "Retry",
        help_guide: "Help Guide",
        waiting_pay: "Waiting for payment...",
        auto_close: "Page will close automatically in {{sec}} seconds...",
        close_page: "Close Page",
        copy: "Copy",
        copied: "Copied!",
        support: "Support",
    },
    zh: {
        timer_hint: "请在规定时间内完成支付，系统会自动到账",
        pay_success: "支付成功!",
        save_qr: "保存二维码到相册",
        order_expired: "订单已过期!",
        retry_btn: "重新加载",
        help_guide: "充值指引",
        waiting_pay: "正在等待支付...",
        auto_close: "页面将在 {{sec}} 秒内自动关闭...",
        close_page: "关闭页面",
        copy: "复制",
        copied: "已复制!",
        support: "咨询客服",
    }
};

let currentLang = localStorage.getItem('paybakong_lang') || 'zh';

function showToast(text) {
    let toast = document.querySelector('.copy-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'copy-toast border-0 shadow';
        document.body.appendChild(toast);
    }
    toast.innerText = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1500);
}

window.copyText = function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    const text = el.innerText.replace('$', '').trim();
    navigator.clipboard.writeText(text).then(() => {
        showToast(I18N[currentLang].copied || 'Copied!');
    }).catch(err => {
        const input = document.createElement('input');
        input.value = text; document.body.appendChild(input); 
        input.select(); document.execCommand('copy'); document.body.removeChild(input);
        showToast(I18N[currentLang].copied || 'Copied!');
    });
};

window.setLanguage = function (lang) {
    currentLang = lang;
    localStorage.setItem('paybakong_lang', lang);
    updateInterface();
};

function updateInterface() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (I18N[currentLang] && I18N[currentLang][key]) {
            el.innerText = I18N[currentLang][key];
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.innerText.toLowerCase() === currentLang);
    });

    const helpImg = document.querySelector('.help-img');
    if (helpImg) {
        helpImg.src = `assets/img/topup_hint_${currentLang}.jpg?v=66.7`;
    }
}

window.togglePanel = function (id) {
    const panel = document.getElementById(id);
    const overlay = document.getElementById('panel-overlay');
    if (!panel) return;
    const isActive = panel.classList.contains('active');
    closeAllPanels();
    if (!isActive) {
        panel.classList.add('active');
        if (overlay) overlay.classList.add('show');
        if (id === 'help-panel') document.getElementById('help-panel-tab')?.classList.add('active');
    }
};

window.closeAllPanels = function () {
    document.querySelectorAll('.side-drawer').forEach(p => p.classList.remove('active'));
    document.getElementById('panel-overlay')?.classList.remove('show');
    document.getElementById('help-panel-tab')?.classList.remove('active');
};

window.renderQrCode = function (qrData) {
    const qrContainer = document.getElementById("qrcode");
    if (!qrContainer || !qrData) return;
    
    // [V66.7] 预备显示区域
    document.getElementById('qr-display-area')?.classList.remove('d-none');

    const tempDiv = document.createElement('div');
    tempDiv.style.display = 'none';
    document.body.appendChild(tempDiv);
    
    if (typeof QRCode === 'undefined') return;

    new QRCode(tempDiv, {
        text: qrData, width: 220, height: 220,
        colorDark: "#000000", colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
    });

    const finalize = () => {
        const source = tempDiv.querySelector('canvas') || tempDiv.querySelector('img');
        if (!source) return;

        const canvas = document.createElement('canvas');
        canvas.width = 440; canvas.height = 440;
        const ctx = canvas.getContext('2d');
        ctx.scale(2, 2);
        ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, 220, 220);
        ctx.drawImage(source, 20, 20, 180, 180);

        const logo = new Image();
        logo.src = LOGO_PATH;
        logo.onload = () => {
            const lSize = 42, p = 3;
            const lx = (220 - lSize) / 2, ly = (220 - lSize) / 2;
            ctx.fillStyle = "#FFFFFF"; ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(lx - p, ly - p, lSize + p * 2, lSize + p * 2, 8);
            else ctx.rect(lx - p, ly - p, lSize + p * 2, lSize + p * 2);
            ctx.fill(); ctx.drawImage(logo, lx, ly, lSize, lSize);
            const dataUrl = canvas.toDataURL("image/png");
            qrContainer.innerHTML = `<img src="${dataUrl}" style="width:220px; border-radius:8px;">`;
            if (tempDiv.parentNode) document.body.removeChild(tempDiv);
        };
        logo.onerror = () => {
            const dataUrl = canvas.toDataURL("image/png");
            qrContainer.innerHTML = `<img src="${dataUrl}" style="width:220px;">`;
            if (tempDiv.parentNode) document.body.removeChild(tempDiv);
        };
    };

    const t = setInterval(() => {
        const target = tempDiv.querySelector('canvas') || tempDiv.querySelector('img');
        if (target && (target.tagName === 'CANVAS' || (target.complete && target.naturalWidth > 0))) {
            clearInterval(t); finalize();
        }
    }, 50);
    setTimeout(() => clearInterval(t), 5000);
};

window.saveQrCode = async function () {
    const ticketEl = document.querySelector(".qr-ticket-section");
    if (!ticketEl || typeof html2canvas === 'undefined') return;
    const orderNo = (document.getElementById('display-merchant-order-no')?.innerText || 'KHQR').trim();
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    try {
        ticketEl.classList.add("is-capturing");
        const canvas = await html2canvas(ticketEl, { scale: 2, useCORS: true, backgroundColor: "#ffffff", logging: false });
        ticketEl.classList.remove("is-capturing");
        const dataUrl = canvas.toDataURL("image/png");

        if (isMobile) {
            const mask = document.createElement('div');
            mask.className = 'screenshot-preview-mask';
            mask.innerHTML = `<div class="preview-container"><button class="preview-close-btn"><i class="fa-solid fa-xmark"></i></button><img src="${dataUrl}" class="preview-img"><div class="preview-hint"><i class="fa-solid fa-hand-pointer"></i><span>${currentLang === 'zh' ? '长按图片保存到相册' : (currentLang === 'km' ? 'សង្កត់លើរូបភាពដើម្បីរក្សាទុក' : 'Long press to save')}</span></div></div>`;
            document.body.appendChild(mask);
            const closeBtn = mask.querySelector('.preview-close-btn');
            closeBtn.onclick = () => { mask.classList.add('fade-out'); setTimeout(() => mask.remove(), 300); };
            mask.onclick = (e) => { if (e.target === mask) closeBtn.onclick(); };
        } else {
            const link = document.createElement('a'); link.href = dataUrl; link.download = `${orderNo}.png`;
            document.body.appendChild(link); link.click(); document.body.removeChild(link);
        }
    } catch (err) { console.error("Capture failed", err); ticketEl.classList.remove("is-capturing"); }
};

function showSuccessMask(retUrl) {
    const mask = document.getElementById('mask-success');
    if (!mask) return;
    mask.style.display = 'flex';
    let sec = 3;
    const hint = document.getElementById('success-hint');
    const updateHint = () => {
        if (hint) {
            const secHtml = `<span class="fw-bold text-dark mx-1">${sec}</span>`;
            hint.innerHTML = I18N[currentLang].auto_close.replace('{{sec}}', secHtml);
        }
    };
    updateHint();
    const timer = setInterval(() => {
        sec--; updateHint();
        if (sec <= 0) { clearInterval(timer); if (retUrl) window.location.href = retUrl; }
    }, 1000);
}

// [V66.7] 核心修復：强制映射数据到 UI
function applyPaymentData(data) {
    console.log("[V66.7] Applying Data to UI:", data);
    
    // 映射金额
    const rawAmt = data.real_amount || "0.00";
    const val = parseFloat(rawAmt).toFixed(2);
    const parts = val.split('.');
    const intEl = document.getElementById('render-amt-int');
    const decEl = document.getElementById('render-amt-dec');
    if (intEl) intEl.textContent = parts[0];
    if (decEl) decEl.textContent = '.' + (parts[1] || '00');

    // 映射账号与单号
    const nameEl = document.getElementById('display-account-name');
    const orderNoEl = document.getElementById('display-merchant-order-no');
    if (nameEl) nameEl.textContent = data.account_name || '------';
    if (orderNoEl) orderNoEl.textContent = data.out_order_no || '------';

    // 客服与帮助
    const supportTab = document.getElementById('support-tab');
    if (data.support_link && supportTab) {
        supportTab.setAttribute('onclick', `window.open('${data.support_link}', '_blank')`);
        supportTab.style.setProperty('display', 'flex', 'important');
    }
    const helpTab = document.getElementById('help-panel-tab');
    if (Number(data.topup_hint) === 1 && helpTab) {
        helpTab.style.setProperty('display', 'flex', 'important');
    }

    // 渲染二维码
    if (data.khqr_string) window.renderQrCode(data.khqr_string);
}

window.initPage = async function () {
    const configEl = document.getElementById('checkout-config');
    if (!configEl) return;
    const config = configEl.dataset;
    console.log("[V66.7] Received Raw Config:", config);

    const container = document.querySelector('.checkout-container');
    updateInterface();
    if (container) container.style.opacity = '1';

    // 1:1 对齐本地生产环境的 data 属性名
    applyPaymentData({
        khqr_string: config.khqr, 
        real_amount: config.amount,
        account_name: config.accountName, 
        out_order_no: config.merchantOrderNo,
        support_link: config.supportLink, 
        topup_hint: config.topupHint
    });

    // 倒数计时
    if (config.remainingSeconds > 0) {
        let sec = parseInt(config.remainingSeconds);
        const timerText = document.getElementById('timer-text');
        const interval = setInterval(() => {
            sec--;
            if (sec <= 0) { clearInterval(interval); document.getElementById('mask-expiry') && (document.getElementById('mask-expiry').style.display = 'flex'); }
            const m = Math.floor(sec / 60).toString().padStart(2, '0');
            const s = (sec % 60).toString().padStart(2, '0');
            if (timerText) timerText.innerText = `${m}:${s}`;
        }, 1000);
    }

    // 订单检测轮询
    if (config.orderNo) {
        const poller = setInterval(async () => {
            try {
                const res = await fetch(`api/check_order.php?order_no=${config.orderNo}`);
                const json = await res.json();
                if (json.status === 'paid') { clearInterval(poller); showSuccessMask(json.return_url); }
            } catch (e) {}
        }, 4000);
    }
};

document.addEventListener('DOMContentLoaded', window.initPage);
