/**
* PayBank 1:1 Local Mirror JS (CF Optimized)
* Version: 65.4 (Enterprise Hardened Edition)
*/

const I18N = {
    km: {
        timer_hint: "សូមបង់ប្រាក់ក្នុងកំឡុងពេលនេះ ប្រព័ន្ធនឹងទូទាត់ដោយស្វ័យប្រវត្ត",
        amount_label: "ចំនួនទឹកប្រាក់ត្រូវបង់",
        amount_warning: "សូមប្រាកដថាចំនួនទឹកប្រាក់ផ្ទេរដូចគ្នានឹងចំនួនត្រូវបង់ ប្រព័ន្ធនឹងទូទាត់ដោយស្វ័យប្រវត្ត",
        receiver_label: "អ្នកទទួល",
        card_label: "គណនីទទួល",
        bank_label_row: "ធនាគារទទួល",
        order_no_label: "លេខបញ្ជាទិញ",
        copy: "ចម្លង",
        waiting_pay: "កំពុងរង់ចាំការបង់ប្រាក់...",
        copied: "បានចម្លង!",
        pay_success: "ការបង់ប្រាក់បានជោគជ័យ!",
        save_qr: "រក្សាទុក QR",
        assigning: "កំពុងបែងចែក...",
        order_expired: "ពេលវេលាបង់ប្រាក់ផុតកំណត់!",
        order_expired_desc: "ពេលវេលាបង់ប្រាក់បានផុតកំណត់ សូមចាប់ផ្តើមម្តងទៀត។<br>កូដ QR បច្ចុប្បន្នមិនមានសុពលភាពទេ។",
        retry_btn: "ព្យាយាមម្តងទៀត",
        supported_banks_footer: "គាំទ្រគ្រប់ភ្នាក់ងារធនាគារ KHQR ខាងលើ",
        merchant_ref: "លេខយោងអាជីវករ",
        warn_1: "ប្រសិនបើនេះមិនមែនជាការបញ្ជាទិញរបស់អ្នកទេ សូមកុំបង់ប្រាក់",
        warn_2: "ជូនដំណឹងម្ដងទៀត សូមកុំកត់ត្រាលេខគណនី ពីព្រោះវាអាចផ្លាស់ប្តូរបានជានិច្ច",
        warn_3: "សូមធ្វើការដាក់ប្រាក់ទាន់ពេលវេលា និងបង់ប្រាក់ត្រឹមតែចំនួនដែលបានបង្ហាញ",
        redirect_hint: "ទំព័រនឹងលោតទៅកាន់គេហទំព័រដើមវិញក្នុងរយៈពេល {{sec}} វិនាទី...",
        close_hint: "ទំព័រនឹងបិទដោយស្វ័យប្រវត្តក្នុងរយៈពេល {{sec}} វិនាទី...",
        contact_us: "ទាក់ទងមកយើង",
        help_guide: "មគ្គុទ្ទេសក៍ជំនួយ",
        help: "សេចក្តីណែនាំអំពីការបញ្ចូលថ្ម",
        click_close: "ចុចលើរូបភាពដើម្បីដកថយ"
    },
    en: {
        timer_hint: "Please pay within this time, system will auto-credit",
        amount_label: "Total Amount Due",
        amount_warning: "Ensure transfer amount matches due amount for auto-credit",
        receiver_label: "Receiver",
        card_label: "Account No",
        bank_label_row: "Receiving Bank",
        order_no_label: "Order No",
        copy: "Copy",
        waiting_pay: "Waiting for payment...",
        copied: "Copied!",
        pay_success: "Payment Success!",
        save_qr: "Save QR",
        assigning: "Assigning account...",
        order_expired: "Order Expired!",
        order_expired_desc: "Payment time has expired, please restart the payment.<br>The current QR code is invalid.",
        retry_btn: "Retry",
        supported_banks_footer: "Supports all the above KHQR banks",
        merchant_ref: "Merchant Ref",
        warn_1: "If this is not your order, please do not pay.",
        warn_2: "Do not save this account number. Details may change.",
        warn_3: "Pay exactly as shown for auto-credit.",
        redirect_hint: "Redirecting to merchant in {{sec}} seconds...",
        close_hint: "Page will close automatically in {{sec}} seconds...",
        contact_us: "Contact Us",
        help_guide: "Help Guide",
        help: "Top-up Hint",
        click_close: "Click image to close"
    },
    zh: {
        timer_hint: "请在规定时间内完成支付",
        amount_label: "应付总额",
        amount_warning: "请确保转账金额一致，否则将无法自动到账",
        receiver_label: "收款姓名",
        card_label: "收款账户",
        bank_label_row: "收款银行",
        order_no_label: "订单号",
        copy: "复制",
        waiting_pay: "正在等待支付...",
        copied: "已复制!",
        pay_success: "支付成功!",
        save_qr: "保存二维码到相册",
        assigning: "正在为您分配收款账号...",
        order_expired: "订单已过期!",
        order_expired_desc: "支付时间已过期，请重新发起支付。<br>当前二维码已失效。",
        retry_btn: "重试",
        supported_banks_footer: "支持以上所有 KHQR 银行",
        merchant_ref: "商户单号",
        warn_1: "如果这不是您的订单，请勿支付。",
        warn_2: "请勿记录此收款账号，账号会不定期更换。",
        warn_3: "请及时支付且仅支付显示的准确金额。",
        redirect_hint: "页面将在 {{sec}} 秒内自动跳转...",
        close_hint: "页面将在 {{sec}} 秒内自动关闭...",
        contact_us: "联系客服",
        help_guide: "帮助指引",
        help: "充值说明",
        click_close: "点击图片可收回"
    }
};

