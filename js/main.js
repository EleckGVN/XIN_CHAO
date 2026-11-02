document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('video');
    const playBtn = document.querySelector('#play-btn');
    const progress = document.querySelector('#progress');
    const errorMsg = document.querySelector('#video-error');
    const loadBtn = document.querySelector('#load-more');
    const gallery = document.querySelector('#media-gallery');

    if (video && playBtn && progress) {
        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play().then(() => {
                    playBtn.textContent = 'Tạm dừng';
                }).catch(err => {
                    if (errorMsg) errorMsg.textContent = 'Trình duyệt chặn phát video: ' + err.name;
                });
            } else {
                video.pause();
                playBtn.textContent = 'Phát';
            }
        });

        video.addEventListener('timeupdate', () => {
            if (video.duration) {
                progress.value = (video.currentTime / video.duration) * 100;
            }
        });

        video.addEventListener('error', () => {
            if (errorMsg) errorMsg.textContent = 'Không thể nạp tệp video.';
        });
    }

    if (loadBtn && gallery) {
        loadBtn.addEventListener('click', () => {
            fetch('media.json')
                .then(res => res.json())
                .then(data => {
                    data.forEach(item => {
                        const card = document.createElement('div');
                        card.className = 'gallery-card';
                        card.innerHTML = `<h3>${item.title}</h3><p>Loại: ${item.type}</p>`;
                        gallery.appendChild(card);
                    });
                    loadBtn.style.display = 'none';
                })
                .catch(() => {
                    if (errorMsg) errorMsg.textContent = 'Lỗi nạp danh sách media.';
                });
        });
    }
});