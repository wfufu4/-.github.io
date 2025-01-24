document.addEventListener('DOMContentLoaded', function() {
    // 插入侧边栏
    fetch('/components/sidebar.html')
        .then(response => response.text())
        .then(data => {
            const sidebarContainer = document.createElement('div');
            sidebarContainer.innerHTML = data;
            document.body.insertBefore(sidebarContainer.firstChild, document.body.firstChild);
            initSidebar();
            setActiveItem();
        });

    function initSidebar() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function() {
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                const target = this.dataset.target;
                window.location.href = `/${target}.html`; // 添加页面跳转功能
            });

            item.addEventListener('mouseover', function() {
                const tooltip = this.querySelector('.tooltip');
                const rect = this.getBoundingClientRect();
                tooltip.style.top = `${rect.top + rect.height/2 - 18}px`;
            });
        });
    }

    function setActiveItem() {
        const path = window.location.pathname.split('/').pop();
        document.querySelectorAll('.nav-item').forEach(item => {
            const target = item.dataset.target;
            if (path === `${target}.html` || (path === '' && target === 'index')) {
                item.classList.add('active');
            }
        });
    }
});
