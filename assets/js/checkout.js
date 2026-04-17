/**
 * PayBank Checkout Logic (Restored Version 1.2.1)
 * [V67.0] 1:1 Restoration of production logic. 
 * [V67.0] Fixed: Restored safety tokens, original poller, and success UI injection.
 */

const I18N = {
    km: {
        timer_hint: "សូមបង់ប្រាក់ក្នុងកំឡុងពេលនេះ ប្រព័ន្ធនឹងទូទាត់ដោយស្វ័យប្រវត្ត",
        pay_success: "ការបង់ប្រាក់បានជោគជ័យ!",
        waiting_pay: "កំពុងរង់ចាំការបង់ប្រាក់...",
        auto_close: "ទំព័រនឹងបិទដោយស្វ័យប្រវត្តក្នុងរយៈពេល {{sec}} វិនាទី...",
        save_qr: "រក្សាទុកកូដ QR ទៅកាន់អាល់ប៊ុម",
        close_page: "បិទទំព័រនេះ",
        copy: "ចម្លង",
        copied: "បានចម្លង!",
        help_guide: "ការណែនាំ",
        merchant_ref: "លេខយោងអាជីវករ"
    },
    en: {
        timer_hint: "Please pay within this time, system will auto-credit",
        pay_success: "Payment Success!",
        waiting_pay: "Waiting for payment...",
        auto_close: "Page will close automatically in {{sec}} seconds...",
        save_qr: "Save QR to Album",
        close_page: "Close Page",
        copy: "Copy",
        copied: "Copied!",
        help_guide: "Help Guide",
        merchant_ref: "Merchant Ref"
    },
    zh: {
        timer_hint: "请在规定时间内完成支付",
        pay_success: "支付成功!",
        waiting_pay: "正在等待支付...",
        auto_close: "页面将在 {{sec}} 秒内自动关闭...",
        save_qr: "保存二维码到相册",
        close_page: "关闭页面",
        copy: "复制",
        copied: "已复制!",
        help_guide: "帮助指引",
        merchant_ref: "商户单号"
    }
};

const LOGO_PATH = "assets/img/bank_logo/bakong_logo.png";

function getDetectLanguage() {
    const cookieLang = document.cookie.split('; ').find(row => row.startsWith('paybakong_lang='))?.split('=')[1];
    if (cookieLang) return cookieLang;
    const navLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    if (navLang.startsWith('zh')) return 'zh';
    if (navLang.startsWith('km')) return 'km';
    return 'en';
}

let currentLang = getDetectLanguage();

window.setLanguage = function (lang) {
    currentLang = lang;
    document.cookie = "paybakong_lang=" + lang + "; path=/; max-age=" + (30 * 24 * 60 * 60);
    updateInterface();
}

const urlParams = new URLSearchParams(window.location.search);
const currentToken = urlParams.get('token') || '';

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
}

function showToast(text) {
    let toast = document.querySelector('.copy-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'copy-toast shadow';
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
    }).catch(() => {
        const input = document.createElement('input');
        input.value = text; document.body.appendChild(input); 
        input.select(); document.execCommand('copy'); document.body.removeChild(input);
        showToast(I18N[currentLang].copied || 'Copied!');
    });
};

window.renderQrCode = function (qrData) {
    const qrContainer = document.getElementById("qrcode");
    if (!qrContainer || !qrData) return;

    document.getElementById('qr-display-area')?.classList.remove('d-none');

    const tempDiv = document.createElement('div');
    tempDiv.style.display = 'none';
    document.body.appendChild(tempDiv);
    
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
        ctx.drawImage(source, 10, 10, 200, 200);

        const logo = new Image();
        logo.src = LOGO_PATH;
        logo.onload = () => {
            const lSize = 34, p = 3;
            const lx = (220 - lSize) / 2, ly = (220 - lSize) / 2;
            ctx.fillStyle = "#FFFFFF"; ctx.strokeStyle = "#ED1C24"; ctx.lineWidth = 1.5; ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(lx - p, ly - p, lSize + p * 2, lSize + p * 2, 8);
            else ctx.rect(lx - p, ly - p, lSize + p * 2, lSize + p * 2);
            ctx.fill(); ctx.stroke();
            ctx.drawImage(logo, lx, ly, lSize, lSize);
            qrContainer.innerHTML = `<img src="${canvas.toDataURL("image/png")}" style="width:220px; border-radius:8px;">`;
            document.body.removeChild(tempDiv);
        };
        logo.onerror = () => {
            qrContainer.innerHTML = `<img src="${canvas.toDataURL("image/png")}" style="width:220px;">`;
            document.body.removeChild(tempDiv);
        };
    };

    const t = setInterval(() => {
        const target = tempDiv.querySelector('canvas') || tempDiv.querySelector('img');
        if (target && (target.tagName === 'CANVAS' || (target.complete && target.naturalWidth > 0))) {
            clearInterval(t); finalize();
        }
    }, 50);
};

