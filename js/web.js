// #file: script.js
document.addEventListener('DOMContentLoaded', function() {
    // 侧边栏功能
    const sidebar = document.querySelector('.sidebar');
    
    // 为侧边栏链接添加点击事件
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 移除所有链接的活动状态
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // 为当前点击的链接添加活动状态
            this.classList.add('active');
            
            // 收起侧边栏（移动端）
            if (window.innerWidth <= 992) {
                sidebar.style.width = '0';
            }
        });
    });
    
    // 点击主内容区域时收起侧边栏（移动端）
    const mainContent = document.querySelector('.main-content');
    mainContent.addEventListener('click', function() {
        if (window.innerWidth <= 992) {
            sidebar.style.width = '0';
        }
    });
    
    // 目录导航功能
    const tocLinks = document.querySelectorAll('.toc-list a');
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // 平滑滚动到目标区域
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // 更新侧边栏活动状态
                sidebarLinks.forEach(l => {
                    l.classList.remove('active');
                    if (l.getAttribute('href') === targetId) {
                        l.classList.add('active');
                    }
                });
            }
        });
    });
    
    // 滚动时更新侧边栏活动状态
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.websites-section');
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // 更新侧边栏活动状态
                sidebarLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
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

    // 平滑滚动（用于导航栏链接）
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // 如果是目录链接或侧边栏链接，已经处理过了
            if (this.closest('.toc-list') || this.closest('.sidebar-menu')) {
                return;
            }
            
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

// 为每个分类添加分页功能
document.addEventListener('DOMContentLoaded', function() {
    // 定义每页显示的网站数量
    const cardsPerPage = 8;
    
    // 获取所有分类区域
    const sections = document.querySelectorAll('.websites-section');
    
    sections.forEach(section => {
        const sectionId = section.id;
        const grid = section.querySelector('.websites-grid');
        const cards = grid.querySelectorAll('.website-card');
        const totalPages = Math.ceil(cards.length / cardsPerPage);
        
        // 如果只有一页，不需要分页
        if (totalPages <= 1) return;
        
        // 创建分页容器
        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination-container';
        
        const pagination = document.createElement('div');
        pagination.className = 'pagination';
        pagination.id = `${sectionId}-pagination`;
        
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn prev-btn';
        prevBtn.innerHTML = '‹';
        prevBtn.disabled = true;
        
        const pageNumbers = document.createElement('div');
        pageNumbers.className = 'page-numbers';
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn next-btn';
        nextBtn.innerHTML = '›';
        nextBtn.disabled = totalPages === 1;
        
        pagination.appendChild(prevBtn);
        pagination.appendChild(pageNumbers);
        pagination.appendChild(nextBtn);
        paginationContainer.appendChild(pagination);
        
        // 插入分页控件到页面
        section.appendChild(paginationContainer);
        
        // 初始化分页
        let currentPage = 1;
        
        // 显示页面
        function showPage(page) {
            // 隐藏所有卡片
            cards.forEach(card => {
                card.style.display = 'none';
            });
            
            // 计算当前页的卡片范围
            const startIndex = (page - 1) * cardsPerPage;
            const endIndex = Math.min(startIndex + cardsPerPage, cards.length);
            
            // 显示当前页的卡片
            for (let i = startIndex; i < endIndex; i++) {
                cards[i].style.display = 'block';
            }
            
            // 更新当前页
            currentPage = page;
            
            // 更新按钮状态
            prevBtn.disabled = (page === 1);
            nextBtn.disabled = (page === totalPages);
            
            // 更新页码显示
            updatePageNumbers();
        }
        
        // 更新页码显示
        function updatePageNumbers() {
            pageNumbers.innerHTML = '';
            
            for (let i = 1; i <= totalPages; i++) {
                const pageNumber = document.createElement('div');
                pageNumber.className = 'page-number';
                if (i === currentPage) {
                    pageNumber.classList.add('active');
                }
                pageNumber.textContent = i;
                pageNumber.addEventListener('click', () => {
                    showPage(i);
                });
                pageNumbers.appendChild(pageNumber);
            }
        }
        
        // 上一页
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                showPage(currentPage - 1);
            }
        });
        
        // 下一页
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                showPage(currentPage + 1);
            }
        });
        
        // 初始化显示第一页
        showPage(1);
    });
    
    // 为网站卡片添加点击事件
    const websiteCards = document.querySelectorAll('.website-card');
    websiteCards.forEach(card => {
        // 获取卡片中的链接
        const visitBtn = card.querySelector('.visit-btn');
        if (visitBtn) {
            const url = visitBtn.href;
            card.addEventListener('click', () => {
                window.open(url, '_blank');
            });
        }
    });
});