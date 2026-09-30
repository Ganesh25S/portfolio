
// Neon AI particle background
(() => {
  const canvas = document.getElementById("aiBrainCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  let particles = [];
  const mouse = {x:-9999, y:-9999};

  const resize = () => {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr,0,0,dpr,0,0);

    const count = Math.min(105, Math.max(45, Math.floor((w*h)/17000)));
    particles = Array.from({length:count}, () => ({
      x:Math.random()*w,
      y:Math.random()*h,
      vx:(Math.random()-.5)*.34,
      vy:(Math.random()-.5)*.34,
      r:Math.random()*1.7+.5,
      hue:Math.random()
    }));
  };

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", e => {
    mouse.x=e.clientX; mouse.y=e.clientY;
  }, {passive:true});
  window.addEventListener("mouseleave", () => {
    mouse.x=-9999; mouse.y=-9999;
  });

  const draw = () => {
    ctx.clearRect(0,0,w,h);

    for(const p of particles){
      const dx=mouse.x-p.x, dy=mouse.y-p.y;
      const dist=Math.hypot(dx,dy);
      if(dist<150){
        p.vx += dx/dist*.003;
        p.vy += dy/dist*.003;
      }

      p.x += p.vx;
      p.y += p.vy;

      if(p.x<-10)p.x=w+10;
      if(p.x>w+10)p.x=-10;
      if(p.y<-10)p.y=h+10;
      if(p.y>h+10)p.y=-10;
    }

    for(let i=0;i<particles.length;i++){
      const a=particles[i];
      for(let j=i+1;j<particles.length;j++){
        const b=particles[j];
        const dx=a.x-b.x, dy=a.y-b.y;
        const dist=Math.hypot(dx,dy);
        if(dist<115){
          const alpha=(1-dist/115)*.24;
          const hue=a.hue<.34 ? "255,60,172" : a.hue<.67 ? "139,92,246" : "59,130,246";
          ctx.strokeStyle=`rgba(${hue},${alpha})`;
          ctx.lineWidth=.7;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.stroke();
        }
      }
    }

    for(const p of particles){
      const rgb=p.hue<.34 ? "255,60,172" : p.hue<.67 ? "139,92,246" : "59,130,246";
      ctx.fillStyle=`rgba(${rgb},.72)`;
      ctx.shadowColor=`rgba(${rgb},.7)`;
      ctx.shadowBlur=9;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    }
    ctx.shadowBlur=0;
    requestAnimationFrame(draw);
  };

  resize();
  draw();
})();


const body = document.body;
const nav = document.querySelector(".nav-links");
const menuToggle = document.querySelector(".menu-toggle");
const themeToggle = document.querySelector(".theme-toggle");
const cursorGlow = document.querySelector(".cursor-glow");

menuToggle?.addEventListener("click", () => nav.classList.toggle("open"));

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

themeToggle?.addEventListener("click", () => {
  body.classList.toggle("light");
  const isLight = body.classList.contains("light");
  themeToggle.textContent = isLight ? "☀" : "☾";
  localStorage.setItem("ganesh-theme", isLight ? "light" : "dark");
});

if (localStorage.getItem("ganesh-theme") === "light") {
  body.classList.add("light");
  themeToggle.textContent = "☀";
}

window.addEventListener("mousemove", e => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
});

document.getElementById("year").textContent = new Date().getFullYear();


/* Interactive neural-particle background */
(() => {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, dpr, particles = [];
  const mouse = { x: -1000, y: -1000 };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(95, Math.max(45, Math.floor((w * h) / 17000)));
    particles = Array.from({length: count}, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - .5) * .25,
      vy: (Math.random() - .5) * .25,
      r: Math.random() * 1.8 + .6,
      hue: i % 3
    }));
  }

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener("mouseleave", () => {
    mouse.x = mouse.y = -1000;
  });

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 130 && dist > 0) {
        p.x -= dx / dist * .25;
        p.y -= dy / dist * .25;
      }
    }

    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];

      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      const colors = ["255,60,172", "139,92,246", "59,130,246"];
      ctx.fillStyle = `rgba(${colors[a.hue]},.65)`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = `rgba(${colors[a.hue]},.55)`;
      ctx.fill();
      ctx.shadowBlur = 0;

      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 125) {
          const alpha = (1 - dist / 125) * .12;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Cursor neural connections
    for (const p of particles) {
      const dist = Math.hypot(mouse.x - p.x, mouse.y - p.y);
      if (dist < 180) {
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(255,60,172,${(1 - dist / 180) * .25})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
    requestAnimationFrame(draw);
  }

  resize();
  draw();
})();


// Interactive robot: subtle 3D tilt and eye response.
(() => {
  const stage = document.getElementById("heroRobot");
  const robot = stage?.querySelector(".robot");
  if (!stage || !robot) return;

  let tx = 0, ty = 0, rx = 0, ry = 0;
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  const move = (clientX, clientY) => {
    const rect = stage.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    tx = clamp(x, -1, 1);
    ty = clamp(y, -1, 1);
  };

  stage.addEventListener("mousemove", e => move(e.clientX, e.clientY));
  stage.addEventListener("mouseleave", () => { tx = 0; ty = 0; });

  stage.addEventListener("touchmove", e => {
    const t = e.touches[0];
    if (t) move(t.clientX, t.clientY);
  }, { passive: true });

  const animate = () => {
    rx += (ty * -7 - rx) * 0.08;
    ry += (tx * 9 - ry) * 0.08;
    robot.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
    requestAnimationFrame(animate);
  };
  animate();
})();


// Interactive glass cards: cursor-follow glow + subtle 3D tilt.
(() => {
  const cards = document.querySelectorAll(".glass-interactive-card");
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const px = x / r.width;
      const py = y / r.height;

      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);

      const rotateY = (px - .5) * 5;
      const rotateX = (.5 - py) * 5;
      card.style.transform =
        `perspective(800px) translateY(-8px) scale(1.015) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.removeProperty("--mx");
      card.style.removeProperty("--my");
      card.style.transform = "";
    });
  });
})();
