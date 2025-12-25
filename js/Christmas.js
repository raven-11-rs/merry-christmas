// 等待DOM完全加载后执行（防止获取不到元素）
document.addEventListener('DOMContentLoaded', function () {
    // 获取圣诞树元素
    const tree = document.querySelector('.christmas-tree');

    // 圣诞卡通图标库（含图标、专属发光色）
    const christmasIcons = [
        { icon: '🔔', glow: '#ffcc00' }, // 铃铛-金色
        { icon: '⭐', glow: '#ff0000' }, // 星星-红色
        { icon: '🍬', glow: '#00ff00' }, // 糖果-绿色
        { icon: '🧦', glow: '#ff66cc' }, // 圣诞袜-粉色
        { icon: '🍪', glow: '#cc9966' }, // 姜饼人-棕色
        { icon: '🎁', glow: '#ffff00' }  // 礼物-黄色
    ];

    // 点击圣诞树生成多图标
    tree.addEventListener('click', () => {
        // 每次点击生成10个随机图标（数量可调整）
        for (let i = 0; i < 25; i++) {
            createRandomIcon();
        }
    });

    // 创建单个随机图标
    function createRandomIcon() {
        // 1. 随机选一个图标
        const randomIcon = christmasIcons[Math.floor(Math.random() * christmasIcons.length)];

        // 2. 创建图标元素
        const icon = document.createElement('div');
        icon.className = 'christmas-icon';
        icon.innerText = randomIcon.icon;
        icon.style.setProperty('--glow-color', randomIcon.glow); // 专属发光色

        // 3. 随机参数（仅保留视觉效果参数）
        const size = 25 + Math.random() * 25; // 大小25~50px
        const duration = 2 + Math.random() * 2; // 下落时长2~4s
        const startLeft = Math.random() * 90; // 初始水平位置0~90vw
        // 随机轨迹参数（模拟不规则飘落）
        const trajX1 = Math.random() * 20 - 10;
        const trajX2 = Math.random() * 30 - 15;
        const trajX3 = Math.random() * 20 - 10;
        // 随机旋转参数
        const rotate1 = Math.random() * 60 - 30;
        const rotate2 = Math.random() * -60 + 30;
        const endRotate = Math.random() * 45 - 22.5;

        // 4. 设置图标样式（无碰撞/堆叠相关参数）
        icon.style.setProperty('--size', `${size}px`);
        icon.style.setProperty('--start-left', `${startLeft}vw`);
        icon.style.setProperty('--end-rotate', `${endRotate}deg`);
        // 轨迹/旋转随机参数
        icon.style.setProperty('--traj-x-1', `${trajX1}px`);
        icon.style.setProperty('--traj-x-2', `${trajX2}px`);
        icon.style.setProperty('--traj-x-3', `${trajX3}px`);
        icon.style.setProperty('--rotate-1', `${rotate1}deg`);
        icon.style.setProperty('--rotate-2', `${rotate2}deg`);
        // 基础样式
        icon.style.fontSize = `${size}px`;
        icon.style.animationDuration = `${duration}s`;

        // 5. 添加到页面
        document.body.appendChild(icon);

        // 可选：动画结束后30秒移除（避免DOM堆积，可删除）
        setTimeout(() => {
            icon.remove();
        }, 30000);
    }
});