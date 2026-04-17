/**
 * PayBank Checkout Logic
 * Version: 1.2.2 [V68.1 Fusion]
 * [FUSION] Merging Production Engine 1.2.1 with New UI Architecture
 */

const I18N = {
    km: {
        timer_hint: "សូមបង់ប្រាក់ក្នុងកំឡុងពេលនេះ ប្រព័ន្ធនឹងទូទាត់ដោយស្វ័យប្រវត្ត",
        placeholder_title: "ទូទាត់តាម Bakong",
        placeholder_desc: "ជ្រើស Bakong ដើម្បីបង្ហាញកូដ KHQR",
        instruction: "អ្នកអាចស្កេនកូដបង់ប្រាក់ ឬចម្លងគណនីផ្ទេរប្រាក់ដោយដៃ",
        amount_label: "ចំនួនទឹកប្រាក់ត្រូវបង់",
        amount_warning: "សូមប្រាកដថាចំនួនទឹកប្រាក់ផ្ទេរដូចគ្នានឹងចំនួនត្រូវបង់ ប្រព័ន្ធនឹងទូទាត់ដោយស្វ័យប្រវត្ត",
        receiver_label: "អ្នកទទួល",
        card_label: "គណនីទទួល",
        copy: "ចម្លង",
        waiting_pay: "កំពុងរង់ចាំការបង់ប្រាក់...",
        copied: "បានចម្លង!",
        must_use: "ត្រូវតែប្រើ App {{bank}} ដើម្បីស្កេន",
        recom_use: "ណែនាំឱ្យប្រើ App {{bank}} ដើម្បីស្កេន",
        pay_success: "ការបង់ប្រាក់បានជោគជ័យ!",
        close_page: "បិទទំព័រនេះ",
        switch_fail: "ការផ្លាស់ប្តូរបានបរាជ័យ",
        auto_close: "ទំព័រនឹងបិទដោយស្វ័យប្រវត្តក្នុងរយៈពេល {{sec}} វិនាទី...",
        save_qr: "រក្សាទុកកូដ QR ទៅកាន់អាល់ប៊ុម",
        save_hint: "* បន្ទាប់ពីរក្សាទុក សូមបើក App ធនាគារ ហើយជ្រើសរើសរូបភាព",
        assigning: "កំពុងបែងចែកគណនី...",
        no_bank_card: "មិនមានគណនី Bakong ដែលអាចប្រើបាន សូមព្យាយាមម្តងទៀត",
        net_err: "កំហុសបណ្តាញ សូមព្យាយាមម្តងទៀត",
        order_no_label: "លេខបញ្ជាទិញ",
        bank_label_row: "ធនាគារទទួល",
        support: "ជំនួយអតិថិជន",
        help: "របៀបបង់ប្រាក់",
        close: "យល់ព្រម",
        contact_us: "ទាក់ទងមកយើង",
        help_guide: "ការណែនាំ",
        click_close: "ចុចលើរូបភាពដើម្បីបិទ",
        help_img: "/assets/img/topup_hint_km.jpg?v=1.0",
        merchant_ref: "លេខយោងអាជីវករ",
        supported_banks_hint: "គាំទ្រគ្រប់ភ្នាក់ងារធនាគារ KHQR ខាងលើ",
        supported_banks_footer: "គាំទ្រគ្រប់ភ្នាក់ងារធនាគារ KHQR ខាងលើ",
        warn_1: "ប្រសិនបើនេះមិនមែនជាការបញ្ជាទិញរបស់អ្នកទេ សូមកុំបង់ប្រាក់",
        warn_2: "ជូនដំណឹងម្ដងទៀត សូមកុំកត់ត្រាលេខគណនី ពីព្រោះវាអាចផ្លាស់ប្តូរបានជានិច្ច ដោយគ្មានការជូនដំណឹង ការពិនិត្យគណនីគោលដៅមុនពេលផ្ទេរគឺមានសារៈសំខាន់",
        warn_3: "សូមធ្វើការដាក់ប្រាក់ទាន់ពេលវេលា និងបង់ប្រាក់ត្រឹមតែចំនួនដែលបានបង្ហាញ បើមិនដូច្នេះទេ អ្នកនឹងមិនទទួលបានចំនួនដើមទេ"
    },
    en: {
        timer_hint: "Please pay within this time, system will auto-credit",
        placeholder_title: "Pay with Bakong",
        placeholder_desc: "Select Bakong to show KHQR",
        instruction: "Scan QR code or copy account for manual transfer",
        amount_label: "Total Amount Due",
        amount_warning: "Ensure transfer amount matches due amount for auto-credit",
        receiver_label: "Receiver",
        card_label: "Account No",
        copy: "Copy",
        waiting_pay: "Waiting for payment...",
        copied: "Copied!",
        must_use: "Must use {{bank}} App to scan",
        recom_use: "Recommend {{bank}} App to scan",
        pay_success: "Payment Success!",
        close_page: "Close Page",
        switch_fail: "Switch Failed",
        auto_close: "Page will close automatically in {{sec}} seconds...",
        save_qr: "Save QR to Album",
        save_hint: "* After saving, open banking app and select this photo",
        assigning: "Assigning account...",
        no_bank_card: "No available Bakong account, please try again",
        net_err: "Network error, please try again",
        order_no_label: "Order No",
        bank_label_row: "Receiving Bank",
        support: "Support",
        help: "Help",
        close: "Got it",
        contact_us: "Contact Us",
        help_guide: "Help Guide",
        click_close: "Click to close",
        help_img: "/assets/img/topup_hint_en.jpg?v=1.0",
        merchant_ref: "Merchant Ref",
        supported_banks_hint: "Supports all the above KHQR banks",
        supported_banks_footer: "Supports all the above KHQR banks",
        warn_1: "If this is not your order, please do not pay.",
        warn_2: "Do not save this account number as it may change without notice. Verifying the receiver before transfer is essential.",
        warn_3: "Please pay on time and only the exact amount shown to ensure auto-credit."
    },
    zh: {
        timer_hint: "请在规定时间内完成支付",
        placeholder_title: "Bakong 支付",
        placeholder_desc: "选择 Bakong 以显示 KHQR 付款码",
        instruction: "您可扫码支付，或复制账号手动转账",
        amount_label: "应付总额",
        amount_warning: "请确保金额一致，否则无法自动到账",
        receiver_label: "收款人",
        card_label: "收款账号",
        copy: "复制",
        waiting_pay: "正在等待支付...",
        copied: "已复制!",
        must_use: "必须使用 {{bank}} App 扫码",
        recom_use: "推荐使用 {{bank}} App 扫码",
        pay_success: "支付成功!",
        close_page: "关闭页面",
        switch_fail: "切换失败",
        auto_close: "页面将在 {{sec}} 秒内自动关闭...",
        save_qr: "保存二维码到相册",
        save_hint: "* 保存后打开银行 App，选择该相册图片支付",
        assigning: "正在为您分配收款账号...",
        no_bank_card: "暂无可用 Bakong 收款账号，请稍后重试",
        net_err: "网络异常，请刷新后重试",
        order_no_label: "订单号",
        bank_label_row: "收款银行",
        support: "客服支持",
        help: "充值帮助",
        close: "我知道了",
        contact_us: "联系我们",
        help_guide: "帮助指引",
        click_close: "点击图片可收回",
        help_img: "/assets/img/topup_hint_zh.jpg?v=1.0",
        merchant_ref: "商户单号",
        supported_banks_hint: "支持以上所有 KHQR 银行",
        supported_banks_footer: "支持以上所有 KHQR 银行",
        warn_1: "如果这不是您的订单，请勿支付。",
        warn_2: "请勿记录此收款账号，账号会不定期更换。转账前请务必核对收款人及账号。",
        warn_3: "请及时支付且仅支付显示的准确金额，否则将无法自动到账。"
    }
};

