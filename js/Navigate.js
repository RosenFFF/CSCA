// #file: script.js
document.addEventListener('DOMContentLoaded', function() {
    // 轮播图功能
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let slideInterval;

    // 显示指定幻灯片
    function showSlide(index) {
        // 隐藏所有幻灯片
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // 显示当前幻灯片
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }

    // 下一张幻灯片
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }

    // 上一张幻灯片
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        showSlide(prevIndex);
    }

    // 自动播放
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // 停止自动播放
    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // 为指示器添加点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopSlideShow();
            startSlideShow();
        });
    });

    // 为控制按钮添加点击事件
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideShow();
        startSlideShow();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideShow();
        startSlideShow();
    });

    // 鼠标悬停时暂停自动播放
    const carousel = document.querySelector('.hero-carousel');
    carousel.addEventListener('mouseenter', stopSlideShow);
    carousel.addEventListener('mouseleave', startSlideShow);

    // 初始化轮播图
    showSlide(0);
    startSlideShow();

    // 移动端菜单切换
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击菜单项时关闭移动端菜单
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});


// 部门轮播图功能
const deptSlides = document.querySelectorAll('.dept-carousel-slide');
const deptIndicators = document.querySelectorAll('.dept-indicator');
let currentDeptSlide = 0;
let deptSlideInterval;

// 显示指定部门幻灯片
function showDeptSlide(index) {
    deptSlides.forEach(slide => slide.classList.remove('active'));
    deptIndicators.forEach(indicator => indicator.classList.remove('active'));
    
    deptSlides[index].classList.add('active');
    deptIndicators[index].classList.add('active');
    currentDeptSlide = index;
}

// 下一张部门幻灯片
function nextDeptSlide() {
    let nextIndex = currentDeptSlide + 1;
    if (nextIndex >= deptSlides.length) {
        nextIndex = 0;
    }
    showDeptSlide(nextIndex);
}

// 自动播放部门轮播图
function startDeptSlideShow() {
    deptSlideInterval = setInterval(nextDeptSlide, 4000);
}

// 停止自动播放部门轮播图
function stopDeptSlideShow() {
    clearInterval(deptSlideInterval);
}

// 为部门指示器添加点击事件
deptIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showDeptSlide(index);
        stopDeptSlideShow();
        startDeptSlideShow();
    });
});

// 鼠标悬停时暂停自动播放
const deptCarousel = document.querySelector('.department-carousel');
if (deptCarousel) {
    deptCarousel.addEventListener('mouseenter', stopDeptSlideShow);
    deptCarousel.addEventListener('mouseleave', startDeptSlideShow);
}

// 初始化部门轮播图
showDeptSlide(0);
startDeptSlideShow();

// 部门方块点击事件
document.querySelectorAll('.department-box').forEach(box => {
    box.addEventListener('click', function() {
        const dept = this.getAttribute('data-dept');
        alert(`你点击了${getDepartmentName(dept)}，更多信息请关注我们的招新宣传！`);
    });
});

// 获取部门名称
function getDepartmentName(deptKey) {
    const deptNames = {
        'tech': '技术部',
        'contest': '竞赛部',
        'pr': '宣传部',
        'finance': '财务部',
        'activity': '活动部',
        'secretary': '秘书部'
    };
    return deptNames[deptKey] || '未知部门';
}



// 视频加载调试
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.recruitment-video video');
    if (video) {
        console.log('找到视频元素');
        
        video.addEventListener('loadstart', function() {
            console.log('开始加载视频');
        });
        
        video.addEventListener('loadeddata', function() {
            console.log('视频元数据加载成功');
        });
        
        video.addEventListener('canplay', function() {
            console.log('视频可以播放');
        });
        
        video.addEventListener('error', function(e) {
            console.log('视频加载错误:', e);
            console.log('错误代码:', video.error);
            if (video.error) {
                switch(video.error.code) {
                    case 1:
                        console.log('MEDIA_ERR_ABORTED - 用户中止获取过程');
                        break;
                    case 2:
                        console.log('MEDIA_ERR_NETWORK - 下载过程中发生网络错误');
                        break;
                    case 3:
                        console.log('MEDIA_ERR_DECODE - 尝试解码时发生错误');
                        break;
                    case 4:
                        console.log('MEDIA_ERR_SRC_NOT_SUPPORTED - 视频未被支持');
                        break;
                }
            }
        });
        
        // 检查视频源
        const sources = video.querySelectorAll('source');
        sources.forEach(function(source, index) {
            console.log('视频源 ' + index + ':', source.src);
        });
    } else {
        console.log('未找到视频元素');
    }
});


// 服务项目链接功能 
document.addEventListener('DOMContentLoaded', function() {
    const featureLinks = document.querySelectorAll('.feature-link');
    
    featureLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 检查链接是否为占位符链接
            const href = this.getAttribute('href');
            if (href === '#' || !href) {
                e.preventDefault();
                const serviceName = this.querySelector('h3').textContent;
                alert(`${serviceName} 详情页面即将上线，敬请期待！`);
            }
            // 如果有实际链接，则允许默认行为（即跳转到指定页面）
        });
    });
});


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