function getDetectLanguage() {
    try {
        const saved = localStorage.getItem('paybank_lang');
        if (saved) return saved;
    } catch (e) {
        console.warn("localStorage access denied");
    }
    const browserLang = (navigator.language || 'en').toLowerCase();
    if (browserLang.startsWith('zh')) return 'zh';
    if (browserLang.includes('km') || browserLang.includes('kh')) return 'km';
    return 'en';
}

let currentLang = getDetectLanguage();
const urlParams = new URLSearchParams(window.location.search);
const currentToken = urlParams.get('token') || '';
let statusPoller = null; 
let redirectUrl = ''; 

window.setLanguage = function (lang) {
    currentLang = lang;
    try { localStorage.setItem('paybank_lang', lang); } catch(e) {}
    updateInterface();
}

function updateInterface() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (I18N[currentLang] && I18N[currentLang][key]) el.innerText = I18N[currentLang][key];
    });

    ['km', 'en', 'zh'].forEach(l => {
        const btn = document.getElementById('lang-' + l);
        if (btn) btn.classList.toggle('active', currentLang === l);
    });

    const helpImg = document.querySelector('.help-img');
    if (helpImg) {
        helpImg.src = `assets/img/topup_hint_${currentLang}.jpg`;
    }
}

const LOGO_PATH = "assets/img/bank_logo/bakong_logo.png";

window.renderQrCode = function (qrData) {
    const qrContainer = document.getElementById("qrcode");
    if (!qrContainer) return;

    const tempDiv = document.createElement('div');
    tempDiv.style.display = 'none';
    tempDiv.id = 'temp-qr-gen-' + Date.now();
    document.body.appendChild(tempDiv);

    // 调用第三方 QRCode 库
    if (typeof QRCode === 'undefined') {
        console.error("QRCode library not loaded");
        return;
    }

    new QRCode(tempDiv, {
        text: qrData,
        width: 180, height: 180,
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

        // 绘制背景与主体二维码
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, 220, 220);
        ctx.drawImage(source, 20, 20, 180, 180);

        // 绘制中间 Logo
        const logo = new Image();
        logo.src = LOGO_PATH;
        logo.onload = () => {
            const lSize = 42, p = 3;
            const lx = (220 - lSize) / 2, ly = (220 - lSize) / 2;
            ctx.fillStyle = "#FFFFFF"; ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(lx - p, ly - p, lSize + p * 2, lSize + p * 2, 8);
            else ctx.rect(lx - p, ly - p, lSize + p * 2, lSize + p * 2);
            ctx.fill();
            ctx.drawImage(logo, lx, ly, lSize, lSize);

            // 输出最终图像
            const finalImg = new Image();
            finalImg.style.width = '220px'; finalImg.style.borderRadius = '8px';
            finalImg.src = canvas.toDataURL("image/png");
            qrContainer.innerHTML = ""; qrContainer.appendChild(finalImg);
            if (tempDiv.parentNode) document.body.removeChild(tempDiv);
        };
        logo.onerror = () => { 
             // Logo 加载失败也输出二维码
             const finalImg = new Image();
             finalImg.style.width = '220px'; finalImg.src = canvas.toDataURL("image/png");
             qrContainer.innerHTML = ""; qrContainer.appendChild(finalImg);
             if (tempDiv.parentNode) document.body.removeChild(tempDiv);
        };
    };

    const t = setInterval(() => {
        const scanImg = tempDiv.querySelector('img');
        const isComplete = scanImg && scanImg.complete && scanImg.naturalWidth > 0;
        const target = tempDiv.querySelector('canvas') || (isComplete ? scanImg : null);
        
        if (target) {
            clearInterval(t); 
            finalize();
        }
    }, 50);
    setTimeout(() => clearInterval(t), 5000);
};

window.saveQrCode = async function () {
    const ticketEl = document.querySelector(".qr-ticket-section");
    if (!ticketEl || typeof html2canvas === 'undefined') return;

    // 获取商户订单号作为文件名
    const orderNo = (document.getElementById('display-merchant-order-no')?.innerText || 'KHQR').trim();
    
    // 简易移动端检测
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    try {
        // [V66.2] 截图预处理
        ticketEl.classList.add("is-capturing");

        const canvas = await html2canvas(ticketEl, {
            scale: 2,           
            useCORS: true,      
            backgroundColor: "#ffffff",
            logging: false
        });

        ticketEl.classList.remove("is-capturing");

        const dataUrl = canvas.toDataURL("image/png");

        // 针对 iOS 和部分移动端 WebView 的兼容处理
        if (isIOS) {
            // iOS 往往拦截下载，改为在新窗口打开图片，引导用户长按保存
            // 备注：如果 window.open 被拦截，浏览器通常会有提示或回退到当前窗口
            try {
                const newWin = window.open('about:blank');
                if (newWin) {
                    newWin.document.write(`<title>${orderNo}</title><body style="margin:0;padding:20px;background:#f4f7fe;display:flex;justify-content:center;"><img src="${dataUrl}" style="max-width:100%; height:auto; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.1);"></body>`);
                    newWin.focus();
                } else {
                    window.location.href = dataUrl;
                }
            } catch (e) {
                window.location.href = dataUrl;
            }
        } else {
            // 安卓和 PC 端直接尝试触发下载
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `${orderNo}.png`;
            if (isMobile) link.target = "_blank"; // 部分移动端需要新开页触发
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    } catch (err) {
        console.error("Capture failed", err);
        ticketEl.classList.remove("is-capturing");
    }
};

function applyPaymentData(data) {
    if (!data) return;
    const val = parseFloat(data.real_amount || 0).toFixed(2);
    const parts = val.split('.');
    
    const intEl = document.getElementById('render-amt-int');
    const decEl = document.getElementById('render-amt-dec');
    if (intEl) intEl.textContent = parts[0];
    if (decEl) decEl.textContent = '.' + (parts[1] || '00');

    const nameEl = document.getElementById('display-account-name');
    const orderEl = document.getElementById('display-merchant-order-no');
    if (nameEl) nameEl.textContent = data.account_name || '--';
    if (orderEl) orderEl.textContent = data.out_order_no || data.order_no || '--';

    window.renderQrCode(data.khqr_string || data.qr_data || '');
}

window.initPage = async function () {
    const up = new URLSearchParams(window.location.search);
    const ono = up.get('order_no') || up.get('trade_no');
    
    if (!ono) {
        showErrorMask('Order Missing', 'Order number is required.');
        return;
    }

    try {
        const res = await fetch(`${window.API_BASE}api/get_order_details.php?order_no=${ono}&token=${currentToken}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const json = await res.json();

        if (json.code !== 200) {
            showErrorMask(json.msg || 'Access Denied', 'Invalid or missing security token.');
            return;
        }

        const data = json.data;
        const cfg = document.getElementById('checkout-config');
        if (cfg) cfg.dataset.orderNo = data.order_no;
        redirectUrl = data.return_url || ''; 

        if (data.support_link) {
            const contactPanel = document.getElementById('contact-panel');
            const contactBtn = document.getElementById('btn-contact-us');
            if (contactPanel && contactBtn) {
                contactPanel.style.display = 'flex';
                contactBtn.onclick = () => safeOpen(data.support_link);
            }
        } else {
            // [FIX] 本地逻辑：链接为空则显式隐藏 (V65.6)
            const contactPanel = document.getElementById('contact-panel');
            if (contactPanel) contactPanel.style.display = 'none';
        }

        // [FIX] 根据后端配置同步“帮助指引”标签的显示状态
        const helpTab = document.getElementById('help-panel-tab');
        if (helpTab) {
            helpTab.style.display = (Number(data.topup_hint) === 1) ? 'flex' : 'none';
        }

        let remain = 0;
        if (data.expire_at && data.server_time) {
            const exp = new Date(data.expire_at.replace(/-/g, '/')).getTime();
            const srv = new Date(data.server_time.replace(/-/g, '/')).getTime();
            remain = Math.max(0, Math.floor((exp - srv) / 1000));
        }

        if (remain > 0) {
            applyPaymentData(data);
            startPolling(ono);
            startCountdown(remain);
            const container = document.querySelector('.checkout-container');
            if (container) container.style.opacity = '1';
        } else {
            showExpiryMask();
        }

    } catch (e) {
        console.error(e);
        showErrorMask('System Error', 'Unable to load payment details.');
    }
};

function startPolling(ono) {
    if (statusPoller) clearInterval(statusPoller); 
    statusPoller = setInterval(async () => {
        try {
            const res = await fetch(`${window.API_BASE}api/check_order.php?order_no=${ono}&token=${currentToken}`);
            if (!res.ok) return;
            const json = await res.json();
            if (json.status === 'paid') {
                if (json.return_url) redirectUrl = json.url || json.return_url; 
                clearInterval(statusPoller);
                showSuccessMask();
            }
        } catch (e) { }
    }, 4000);
}

function startCountdown(sec) {
    const timerEl = document.getElementById('timer-text');
    const tick = () => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        if (timerEl) timerEl.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

        if (sec <= 0) {
            showExpiryMask();
            return;
        }
        sec--;
        timerEl._timerTimeout = setTimeout(tick, 1000);
    };
    tick();
}

function showSuccessMask() {
    if (statusPoller) clearInterval(statusPoller);
    const mask = document.getElementById('mask-success');
    if (!mask) return;

    mask.style.display = 'flex';

    let sec = 3;
    const hintEl = document.getElementById('success-hint');
    const update = () => {
        const langPack = I18N[currentLang] || I18N.en;
        const textKey = redirectUrl ? 'redirect_hint' : 'close_hint';
        if (hintEl && langPack[textKey]) {
            hintEl.innerText = langPack[textKey].replace('{{sec}}', sec);
        }
    };

    update();
    const timer = setInterval(() => {
        sec--;
        if (sec <= 0) {
            clearInterval(timer);
            handleRedirection();
        } else {
            update();
        }
    }, 1000);
}

function handleRedirection() {
    if (redirectUrl && redirectUrl.length > 5) {
        window.location.replace(redirectUrl);
    } else {
        if (typeof WeixinJSBridge !== 'undefined') { WeixinJSBridge.call('closeWindow'); }
        else if (typeof AlipayJSBridge !== 'undefined') { AlipayJSBridge.call('closeWebview'); }
        else {
            window.close();
            setTimeout(() => { window.location.href = 'about:blank'; }, 500);
        }
    }
}

window.togglePanel = function(id) {
    const el = document.getElementById(id);
    const overlay = document.getElementById('panel-overlay');
    if (!el) return;
    
    const isActive = el.classList.contains('active');
    closeAllPanels(); 
    
    if (!isActive) {
        el.classList.add('active');
        if (overlay) overlay.classList.add('show');
        document.body.classList.add('panel-open');
    }
};

window.closeAllPanels = function() {
    document.querySelectorAll('.side-drawer').forEach(d => d.classList.remove('active'));
    const overlay = document.getElementById('panel-overlay');
    if (overlay) overlay.classList.remove('show');
    document.body.classList.remove('panel-open');
};

window.safeOpen = function(url) {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
};

function showErrorMask(title, desc) {
    if (statusPoller) clearInterval(statusPoller);
    const mask = document.getElementById('mask-error');
    if (mask) {
        const titleEl = document.getElementById('error-title');
        const descEl = document.getElementById('error-desc');
        if (titleEl) titleEl.innerText = title;
        if (descEl) descEl.innerText = desc;
        mask.style.display = 'flex';
        const container = document.querySelector('.checkout-container');
        if (container) container.style.opacity = '1';
    }
}

function showExpiryMask() {
    if (statusPoller) clearInterval(statusPoller);
    const mask = document.getElementById('mask-expiry');
    if (mask) {
        const descEl = mask.querySelector('p');
        const lp = I18N[currentLang] || I18N.en;
        if (descEl && lp.order_expired_desc) {
            descEl.innerHTML = lp.order_expired_desc;
        }
        mask.style.display = 'flex';
        const container = document.querySelector('.checkout-container');
        if (container) container.style.opacity = '1';
    } else {
        const successMask = document.getElementById('mask-success');
        if (successMask) {
            successMask.style.display = 'flex';
            const lp = I18N[currentLang] || I18N.en;
            const h2 = successMask.querySelector('h2');
            if (h2) h2.innerText = lp.order_expired;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateInterface();
    window.initPage();
});
