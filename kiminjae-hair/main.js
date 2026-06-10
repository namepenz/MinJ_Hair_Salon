document.addEventListener('DOMContentLoaded', () => {

  /* ---- Custom Cursor ---- */
  const cursor = document.querySelector('.cursor-dot');
  if (cursor && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const render = () => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    document.querySelectorAll('a, button, input, select, textarea, .arc-item, .chic-checkbox').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  /* ---- Mobile Menu ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (hamburger && mobileMenu) {
    const toggleMenu = () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    hamburger.addEventListener('click', toggleMenu);
    document.querySelectorAll('.mob-link').forEach(link => {
      link.addEventListener('click', () => {
        if (hamburger.classList.contains('open')) toggleMenu();
      });
    });
  }

  /* ---- Fade Up Animation ---- */
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

  /* ---- Portfolio Filter ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const arcItems = document.querySelectorAll('.arc-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      arcItems.forEach(item => {
        if (filter === 'all' || item.dataset.cat === filter) {
          item.classList.remove('hidden');
          setTimeout(() => item.classList.add('in'), 50);
        } else {
          item.classList.add('hidden');
          item.classList.remove('in');
        }
      });
    });
  });

  /* ---- Reservation Form ---- */
  const resForm = document.getElementById('resForm');
  const formOk = document.getElementById('formOk');
  const submitBtn = document.getElementById('submitBtn');

  if (resForm) {
    // Set minimum date to tomorrow
    const rDate = document.getElementById('rDate');
    if (rDate) {
      const tmr = new Date();
      tmr.setDate(tmr.getDate() + 1);
      rDate.min = tmr.toISOString().split('T')[0];
    }

    resForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const privacy = document.getElementById('rPrivacy');
      if (!privacy.checked) return;

      submitBtn.textContent = 'PROCESSING...';
      submitBtn.style.opacity = '0.5';
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        resForm.style.display = 'none';
        resForm.previousElementSibling.style.display = 'none'; // hide heading
        formOk.style.display = 'block';
        formOk.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 1000);
    });

    document.getElementById('newResBtn')?.addEventListener('click', () => {
      formOk.style.display = 'none';
      resForm.style.display = 'flex';
      resForm.previousElementSibling.style.display = 'block';
      resForm.reset();
      submitBtn.textContent = 'SUBMIT REQUEST';
      submitBtn.style.opacity = '1';
      submitBtn.disabled = false;
    });
  }
});
