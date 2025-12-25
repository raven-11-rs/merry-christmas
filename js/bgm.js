// 等待DOM完全加载后执行（防止找不到元素）
document.addEventListener('DOMContentLoaded', () => {
    // 1. 获取页面元素
    const audio = document.getElementById('bg-audio');
    const christmasTree = document.getElementById('christmasTree');
    const hintContainer = document.querySelector('.hint-container');
    const playHint = document.querySelector('.play-hint');
    const treeImg = christmasTree.querySelector('.christmas-tree-img'); // 获取图片元素

    // 2. 常量定义
    const PLAYED_FLAG = 'christmas_music_played'; // 本地存储标记
    let isPlaying = false; // 播放状态标记

    // 3. 页面加载时：尝试自动播放（老用户）
    const tryAutoPlay = () => {
        if (localStorage.getItem(PLAYED_FLAG)) {
            try {
                // 确保每次进入首页时音乐从头开始播放
                audio.currentTime = 0;
                audio.volume = 0.7;
                audio.preload = 'auto';

                // 使用Promise处理播放，确保在GitHub Pages上正常工作
                const playPromise = audio.play();

                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        isPlaying = true;
                        console.log('自动播放成功（老用户）');
                    }).catch(err => {
                        console.log('自动播放失败，等待用户交互：', err);
                        // 显示提示，引导用户点击
                        hintContainer.classList.remove('hide');
                    });
                }
            } catch (err) {
                console.log('自动播放失败，等待点击圣诞树：', err);
            }
        }
    };

    // 4. 点击圣诞树：触发播放（新用户/自动播放失败）
    const handleTreeClick = (e) => {
        e.preventDefault(); // 阻止默认行为，对移动设备很重要
        
        if (isPlaying) {
            // 如果正在播放，则暂停
            audio.pause();
            isPlaying = false;
            hintContainer.classList.remove('hide');
            playHint.textContent = '请点击圣诞树！';
            localStorage.setItem('christmas_music_playing', 'false');
            return;
        }

        try {
            // 确保每次点击时音乐从头开始播放
            audio.currentTime = 0;
            audio.volume = 0.7;
            audio.preload = 'auto';

            // 使用Promise处理播放，兼容移动设备
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isPlaying = true;
                    console.log('播放成功');
                    
                    // 更新UI和本地存储
                    hintContainer.classList.add('hide');
                    localStorage.setItem(PLAYED_FLAG, 'true');
                    // 更新全局音频管理器状态
                    localStorage.setItem('christmas_music_playing', 'true');
                    // 重置音乐播放位置
                    localStorage.setItem('christmas_music_time', '0');
                }).catch(err => {
                    console.error('播放失败：', err);
                    playHint.textContent = '播放失败，再点一次试试～';
                    hintContainer.classList.remove('hide');
                });
            }

        } catch (err) {
            playHint.textContent = '播放失败，再点一次试试～';
            hintContainer.classList.remove('hide');
            console.error('点击播放失败：', err);
        }
    };

    // 5. 音频加载错误处理
    const handleAudioError = (e) => {
        playHint.textContent = '音乐文件加载失败！';
        hintContainer.classList.remove('hide');
        alert(`音频加载失败，请检查路径：
        ./audio/Jingle-Bells-3(chosic.com).mp3`);
    };

    // 6. 移除定期保存播放位置的逻辑，减少卡顿
    // 只在页面卸载前保存播放位置

    // 7. 绑定事件
    christmasTree.addEventListener('click', handleTreeClick);
    audio.addEventListener('error', handleAudioError);

    // 8. 页面卸载前保存当前播放位置
    window.addEventListener('beforeunload', () => {
        if (audio && !isNaN(audio.currentTime)) {
            localStorage.setItem('christmas_music_time', audio.currentTime.toString());
        }
    });

    // 9. 初始化：尝试自动播放
    // 重置音乐播放位置，确保每次进入首页时音乐从头开始
    localStorage.setItem('christmas_music_time', '0');
    tryAutoPlay();
});