const BANK_COLORS = { 'BAKONG': '#ED1C24' };

function getDetectLanguage() {
    const cookieLang = document.cookie.split('; ').find(row => row.startsWith('paybakong_lang='))?.split('=')[1];
    if (cookieLang) return cookieLang;
    const saved = localStorage.getItem('paybank_lang');
    if (saved) return saved;
    const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    if (browserLang.startsWith('zh')) return 'zh';
    if (browserLang.startsWith('km')) return 'km';
    return 'en';
}

let currentLang = getDetectLanguage();

window.setLanguage = function (lang) {
    currentLang = lang;
    localStorage.setItem('paybank_lang', lang);
    document.cookie = "paybakong_lang=" + lang + "; path=/; max-age=" + (30 * 24 * 60 * 60);
    updateInterface();
}

window.safeOpen = function (url) {
    if (!url) return;
    const win = window.open(url, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') { window.location.href = url; }
}

const urlParams = new URLSearchParams(window.location.search);
const currentToken = urlParams.get('token') || '';

function updateInterface() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (I18N[currentLang] && I18N[currentLang][key]) { el.innerText = I18N[currentLang][key]; }
    });
    const helpImgEl = document.querySelector('.help-img');
    if (helpImgEl && I18N[currentLang].help_img) { helpImgEl.src = I18N[currentLang].help_img; }
    
    // 保持与旧版 JS 逻辑一致的语言按钮激活态
    document.getElementById('lang-km')?.classList.toggle('active', currentLang === 'km');
    document.getElementById('lang-en')?.classList.toggle('active', currentLang === 'en');
    document.getElementById('lang-zh')?.classList.toggle('active', currentLang === 'zh');
    
    updateHintText('Bakong');
}

