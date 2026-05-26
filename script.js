// ── CURSOR
const cur = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
    cur.style.display = 'block';
    cur.style.left = e.clientX + 'px';
    cur.style.top  = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cur.style.transform = 'translate(-50%,-50%) rotate(5deg) scale(0.82)';
});

document.addEventListener('mouseup', () => {
    cur.style.transform = 'translate(-50%,-50%) rotate(-40deg) scale(1)';
});

// ── BUILD TOP BUNTING (full width with enough flags)
function buildTopBunting() {
    const row = document.getElementById('flags-row');
    const colors = ['#D4A017','#2E7D32','#C62828','#1565C0','#6A1B9A','#E65100','#00838F'];
    const count = Math.ceil(window.innerWidth / 30) + 4;
    row.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const f = document.createElement('div');
        f.className = 'flag';
        f.style.background = colors[i % colors.length];
        row.appendChild(f);
    }
}
buildTopBunting();
window.addEventListener('resize', buildTopBunting);

// ── BUILD SIDE STRINGS
function buildSideStrings() {
    const colors = ['#D4A017','#2E7D32','#C62828','#1565C0','#6A1B9A','#E65100'];
    const vh = window.innerHeight;
    const count = Math.ceil(vh / 70) + 2;
    ['left-string','right-string'].forEach(id => {
        const el = document.getElementById(id);
        if(el) {
            el.innerHTML = '';
            for (let i = 0; i < count; i++) {
                const f = document.createElement('div');
                f.className = 'side-flag';
                f.style.background = colors[i % colors.length];
                el.appendChild(f);
            }
        }
    });
}
buildSideStrings();
window.addEventListener('resize', buildSideStrings);

// ── SCATTER DECORATIONS ACROSS FULL PAGE
const decoEl = document.getElementById('decos');
const decoList = [
    { emoji: '🪔', top:'12%', left:'8%',  size:32, delay:0,   rot:'--r:-8deg' },
    { emoji: '🕌', top:'8%',  left:'16%', size:28, delay:0.4, rot:'--r:5deg' },
    { emoji: '🪔', top:'12%', right:'8%', size:32, delay:0.2, rot:'--r:8deg' },
    { emoji: '🕌', top:'8%',  right:'16%',size:28, delay:0.7, rot:'--r:-5deg' },
    { emoji: '🪔', top:'35%', left:'2%',  size:26, delay:1,   rot:'--r:-10deg' },
    { emoji: '🪔', top:'35%', right:'2%', size:26, delay:0.6, rot:'--r:10deg' },
    { emoji: '🕌', top:'60%', left:'3%',  size:28, delay:1.3, rot:'--r:-6deg' },
    { emoji: '🕌', top:'60%', right:'3%', size:28, delay:0.9, rot:'--r:6deg' },
    { emoji: '🪔', top:'80%', left:'5%',  size:26, delay:0.5, rot:'--r:-8deg' },
    { emoji: '🪔', top:'80%', right:'5%', size:26, delay:1.1, rot:'--r:8deg' },
    { emoji: '🌙', top:'18%', left:'50%', size:30, delay:0.3, rot:'--r:0deg' },
];
if (decoEl) {
    decoList.forEach(d => {
        const div = document.createElement('div');
        div.className = 'deco-item';
        div.textContent = d.emoji;
        div.style.fontSize = d.size + 'px';
        div.style.top = d.top || '';
        div.style.left = d.left || '';
        div.style.right = d.right || '';
        div.style.animationDelay = d.delay + 's';
        div.style.setProperty('--r', d.rot.split(':')[1]);
        decoEl.appendChild(div);
    });
}

