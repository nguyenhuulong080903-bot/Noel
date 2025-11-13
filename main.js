/* ===================== HEADER BACKGROUND ON SCROLL ===================== */
const header = document.querySelector('.header');
const setHeaderBg = () => {
    if (!header) return;
    header.style.background =
        window.scrollY > 10
            ? 'linear-gradient(180deg, rgba(12,31,26,.95), rgba(12,31,26,.65))'
            : 'linear-gradient(180deg, rgba(12,31,26,.92), rgba(12,31,26,.50))';
};
setHeaderBg();
window.addEventListener('scroll', setHeaderBg);

/* ===================== REVEAL ON SCROLL ===================== */
const observer = new IntersectionObserver(
    entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('revealed')),
    { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ===================== MODALS ===================== */
const openButtons = document.querySelectorAll('[data-modal]');
const modals = document.querySelectorAll('.modal');

openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-modal');
        const m = document.getElementById(id);
        if (m) {
            m.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    });
});
modals.forEach(m => {
    m.addEventListener('click', e => {
        if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
            m.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
});

/* ===================== SMOOTH SCROLL ===================== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ===================== FLOAT ACTION (scroll to next section) ===================== */
document.querySelector('.floating-action')?.addEventListener('click', () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* ============================================================
   ❄️ SNOW-DOWN LAYER (JS-driven) — rơi thẳng, từng bông một
   - DENSITY_MS: khoảng thời gian tạo bông mới (ms)
   - SPEED_RANGE_S: khoảng thời gian rơi (giây)
   - SIZE_RANGE_PX: kích thước bông
   - X padding: tránh dính sát 2 mép
   ============================================================ */
(function () {
    const container = document.querySelector('.snow-down');
    if (!container) return;

    // ==== Tinh chỉnh nhanh ====
    let DENSITY_MS = 120;        // ↓ số nhỏ = tuyết dày hơn (VD: 80, 60)
    const SPEED_RANGE_S = [10, 16];  // thời gian rơi mỗi bông (giây)
    const SIZE_RANGE_PX = [18, 36];  // kích thước bông (px)
    const SIDE_PADDING_VW = 4;       // tránh sát mép (vw)

    // Nếu muốn bật "bão tuyết" mặc định: giảm mật độ và tốc độ
    if (container.classList.contains('blizzard')) {
        DENSITY_MS = 80;
    }

    // Random helpers
    const rand = (min, max) => Math.random() * (max - min) + min;
    const randInt = (min, max) => Math.floor(rand(min, max));

    const makeFlake = () => {
        const flake = document.createElement('span');
        flake.className = 'flake';

        // random vị trí ngang (dùng % viewport), kích thước và thời lượng rơi
        const x = rand(SIDE_PADDING_VW, 100 - SIDE_PADDING_VW); // %
        const size = randInt(SIZE_RANGE_PX[0], SIZE_RANGE_PX[1]); // px
        const dur = rand(SPEED_RANGE_S[0], SPEED_RANGE_S[1]); // s

        // set biến CSS cho flake (styles.css đọc bằng var(--x/--size/--dur))
        flake.style.setProperty('--x', `${x}%`);
        flake.style.setProperty('--size', `${size}px`);
        flake.style.setProperty('--dur', `${dur}s`);

        // tạo delay nhỏ để tự nhiên hơn
        flake.style.animationDelay = `${rand(0, 0.6)}s`;

        container.appendChild(flake);

        // dọn rác DOM sau khi rơi xong
        const ttl = (dur + 0.8) * 1000; // thêm buffer ~0.8s
        setTimeout(() => flake.remove(), ttl);
    };

    // Khởi tạo vài bông đầu để trang không bị "trống"
    for (let i = 0; i < 12; i++) {
        setTimeout(makeFlake, i * 90);
    }

    // Sinh liên tục theo mật độ
    const timer = setInterval(makeFlake, DENSITY_MS);

    // Dọn interval nếu rời trang (SPA/route change)
    window.addEventListener('beforeunload', () => clearInterval(timer));
    // Random Santa height every loop
    const santa = document.querySelector('.santa');
    if (santa){
        santa.addEventListener('animationiteration', () => {
            const newY = Math.random() * 40 + 10;  // 10vh → 50vh
            santa.style.top = newY + 'vh';
        });
    }
// Randomize Santa flight height each loop
    const santaSvg = document.querySelector('.santa-sled');
    if (santaSvg) {
        const setRandTop = () => {
            // 10vh → 50vh
            const y = Math.round(Math.random() * 40) + 10;
            santaSvg.style.setProperty('--santa-top', y + 'vh');
        };
        // set ngay khi load + mỗi lần kết thúc 1 vòng bay
        setRandTop();
        santaSvg.addEventListener('animationiteration', setRandTop);
    }
    setInterval(() => {
        const cane = document.createElement("span");
        cane.style.left = Math.random()*100 + "vw";
        cane.style.animationDuration = (8 + Math.random()*6) + "s";
        document.querySelector('.cane-rain').appendChild(cane);
        setTimeout(() => cane.remove(), 15000);
    }, 700);
    setInterval(() => {
        const g = document.createElement("span");
        g.style.left = (30 + Math.random()*50) + "vw";
        g.style.animationDuration = (4 + Math.random()*3) + "s";
        document.querySelector('.gift-rain').appendChild(g);
        setTimeout(() => g.remove(), 8000);
    }, 900);

const music = document.getElementById("bg-music");
    const btn = document.getElementById("music-toggle");
    const videoPlayer = document.querySelector('.player'); // Lấy thẻ video

    // Bắt buộc phải click trang ít nhất 1 lần để trình duyệt cho phép play
    window.addEventListener("click", () => {
        music.play().catch(e => console.log('Music autoplay blocked:', e));
    }, { once: true });

    // Toggle (Người dùng tương tác trực tiếp)
    btn.addEventListener("click", () => {
        if (music.paused) {
            music.play();
            btn.textContent = "🔕";
            music.dataset.pausedByVideo = 'false'; 
        } else {
            music.pause();
            btn.textContent = "🔔";
            music.dataset.pausedByVideo = 'false'; 
        }
    });
    if (videoPlayer && music) {

        videoPlayer.addEventListener('play', () => {
            if (!music.paused) {
                music.pause();
                music.dataset.pausedByVideo = 'true';
            }
        });
        const resumeMusic = () => {
            if (music.dataset.pausedByVideo === 'true' && btn.textContent === '🔕') {
                if (music.paused) {
                    music.play().catch(error => {
                        console.log('Tự động phát lại nhạc nền thất bại:', error);
                    });
                }
                music.dataset.pausedByVideo = 'false'; 
            }
        };

        videoPlayer.addEventListener('pause', resumeMusic);
        videoPlayer.addEventListener('ended', resumeMusic);
    }

    




})();

    