function updateHintText(bankName) {
    const hintEl = document.getElementById('scan-hint-text');
    if (!hintEl) return;
    const text = I18N[currentLang]['recom_use'].replace('{{bank}}', 'Bakong / KHQR');
    hintEl.innerHTML = `<i class="fa-solid fa-mobile-screen-button me-1"></i> ${text}`;
}

function showToast(text) {
    let toast = document.querySelector('.copy-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'copy-toast';
        document.body.appendChild(toast);
    }
    toast.innerText = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1500);
}

window.copyText = function (id, btn) {
    const el = document.getElementById(id);
    if (!el) return;
    const text = el.innerText.replace('$', '').trim();
    navigator.clipboard.writeText(text).then(() => {
        showToast(I18N[currentLang].copied || 'Copied!');
        const targetBtn = btn || (event ? event.target : null);
        if (targetBtn && targetBtn.tagName === 'BUTTON') {
            const originalText = targetBtn.innerText;
            targetBtn.innerText = I18N[currentLang].copied;
            targetBtn.style.color = '#28a745';
            setTimeout(() => { targetBtn.innerText = originalText; targetBtn.style.color = ''; }, 2000);
        }
    }).catch(err => console.error("Copy failed", err));
};

function updateTimerVisuals(remainingSeconds) {
    const dashArray = 100;
    const strokeEl = document.getElementById('timer-stroke');
    const textEl = document.getElementById('timer-text');
    const qrTextEl = document.getElementById('qr-time-text');
    if (strokeEl) {
        const offset = (remainingSeconds / (10 * 60)) * dashArray;
        strokeEl.setAttribute('stroke-dasharray', `${offset}, 100`);
    }
    const m = Math.floor(remainingSeconds / 60);
    const s = remainingSeconds % 60;
    const t = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    if (textEl) textEl.textContent = t;
    if (qrTextEl) qrTextEl.textContent = t;
}

window.renderQrCode = function (qrData) {
    const qrContainer = document.getElementById("qrcode");
    if (!qrContainer) return;
    const tempDiv = document.createElement('div');
    tempDiv.style.display = 'none';
    document.body.appendChild(tempDiv);
    new QRCode(tempDiv, {
        text: qrData, width: 200, height: 200,
        colorDark: "#000000", colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
    });
    const finalizeOnce = () => {
        const source = tempDiv.querySelector('canvas') || tempDiv.querySelector('img');
        if (!source) return;
        const canvas = document.createElement('canvas');
        const w = 220, h = 220;
        canvas.width = w * 2; canvas.height = h * 2;
        const ctx = canvas.getContext('2d');
        ctx.scale(2, 2); ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, w, h);
        ctx.drawImage(source, 10, 10, 200, 200);
        const logo = new Image();
        logo.src = "assets/img/bank_logo/bakong_logo.png";
        logo.onload = () => {
            const lSize = 32, p = 3;
            const lx = (w - lSize) / 2, ly = (h - lSize) / 2;
            ctx.fillStyle = "#FFFFFF"; ctx.strokeStyle = "#ED1C24"; ctx.lineWidth = 1.5; ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(lx - p, ly - p, lSize + p * 2, lSize + p * 2, 8);
            else ctx.rect(lx - p, ly - p, lSize + p * 2, lSize + p * 2);
            ctx.fill(); ctx.stroke();
            ctx.drawImage(logo, lx, ly, lSize, lSize);
            const finalImg = new Image();
            finalImg.style.width = '220px'; finalImg.src = canvas.toDataURL("image/png");
            qrContainer.innerHTML = ""; qrContainer.appendChild(finalImg);
            document.body.removeChild(tempDiv);
        };
        logo.onerror = () => {
            const finalImg = new Image();
            finalImg.style.width = '220px'; finalImg.src = canvas.toDataURL("image/png");
            qrContainer.innerHTML = ""; qrContainer.appendChild(finalImg);
            document.body.removeChild(tempDiv);
        };
    };
    const t = setInterval(() => {
        const target = tempDiv.querySelector('canvas') || tempDiv.querySelector('img');
        if (target && (target.tagName === 'CANVAS' || (target.complete && target.naturalWidth > 0))) {
            clearInterval(t); finalizeOnce();
        }
    }, 20);
};