// ── SCATTER STARS
const starsEl = document.getElementById('stars-layer');
const starEmojis = ['✨','⭐','🌟','💫'];
const positions = [
    {t:'25%',l:'20%'},{t:'15%',l:'35%'},{t:'22%',l:'65%'},{t:'18%',l:'80%'},
    {t:'45%',l:'12%'},{t:'42%',l:'88%'},{t:'65%',l:'15%'},{t:'68%',l:'84%'},
    {t:'75%',l:'30%'},{t:'72%',l:'70%'},{t:'88%',l:'20%'},{t:'90%',l:'75%'},
    {t:'50%',l:'50%'},{t:'30%',l:'45%'},{t:'55%',l:'25%'},
];
if (starsEl) {
    positions.forEach((p, i) => {
        const s = document.createElement('div');
        s.className = 'float-star';
        s.textContent = starEmojis[i % starEmojis.length];
        s.style.cssText = `top:${p.t};left:${p.l};font-size:${16+Math.floor(Math.random()*10)}px;animation-delay:${(Math.random()*3).toFixed(2)}s;`;
        starsEl.appendChild(s);
    });
}

// ── SHEEP CLICK
let clicked = false;
const sheep = document.getElementById('sheep-wrap');
const hint  = document.getElementById('hint');
const overlay = document.getElementById('overlay');

if (sheep) {
    sheep.addEventListener('click', function() {
        if (clicked) return;
        clicked = true;
        showBubble();

        const r = sheep.getBoundingClientRect();
        const scene = document.getElementById('scene');
        const sr = scene.getBoundingClientRect();
        sheep.style.animation = 'none';
        sheep.style.left = (r.left - sr.left) + 'px';

        // flash
        sheep.style.transition = 'all 0.25s';
        sheep.style.filter = 'drop-shadow(0 0 18px #FF4500) drop-shadow(0 0 35px #FFD700) brightness(1.3)';
        sheep.style.transform = 'scale(1.25)';

        if (hint) {
            hint.textContent = '💥 الله أكبر!! 💥';
            hint.style.color = '#C62828';
            hint.style.fontSize = '22px';
        }

        spawnConfetti(50);

        setTimeout(() => {
            sheep.style.opacity = '0';
            if (overlay) overlay.classList.add('show');
        }, 550);
    });
}

function closePopup() {
    if (overlay) overlay.classList.remove('show');
    if (sheep) {
        sheep.style.opacity = '1';
        sheep.style.filter  = 'drop-shadow(0 8px 8px rgba(0,0,0,0.2))';
        sheep.style.transform = '';
        sheep.style.left = '';
        sheep.style.animation = 'sheepWalk 10s linear infinite';
    }
    clicked = false;
    if (hint) {
        hint.textContent = '← اضغط على الخروف لتفاجأ 🔪';
        hint.style.color = '#C0522A';
        hint.style.fontSize = '18px';
    }
    document.querySelectorAll('.cft').forEach(c => c.remove());
}

function spawnConfetti(n) {
    const colors = ['#D4A017','#2E7D32','#C62828','#1565C0','#6A1B9A','#FF8C00','#E91E63'];
    for (let i = 0; i < n; i++) {
        const el = document.createElement('div');
        el.className = 'cft';
        const size = 6 + Math.random() * 9;
        el.style.cssText = `left:${5+Math.floor(Math.random()*90)}vw;top:-15px;width:${Math.floor(size)}px;height:${Math.floor(size)}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>0.5?'50%':'2px'};animation-duration:${(1.4+Math.random()*2.2).toFixed(2)}s;animation-delay:${(Math.random()*0.7).toFixed(2)}s;`;
        document.body.appendChild(el);
        el.addEventListener('animationend', () => el.remove());
    }
}

// ── FLOATING SPEECH BUBBLE on baa ──
function showBubble() {
    const scene = document.getElementById('scene');
    const sheepEl = document.getElementById('sheep-wrap');
    if (!scene || !sheepEl) return;
    
    const bubble = document.createElement('div');
    bubble.textContent = 'ماااااء 🐑';
    bubble.style.cssText = `
        position:absolute;
        left:${parseInt(sheepEl.style.left || '0') + 20}px;
        bottom:170px;
        background:white;
        border:2px solid #D4A017;
        border-radius:16px 16px 16px 4px;
        padding:6px 14px;
        font-family:Cairo,sans-serif;
        font-size:16px;
        font-weight:700;
        color:#3E1C00;
        white-space:nowrap;
        z-index:20;
        pointer-events:none;
        animation:bubblePop 1.6s ease forwards;
    `;
    scene.appendChild(bubble);
    setTimeout(() => bubble.remove(), 1600);
}