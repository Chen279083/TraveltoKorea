// 行程資料 (根據來源 [1, 2, 5] 整理)
const itineraryData = {
    1: [
        { time: "06:15-09:00", place: "飛機上補眠中" },
        { time: "09:30-11:00", place: "放行李<br>", transport: "輕軌：(空港-沙上)<br>地鐵：沙上-金蓮山3號出口<br>", map: "https://naver.me/5Vx8RWf6" },
        { time: "11:30-13:00", place: "午餐<br>한다솥鮑魚粥", transport: "地鐵：奧希利亞站<br>", map: "https://naver.me/5ZJxcmXX" },
        { time: "13:30-15:30", place: "Skyline Luge", transport: "步行<br>", map: "https://naver.me/IDFUcLWo" },
        { time: "15:30-17:00", place: "咖啡廳<br>Music Complex", transport: "步行<br>", map: "https://naver.me/GrmawSBe" },
        { time: "17:00-18:30", place: "LOTTE MALL", transport: "步行<br>", map: "https://naver.me/GwpMkOIT" },
        { time: "19:00-20:30", place: "晚餐<br>豬肉血腸湯飯", transport: "地鐵：廣安站<br>", map: "https://naver.me/G4Wo3D8L" }
    ],
    2: [
        { time: "09:30-12:00", place: "前往大邱", transport: "KTX 釜山-東大邱", map: "https://map.naver.com" },
        { time: "12:00-13:30", place: "午餐 大邱大食堂", transport: "計程車", map: "https://map.naver.com" },
        { time: "14:00-16:00", place: "半月堂晃晃", transport: "地鐵", map: "https://map.naver.com" },
        { time: "18:00-19:30", place: "晚餐 烤腸韓牛", transport: "計程車", map: "https://map.naver.com" },
        { time: "21:00-22:30", place: "回釜山民宿", transport: "KTX 東大邱-釜山+地鐵", map: "https://map.naver.com" }
    ],
    3: [
        { time: "10:30-12:00", place: "新世界百貨", transport: "Centum City站", map: "https://map.naver.com" },
        { time: "12:30-14:00", place: "午餐 麵線&餃子", transport: "廣安站", map: "https://map.naver.com" },
        { time: "17:30-18:30", place: "搬家 (金蓮山-田浦)", transport: "地鐵", map: "https://map.naver.com" },
        { time: "19:00-21:00", place: "晚餐 大排檔", transport: "田浦站", map: "https://map.naver.com" }
    ],
    4: [
        { time: "11:00-12:30", place: "午餐 嫩豆腐鍋", transport: "西面站", map: "https://map.naver.com" },
        { time: "13:00-16:00", place: "醫美行程", transport: "西面站", map: "https://map.naver.com" },
        { time: "18:00-20:00", place: "晚餐 生魚片", transport: "西面站", map: "https://map.naver.com" },
        { time: "20:30-22:00", place: "荒嶺山夜景", transport: "計程車", map: "https://map.naver.com" }
    ],
    5: [
        { time: "10:30-12:30", place: "午餐 影島海女村", transport: "地鐵+公車(508/7/71)", map: "https://map.naver.com" },
        { time: "13:00-15:00", place: "白淺灘文化村", transport: "計程車", map: "https://map.naver.com" },
        { time: "17:30-19:00", place: "前往機場", transport: "地鐵(西面-沙上)+輕軌", map: "https://map.naver.com" },
        { time: "20:00-21:20", place: "PUS-TPE (中華航空)", transport: "飛機", map: "https://map.naver.com" }
    ]
};

// 頁面切換邏輯
function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    if(pageId === 'itinerary') showDay(1);
}

// 行程渲染
function showDay(day) {
    const container = document.getElementById('day-content');
    container.innerHTML = '';
    
    document.querySelectorAll('.day-tab').forEach((t, i) => {
        t.classList.toggle('active', i === day - 1);
    });

    itineraryData[day].forEach(item => {
        const div = document.createElement('div');
        div.className = 'itinerary-item';
        div.innerHTML = `
            <span class="time">${item.time}</span>
            <div class="place-card">
                <strong>${item.place}</strong>
                <div class="transport-tag">交通方式：${item.transport}</div>
                <a href="${item.map}" target="_blank" class="naver-link">在 NAVER Maps 中查看</a>
            </div>
        `;
        container.appendChild(div);
    });
}

// 記帳邏輯
let totalExpenses = 0;
function addExpense() {
    const name = document.getElementById('exp-name').value;
    const amount = parseFloat(document.getElementById('exp-amount').value);
    const currency = document.getElementById('exp-currency').value;
    
    if(!name || !amount) return;

    let twdAmount = (currency === 'KRW') ? amount * 0.024 : amount; // 簡化匯率換算
    totalExpenses += twdAmount;
    
    document.getElementById('grand-total').innerText = Math.round(totalExpenses).toLocaleString();
    
    const list = document.getElementById('expense-list');
    const item = document.createElement('div');
    item.className = 'card';
    item.style.padding = '10px 20px';
    item.innerHTML = `<p>${name}: ${currency} ${amount.toLocaleString()} (約 TWD ${Math.round(twdAmount)})</p>`;
    list.prepend(item);
    
    document.getElementById('exp-name').value = '';
    document.getElementById('exp-amount').value = '';
}

// 行李清單邏輯
function handlePackEnter(e, type) {
    if (e.key === 'Enter' && e.target.value !== '') {
        const list = document.getElementById(`list-${type}`);
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox"> <span>${e.target.value}</span>`;
        li.onclick = function() { this.style.opacity = this.querySelector('input').checked ? '0.5' : '1'; };
        list.appendChild(li);
        e.target.value = '';
    }
}

// 初始化
window.onload = () => {
    // 預設行李
    const defaultPacking = {
        personal: ["護照", "錢包", "手機", "行動電源"],
        carryon: ["外套", "頸枕"],
        checked: ["衣服", "盥洗用品", "轉接頭"]
    };
    
    Object.keys(defaultPacking).forEach(type => {
        const list = document.getElementById(`list-${type}`);
        defaultPacking[type].forEach(text => {
            const li = document.createElement('li');
            li.innerHTML = `<input type="checkbox"> <span>${text}</span>`;
            list.appendChild(li);
        });
    });
};
