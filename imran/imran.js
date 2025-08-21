// ===== Theme Toggle =====
    const root = document.documentElement;
    const toggleBtn = document.getElementById('themeToggle');
    const storedTheme = localStorage.getItem('theme');
    if(storedTheme){ root.setAttribute('data-theme', storedTheme); }
    const setIcon = () => {
      const light = root.getAttribute('data-theme') === 'light';
      toggleBtn.innerHTML = light ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
    };
    setIcon();
    toggleBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', current);
      localStorage.setItem('theme', current);
      setIcon();
    });

    // ===== Scroll Reveal (morph) =====
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('show');
          // Animate skill bars when visible
          entry.target.querySelectorAll('.bar>span[data-w]').forEach(el => {
            const w = el.getAttribute('data-w'); el.style.width = w + '%';
          });
        }
      });
    }, { threshold: 0.18 });

    document.querySelectorAll('.reveal, .card, .section-title').forEach(el => observer.observe(el));

    // ===== Smooth anchor scroll =====
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', e=>{
        const id = a.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
      });
    });

    // ===== Contact Form (demo only) =====
    const form = document.getElementById('contactForm');
    const statusEl = document.getElementById('formStatus');
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      statusEl.textContent = 'Sending...';
      // TODO: Replace with your endpoint (e.g., Formspree) if needed
      await new Promise(r => setTimeout(r, 800));
      statusEl.textContent = 'Thanks! I will reply soon.';
      form.reset();
    });

    // Footer year
    document.getElementById('year').textContent = new Date().getFullYear();

    // ===== Compact Floating Nav Toggle =====
    const miniToggle = document.getElementById('miniToggle');
    const miniNav = document.getElementById('miniNav');
    miniToggle.addEventListener('click', () => {
      miniNav.classList.toggle('active');
      miniToggle.innerHTML = miniNav.classList.contains('active') 
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });
    // Auto close on link click
    miniNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        miniNav.classList.remove('active');
        miniToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });