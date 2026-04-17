/* PayBank 1:1 Local Mirror JS (CF Optimized)
* Version: 65.0 (Mirror Edition)
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
        close_hint: "ទំព័រនឹងបិទដោយស្វ័យប្រវត្តក្នុងរយៈពេល {{sec}} វិនាទី..."
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
        close_hint: "Page will close automatically in {{sec}} seconds..."
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
        close_hint: "页面将在 {{sec}} 秒内自动关闭..."
    }
};

function getDetectLanguage() {
    const saved = localStorage.getItem('paybank_lang');
    if (saved) return saved;
    const browserLang = (navigator.language || 'en').toLowerCase();
    if (browserLang.startsWith('zh')) return 'zh';
    if (browserLang.includes('km') || browserLang.includes('kh')) return 'km';
    return 'en';
}

let currentLang = getDetectLanguage();
const urlParams = new URLSearchParams(window.location.search);
const currentToken = urlParams.get('token') || '';
let statusPoller = null; // 全局轮询跟踪器
let redirectUrl = ''; // [NEW] 全局跳转地址同步

window.setLanguage = function (lang) {
    currentLang = lang;
    localStorage.setItem('paybank_lang', lang);
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
}

// 统一 Logo 路径
const LOGO_PATH = "assets/img/bank_logo/bakong_logo.png";

window.renderQrCode = function (qrData) {
    const qrContainer = document.getElementById("qrcode");
    if (!qrContainer) return;

    const tempDiv = document.createElement('div');
    tempDiv.style.display = 'none';
    document.body.appendChild(tempDiv);

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

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, 220, 220);
        ctx.drawImage(source, 20, 20, 180, 180);

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

            const finalImg = new Image();
            finalImg.style.width = '220px'; finalImg.style.borderRadius = '8px';
            finalImg.src = canvas.toDataURL("image/png");
            qrContainer.innerHTML = ""; qrContainer.appendChild(finalImg);
            document.body.removeChild(tempDiv);
        };
        logo.onerror = () => { document.body.removeChild(tempDiv); };
    };

    const t = setInterval(() => {
        if (tempDiv.querySelector('canvas') || (tempDiv.querySelector('img') && tempDiv.querySelector('img').complete)) {
            clearInterval(t); finalize();
        }
    }, 50);
};

window.saveQrCode = function () {
    const img = document.querySelector("#qrcode img");
    if (!img) return;
    const link = document.createElement('a');
    link.href = img.src;
    link.download = `KHQR_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// 1:1 数据应用逻辑
function applyPaymentData(data) {
    // 金额分拆 (1:1 格式化)
    const val = parseFloat(data.real_amount).toFixed(2);
    const parts = val.split('.');
    document.getElementById('render-amt-int').textContent = parts[0];
    document.getElementById('render-amt-dec').textContent = '.' + parts[1];

    // 其他信息对齐
    document.getElementById('display-account-name').textContent = data.account_name || '--';
    document.getElementById('display-merchant-order-no').textContent = data.out_order_no || data.order_no;

    window.renderQrCode(data.khqr_string || data.qr_data);
}

window.initPage = async function () {
    const up = new URLSearchParams(window.location.search);
    const ono = up.get('order_no') || up.get('trade_no');
    if (!ono) return;

    try {
        const res = await fetch(`${window.API_BASE}api/get_order_details.php?order_no=${ono}&token=${currentToken}`);
        const json = await res.json();

        // [FIX] 增强拦截：参数错误或订单不存在 (同步本地 die() 逻辑)
        if (json.code !== 200) {
            showErrorMask(json.msg || 'Access Denied', 'Invalid or missing security token.');
            return;
        }

        const data = json.data;
        document.getElementById('checkout-config').dataset.orderNo = data.order_no;
        redirectUrl = data.return_url || ''; // 同步初始回传地址

        // 倒计时核心计算 (V65.1：首屏拦截逻辑)
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
            // [FIX] 数据准备就绪后，渐显界面
            document.querySelector('.checkout-container').style.opacity = '1';
        } else {
            // 已超时：直接拦截渲染，弹出遮罩
            showExpiryMask();
        }

    } catch (e) {
        console.error(e);
        showErrorMask('System Error', 'Unable to load payment details.');
    }
};

function startPolling(ono) {
    statusPoller = setInterval(async () => {
        try {
            const res = await fetch(`${window.API_BASE}api/check_order.php?order_no=${ono}&token=${currentToken}`);
            const json = await res.json();
            if (json.status === 'paid') {
                if (json.return_url) redirectUrl = json.return_url; // 轮询中同步最新地址
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

    // [FIX] 1:1 倒计时跳转逻辑
    let sec = 3;
    const hintEl = document.getElementById('success-hint');
    const update = () => {
        const textKey = redirectUrl ? 'redirect_hint' : 'close_hint';
        if (hintEl && I18N[currentLang][textKey]) {
            hintEl.innerText = I18N[currentLang][textKey].replace('{{sec}}', sec);
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

// [FIX] 处理最终跳转或关闭
function handleRedirection() {
    if (redirectUrl && redirectUrl.length > 5) {
        window.location.replace(redirectUrl);
    } else {
        // [FIX] 针对移动端环境的多种尝试
        if (typeof WeixinJSBridge !== 'undefined') { WeixinJSBridge.call('closeWindow'); }
        else if (typeof AlipayJSBridge !== 'undefined') { AlipayJSBridge.call('closeWebview'); }
        else {
            window.close();
            // 兜底：如果浏览器拦截了关闭，则跳转到空白页
            setTimeout(() => { window.location.href = 'about:blank'; }, 500);
        }
    }
}

// [NEW] 处理报错显示 (同步本地 die())
function showErrorMask(title, desc) {
    if (statusPoller) clearInterval(statusPoller);
    const mask = document.getElementById('mask-error');
    if (mask) {
        document.getElementById('error-title').innerText = title;
        document.getElementById('error-desc').innerText = desc;
        mask.style.display = 'flex';
        // 确保容器可见以显示遮罩
        document.querySelector('.checkout-container').style.opacity = '1';
    }
}

function showExpiryMask() {
    // 1. 彻底停止所有后台活动 (V65.0)
    if (statusPoller) clearInterval(statusPoller);

    // 2. 显示专门的过期遮罩
    const mask = document.getElementById('mask-expiry');
    if (mask) {
        // 同步 1:1 过期描述文案
        const descEl = mask.querySelector('p');
        if (descEl && I18N[currentLang].order_expired_desc) {
            descEl.innerHTML = I18N[currentLang].order_expired_desc;
        }
        mask.style.display = 'flex';
        // 确保容器可见以显示遮罩
        document.querySelector('.checkout-container').style.opacity = '1';
    } else {
        // 退而求其次显示成功遮罩并修改文案
        const successMask = document.getElementById('mask-success');
        if (successMask) {
            successMask.style.display = 'flex';
            successMask.querySelector('h2').innerText = I18N[currentLang].order_expired;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateInterface();
    window.initPage();
});
