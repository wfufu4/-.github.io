document.addEventListener('DOMContentLoaded', function() {
    // 加载CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    document.head.appendChild(link);

    // 插入侧边栏
    fetch('/components/sidebar.html')
        .then(response => response.text())
        .then(data => {
            const sidebarContainer = document.createElement('div');
            sidebarContainer.innerHTML = data;
            document.body.insertBefore(sidebarContainer.firstChild, document.body.firstChild);

            // 初始化交互
            initSidebar();
            setActiveItem();
        });

    function initSidebar() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function() {
                document.querySelectorAll('.nav-item').forEach(nav => {
                    nav.classList.remove('active');
                });
                this.classList.add('active');
            });

            item.addEventListener('mouseover', function() {
                const tooltip = this.querySelector('.tooltip');
                const rect = this.getBoundingClientRect();
                tooltip.style.top = `${rect.top + rect.height/2 - 18}px`;
            });
        });
    }

    function setActiveItem() {
        const path = window.location.pathname;
        document.querySelectorAll('.nav-item').forEach(item => {
            const target = item.dataset.target;
            if (path.includes(target)) {
                item.classList.add('active');
            }
        });
    }
});
