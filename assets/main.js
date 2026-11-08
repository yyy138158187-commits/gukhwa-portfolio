/* =========================================================
   Gukhwa — Motion Design Studio · main.js
   ========================================================= */
(() => {
  'use strict';

  /* ---------- CONFIG ---------- */
  // 실제 예약 접수를 받으려면 Formspree / Google Apps Script / 자체 API 주소를 넣으세요.
  // 비워두면 브라우저(localStorage)에 저장 + 이메일/캘린더 버튼만 제공합니다.
  const FORM_ENDPOINT = '';
  const STUDIO_EMAIL = 'hello@gukhwa.studio';
  const ADDRESS = 'Sweet99, 경기도 고양시 일산서구 하이파크1로91번길 8-11 1층';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGSAP = !!window.gsap;
  const lerp = (a, b, t) => a + (b - a) * t;
  const SVGNS = 'http://www.w3.org/2000/svg';

  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---------- WORKS DATA ---------- */
  const WORKS = [
    { src: 'videos/gukhwa-feature.mp4', t: 3, title: 'Gukhwa — Motion Identity', sub: 'Brand Motion Film', cats: ['brand', 'film'], tag: 'Featured · Brand Motion', year: 2026, cls: 's6', desc: '1,907 프레임으로 완성한 Gukhwa의 브랜드 모션 필름. 타임코드, 웨이브폼, 국화 꽃잎 심볼이 하나의 리듬으로 피어납니다.' },
    { v: '08', t: 10, title: 'Derin', sub: 'Brand Launch Film', cats: ['brand', 'film'], tag: 'Brand Film', year: 2026, cls: 's6 off', desc: '고요한 블루 톤 위로 떠오르는 워드마크. 브랜드 런칭을 위한 시네마틱 타이틀.' },
    { v: '10', t: 3, title: 'Bloom Loop', sub: 'Generative Identity', cats: ['brand'], tag: 'Identity Loop', year: 2026, cls: 's4 sq', desc: '방사형 리듬으로 피고 지는 루프. 국화의 구조에서 출발한 제너러티브 아이덴티티.' },
    { v: '06', t: 1, title: 'Feeling Off?', sub: 'Kinetic Typography', cats: ['kinetic', 'brand'], tag: 'Kinetic Type', year: 2025, cls: 's8 off', desc: '모션 블러와 리듬 편집으로 메시지를 몸으로 느끼게 하는 타이포그래피 필름.' },
    { v: '07', t: 8, title: 'Purun', sub: '3D Interactive Product', cats: ['cg', 'ui'], tag: '3D · Interface', year: 2025, cls: 's4', desc: '만지면 출렁이는 젤리 캐릭터. 3D 머티리얼과 UI 인터랙션을 결합한 프로덕트 모션.' },
    { v: '02', t: 9, title: 'Kinetic Court', sub: 'Sports Data Motion', cats: ['kinetic', 'cg'], tag: 'Data Motion', year: 2025, cls: 's4 off', desc: '모션 데이터를 픽셀·와이어프레임 그래픽으로 재해석한 스포츠 분석 영상.' },
    { v: '12', t: 6, title: 'Dune Hours', sub: 'CG Cinematic', cats: ['cg', 'film'], tag: 'CG Film', year: 2025, cls: 's4', desc: '앰버 톤 사막 위를 걷는 거대한 형상. 스케일과 정적을 다룬 CG 시네마틱.' },
    { v: '03', t: 4, title: 'Constellation', sub: 'Identity System Motion', cats: ['brand'], tag: 'Identity', year: 2025, cls: 's6', desc: '점과 선이 연결되며 로고로 수렴하는 미니멀 아이덴티티 시스템.' },
    { v: '04', t: 5, title: 'Quiet Interface', sub: 'Product UI Motion', cats: ['ui'], tag: 'UI Motion', year: 2024, cls: 's6 off', desc: '여백 위에서 정보가 자연스럽게 흐르는 프로덕트 인터페이스 데모.' },
    { v: '09', t: 7, title: 'Mascot System', sub: 'Character UI Motion', cats: ['cg', 'ui'], tag: 'Character', year: 2024, cls: 's4', desc: '3D 마스코트가 안내하는 앱 온보딩. 캐릭터와 UI의 호흡을 설계했습니다.' },
    { v: '01', t: 30, title: 'Signal / Noise', sub: 'Title Sequence', cats: ['film'], tag: 'Title Sequence', year: 2024, cls: 's4 off', desc: 'HUD 그래픽과 인물 클로즈업이 교차하는 시네마틱 타이틀 시퀀스.' },
    { v: '05', t: 100, title: 'Digital Human', sub: 'AI Avatar Content', cats: ['film', 'ui'], tag: 'AI Content', year: 2024, cls: 's4', desc: 'AI 아바타 기반 브랜드 커뮤니케이션 콘텐츠와 자막 모션 패키지.' },
    { v: '11', t: 25, title: 'Terminal', sub: 'Tech Launch Teaser', cats: ['ui', 'kinetic'], tag: 'Teaser', year: 2024, cls: 's6', desc: '커서 하나에서 시작해 제품의 세계관으로 확장되는 테크 런칭 티저.' },
  ];
  const CAT_TO_INTEREST = { film: 'Brand Film', brand: 'Full Motion Identity', kinetic: 'Kinetic Typography', cg: '3D / CG', ui: 'UI Motion' };
  const REEL = [
    { v: '12', t: 4 }, { v: '02', t: 6 }, { v: '06', t: 1 }, { v: '07', t: 8 }, { v: '08', t: 10 }, { v: '10', t: 2 },
  ];
  const vsrc = (v) => `videos/work-${v}.mp4`;
  const wsrc = (w) => w.src || vsrc(w.v);

  /* ---------- PETALS (chrysanthemum mark) ---------- */
  function petals(g, { cx, cy, n, rx, ry, dist, color, opacity = 1 }) {
    for (let i = 0; i < n; i++) {
      const e = document.createElementNS(SVGNS, 'ellipse');
      e.setAttribute('cx', cx); e.setAttribute('cy', cy - dist);
      e.setAttribute('rx', rx); e.setAttribute('ry', ry);
      e.setAttribute('transform', `rotate(${(360 / n) * i} ${cx} ${cy})`);
      if (color) e.setAttribute('style', `fill:${color};opacity:${opacity}`);
      g.appendChild(e);
    }
  }
  $$('.loader__bloom .petals, .success__bloom .petals').forEach((g) => {
    petals(g, { cx: 100, cy: 100, n: 20, rx: 7, ry: 34, dist: 44, color: '#F6D9A6' });
    petals(g, { cx: 100, cy: 100, n: 12, rx: 9, ry: 26, dist: 34, color: '#E39B2F' });
  });
  $$('.logo-petals').forEach((g) => petals(g, { cx: 50, cy: 50, n: 10, rx: 7, ry: 18, dist: 26 }));
  $$('.pin__flower').forEach((g) => petals(g, { cx: 0, cy: 0, n: 10, rx: 4.5, ry: 11, dist: 16, color: '#E39B2F' }));

  /* ---------- RENDER WORKS ---------- */
  const grid = $('#workGrid');
  const windex = $('#workIndex');
  WORKS.forEach((w, i) => {
    const no = String(i + 1).padStart(2, '0');
    if (i === WORKS.length - 1) {
      const more = document.createElement('a');
      more.href = '#book';
      more.className = 'card s6 card--more';
      more.dataset.cats = 'more';
      more.innerHTML = `<div class="more"><p class="mono">( More on request )</p><p class="more__t">업종별 레퍼런스와<br><em class="serif-i">비공개 작업</em>은<br>상담에서 보여드려요.</p><span class="btn btn--ink"><span>상담 예약하기</span><i class="arr">→</i></span></div>`;
      grid.appendChild(more);
    }
    const a = document.createElement('article');
    a.className = `card ${w.cls}`;
    a.dataset.cats = w.cats.join(' ');
    a.dataset.i = i;
    a.dataset.cursor = 'View';
    a.tabIndex = 0;
    a.innerHTML = `
      <div class="card__media">
        <video src="${wsrc(w)}#t=${w.t}" muted loop playsinline preload="metadata" aria-label="${w.title} preview"></video>
        <div class="card__shine"></div>
        <span class="card__tag">${w.tag}</span><span class="card__no">${no}</span>
      </div>
      <div class="card__meta">
        <div><h3 class="card__title">${w.title}</h3><p class="card__desc">${w.sub}</p></div>
        <span class="card__year mono">${w.year}</span>
      </div>`;
    grid.appendChild(a);

    const li = document.createElement('li');
    li.dataset.cats = w.cats.join(' ');
    li.dataset.i = i;
    li.dataset.preview = `${wsrc(w)}#t=${w.t}`;
    li.dataset.cursor = 'Play';
    li.innerHTML = `<span class="mono">${no}</span><span class="wi__t">${w.title}</span><span class="wi__cat">${w.sub}</span><span class="wi__y mono">${w.year}</span><span class="svc__arr">↗</span>`;
    windex.appendChild(li);
  });
  // style for the "more" tile (kept here so the card set stays self-contained)
  const moreCss = document.createElement('style');
  moreCss.textContent = `.card--more{display:flex}.more{flex:1;display:flex;flex-direction:column;justify-content:space-between;gap:24px;padding:clamp(24px,3vw,40px);border-radius:var(--radius);border:1px dashed var(--line-2);min-height:100%;transition:background .5s var(--ease)}.card--more:hover .more{background:var(--card)}.more .mono{color:var(--muted);margin:0}.more__t{margin:0;font-family:var(--sans);font-size:clamp(28px,3.2vw,48px);line-height:1.05;letter-spacing:-.05em}.more .btn{align-self:flex-start}.grid.is-filtered .card--more{display:none}`;
  document.head.appendChild(moreCss);

  /* ---------- SPLIT TEXT ---------- */
  function splitChars(el) {
    const text = el.textContent;
    el.textContent = '';
    text.split(/(\s+)/).forEach((word) => {
      if (!word) return;
      if (/^\s+$/.test(word)) { el.appendChild(document.createTextNode(' ')); return; }
      const w = document.createElement('span');
      w.className = 'chw';
      [...word].forEach((c) => {
        const s = document.createElement('span');
        s.className = 'ch';
        s.textContent = c;
        w.appendChild(s);
      });
      el.appendChild(w);
    });
  }
  $$('[data-split]').forEach(splitChars);

  // rolling nav links
  $$('.roll__t').forEach((t) => {
    const inner = document.createElement('span');
    inner.className = 'roll__in';
    inner.dataset.text = t.dataset.text || t.textContent;
    inner.textContent = t.textContent;
    t.textContent = '';
    t.appendChild(inner);
  });

  // statement words
  const statement = $('#statement');
  if (statement) {
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((p) => {
            if (!p) return;
            if (/^\s+$/.test(p)) frag.appendChild(document.createTextNode(' '));
            else { const s = document.createElement('span'); s.className = 'w'; s.textContent = p; frag.appendChild(s); }
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(statement);
  }

  // footer brand letters
  const footBrand = $('#footBrand');
  if (footBrand) {
    footBrand.innerHTML = [...footBrand.textContent].map((c) => `<span class="fl">${c}</span>`).join('');
  }

  /* ---------- SMOOTH SCROLL ---------- */
  let lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 });
    if (hasGSAP) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  const scrollToEl = (target) => {
    const el = typeof target === 'string' ? $(target) : target;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: el.id === 'top' ? 0 : -40, duration: 1.6 });
    else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  };
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (id.length < 2 && id !== '#') return;
    e.preventDefault();
    closeMenu();
    scrollToEl(id === '#' ? '#top' : id);
  });

  /* ---------- NAV ---------- */
  const nav = $('#nav');
  let lastY = 0;
  const onScroll = (y) => {
    nav.classList.toggle('is-scrolled', y > 40);
    if (!menuOpen) nav.classList.toggle('is-hidden', y > 300 && y > lastY + 2);
    if (y < lastY - 2) nav.classList.remove('is-hidden');
    lastY = y;
  };
  if (lenis) lenis.on('scroll', ({ scroll }) => onScroll(scroll));
  else addEventListener('scroll', () => onScroll(scrollY), { passive: true });

  const clock = $('#clock');
  const tick = () => {
    clock.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Seoul' }).format(new Date());
  };
  tick(); setInterval(tick, 15000);

  const burger = $('#burger'), mmenu = $('#mmenu');
  let menuOpen = false;
  function closeMenu() { menuOpen = false; mmenu.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); lenis && lenis.start(); }
  burger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mmenu.classList.toggle('is-open', menuOpen);
    burger.setAttribute('aria-expanded', String(menuOpen));
    if (lenis) menuOpen ? lenis.stop() : lenis.start();
  });

  /* ---------- HERO WEBGL (iridescent pastel field) ---------- */
  (function heroGL() {
    const canvas = $('#heroGL');
    const gl = canvas && (canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false }) || canvas.getContext('experimental-webgl'));
    if (!gl) { canvas && canvas.remove(); return; }
    const vs = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`;
    const fs = `
      precision highp float;
      uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uHover;
      vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
      vec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;}
      vec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}
      float snoise(vec2 v){
        const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
        vec2 i=floor(v+dot(v,C.yy)); vec2 x0=v-i+dot(i,C.xx);
        vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
        vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1; i=mod289(i);
        vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
        vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.); m=m*m; m=m*m;
        vec3 x=2.*fract(p*C.www)-1.; vec3 h=abs(x)-.5; vec3 ox=floor(x+.5); vec3 a0=x-ox;
        m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
        vec3 g; g.x=a0.x*x0.x+h.x*x0.y; g.yz=a0.yz*x12.xz+h.yz*x12.yw; return 130.*dot(m,g);
      }
      void main(){
        vec2 uv = gl_FragCoord.xy / uRes;
        float asp = uRes.x / uRes.y;
        vec2 p = vec2(uv.x * asp, uv.y);
        vec2 m = vec2(uMouse.x * asp, uMouse.y);
        float t = uTime * .055;
        float d = distance(p, m);
        float bloom = exp(-d * d * 5.5) * (.55 + uHover * .45);
        vec2 q = vec2(snoise(p * 1.1 + t), snoise(p * 1.1 - t + 3.1));
        vec2 r = vec2(snoise(p * 1.5 + q * 1.5 + t * 1.3 + 1.7 + (p - m) * bloom * .9), snoise(p * 1.5 + q * 1.5 - t + 9.2));
        float n = snoise(p * 1.25 + r * 1.3);
        vec3 paper = vec3(.953, .945, .925);
        vec3 gold  = vec3(1., .80, .52);
        vec3 lilac = vec3(.79, .82, 1.);
        vec3 pink  = vec3(1., .81, .89);
        vec3 mint  = vec3(.80, .95, .89);
        vec3 col = paper;
        col = mix(col, lilac, smoothstep(-.3, .9, r.x) * .62);
        col = mix(col, gold,  smoothstep(-.1, .95, n) * .58);
        col = mix(col, pink,  smoothstep(.15, 1., q.y) * .42);
        col = mix(col, mint,  smoothstep(.35, 1., r.y) * .30);
        float bands = sin((n + r.x) * 7. + uTime * .35) * .5 + .5;
        col += (vec3(1.) - col) * pow(bands, 10.) * .28;
        col += bloom * vec3(1., .82, .5) * .22;
        float vig = smoothstep(.35, 1.05, length((uv - vec2(.5, .45)) * vec2(1.1, 1.3)));
        col = mix(col, paper, vig * .55);
        col = mix(col, paper, smoothstep(.35, .0, uv.y) * .5);
        float g = fract(sin(dot(gl_FragCoord.xy + fract(uTime) * 100., vec2(12.9898, 78.233))) * 43758.5453);
        col += (g - .5) * .03;
        gl_FragColor = vec4(col, 1.);
      }`;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; } return s; };
    const v = sh(gl.VERTEX_SHADER, vs), f = sh(gl.FRAGMENT_SHADER, fs);
    if (!v || !f) { canvas.remove(); return; }
    const prog = gl.createProgram(); gl.attachShader(prog, v); gl.attachShader(prog, f); gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, 'uRes'), uTime = gl.getUniformLocation(prog, 'uTime'), uMouse = gl.getUniformLocation(prog, 'uMouse'), uHover = gl.getUniformLocation(prog, 'uHover');
    const DPR = Math.min(devicePixelRatio || 1, 1.5);
    const resize = () => { const r = canvas.getBoundingClientRect(); canvas.width = Math.max(1, r.width * DPR * .75); canvas.height = Math.max(1, r.height * DPR * .75); gl.viewport(0, 0, canvas.width, canvas.height); };
    resize(); addEventListener('resize', resize);
    const mouse = { x: .68, y: .62, tx: .68, ty: .62, h: 0, th: 0 };
    const hero = $('#hero');
    hero.addEventListener('pointermove', (e) => { const r = hero.getBoundingClientRect(); mouse.tx = (e.clientX - r.left) / r.width; mouse.ty = 1 - (e.clientY - r.top) / r.height; mouse.th = 1; });
    hero.addEventListener('pointerleave', () => { mouse.th = 0; });
    let visible = true;
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(hero);
    const start = performance.now();
    const loop = (now) => {
      requestAnimationFrame(loop);
      if (!visible) return;
      mouse.x = lerp(mouse.x, mouse.tx, .05); mouse.y = lerp(mouse.y, mouse.ty, .05); mouse.h = lerp(mouse.h, mouse.th, .04);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduce ? 10 : (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uHover, mouse.h);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    requestAnimationFrame(loop);
  })();

  /* ---------- CURSOR + SPARKLES ---------- */
  const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
  const sparkle = (function sparkles() {
    const c = $('#sparkles');
    if (!finePointer || reduce) { c.remove(); return { burst() {} }; }
    const ctx = c.getContext('2d');
    const DPR = Math.min(devicePixelRatio || 1, 2);
    const resize = () => { c.width = innerWidth * DPR; c.height = innerHeight * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0); };
    resize(); addEventListener('resize', resize);
    const COLORS = ['#E39B2F', '#F5C26B', '#F6D9A6', '#F08DB5', '#8C99FF', '#9FDCC6', '#FFFFFF'];
    const P = [];
    let lx = null, ly = null, acc = 0;
    const spawn = (x, y, vx = 0, vy = 0, big = false) => {
      if (P.length > 260) P.shift();
      P.push({
        x, y,
        vx: (Math.random() - .5) * (big ? 6 : 1.1) + vx * .06,
        vy: (Math.random() - .5) * (big ? 6 : 1.1) + vy * .06 - (big ? 1 : .25),
        life: 0, max: 40 + Math.random() * (big ? 60 : 45),
        size: (big ? 4 : 2) + Math.random() * (big ? 8 : 5.5),
        rot: Math.random() * Math.PI, vr: (Math.random() - .5) * .12,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        star: Math.random() > .28,
      });
    };
    addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      if (lx === null) { lx = e.clientX; ly = e.clientY; }
      const dx = e.clientX - lx, dy = e.clientY - ly;
      acc += Math.hypot(dx, dy);
      while (acc > 9) { acc -= 9; spawn(e.clientX + (Math.random() - .5) * 8, e.clientY + (Math.random() - .5) * 8, dx, dy); }
      lx = e.clientX; ly = e.clientY;
    }, { passive: true });
    addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse') for (let i = 0; i < 18; i++) spawn(e.clientX, e.clientY, 0, 0, true); });
    const drawStar = (s) => {
      ctx.beginPath();
      ctx.moveTo(0, -s); ctx.quadraticCurveTo(0, 0, s, 0); ctx.quadraticCurveTo(0, 0, 0, s);
      ctx.quadraticCurveTo(0, 0, -s, 0); ctx.quadraticCurveTo(0, 0, 0, -s); ctx.fill();
    };
    const loop = () => {
      requestAnimationFrame(loop);
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = P.length - 1; i >= 0; i--) {
        const p = P[i];
        p.life++; p.x += p.vx; p.y += p.vy; p.vy += .025; p.vx *= .985; p.rot += p.vr;
        const t = p.life / p.max;
        if (t >= 1) { P.splice(i, 1); continue; }
        const tw = Math.sin(t * Math.PI) * (.75 + .25 * Math.sin(p.life * .6));
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.globalAlpha = tw;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color; ctx.shadowBlur = 10;
        if (p.star) drawStar(p.size * (1 - t * .4));
        else { ctx.beginPath(); ctx.arc(0, 0, p.size * .32, 0, Math.PI * 2); ctx.fill(); }
        ctx.restore();
      }
    };
    loop();
    return { burst(x, y, n = 40) { for (let i = 0; i < n; i++) spawn(x, y, 0, 0, true); } };
  })();

  (function cursor() {
    const cur = $('.cursor');
    if (!finePointer) { cur.remove(); return; }
    document.documentElement.classList.add('has-cursor');
    const dot = $('.cursor__dot'), ring = $('.cursor__ring'), label = $('.cursor__label');
    const pos = { x: pointer.x, y: pointer.y, rx: pointer.x, ry: pointer.y };
    addEventListener('pointermove', (e) => { pointer.x = e.clientX; pointer.y = e.clientY; }, { passive: true });
    addEventListener('pointerdown', () => cur.classList.add('is-down'));
    addEventListener('pointerup', () => cur.classList.remove('is-down'));
    document.addEventListener('mouseleave', () => { cur.style.opacity = 0; });
    document.addEventListener('mouseenter', () => { cur.style.opacity = 1; });
    const HOVER = 'a, button, [data-magnetic], label.choice, label.chip, .day, .slot, summary, input, textarea, .svc__row';
    document.addEventListener('pointerover', (e) => {
      const lab = e.target.closest('[data-cursor]');
      const hov = e.target.closest(HOVER);
      const dark = !!e.target.closest('.book, .footer, .pkg--hl, .reel') && !e.target.closest('.summary');
      cur.classList.toggle('on-dark', dark);
      if (lab && (!hov || hov === lab || !lab.contains(hov))) {
        label.textContent = lab.dataset.cursor; cur.classList.add('is-label'); cur.classList.remove('is-hover');
      } else {
        cur.classList.remove('is-label');
        cur.classList.toggle('is-hover', !!hov);
      }
    });
    $$('iframe').forEach((f) => { f.addEventListener('mouseenter', () => { cur.style.opacity = 0; }); f.addEventListener('mouseleave', () => { cur.style.opacity = 1; }); });
    const loop = () => {
      pos.x = pointer.x; pos.y = pointer.y;
      pos.rx = lerp(pos.rx, pointer.x, .18); pos.ry = lerp(pos.ry, pointer.y, .18);
      dot.style.transform = `translate3d(${pos.x}px,${pos.y}px,0)`;
      ring.style.transform = `translate3d(${pos.rx}px,${pos.ry}px,0)`;
      requestAnimationFrame(loop);
    };
    loop();
  })();

  /* ---------- MAGNETIC / TILT ---------- */
  if (finePointer && hasGSAP && !reduce) {
    $$('[data-magnetic]').forEach((el) => {
      const inner = el.querySelector(':scope > span');
      const strength = el.classList.contains('footer__mail') ? .18 : .32;
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        gsap.to(el, { x: dx * strength, y: dy * strength, duration: .6, ease: 'power3.out' });
        if (inner) gsap.to(inner, { x: dx * .12, y: dy * .12, duration: .6, ease: 'power3.out' });
      });
      el.addEventListener('pointerleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, .35)' });
        if (inner) gsap.to(inner, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, .35)' });
      });
    });

    const tilt = (el, target, max = 8) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        gsap.to(target, { rotateY: (px - .5) * max, rotateX: -(py - .5) * max, duration: .7, ease: 'power3.out', transformPerspective: 1000 });
        target.style.setProperty('--mx', `${px * 100}%`); target.style.setProperty('--my', `${py * 100}%`);
      });
      el.addEventListener('pointerleave', () => gsap.to(target, { rotateY: 0, rotateX: 0, duration: 1.1, ease: 'elastic.out(1, .4)' }));
    };
    $$('.card').forEach((c) => { const m = c.querySelector('.card__media'); if (m) tilt(c, m, 9); });
    $$('[data-tilt]').forEach((c) => tilt(c, c, 6));
  }

  /* ---------- CARD VIDEO HOVER PLAY ---------- */
  const safePlay = (v) => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
  $$('.card').forEach((card) => {
    const v = card.querySelector('video');
    if (!v) return;
    card.addEventListener('pointerenter', () => safePlay(v));
    card.addEventListener('pointerleave', () => v.pause());
    card.addEventListener('click', () => openWork(+card.dataset.i));
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter') openWork(+card.dataset.i); });
  });
  if (!finePointer) {
    const io = new IntersectionObserver((ens) => ens.forEach((en) => {
      const v = en.target.querySelector('video');
      if (!v) return;
      en.isIntersecting ? safePlay(v) : v.pause();
    }), { threshold: .6 });
    $$('.card').forEach((c) => io.observe(c));
  }

  /* ---------- HOVER PREVIEW (work index + services) ---------- */
  (function hoverPreview() {
    const hp = $('#hoverPreview');
    const v = hp.querySelector('video');
    if (!finePointer || !hasGSAP) { hp.remove(); return; }
    const xTo = gsap.quickTo(hp, 'x', { duration: .6, ease: 'power3' });
    const yTo = gsap.quickTo(hp, 'y', { duration: .6, ease: 'power3' });
    let lastX = 0;
    addEventListener('pointermove', (e) => {
      xTo(e.clientX); yTo(e.clientY);
      gsap.to(hp, { rotate: Math.max(-12, Math.min(12, (e.clientX - lastX) * .6)), duration: .5 });
      lastX = e.clientX;
    }, { passive: true });
    gsap.set(hp, { xPercent: -50, yPercent: -50, x: pointer.x, y: pointer.y, scale: .6, opacity: 0 });
    const show = (src) => {
      if (v.dataset.src !== src) { v.dataset.src = src; v.src = src; }
      safePlay(v);
      gsap.to(hp, { opacity: 1, scale: 1, duration: .5, ease: 'power3.out' });
    };
    const hide = () => { gsap.to(hp, { opacity: 0, scale: .6, duration: .4, ease: 'power3.in', onComplete: () => v.pause() }); };
    $$('#workIndex li, .svc__row').forEach((row) => {
      row.addEventListener('pointerenter', () => show(row.dataset.preview));
      row.addEventListener('pointerleave', hide);
    });
  })();
  $$('#workIndex li').forEach((li) => li.addEventListener('click', () => openWork(+li.dataset.i)));
  $$('.svc__row').forEach((row) => row.addEventListener('click', () => scrollToEl('#book')));

  /* ---------- FILTERS / VIEW ---------- */
  let currentFilter = 'all';
  $$('.filter').forEach((b) => b.addEventListener('click', () => {
    $$('.filter').forEach((x) => x.classList.toggle('is-active', x === b));
    currentFilter = b.dataset.filter;
    grid.classList.toggle('is-filtered', currentFilter !== 'all');
    const shown = [];
    $$('.card, #workIndex li').forEach((el) => {
      const ok = currentFilter === 'all' || el.dataset.cats.split(' ').includes(currentFilter);
      el.style.display = ok ? '' : 'none';
      if (ok) shown.push(el);
    });
    if (hasGSAP) gsap.fromTo(shown, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .8, stagger: .05, ease: 'power3.out', clearProps: 'opacity,transform' });
    window.ScrollTrigger && ScrollTrigger.refresh();
  }));
  $$('.vt').forEach((b) => b.addEventListener('click', () => {
    $$('.vt').forEach((x) => x.classList.toggle('is-active', x === b));
    const idx = b.dataset.view === 'index';
    grid.hidden = idx; windex.hidden = !idx;
    if (hasGSAP) gsap.fromTo(idx ? $$('#workIndex li') : $$('.card'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: .04, duration: .7, ease: 'power3.out', clearProps: 'opacity,transform' });
    window.ScrollTrigger && ScrollTrigger.refresh();
  }));

  /* ---------- SHOWREEL MONTAGE ---------- */
  (function reel() {
    const stack = $('#reelStack'), idxEl = $('#reelIdx');
    const vids = REEL.map((r, i) => {
      const v = document.createElement('video');
      v.muted = true; v.playsInline = true; v.loop = true; v.preload = i === 0 ? 'auto' : 'metadata';
      v.src = `${vsrc(r.v)}#t=${r.t}`;
      stack.appendChild(v);
      return v;
    });
    let i = 0, timer = null, inView = false;
    const show = (n) => {
      vids.forEach((v, k) => {
        if (k === n) { try { v.currentTime = REEL[k].t; } catch (_) {} safePlay(v); v.classList.add('is-on'); }
        else { v.classList.remove('is-on'); setTimeout(() => { if (!v.classList.contains('is-on')) v.pause(); }, 1100); }
      });
      idxEl.textContent = `${String(n + 1).padStart(2, '0')} / ${String(REEL.length).padStart(2, '0')}`;
    };
    const startCycle = () => { if (timer) return; show(i); timer = setInterval(() => { i = (i + 1) % REEL.length; show(i); }, 3200); };
    const stopCycle = () => { clearInterval(timer); timer = null; vids.forEach((v) => v.pause()); };
    new IntersectionObserver(([en]) => { inView = en.isIntersecting; inView ? startCycle() : stopCycle(); }, { threshold: .05 }).observe($('.reel'));
    document.addEventListener('visibilitychange', () => { if (document.hidden) stopCycle(); else if (inView) startCycle(); });
  })();

  /* ---------- LIGHTBOX ---------- */
  const lb = $('#lightbox'), lbVideo = $('#lbVideo');
  let lbPlaylist = null, lbIndex = 0, lbWork = null;
  function openLB() {
    lb.hidden = false;
    lenis && lenis.stop();
    if (hasGSAP) {
      gsap.fromTo('.lightbox__bg', { opacity: 0 }, { opacity: 1, duration: .5 });
      gsap.fromTo('.lightbox__panel', { y: 60, opacity: 0, scale: .96 }, { y: 0, opacity: 1, scale: 1, duration: .8, ease: 'expo.out' });
    }
    lbVideo.muted = false;
    safePlay(lbVideo);
  }
  function openWork(i) {
    const w = WORKS[i];
    lbWork = w; lbPlaylist = null;
    lbVideo.loop = true;
    lbVideo.src = wsrc(w);
    $('#lbCat').textContent = `${String(i + 1).padStart(2, '0')} — ${w.tag} · ${w.year}`;
    $('#lbTitle').textContent = `${w.title} — ${w.sub}`;
    $('#lbDesc').textContent = w.desc;
    openLB();
  }
  function openReel() {
    lbWork = null; lbPlaylist = REEL; lbIndex = 0;
    lbVideo.loop = false;
    lbVideo.src = vsrc(REEL[0].v);
    $('#lbCat').textContent = 'Showreel — 2026';
    $('#lbTitle').textContent = 'Every frame, on purpose.';
    $('#lbDesc').textContent = '클립이 끝나면 다음 작업으로 자동 재생됩니다.';
    openLB();
  }
  lbVideo.addEventListener('ended', () => {
    if (!lbPlaylist) return;
    lbIndex = (lbIndex + 1) % lbPlaylist.length;
    lbVideo.src = vsrc(lbPlaylist[lbIndex].v);
    safePlay(lbVideo);
  });
  function closeLB() {
    if (lb.hidden) return;
    const done = () => { lb.hidden = true; lbVideo.pause(); lbVideo.removeAttribute('src'); lbVideo.load(); lenis && lenis.start(); };
    if (hasGSAP) gsap.to('.lightbox__panel', { y: 40, opacity: 0, duration: .35, ease: 'power2.in', onComplete: done });
    else done();
  }
  $$('[data-close]', lb).forEach((el) => el.addEventListener('click', closeLB));
  $$('[data-reel-open]').forEach((el) => el.addEventListener('click', openReel));
  $('#lbCta').addEventListener('click', (e) => {
    e.preventDefault();
    if (lbWork) checkInterest(CAT_TO_INTEREST[lbWork.cats[0]]);
    closeLB();
    setTimeout(() => scrollToEl('#book'), 350);
  });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeLB(); closeSuccess(); closeMenu(); } });

  /* ---------- MARQUEE (velocity-reactive) ---------- */
  (function marquee() {
    const track = $('#marquee');
    const row = track.querySelector('.marquee__row');
    for (let k = 0; k < 3; k++) track.appendChild(row.cloneNode(true));
    let x = 0, vel = 0, dir = 1;
    if (lenis) lenis.on('scroll', ({ velocity, direction }) => { vel = velocity; if (direction) dir = direction; });
    const loop = () => {
      const w = row.offsetWidth;
      x -= (0.6 + Math.min(Math.abs(vel) * .35, 14)) * dir;
      if (w) { if (x <= -w) x += w; if (x > 0) x -= w; }
      track.style.transform = `translate3d(${x}px,0,0)`;
      vel *= .92;
      requestAnimationFrame(loop);
    };
    if (!reduce) loop();
  })();

  /* ---------- HERO LETTER REPEL ---------- */
  if (finePointer && hasGSAP && !reduce) {
    const chars = $$('.hero__title .ch');
    const hero = $('#hero');
    hero.addEventListener('pointermove', (e) => {
      chars.forEach((c) => {
        const r = c.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = cx - e.clientX, dy = cy - e.clientY;
        const d = Math.hypot(dx, dy);
        const f = Math.max(0, 1 - d / 260);
        gsap.to(c, { x: (dx / (d || 1)) * f * 26, y: (dy / (d || 1)) * f * 26 - f * 10, rotate: (dx / (d || 1)) * f * 8, duration: .8, ease: 'power3.out', overwrite: 'auto' });
      });
    });
    hero.addEventListener('pointerleave', () => gsap.to(chars, { x: 0, y: 0, rotate: 0, duration: 1.2, ease: 'elastic.out(1, .35)' }));
  }

  /* ---------- FOOTER LETTERS ---------- */
  if (finePointer && hasGSAP && footBrand) {
    const fl = $$('.fl', footBrand);
    footBrand.addEventListener('pointermove', (e) => {
      fl.forEach((c) => {
        const r = c.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - e.clientX);
        const f = Math.max(0, 1 - d / (r.width * 1.6));
        gsap.to(c, { yPercent: -f * 14, color: f > .45 ? '#E39B2F' : '#F3F1EC', duration: .6, ease: 'power3.out' });
      });
    });
    footBrand.addEventListener('pointerleave', () => gsap.to(fl, { yPercent: 0, color: '#F3F1EC', duration: 1, ease: 'elastic.out(1,.4)' }));
  }

  /* ---------- COPY ADDRESS ---------- */
  $('#copyAddr').addEventListener('click', async (e) => {
    const btn = e.currentTarget, span = btn.querySelector('span');
    try { await navigator.clipboard.writeText(ADDRESS); }
    catch (_) { const t = document.createElement('textarea'); t.value = ADDRESS; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); }
    span.textContent = '복사됨 ✓';
    const r = btn.getBoundingClientRect(); sparkle.burst(r.left + r.width / 2, r.top + r.height / 2, 24);
    setTimeout(() => { span.textContent = '주소 복사'; }, 1600);
  });

  /* =========================================================
     BOOKING
     ========================================================= */
  const form = $('#booking');
  const state = { date: null, time: null };
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today); maxDate.setDate(maxDate.getDate() + 90);
  let view = new Date(today.getFullYear(), today.getMonth(), 1);
  const TIMES = ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  const fmtDate = (d) => new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' }).format(d);
  const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const hash = (s) => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };

  function renderCal() {
    $('#calMonth').textContent = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(view);
    const days = $('#calDays'); days.innerHTML = '';
    const first = view.getDay();
    const count = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    for (let k = 0; k < first; k++) { const s = document.createElement('span'); s.className = 'day empty'; days.appendChild(s); }
    for (let d = 1; d <= count; d++) {
      const date = new Date(view.getFullYear(), view.getMonth(), d);
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'day'; b.textContent = d;
      b.disabled = date < today || date > maxDate || date.getDay() === 0;
      if (+date === +today) b.classList.add('is-today');
      if (state.date && +date === +state.date) b.classList.add('is-sel');
      b.setAttribute('aria-label', fmtDate(date));
      b.addEventListener('click', () => { state.date = date; state.time = null; renderCal(); renderSlots(); updateSummary(); });
      days.appendChild(b);
    }
    $('#calPrev').disabled = view <= new Date(today.getFullYear(), today.getMonth(), 1);
    $('#calNext').disabled = new Date(view.getFullYear(), view.getMonth() + 1, 1) > maxDate;
  }
  $('#calPrev').addEventListener('click', () => { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); renderCal(); });
  $('#calNext').addEventListener('click', () => { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); renderCal(); });

  function renderSlots() {
    const box = $('#slots'); box.innerHTML = '';
    if (!state.date) { $('#slotsLabel').textContent = '날짜를 먼저 선택하세요'; box.innerHTML = '<p class="slots__empty">← 달력에서 날짜를 골라주세요</p>'; return; }
    $('#slotsLabel').textContent = `${fmtDate(state.date)} · 가능한 시간`;
    const isSat = state.date.getDay() === 6;
    const now = new Date();
    let any = false;
    TIMES.forEach((t) => {
      const [hh, mm] = t.split(':').map(Number);
      const slotDate = new Date(state.date); slotDate.setHours(hh, mm);
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'slot'; b.textContent = t;
      // 예시 데이터: 일부 시간은 이미 예약된 것으로 표시 (실제 운영 시 서버의 예약 현황으로 교체)
      const taken = hash(ymd(state.date) + t) % 4 === 0;
      b.disabled = taken || slotDate < now || (isSat && hh > 15);
      if (!b.disabled) any = true;
      if (state.time === t) b.classList.add('is-sel');
      b.addEventListener('click', () => { state.time = t; renderSlots(); updateSummary(); setTimeout(() => goStep(3), 380); });
      box.appendChild(b);
    });
    if (!any) box.innerHTML = '<p class="slots__empty">이 날은 예약이 마감되었어요. 다른 날짜를 선택해주세요.</p>';
    if (hasGSAP) gsap.from($$('.slot', box), { opacity: 0, y: 10, stagger: .03, duration: .4, ease: 'power2.out' });
  }

  /* ---- step flow: 상담 방식 → 날짜·시간 → 연락처 + 예약하기 ---- */
  let step = 1;
  const wizNext = $('#wizNext'), wizBack = $('#wizBack'), submitBtn = $('#submitBtn');
  function updateSummary() {
    const type = (new FormData(form).get('type') || '').replace(/\s*\(.*\)/, '');
    const when = state.date ? `${fmtDate(state.date)}${state.time ? ' ' + state.time : ''}` : '날짜 미선택';
    $('#wizSum').textContent = `${type} · ${when}`;
    wizNext.disabled = step === 2 && !(state.date && state.time);
  }
  function goStep(n) {
    if (n === step || n < 1 || n > 3) return;
    if (n === 3 && !(state.date && state.time)) { $('#formError').textContent = '날짜와 시간을 먼저 선택해주세요.'; return; }
    $('#formError').textContent = '';
    step = n;
    $$('.wiz__step', form).forEach((s) => s.classList.toggle('is-active', +s.dataset.step === n));
    $$('#wizSteps li').forEach((li) => {
      const s = +li.dataset.s;
      li.classList.toggle('is-active', s === n);
      li.classList.toggle('is-done', s < n);
    });
    $('#wizBar').style.width = `${(n / 3) * 100}%`;
    wizBack.hidden = n === 1;
    wizNext.hidden = n === 3;
    submitBtn.hidden = n !== 3;
    updateSummary();
    if (form.getBoundingClientRect().top < 0) scrollToEl(form);
    window.ScrollTrigger && ScrollTrigger.refresh();
  }
  wizNext.addEventListener('click', () => goStep(step + 1));
  wizBack.addEventListener('click', () => goStep(step - 1));
  $$('#wizSteps li').forEach((li) => li.addEventListener('click', () => { if (+li.dataset.s < step) goStep(+li.dataset.s); }));
  $$('.choice', form).forEach((c) => c.addEventListener('click', () => {
    setTimeout(() => { updateSummary(); goStep(2); }, 260);
  }));
  form.addEventListener('change', updateSummary);

  function checkInterest(val) {
    if (!val) return;
    const input = $$('input[name="interest"]', form).find((i) => i.value === val);
    if (input) { input.checked = true; updateSummary(); }
  }
  $$('[data-pick]').forEach((b) => b.addEventListener('click', () => { checkInterest(b.dataset.pick); scrollToEl('#book'); }));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const err = $('#formError');
    const fd = new FormData(form);
    $$('.field', form).forEach((f) => f.classList.remove('is-err'));
    const problems = [];
    if (!state.date) problems.push('날짜');
    if (!state.time) problems.push('시간');
    const name = (fd.get('name') || '').trim();
    const email = (fd.get('email') || '').trim();
    if (!name) { problems.push('이름'); form.querySelector('[name="name"]').closest('.field').classList.add('is-err'); }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { problems.push('이메일'); form.querySelector('[name="email"]').closest('.field').classList.add('is-err'); }
    if (!fd.get('agree')) problems.push('개인정보 동의');
    if (problems.length) {
      err.textContent = `다음 항목을 확인해주세요: ${problems.join(', ')}`;
      if (hasGSAP) gsap.fromTo('#submitBtn', { x: -8 }, { x: 0, duration: .6, ease: 'elastic.out(1, .3)' });
      return;
    }
    err.textContent = '';
    const booking = {
      code: 'GH-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
      type: fd.get('type'), date: ymd(state.date), time: state.time,
      interest: fd.getAll('interest'),
      name, email, phone: (fd.get('phone') || '').trim(),
      message: (fd.get('message') || '').trim(), createdAt: new Date().toISOString(),
    };
    const btnSpan = $('#submitBtn span');
    btnSpan.textContent = '전송 중…';
    if (FORM_ENDPOINT) {
      try {
        const res = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(booking) });
        if (!res.ok) throw new Error(res.status);
      } catch (_) {
        btnSpan.textContent = '예약하기';
        err.textContent = '전송에 실패했어요. 잠시 후 다시 시도하거나 이메일로 문의해주세요.';
        return;
      }
    }
    try { const list = JSON.parse(localStorage.getItem('gukhwa_bookings') || '[]'); list.push(booking); localStorage.setItem('gukhwa_bookings', JSON.stringify(list)); } catch (_) {}
    btnSpan.textContent = '예약하기';
    showSuccess(booking);
  });

  const DUR = (type) => (/90/.test(type) ? 90 : /60/.test(type) ? 60 : 30);
  let lastBooking = null;
  function showSuccess(b) {
    lastBooking = b;
    $('#okCode').textContent = b.code;
    $('#okText').innerHTML = `<b>${b.name}</b>님, <b>${fmtDate(state.date)} ${b.time}</b><br>${b.type} 요청을 받았습니다.<br>영업일 기준 24시간 안에 <b>${b.email}</b>로 확정 안내를 드릴게요.`;
    const body = `[Gukhwa 상담 예약 요청 ${b.code}]\n\n방식: ${b.type}\n날짜: ${b.date} ${b.time}\n관심 분야: ${b.interest.join(', ') || '-'}\n이름: ${b.name}\n이메일: ${b.email}\n연락처: ${b.phone || '-'}\n\n${b.message}`;
    $('#okMail').href = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(`[상담 예약] ${b.date} ${b.time} — ${b.name}`)}&body=${encodeURIComponent(body)}`;
    const s = $('#success'); s.hidden = false;
    lenis && lenis.stop();
    sparkle.burst(innerWidth / 2, innerHeight / 2, 80);
    if (hasGSAP) {
      gsap.fromTo('.success__card', { y: 50, opacity: 0, scale: .94 }, { y: 0, opacity: 1, scale: 1, duration: .9, ease: 'expo.out' });
      gsap.fromTo('.success__bloom ellipse', { scale: 0 }, { scale: 1, duration: .9, stagger: .02, ease: 'back.out(2)', svgOrigin: '100 100' });
      gsap.to('.success__bloom', { rotate: 360, duration: 20, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
    }
  }
  function closeSuccess() {
    const s = $('#success'); if (s.hidden) return; s.hidden = true; lenis && lenis.start();
    // 다음 예약을 위해 처음 단계로
    form.reset(); state.date = null; state.time = null; renderCal(); renderSlots(); goStep(1); updateSummary();
  }
  $('#okClose').addEventListener('click', closeSuccess);
  $('#okIcs').addEventListener('click', () => {
    const b = lastBooking; if (!b) return;
    const [y, mo, d] = b.date.split('-'); const [hh, mm] = b.time.split(':');
    const start = new Date(+y, +mo - 1, +d, +hh, +mm);
    const end = new Date(start.getTime() + DUR(b.type) * 60000);
    const f = (dt) => `${dt.getFullYear()}${String(dt.getMonth() + 1).padStart(2, '0')}${String(dt.getDate()).padStart(2, '0')}T${String(dt.getHours()).padStart(2, '0')}${String(dt.getMinutes()).padStart(2, '0')}00`;
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Gukhwa//Booking//KO', 'BEGIN:VEVENT',
      `UID:${b.code}@gukhwa.studio`, `DTSTAMP:${f(new Date())}`, `DTSTART;TZID=Asia/Seoul:${f(start)}`, `DTEND;TZID=Asia/Seoul:${f(end)}`,
      `SUMMARY:Gukhwa 상담 — ${b.type}`, `LOCATION:${/방문|킥오프/.test(b.type) ? ADDRESS.replace(/,/g, '\\,') : 'Online (Google Meet)'}`,
      `DESCRIPTION:예약 코드 ${b.code} · 확정 메일을 확인해주세요.`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    a.download = `gukhwa-${b.code}.ics`; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  });
  $('#success').addEventListener('click', (e) => { if (e.target.id === 'success') closeSuccess(); });

  renderCal(); renderSlots(); updateSummary();

  /* =========================================================
     INTRO + SCROLL ANIMATIONS
     ========================================================= */
  const loader = $('#loader');
  if (!hasGSAP) {
    loader.remove();
    $$('.reveal-up').forEach((el) => { el.style.opacity = 1; el.style.transform = 'none'; });
    return;
  }

  // initial hidden states (set by JS so the page is readable without it)
  gsap.set('.hero__title .ch', { yPercent: 115 });
  gsap.set('.hero__pill', { scaleX: 0 });

  function intro() {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.to('.hero__title .ch', { yPercent: 0, duration: 1.4, stagger: .035 })
      .to('.hero__pill', { scaleX: 1, duration: 1.3 }, .35)
      .to('.reveal-up', { opacity: 1, y: 0, duration: 1.1, stagger: .08 }, .45)
      .from('.nav', { yPercent: -100, duration: 1.1, clearProps: 'transform' }, .2);
    return tl;
  }

  if (reduce) { loader.remove(); gsap.set('.hero__title .ch', { yPercent: 0 }); gsap.set('.hero__pill', { scaleX: 1 }); gsap.set('.reveal-up', { opacity: 1, y: 0 }); }
  else {
    document.body.classList.add('is-loading');
    lenis && lenis.stop();
    const count = { v: 0 };
    const countEl = $('#loaderCount');
    const lt = gsap.timeline();
    lt.from('.loader__bloom ellipse', { scale: 0, opacity: 0, duration: 1, stagger: .03, ease: 'back.out(2)', svgOrigin: '100 100' }, 0)
      .to('.loader__bloom', { rotate: 120, duration: 2.2, ease: 'power2.inOut', transformOrigin: '50% 50%' }, 0)
      .to(count, { v: 100, duration: 1.9, ease: 'power2.inOut', onUpdate: () => { countEl.textContent = String(Math.round(count.v)).padStart(3, '0'); } }, 0)
      .to('.loader__bloom', { scale: 14, opacity: 0, duration: 1.1, ease: 'expo.in', transformOrigin: '50% 50%' }, 2.0)
      .to('.loader__meta', { opacity: 0, duration: .4 }, 2.0)
      .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut' }, 2.6)
      .add(() => { document.body.classList.remove('is-loading'); lenis && lenis.start(); }, 2.9)
      .add(intro(), 2.8)
      .add(() => loader.remove());
  }

  // hero parallax out
  gsap.to('.hero__inner', { yPercent: -18, opacity: .2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // section titles
  $$('.sec-head__title, .book__title').forEach((t) => {
    gsap.from($$('.ch', t), { yPercent: 115, duration: 1.2, stagger: .025, ease: 'expo.out', scrollTrigger: { trigger: t, start: 'top 88%' } });
  });

  // generic reveals
  $$('.card, .pkg, .step, .svc__row, .faq details, .routes, .visit__info > *, .bstep, .summary, .stats li, .about__kr').forEach((el) => el.classList.add('rv'));
  gsap.set('.rv', { opacity: 0, y: 60 });
  ScrollTrigger.batch('.rv', { start: 'top 92%', onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, stagger: .08, ease: 'expo.out', overwrite: true }) });

  // reel clip expand
  if (!reduce && !matchMedia('(max-width: 760px)').matches) {
    gsap.to('.reel__frame', { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: '.reel', start: 'top top', end: 'bottom bottom', scrub: true } });
    gsap.from('.reel__title', { yPercent: 60, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.reel', start: 'top top', end: 'center center', scrub: true } });
  }

  // statement word fill
  const words = $$('#statement .w');
  if (words.length) {
    gsap.to(words, { color: (i, el) => (el.closest('em') ? '#E39B2F' : '#0E0E0E'), stagger: .1, ease: 'none', scrollTrigger: { trigger: '#statement', start: 'top 82%', end: 'bottom 45%', scrub: true } });
  }

  // stats count
  $$('[data-count]').forEach((el) => {
    const o = { v: 0 };
    ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => gsap.to(o, { v: +el.dataset.count, duration: 2, ease: 'power3.out', onUpdate: () => { el.textContent = Math.round(o.v); } }) });
  });

  // process line draw
  const sl = $('.steps__line path');
  if (sl) {
    const L = sl.getTotalLength();
    gsap.set(sl, { strokeDasharray: L, strokeDashoffset: L });
    gsap.to(sl, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.steps', start: 'top 85%', end: 'bottom 70%', scrub: true } });
  }

  // route lines draw
  const routes = $('#routes');
  const rPaths = $$('.route', routes);
  rPaths.forEach((p) => { const L = p.getTotalLength(); gsap.set(p, { strokeDasharray: L, strokeDashoffset: L }); });
  gsap.set('.pin', { scale: 0, transformOrigin: '50% 50%' });
  ScrollTrigger.create({
    trigger: routes, start: 'top 75%', once: true,
    onEnter: () => {
      const tl = gsap.timeline();
      tl.to(rPaths, { strokeDashoffset: 0, duration: 2.2, stagger: .25, ease: 'power2.inOut' })
        .to('.pin', { scale: 1, duration: 1, ease: 'elastic.out(1, .45)' }, 1.6)
        .add(() => routes.classList.add('is-drawn'), 1.2);
    },
  });

  // magnetic map pin hover wobble
  routes.addEventListener('pointermove', (e) => {
    const r = routes.getBoundingClientRect();
    gsap.to('.routes__svg', { x: ((e.clientX - r.left) / r.width - .5) * 12, y: ((e.clientY - r.top) / r.height - .5) * 12, duration: 1, ease: 'power3.out' });
  });
  routes.addEventListener('pointerleave', () => gsap.to('.routes__svg', { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1,.4)' }));

  addEventListener('load', () => ScrollTrigger.refresh());
})();