// 技术培训板块功能
document.addEventListener('DOMContentLoaded', function() {
    // 培训数据示例
    const trainingData = [
        {
            title: "前端开发基础培训",
            time: "2023-10-15 14:00",
            location: "计算机学院A101",
            content: "本次培训将介绍HTML、CSS和JavaScript的基础知识，帮助初学者快速入门前端开发。",
            image: "../photo/1.jpg.jpeg"
        },
        {
            title: "Python数据分析实战",
            time: "2023-10-18 19:00",
            location: "计算机学院B205",
            content: "深入学习Python在数据分析中的应用，包括pandas、numpy等库的使用。",
            image: "../photo/2.jpeg"
        },
        {
            title: "机器学习入门讲座",
            time: "2023-10-22 15:30",
            location: "计算机学院C301",
            content: "介绍机器学习的基本概念和常用算法，通过实际案例演示如何构建预测模型。",
            image: "../photo/3.jpeg"
        },
        {
            title: "移动应用开发工作坊",
            time: "2023-10-25 18:00",
            location: "计算机学院A208",
            content: "学习使用React Native开发跨平台移动应用，涵盖从设计到部署的完整流程。",
            image: "../photo/1.jpg.jpeg"
        },
        {
            title: "网络安全基础培训",
            time: "2023-10-28 14:00",
            location: "计算机学院B103",
            content: "了解网络安全的基本概念，学习常见的安全防护措施和最佳实践。",
            image: "../photo/2.jpeg"
        },
        {
            title: "云计算技术分享会",
            time: "2023-11-01 19:00",
            location: "计算机学院C202",
            content: "介绍主流云服务平台的使用方法，包括服务器部署、容器化技术等。",
            image: "../photo/3.jpeg"
        }
    ];

    // 获取DOM元素
    const trainingCarousel = document.getElementById('trainingCarousel');
    const trainingPrevBtn = document.getElementById('trainingPrevBtn');
    const trainingNextBtn = document.getElementById('trainingNextBtn');
    
    if (trainingCarousel) {
        // 创建无限循环的培训项目（复制数据以实现无限循环效果）
        const infiniteTrainingData = [...trainingData, ...trainingData, ...trainingData];
        
        // 创建培训项目
        infiniteTrainingData.forEach((training, index) => {
            const trainingItem = document.createElement('div');
            trainingItem.className = 'training-item';
            trainingItem.innerHTML = `
                <div class="training-item-image">
                    <img src="${training.image}" alt="${training.title}" onerror="this.parentElement.innerHTML='<div class=\"placeholder-icon\">💻</div>'">
                </div>
                <div class="training-item-content">
                    <h3>${training.title}</h3>
                    <div class="training-info">
                        <span><i>⏰</i> ${training.time}</span>
                        <span><i>📍</i> ${training.location}</span>
                    </div>
                    <p>${training.content}</p>
                </div>
            `;
            trainingCarousel.appendChild(trainingItem);
        });

        // 轮播功能
        let currentIndex = trainingData.length; // 从第二组数据开始，避免初始空白
        let itemWidth;
        let autoSlideInterval;
        let isTransitioning = false;

        // 更新轮播位置
        function updateCarousel() {
            // 重新计算项目宽度
            const firstItem = document.querySelector('.training-item');
            if (firstItem) {
                itemWidth = firstItem.offsetWidth + 30; // 包含margin
            }
            const translateX = -currentIndex * itemWidth;
            trainingCarousel.style.transform = `translateX(${translateX}px)`;
        }

        // 无缝循环处理
        function handleInfiniteScroll() {
            if (currentIndex >= trainingData.length * 2) {
                // 如果到达第三组数据的开始，跳转到第二组相同位置
                currentIndex = trainingData.length;
                trainingCarousel.style.transition = 'none';
                updateCarousel();
                // 强制重排以跳过过渡效果
                trainingCarousel.offsetHeight;
                trainingCarousel.style.transition = 'transform 0.5s ease';
            } else if (currentIndex < trainingData.length) {
                // 如果到达第一组数据的末尾，跳转到第二组相同位置
                currentIndex = trainingData.length * 2;
                trainingCarousel.style.transition = 'none';
                updateCarousel();
                // 强制重排以跳过过渡效果
                trainingCarousel.offsetHeight;
                trainingCarousel.style.transition = 'transform 0.5s ease';
            }
        }

        // 下一个
        function nextSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            
            currentIndex++;
            updateCarousel();
            
            setTimeout(() => {
                handleInfiniteScroll();
                isTransitioning = false;
            }, 500);
        }

        // 上一个
        function prevSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            
            currentIndex--;
            updateCarousel();
            
            setTimeout(() => {
                handleInfiniteScroll();
                isTransitioning = false;
            }, 500);
        }

        // 自动轮播
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 3000);
        }

        // 停止自动轮播
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        // 绑定按钮事件
        trainingNextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });

        trainingPrevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });

        // 鼠标悬停时暂停自动轮播
        trainingCarousel.addEventListener('mouseenter', stopAutoSlide);
        trainingCarousel.addEventListener('mouseleave', startAutoSlide);

        // 窗口大小改变时重新计算位置
        window.addEventListener('resize', () => {
            updateCarousel();
        });

        // 初始化
        setTimeout(() => {
            updateCarousel();
            startAutoSlide();
        }, 100);
    }
});


// 活动板块功能
document.addEventListener('DOMContentLoaded', function() {
    // 往期活动图片点击事件
    const pastEventItems = document.querySelectorAll('.past-event-item');
    pastEventItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            alert(`这是往期活动照片，图片路径：${imgSrc}\n在实际应用中，这里可以打开图片查看器或活动详情页`);
        });
    });
    
// 即将举办的活动点击事件
const upcomingEventItems = document.querySelectorAll('.upcoming-event-item');
upcomingEventItems.forEach(item => {
    // 获取活动详情页面URL
    const eventUrl = item.getAttribute('data-url') || '#';
    
    // 点击整个活动区域跳转（排除了解详情按钮）
    item.addEventListener('click', function(e) {
        // 如果点击的是"了解详情"按钮，则不触发整体跳转
        if (e.target.classList.contains('modern-button')) {
            return;
        }
        
        if (eventUrl !== '#') {
            window.location.href = eventUrl;
        } else {
            alert('即将举办的活动详情页面');
        }
    });
});
});