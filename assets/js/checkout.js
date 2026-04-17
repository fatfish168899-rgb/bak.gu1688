/**
 * PayBank Final Industrial JS (CF Optimized)
 * Version: 60.0 (Elite Core)
 */

const I18N = {
    km: {
        timer_hint: "សូមបង់ប្រាក់ក្នុងកំឡុងពេលកំណត់",
        instruction: "ស្កេនកូដបង់ប្រាក់ ឬចម្លងគណនីផ្ទេរប្រាក់",
        amount_label: "ចំនួនទឹកប្រាក់ត្រូវបង់",
        amount_warning: "សូមផ្ទេរឱ្យគ្រប់ចំនួនដើម្បីទទួលបានការទូទាត់ស្វ័យប្រវត្ត",
        receiver_label: "អ្នកទទួល",
        card_label: "គណនីទទួល",
        bank_label_row: "ធនាគារទទួល",
        order_no_label: "លេខបញ្ជាទិញ",
        copy: "ចម្លង",
        waiting_pay: "កំពុងរង់ចាំ...",
        copied: "បានចម្លង!",
        pay_success: "បង់ប្រាក់ជោគជ័យ!",
        save_qr: "រក្សាទុក QR",
        assigning: "កំពុងបែងចែក...",
        order_expired: "ការបញ្ជាទិញបានហួសពេល!",
        retry_btn: "ព្យាយាមម្តងទៀត",
        auto_close: "ទំព័រនឹងបិទក្នុងរយៈពេល {{sec}} វិនាទី..."
    },
    en: {
        timer_hint: "Please complete payment in time",
        instruction: "Scan QR code or copy account manually",
        amount_label: "Total Amount Due",
        amount_warning: "Ensure transfer amount matches due amount for auto-credit",
        receiver_label: "Receiver",
        card_label: "Account No",
        bank_label_row: "Receiving Bank",
        order_no_label: "Order No",
        copy: "Copy",
        waiting_pay: "Waiting...",
        copied: "Copied!",
        pay_success: "Payment Success!",
        save_qr: "Save QR to Album",
        assigning: "Assigning account...",
        order_expired: "Order Expired!",
        retry_btn: "Retry",
        auto_close: "Page will refresh in {{sec}} seconds..."
    },
    zh: {
        timer_hint: "请在规定时间内完成支付",
        instruction: "您可扫码支付，或复制账号手动转账",
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
        order_expired: "订单已超时!",
        retry_btn: "刷新重试",
        auto_close: "页面将在 {{sec}} 秒内自动刷新..."
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

// 核心：锁定 Bakong Logo 路由
const UNIFIED_LOGO_PATH = "assets/img/bank_logo/bakong_logo.png";

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
        logo.src = UNIFIED_LOGO_PATH;
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

window.switchBank = async function (bankName) {
    const ono = document.getElementById('checkout-config').dataset.orderNo;
    const box = document.getElementById('qr-container-box');
    box.style.opacity = '0.3';

    try {
        const res = await fetch(`${window.API_BASE}api/switch_bank.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order_no: ono, bank_name: bankName, token: currentToken })
        });
        const json = await res.json();
        if (json.code === 200) {
            applyPaymentData(json.data);
            // 更新活跃态
            document.querySelectorAll('.bank-item').forEach(el => el.classList.remove('active'));
            const activeItem = Array.from(document.querySelectorAll('.bank-item')).find(el => el.innerHTML.includes(bankName));
            if (activeItem) activeItem.classList.add('active');
        }
    } catch (e) { console.error(e); }
    finally { box.style.opacity = '1'; }
};

function applyPaymentData(data) {
    // 金额动态切分 (Big-Int, Small-Dec)
    const amt = parseFloat(data.real_amount).toFixed(2);
    const parts = amt.split('.');
    document.getElementById('render-amt-int').textContent = parts[0];
    document.getElementById('render-amt-dec').textContent = '.' + parts[1];

    // 详情卡片
    document.getElementById('val-recv').textContent = data.account_name || '--';
    document.getElementById('render-merchant-name').textContent = data.account_name || '--';
    document.getElementById('val-card').textContent = data.account_no || data.card_no;
    document.getElementById('val-bank').textContent = (data.bank_name || 'Bakong') + ' Bank';
    document.getElementById('val-order').textContent = data.order_no;

    window.renderQrCode(data.khqr_string || data.qr_data);
}

window.initPage = async function () {
    const up = new URLSearchParams(window.location.search);
    const ono = up.get('order_no') || up.get('trade_no');
    if (!ono) return;

    try {
        const res = await fetch(`${window.API_BASE}api/get_order_details.php?order_no=${ono}&token=${currentToken}`);
        const json = await res.json();
        if (json.code !== 200) return;

        document.getElementById('page-loading').style.display = 'none';
        document.querySelector('.checkout-container').style.opacity = '1';

        const data = json.data;
        document.getElementById('checkout-config').dataset.orderNo = data.order_no;
        document.getElementById('render-merchant-ref').textContent = data.out_order_no || 'N/A';

        applyPaymentData(data);
        startPolling(ono);

        // 倒计时核心逻辑
        let remain = 0;
        if (data.expire_at && data.server_time) {
            const exp = new Date(data.expire_at.replace(/-/g, '/')).getTime();
            const srv = new Date(data.server_time.replace(/-/g, '/')).getTime();
            remain = Math.max(0, Math.floor((exp - srv) / 1000));
        }
        if (remain > 0) startCountdown(remain);
        else showExpiryMask();

    } catch (e) { console.error(e); }
};

function startPolling(ono) {
    setInterval(async () => {
        try {
            const res = await fetch(`${window.API_BASE}api/check_order.php?order_no=${ono}&token=${currentToken}`);
            const json = await res.json();
            if (json.status === 'paid') showSuccessMask();
        } catch (e) {}
    }, 4000);
}

function startCountdown(sec) {
    const timerEl = document.getElementById('render-timer');
    const tick = () => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        timerEl.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        if (sec <= 0) { showExpiryMask(); return; }
        sec--;
        timerEl._timerTimeout = setTimeout(tick, 1000);
    };
    tick();
}

function showSuccessMask() {
    document.getElementById('mask-success').style.display = 'flex';
    setTimeout(() => window.location.reload(), 3000);
}

function showExpiryMask() {
    document.getElementById('mask-expiry').style.display = 'flex';
}

window.copyText = function (id, btn) {
    const text = document.getElementById(id).textContent;
    navigator.clipboard.writeText(text).then(() => {
        const old = btn.innerText;
        btn.innerText = I18N[currentLang].copied;
        btn.style.backgroundColor = "#198754"; btn.style.color = "#fff";
        setTimeout(() => { btn.innerText = old; btn.style.backgroundColor = ""; btn.style.color = ""; }, 1000);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    updateInterface();
    window.initPage();
});