window.saveQrCode = async function () {
    const ticketEl = document.querySelector(".qr-ticket-section");
    if (!ticketEl || typeof html2canvas === 'undefined') return;

    const config = document.getElementById('checkout-config').dataset;
    const orderNo = config.merchantOrderNo || 'KHQR';

    showToast(currentLang === 'zh' ? "正在处理..." : "Processing...");

    try {
        ticketEl.classList.add("is-capturing");
        const canvas = await html2canvas(ticketEl, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
        ticketEl.classList.remove("is-capturing");

        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `KHQR_${orderNo}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast(currentLang === 'zh' ? "保存成功" : "Success");
    } catch (err) {
        ticketEl.classList.remove("is-capturing");
        showToast("Save Failed");
    }
};

window.togglePanel = function (id) {
    const el = document.getElementById(id);
    const overlay = document.getElementById('panel-overlay');
    if (!el) return;
    const isActive = el.classList.contains('active');
    closeAllPanels();
    if (!isActive) {
        el.classList.add('active');
        if (overlay) overlay.classList.add('show');
        if (id === 'help-panel') document.getElementById('help-panel-tab')?.classList.add('active');
    }
};

window.closeAllPanels = function () {
    document.querySelectorAll('.side-drawer').forEach(p => p.classList.remove('active'));
    document.getElementById('panel-overlay')?.classList.remove('show');
    document.getElementById('help-panel-tab')?.classList.remove('active');
};

function hydrateFromEmbeddedKhqrIfAny() {
    const configEl = document.getElementById('checkout-config');
    if (!configEl) return false;
    const cfg = configEl.dataset;
    if (!cfg.khqr) return false;

    document.getElementById('render-amt-int') && (document.getElementById('render-amt-int').textContent = cfg.amount.split('.')[0]);
    document.getElementById('render-amt-dec') && (document.getElementById('render-amt-dec').textContent = '.' + (cfg.amount.split('.')[1] || '00'));
    document.getElementById('display-account-name') && (document.getElementById('display-account-name').textContent = cfg.accountName || '------');
    document.getElementById('display-merchant-order-no') && (document.getElementById('display-merchant-order-no').textContent = cfg.merchantOrderNo || '------');

    window.renderQrCode(cfg.khqr);
    updateInterface();
    return true;
}

document.addEventListener('DOMContentLoaded', function () {
    updateInterface();
    hydrateFromEmbeddedKhqrIfAny();
    document.querySelector('.checkout-container').style.opacity = '1';

    const configEl = document.getElementById('checkout-config');
    if (configEl && configEl.dataset.remainingSeconds > 0) {
        let sec = parseInt(configEl.dataset.remainingSeconds);
        const timerText = document.getElementById('timer-text');
        const interval = setInterval(() => {
            sec--;
            if (sec <= 0) { 
                clearInterval(interval); 
                window.location.reload(); 
            }
            const m = Math.floor(sec / 60).toString().padStart(2, '0');
            const s = (sec % 60).toString().padStart(2, '0');
            if (timerText) timerText.innerText = `${m}:${s}`;
        }, 1000);
    }

    const statusPoller = setInterval(async () => {
        const cfg = document.getElementById('checkout-config').dataset;
        try {
            const res = await fetch(`api/check_order.php?order_no=${cfg.orderNo}&token=${currentToken}`);
            const json = await res.json();
            if (json.status === 'paid') {
                clearInterval(statusPoller);
                let secondsLeft = 3;
                let retUrl = json.return_url || '';

                const updateSuccessHTML = () => {
                    const secHtml = `<span id="close-timer-sec" class="fw-bold text-dark">${secondsLeft}</span>`;
                    const hintText = I18N[currentLang].auto_close.replace('{{sec}}', secHtml);
                    document.querySelector('.checkout-container').innerHTML = `
                        <div class="payment-card shadow-lg text-center p-5 d-flex flex-column justify-content-center align-items-center" style="min-height: 480px; border-radius: 20px;">
                            <i class="fa-solid fa-circle-check text-success display-1 mb-4" style="font-size: 90px; color: #198754; animation: scaleIn 0.4s ease-out;"></i>
                            <h2 class="fw-bold mb-3" style="color: #212529;">${I18N[currentLang].pay_success}</h2>
                            <p class="text-muted small mb-4" style="font-size: 15px;">${hintText}</p>
                            ${!retUrl ? `<button class="btn btn-primary px-4 py-3 rounded-pill shadow-sm mt-3" style="width: 100%; max-width: 280px; font-size: 16px; transition: all 0.3s;" onclick="window.location.href='about:blank'">${I18N[currentLang].close_page}</button>` : ''}
                        </div>
                        <style>@keyframes scaleIn { 0% { transform: scale(0.6); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }</style>
                    `;
                };

                updateSuccessHTML();
                const closeCountdown = setInterval(() => {
                    secondsLeft--;
                    const el = document.getElementById('close-timer-sec');
                    if (el) el.innerText = secondsLeft;
                    if (secondsLeft <= 0) {
                        clearInterval(closeCountdown);
                        if (retUrl) window.location.replace(retUrl);
                    }
                }, 1000);
            }
        } catch (e) { }
    }, 4000);
});
