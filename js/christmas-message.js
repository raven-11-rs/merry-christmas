// 等待DOM完全加载后执行
document.addEventListener('DOMContentLoaded', () => {
    // 获取音频元素
    const audio = document.getElementById('bg-audio');
    
    // 如果没有音频元素，则创建一个
    if (!audio) {
        const newAudio = document.createElement('audio');
        newAudio.id = 'bg-audio';
        newAudio.src = './audio/Jingle-Bells-3(chosic.com).mp3';
        newAudio.loop = true;
        newAudio.volume = 0.7;
        newAudio.preload = 'auto';
        document.body.appendChild(newAudio);
    }
    
    // 初始化雪花效果
    $('body').snowfall({
        round: true,
        minSize: 4,
        maxSize: 12,
        flakeCount: 100,
        color: "#fff",
        speed: 0.3
    });

    // 从localStorage恢复播放状态和时间
    const isPlaying = localStorage.getItem('christmas_music_playing') === 'true';
    const currentTime = parseFloat(localStorage.getItem('christmas_music_time') || '0');

    // 如果音乐在播放，恢复播放状态
    if (isPlaying) {
        // 如果audio变量为null，重新获取音频元素
        if (!audio) {
            const audioElement = document.getElementById('bg-audio');
            audioElement.currentTime = currentTime;
            audioElement.play().catch(err => console.log('恢复音乐播放失败:', err));
        } else {
            audio.currentTime = currentTime;
            audio.play().catch(err => console.log('恢复音乐播放失败:', err));
        }
    }
    
    // 页面卸载前保存当前播放位置
    window.addEventListener('beforeunload', () => {
        const audioElement = audio || document.getElementById('bg-audio');
        if (audioElement && !isNaN(audioElement.currentTime)) {
            localStorage.setItem('christmas_music_time', audioElement.currentTime.toString());
            localStorage.setItem('christmas_music_playing', !audioElement.paused ? 'true' : 'false');
        }
    });

    // 保存播放状态和时间
    setInterval(() => {
        const audioElement = audio || document.getElementById('bg-audio');
        if (audioElement && !audioElement.paused) {
            localStorage.setItem('christmas_music_playing', 'true');
            localStorage.setItem('christmas_music_time', audioElement.currentTime.toString());
        } else {
            localStorage.setItem('christmas_music_playing', 'false');
        }
    }, 1000);

    document.addEventListener('click', () => {
        const audioElement = audio || document.getElementById('bg-audio');
        if (audioElement && audioElement.paused) {
            const playPromise = audioElement.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => console.error('音频播放失败:', e));
            }
        }
    }, { once: true });

    const christmasContainer = document.getElementById('christmasContainer');
    const progressBar = document.querySelector('.progress-container');
    const progressBarElement = document.getElementById('progressBar');

    // 立即显示进度条
    setTimeout(() => {
        progressBar.style.opacity = '1';
    }, 500);

    // 进度条动画
    let progress = 0;
    const startTime = Date.now();
    const totalTime = 5000; // 5秒
    const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        progress = Math.min(100, (elapsed / totalTime) * 100);

        progressBarElement.style.width = progress + '%';

        // 当进度达到100%时清除定时器并开始淡出
        if (progress >= 100) {
            clearInterval(interval);
            christmasContainer.style.opacity = '0';
            progressBar.style.opacity = '0';

            // 完全隐藏元素
            setTimeout(() => {
                christmasContainer.style.display = 'none';
                progressBar.style.display = 'none';

                // 创建"还有惊喜哦！"提示词
                const surpriseContainer = document.createElement('div');
                surpriseContainer.style.position = 'fixed';
                surpriseContainer.style.top = '50%';
                surpriseContainer.style.left = '50%';
                surpriseContainer.style.transform = 'translate(-50%, -50%)';
                surpriseContainer.style.fontSize = '3rem';
                surpriseContainer.style.color = '#fff';
                surpriseContainer.style.fontWeight = 'bold';
                surpriseContainer.style.fontFamily = 'Georgia, serif';
                surpriseContainer.style.textShadow =
                    '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000,' +
                    '2px 2px 2px #0f7938, 4px 4px 2px #0f7938, 6px 6px 2px #0f7938, 8px 8px 2px #0f7938,' +
                    '10px 10px 2px #ffd700, 0 0 20px rgba(255, 215, 0, 1), 0 0 30px rgba(255, 215, 0, 0.8),' +
                    '0 0 40px rgba(255, 215, 0, 0.6), 0 0 50px rgba(255, 215, 0, 0.4)';
                surpriseContainer.style.letterSpacing = '0.25em';
                surpriseContainer.style.opacity = '0';
                surpriseContainer.style.transition = 'opacity 0.5s ease-in-out';
                surpriseContainer.style.zIndex = '100';
                surpriseContainer.textContent = '还有惊喜哦！';
                document.body.appendChild(surpriseContainer);

                // 淡入效果
                setTimeout(() => {
                    surpriseContainer.style.opacity = '1';
                }, 100);

                // 2秒后淡出并移除
                setTimeout(() => {
                    surpriseContainer.style.opacity = '0';
                    setTimeout(() => {
                        surpriseContainer.remove();

                        // 创建倒计时元素
                        const countdownContainer = document.createElement('div');
                        countdownContainer.style.position = 'fixed';
                        countdownContainer.style.top = 'calc(50% - 50px)';
                        countdownContainer.style.left = '50%';
                        countdownContainer.style.transform = 'translate(-50%, -50%)';
                        countdownContainer.style.fontSize = '8rem';
                        countdownContainer.style.color = '#fff';
                        countdownContainer.style.fontWeight = 'bold';
                        countdownContainer.style.fontFamily = 'Georgia, serif';
                        countdownContainer.style.textShadow =
                            '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000,' +
                            '2px 2px 2px #0f7938, 4px 4px 2px #0f7938, 6px 6px 2px #0f7938, 8px 8px 2px #0f7938,' +
                            '10px 10px 2px #ffd700, 0 0 20px rgba(255, 215, 0, 1), 0 0 30px rgba(255, 215, 0, 0.8),' +
                            '0 0 40px rgba(255, 215, 0, 0.6), 0 0 50px rgba(255, 215, 0, 0.4)';
                        countdownContainer.style.letterSpacing = '0.25em';
                        countdownContainer.style.opacity = '0';
                        countdownContainer.style.transition = 'opacity 0.5s ease-in-out';
                        countdownContainer.style.zIndex = '100';
                        document.body.appendChild(countdownContainer);

                        // 倒计时逻辑
                        let count = 3;

                        // 显示第一个数字
                        showCountdown(count);

                        function showCountdown(num) {
                            if (num <= 0) {
                                // 倒计时结束后移除元素
                                setTimeout(() => {
                                    countdownContainer.remove();

                                    // 添加sc.png图片
                                    const imgContainer = document.createElement('div');
                                    imgContainer.style.position = 'fixed';
                                    imgContainer.style.top = '45%'; // 上移5%
                                    imgContainer.style.left = '50%';
                                    imgContainer.style.transform = 'translate(-50%, -50%)';
                                    imgContainer.style.zIndex = '100';
                                    imgContainer.style.opacity = '0';
                                    imgContainer.style.transition = 'opacity 1s ease-in-out';

                                    const img = document.createElement('img');
                                    img.src = './img/sc.png';
                                    img.style.maxWidth = '80vw';
                                    img.style.maxHeight = '80vh';
                                    img.style.objectFit = 'contain';

                                    imgContainer.appendChild(img);
                                    
                                    // 添加提示词
                                    const hint = document.createElement('div');
                                    hint.textContent = '别忘记去取！';
                                    hint.style.position = 'absolute';
                                    hint.style.bottom = '-60px'; // 图片下边框靠下60px
                                    hint.style.left = '50%';
                                    hint.style.transform = 'translateX(-50%)';
                                    hint.style.color = '#fff';
                                    hint.style.fontSize = '1.5rem';
                                    hint.style.fontWeight = 'bold';
                                    hint.style.textShadow = '0 0 5px #000, 0 0 10px #ffcc00, 0 0 15px #ffcc00';
                                    hint.style.whiteSpace = 'nowrap';
                                    imgContainer.appendChild(hint);
                                    
                                    document.body.appendChild(imgContainer);

                                    // 淡入效果
                                    setTimeout(() => {
                                        imgContainer.style.opacity = '1';
                                    }, 100);
                                }, 500);
                                return;
                            }

                            // 显示当前数字
                            countdownContainer.textContent = num;
                            countdownContainer.style.opacity = '1';

                            // 创建SVG爆炸效果
                            createSVGBurst(countdownContainer);

                            // 1秒后淡出
                            setTimeout(() => {
                                countdownContainer.style.opacity = '0';

                                // 淡出后显示下一个数字
                                setTimeout(() => {
                                    showCountdown(num - 1);
                                }, 500); // 淡出动画时间
                            }, 1000); // 显示时间
                        }

                        // 创建SVG爆炸效果函数
                        function createSVGBurst(element) {
                            // 可用的SVG文件列表（除了bell）
                            const svgFiles = [
                                'candy-cane',
                                'christmas',
                                'cookie',
                                'rudolph',
                                'sock',
                                'star'
                            ];

                            // 确保至少有4个不同的元素
                            const minUniqueElements = 4;
                            const totalElements = 13;
                            const selectedSVGs = [];

                            // 首先选择至少4个不同的SVG
                            for (let i = 0; i < minUniqueElements; i++) {
                                const randomIndex = Math.floor(Math.random() * svgFiles.length);
                                selectedSVGs.push(svgFiles[randomIndex]);
                            }

                            // 填充剩余的元素
                            for (let i = minUniqueElements; i < totalElements; i++) {
                                const randomIndex = Math.floor(Math.random() * svgFiles.length);
                                selectedSVGs.push(svgFiles[randomIndex]);
                            }

                            // 获取元素的位置和尺寸
                            const rect = element.getBoundingClientRect();
                            const centerX = rect.left + rect.width / 2;
                            const centerY = rect.top + rect.height / 2;

                            // 为每个SVG创建元素并设置动画
                            selectedSVGs.forEach((svgName, index) => {
                                // 创建SVG元素
                                const svgElement = document.createElement('img');
                                svgElement.src = `./svg/${svgName}.svg`;
                                svgElement.style.position = 'fixed';
                                svgElement.style.width = '50px';
                                svgElement.style.height = '50px';
                                svgElement.style.zIndex = '101';
                                svgElement.style.pointerEvents = 'none';
                                svgElement.style.transformOrigin = 'center';

                                // 设置初始位置在数字中心，考虑SVG元素自身尺寸
                                svgElement.style.left = `${centerX - 20}px`; // 40px/2 = 20px
                                svgElement.style.top = `${centerY - 20}px`; // 40px/2 = 20px

                                // 随机角度和距离
                                const angle = (Math.PI * 2 * index) / totalElements + (Math.random() - 0.5) * 0.5;
                                const distance = 200 + Math.random() * 200; // 200-400px的距离

                                // 计算目标位置，考虑SVG元素自身尺寸
                                const targetX = centerX + Math.cos(angle) * distance - 20; // 40px/2 = 20px
                                const targetY = centerY + Math.sin(angle) * distance - 20; // 40px/2 = 20px

                                // 添加到页面
                                document.body.appendChild(svgElement);

                                // 动画效果
                                setTimeout(() => {
                                    svgElement.style.transition = 'all 1s ease-out';
                                    svgElement.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1.2)`;
                                    svgElement.style.opacity = '0';

                                    // 动画结束后移除元素
                                    setTimeout(() => {
                                        svgElement.remove();
                                    }, 1000);
                                }, 50); // 短暂延迟，确保元素已添加到DOM
                            });
                        }
                    }, 1000);
                }, 2500); // 2.5秒后开始倒计时
            }, 1000);
        }
    }, 50); // 更频繁的更新使进度条更平滑
});
