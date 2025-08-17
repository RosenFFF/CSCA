// 新闻详情页面功能
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // 心知天气组件功能
    const SENIVERSE_PUBLIC_KEY = 'PRW7x0SMy3lQHctSS';
    
    // 天气提示语库
    const weatherTips = {
        '晴': ['今日晴朗明媚，适合户外活动', '阳光正好，出门走走吧', '好天气带来好心情'],
        '多云': ['多云天气，记得带件外套', '云朵遮住了阳光，注意保暖', '适合室内学习的好天气'],
        '阴': ['天气阴沉，注意调节心情', '阴天适合静心学习', '记得开灯，保护视力'],
        '雨': ['雨天路滑，出行请注意安全', '记得带伞，别淋湿了', '雨声伴读，别有风味'],
        '小雨': ['细雨绵绵，诗意盎然', '小雨天气，别有情调', '记得带伞，小雨淅沥'],
        '中雨': ['中雨天气，注意防雨', '雨天出行请带伞', '路面湿滑，注意安全'],
        '大雨': ['大雨倾盆，避免外出', '强降雨天气，注意安全', '记得关好门窗'],
        '雷阵雨': ['雷雨天气，注意安全', '雷电交加，请避免外出', '恶劣天气，注意防护'],
        '雪': ['雪花纷飞，注意保暖', '银装素裹，分外妖娆', '雪天路滑，小心慢行'],
        '雾': ['雾气朦胧，行车注意安全', '能见度较低，注意安全', '雾锁山头，别有意境'],
        '霾': ['空气质量较差，注意防护', '雾霾天气，减少外出', '记得戴口罩']
    };
    
    // 获取天气提示语
    function getWeatherTip(condition) {
        for (const key in weatherTips) {
            if (condition.includes(key)) {
                const tips = weatherTips[key];
                return tips[Math.floor(Math.random() * tips.length)];
            }
        }
        const defaultTips = ['美好一天，从好天气开始', '今日天气不错', '祝您有美好的一天'];
        return defaultTips[Math.floor(Math.random() * defaultTips.length)];
    }
    
    // 更新天气显示
    function updateWeatherDisplay(data) {
        try {
            if (!data || !data.results || data.results.length === 0) {
                throw new Error('无效的天气数据');
            }
            
            const weather = data.results[0];
            const current = weather.now;
            const city = weather.location.name;
            const temp = current.temperature;
            const condition = current.text;
            
            document.getElementById('weatherTemp').textContent = `${temp}°`;
            document.getElementById('weatherCity').textContent = city;
            document.getElementById('weatherTip').textContent = getWeatherTip(condition);
            
            const weatherIcons = {
                '晴': '☀️',
                '多云': '⛅',
                '阴': '☁️',
                '阵雨': '🌦️',
                '雷阵雨': '⛈️',
                '小雨': '🌧️',
                '中雨': '🌧️',
                '大雨': '🌧️',
                '暴雨': '🌧️',
                '雪': '❄️',
                '雾': '🌫️',
                '霾': '🌫️'
            };
            
            document.querySelector('.weather-icon').textContent = weatherIcons[condition] || '🌈';
        } catch (error) {
            console.error('解析天气数据失败:', error);
            document.getElementById('weatherTemp').textContent = '25°';
            document.getElementById('weatherCity').textContent = '北京';
            document.getElementById('weatherTip').textContent = '今日天气晴朗';
            document.querySelector('.weather-icon').textContent = '☀️';
        }
    }
    
    // 获取心知天气数据
    function fetchSeniverseWeather() {
        const params = {
            key: SENIVERSE_PUBLIC_KEY,
            location: 'beijing',
            language: 'zh-Hans',
            unit: 'c'
        };
        
        const baseUrl = 'https://api.seniverse.com/v3/weather/now.json';
        const queryString = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
        const url = `${baseUrl}?${queryString}`;
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP错误: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                updateWeatherDisplay(data);
            })
            .catch(error => {
                console.error('获取心知天气数据失败:', error);
                useDefaultData();
            });
    }
    
    // 使用默认数据
    function useDefaultData() {
        const defaultData = {
            results: [{
                location: { name: '北京' },
                now: { temperature: '25', text: '晴' }
            }]
        };
        updateWeatherDisplay(defaultData);
    }
    
    // 初始化天气组件
    const weatherWidget = document.getElementById('weatherWidget');
    if (weatherWidget) {
        fetchSeniverseWeather();
        setInterval(fetchSeniverseWeather, 1800000);
    }

    // 报名按钮功能
    const registerBtn = document.querySelector('.btn-primary');
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            alert('报名功能正在开发中，请稍后...');
        });
    }

    // 分享按钮功能
    const shareBtn = document.querySelector('.btn-secondary');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: document.querySelector('.news-title').textContent,
                    text: '查看这个精彩的活动',
                    url: window.location.href
                }).catch(console.error);
            } else {
                // 复制链接到剪贴板
                navigator.clipboard.writeText(window.location.href)
                    .then(() => {
                        alert('链接已复制到剪贴板！');
                    })
                    .catch(err => {
                        console.error('复制失败:', err);
                        alert('复制失败，请手动复制链接');
                    });
            }
        });
    }
});