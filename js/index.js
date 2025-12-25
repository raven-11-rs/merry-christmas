// 等待DOM完全加载后执行
document.addEventListener('DOMContentLoaded', () => {
    const christmasTree = document.getElementById('christmasTree');

    // 礼物SVG列表
    const giftSvgs = ['bell.svg', 'candy-cane.svg', 'cookie.svg', 'rudolph.svg', 'sock.svg', 'star.svg'];

    let fallingInterval = null; // 用于控制持续下落的定时器

    // 礼物下落函数
    const dropGifts = (count = 3) => { // 默认下落3个，可以传入数量
        for (let i = 0; i < count; i++) {
            const gift = document.createElement('img');
            gift.src = `./svg/${giftSvgs[Math.floor(Math.random() * giftSvgs.length)]}`;
            gift.className = 'falling-gift';
            gift.style.left = Math.random() * 100 + 'vw'; // 随机水平位置
            gift.style.animationDelay = Math.random() * 2 + 's'; // 随机延迟
            document.body.appendChild(gift);
            // 5秒后移除礼物元素
            setTimeout(() => {
                if (gift.parentNode) {
                    gift.parentNode.removeChild(gift);
                }
            }, 5000);
        }
    };

    // 显示祝福文字的函数
    const showMessage = () => {
        // 检查是否已存在消息
        const existingMessage = document.querySelector('.christmas-message');
        if (existingMessage) {
            existingMessage.remove(); // 如果已存在，先移除旧的
        }

        const message = document.createElement('div');
        message.className = 'christmas-message';
        message.innerHTML = 'Merry Christmas！<br>赵彦蘅同学，圣诞节快乐！';
        document.body.appendChild(message);
    };

    // 绑定点击事件
    christmasTree.addEventListener('click', () => {
        // 由于页面会立即跳转，以下礼物下落效果实际上不会显示，因此注释掉
        /*
        if (!fallingInterval) {
            // 开始持续下落，每50毫秒下落1个
            fallingInterval = setInterval(() => {
                dropGifts(1);
            }, 50);
        }
        dropGifts(15); // 额外下落15个礼物
        */

        // 隐藏提示词
        const hint = document.querySelector('.play-hint');
        if (hint) {
            hint.style.display = 'none';
        }

        // 隐藏圣诞树 - 由于页面会立即跳转，此代码实际上无效果
        // christmasTree.style.display = 'none';

        // 停止礼物飘落 - 由于没有启动礼物飘落，此代码无效果
        /*
        if (fallingInterval) {
            clearInterval(fallingInterval);
            fallingInterval = null;
        }
        */

        // 跳转到loading.html页面，显示加载进度
        window.location.href = './loading.html';
    });
});
