// 初始化 Swiper
const swiper = new Swiper(".swiper", {
  mousewheel: true,
  direction: "vertical",
  speed: 1500,
  parallax: true,
});

// 文字拆分和动画设置
document.querySelectorAll(".header-content h1").forEach((e) => {
  // 拆分文字为单个字母
  const words = e.textContent.split("");
  e.innerHTML = "";
  words.forEach((word, i) => {
    const span = document.createElement("span");
    span.className = "letter";
    span.innerHTML = word;
    e.appendChild(span);
  });

  // 设置每个字母的层级和动画延迟
  e.querySelectorAll(".letter").forEach(function (l, i) {
    l.setAttribute(
      "style",
      `z-index: -${i}; transition-duration: ${i / 5 + 1}s`
    );
  });
});

// Slide 切换时的 active 状态管理
swiper.on("slideChange", function () {
  document.querySelectorAll(".header-content__slide").forEach(function (e, i) {
    return swiper.activeIndex === i
      ? e.classList.add("active")
      : e.classList.remove("active");
  });
  
  // 更新导航菜单 active 状态
  document.querySelectorAll(".main-menu li").forEach((li, index) => {
    if (index === swiper.activeIndex) {
      li.classList.add("active");
    } else {
      li.classList.remove("active");
    }
  });
  
  // Swiper 切换时更新进度条和滚动提示
  updateScrollProgress();
  updateScrollHintVisibility();
});

// 下滑进度条功能
function updateScrollProgress() {
  // 对于 Swiper，我们需要根据 active slide 的索引来计算进度
  if (swiper && swiper.slides) {
    const totalSlides = swiper.slides.length;
    const activeIndex = swiper.activeIndex;
    const scrollPercent = (activeIndex / (totalSlides - 1)) * 100;
    
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
      progressBar.style.width = scrollPercent + '%';
    }
  }
}

// 更新滚动提示的可见性（最后一页显示回到顶部，其他页面显示向下滚动）
function updateScrollHintVisibility() {
  const scrollHint = document.querySelector('.scroll-hint');
  const scrollText = document.querySelector('.scroll-text');
  const scrollIcon = document.querySelector('.scroll-icon');
  
  if (scrollHint && scrollText && scrollIcon) {
    // 检查是否是最后一页
    if (swiper && swiper.slides && swiper.activeIndex === swiper.slides.length - 1) {
      // 最后一页显示回到顶部
      scrollText.textContent = "回到顶部";
      // 清空原有的鼠标图标
      scrollIcon.innerHTML = '';
      // 创建向上箭头图标
      const upArrow = document.createElement('div');
      upArrow.className = 'up-arrow';
      scrollIcon.appendChild(upArrow);
    } else {
      // 其他页面显示向下滚动
      scrollText.textContent = "向下滚动";
      // 恢复原有的鼠标图标
      scrollIcon.innerHTML = '<div class="mouse"><div class="wheel"></div></div>';
    }
  }
}

// 回到顶部功能
function scrollToTop() {
  if (swiper) {
    swiper.slideTo(0, 1500);
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  // 延迟一点时间确保 Swiper 初始化完成
  setTimeout(function() {
    updateScrollProgress();
    updateScrollHintVisibility();
    
    // 为滚动提示添加点击事件（用于回到顶部）
    const scrollHint = document.querySelector('.scroll-hint');
    if (scrollHint) {
      scrollHint.addEventListener('click', function() {
        // 如果是最后一页，则回到顶部
        if (swiper && swiper.slides && swiper.activeIndex === swiper.slides.length - 1) {
          scrollToTop();
        }
      });
    }
  }, 100);
});