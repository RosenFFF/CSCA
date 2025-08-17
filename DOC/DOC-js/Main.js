
// 心知天气组件功能
document.addEventListener('DOMContentLoaded', function() {
    // 心知天气配置
    const SENIVERSE_PUBLIC_KEY = 'PRW7x0SMy3lQHctSS'; // 您的公钥
    
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
        // 查找匹配的提示语
        for (const key in weatherTips) {
            if (condition.includes(key)) {
                const tips = weatherTips[key];
                return tips[Math.floor(Math.random() * tips.length)];
            }
        }
        // 默认提示语
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
            
            // 更新天气信息
            document.getElementById('weatherTemp').textContent = `${temp}°`;
            document.getElementById('weatherCity').textContent = city;
            document.getElementById('weatherTip').textContent = getWeatherTip(condition);
            
            // 根据天气条件设置图标
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
            // 使用默认数据
            document.getElementById('weatherTemp').textContent = '25°';
            document.getElementById('weatherCity').textContent = '北京';
            document.getElementById('weatherTip').textContent = '今日天气晴朗';
            document.querySelector('.weather-icon').textContent = '☀️';
        }
    }
    
    // 获取心知天气数据
    function fetchSeniverseWeather() {
        // 构造请求参数
        const params = {
            key: SENIVERSE_PUBLIC_KEY,
            location: 'beijing',
            language: 'zh-Hans',
            unit: 'c'
        };
        
        // 构造请求URL
        const baseUrl = 'https://api.seniverse.com/v3/weather/now.json';
        const queryString = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
        const url = `${baseUrl}?${queryString}`;
        
        console.log('正在请求天气数据:', url);
        
        fetch(url)
            .then(response => {
                console.log('收到响应:', response.status, response.statusText);
                if (!response.ok) {
                    throw new Error(`HTTP错误: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('获取天气数据成功:', data);
                updateWeatherDisplay(data);
            })
            .catch(error => {
                console.error('获取心知天气数据失败:', error);
                useDefaultData();
            });
    }
    
    // 使用默认数据
    function useDefaultData() {
        console.log('使用默认天气数据');
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
        console.log('初始化天气组件');
        fetchSeniverseWeather();
        // 每30分钟更新一次天气
        setInterval(fetchSeniverseWeather, 1800000);
    } else {
        console.log('未找到天气组件');
    }
});

// 主题切换功能
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// 检查本地存储中的主题设置
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
}

themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-theme');
    
    // 保存主题设置到本地存储
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// 移动端菜单切换
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 移动端侧边栏切换
const sidebar = document.querySelector('.sidebar');

// 在小屏幕上点击文档区域时隐藏侧边栏
document.querySelector('.main-content').addEventListener('click', function() {
    if (window.innerWidth <= 960) {
        sidebar.classList.remove('active');
    }
});

// 点击汉堡菜单时切换侧边栏
document.querySelector('.nav-toggle').addEventListener('click', function() {
    sidebar.classList.toggle('active');
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // 在移动端关闭菜单
            if (window.innerWidth <= 960) {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                sidebar.classList.remove('active');
            }
        }
    });
});


// 目录折叠功能
document.addEventListener('DOMContentLoaded', function() {
    // 为所有有子菜单的项添加折叠功能
    const tocItems = document.querySelectorAll('.toc-item.has-children');
    
    tocItems.forEach(item => {
        const arrow = item.querySelector('.toc-arrow');
        const submenu = item.querySelector('.toc-submenu');
        
        // 初始化为展开状态
        item.classList.remove('collapsed');
        
        // 点击箭头切换折叠状态
        arrow.addEventListener('click', function(e) {
            e.stopPropagation();
            item.classList.toggle('collapsed');
        });
        
        // 点击标题也切换折叠状态
        const link = item.querySelector('.toc-link');
        link.addEventListener('click', function(e) {
            // 如果有子菜单，则切换折叠状态
            if (submenu) {
                e.preventDefault();
                item.classList.toggle('collapsed');
            }
        });
    });
    
    // 高亮当前活动链接
    const links = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveLink() {
        let scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos <= bottom) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveLink);
    highlightActiveLink(); // 初始化时高亮
});


// 可折叠内容功能
document.addEventListener('DOMContentLoaded', function() {
    const collapsibleSections = document.querySelectorAll('.collapsible');
    
    collapsibleSections.forEach(section => {
        const header = section.querySelector('.collapse-header');
        const arrow = header.querySelector('.collapse-arrow');
        
        // 初始化为折叠状态
        section.classList.add('collapsed');
        
        header.addEventListener('click', function() {
            section.classList.toggle('collapsed');
        });
    });
});