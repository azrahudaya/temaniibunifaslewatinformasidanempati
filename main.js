document.addEventListener('DOMContentLoaded', function () {
  const totalPages = 40;
  const imageFolder = 'assets/images/';
  const gallery = document.getElementById('book-gallery');

  // Helper: create skeleton loader
  function createSkeleton() {
    const skeleton = document.createElement('div');
    skeleton.className = 'w-full aspect-[3/4] bg-slate-200 animate-pulse rounded-lg shadow-md mb-0';
    return skeleton;
  }

  // Preloader logic
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => preloader.style.display = 'none', 500);
  }, 1200); // Show preloader for ~1.2s

  // Load images, each in its own section with AOS animation
  for (let i = 1; i <= totalPages; i++) {
    // Section wrapper for AOS
    const section = document.createElement('section');
    section.className = 'py-4';
    section.setAttribute('data-aos', 'fade-up');

    // Image wrapper for skeleton and fade-in
    const wrapper = document.createElement('div');
    wrapper.className = 'relative';
    const skeleton = createSkeleton();
    wrapper.appendChild(skeleton);

    const img = document.createElement('img');
    img.src = `${imageFolder}book_${i}.png`;
    img.alt = `Halaman Buku ${i}`;
    img.className = 'w-full h-auto rounded-lg shadow-md bg-white absolute inset-0 opacity-0 transition-opacity duration-700';
    img.loading = 'lazy';

    img.onload = () => {
      skeleton.remove();
      img.classList.add('fade-in');
      img.style.opacity = 1;
      img.style.position = 'static';
    };

    img.onerror = () => {
      console.warn(`Gagal memuat gambar: ${img.src}`);
      skeleton.remove();
    };

    wrapper.appendChild(img);
    section.appendChild(wrapper);
    gallery.appendChild(section);
  }

  // Add fade-in animation via JS (in case Tailwind doesn't have it by default)
  const style = document.createElement('style');
  style.innerHTML = `
    .fade-in {
      animation: fadeInImg 0.7s cubic-bezier(0.4,0,0.2,1);
    }
    @keyframes fadeInImg {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }
  `;
  document.head.appendChild(style);

  // Always scroll to top on reload
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  // Scroll Up Button
  const scrollUpBtn = document.createElement('button');
  scrollUpBtn.id = 'scrollUpBtn';
  scrollUpBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" /></svg>';
  scrollUpBtn.style.position = 'fixed';
  scrollUpBtn.style.bottom = '2rem';
  scrollUpBtn.style.right = '2rem';
  scrollUpBtn.style.zIndex = '100';
  scrollUpBtn.style.background = '#6366f1';
  scrollUpBtn.style.color = 'white';
  scrollUpBtn.style.border = 'none';
  scrollUpBtn.style.borderRadius = '9999px';
  scrollUpBtn.style.padding = '0.75rem';
  scrollUpBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
  scrollUpBtn.style.cursor = 'pointer';
  scrollUpBtn.style.display = 'none';
  scrollUpBtn.style.transition = 'opacity 0.3s';
  document.body.appendChild(scrollUpBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollUpBtn.style.display = 'block';
      scrollUpBtn.style.opacity = 1;
    } else {
      scrollUpBtn.style.opacity = 0;
      setTimeout(() => {
        if (window.scrollY <= 300) scrollUpBtn.style.display = 'none';
      }, 300);
    }
  });

  scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}); 