window.saveQrCode = async function () {
    const ticketEl = document.querySelector(".qr-ticket-section");
    if (!ticketEl || typeof html2canvas === 'undefined') return;
    const config = document.getElementById('checkout-config').dataset;
    const orderNo = config.orderNo || 'ORDER';
    showToast(I18N[currentLang].assigning || "Processing...");
    try {
        ticketEl.classList.add("is-capturing");
        const canvas = await html2canvas(ticketEl, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
        ticketEl.classList.remove("is-capturing");
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = dataUrl; link.download = `KHQR_${orderNo}.png`;
        document.body.appendChild(link); link.click(); document.body.removeChild(link);
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
    window.closeAllPanels();
    if (!isActive) {
        el.classList.add('active');
        if (overlay) overlay.classList.add('show');
        document.body.classList.add('panel-open');
    }
};

window.closeAllPanels = function () {
    document.querySelectorAll('.side-drawer').forEach(p => p.classList.remove('active'));
    document.getElementById('panel-overlay')?.classList.remove('show');
    document.body.classList.remove('panel-open');
};

function hydrateFromEmbeddedKhqrIfAny() {
    const configEl = document.getElementById('checkout-config');
    if (!configEl) return false;
    const cfg = configEl.dataset || {};

    // [FUSION] 必须先渲染金额和单号，解决“信息不出”问题
    if (cfg.amount) {
        const amtParts = cfg.amount.split('.');
        const intEl = document.getElementById('render-amt-int');
        const decEl = document.getElementById('render-amt-dec');
        if (intEl) intEl.textContent = amtParts[0];
        if (decEl) decEl.textContent = '.' + (amtParts[1] || '00');
    }
    
    document.getElementById('display-merchant-order-no') && (document.getElementById('display-merchant-order-no').textContent = cfg.merchantOrderNo || '------');
    if (cfg.accountName) {
        const recvEl = document.getElementById('display-account-name');
        if (recvEl) recvEl.textContent = cfg.accountName;
    }

    const khqr = (cfg.khqr || '').trim();
    if (!khqr) return false; // 如果没码，就不执行后续二维码展示

    const qrArea = document.getElementById('qr-display-area');
    if (qrArea) qrArea.classList.remove('d-none');
    window.renderQrCode(khqr);
    updateInterface();
    return true;
}

document.addEventListener('DOMContentLoaded', function () {
    updateInterface();
    const configEl = document.getElementById('checkout-config');
    hydrateFromEmbeddedKhqrIfAny();

    if (configEl && configEl.dataset.remainingSeconds) {
        let sec = parseInt(configEl.dataset.remainingSeconds);
        if (sec > 0) {
            const expireTime = Date.now() + (sec * 1000);
            const updateTimer = () => {
                const diff = expireTime - Date.now();
                if (diff <= 0) { window.location.reload(); return; }
                updateTimerVisuals(Math.floor(diff / 1000));
            };
            setInterval(updateTimer, 1000);
            updateTimer();
        }
    }

    const statusPoller = setInterval(async () => {
        const configEl = document.getElementById('checkout-config');
        if (!configEl) return;
        try {
            const res = await fetch(`api/check_order.php?order_no=${configEl.dataset.orderNo}&token=${currentToken}`);
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
                            ${!retUrl ? `<button class="btn btn-primary px-4 py-3 rounded-pill shadow-sm mt-3" style="width: 100%; max-width: 280px; font-size: 16px;" onclick="window.location.href='about:blank'">${I18N[currentLang].close_page}</button>` : ''}
                        </div>
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
    
    document.querySelector('.checkout-container').style.opacity = '1';
});
