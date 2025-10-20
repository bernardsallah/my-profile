// show current year
document.getElementById('year').textContent = new Date().getFullYear();

/* IntersectionObserver: fade-in sections */
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.15 };
const appearOnScroll = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, appearOptions);
faders.forEach(f => appearOnScroll.observe(f));

/* Gallery filtering */
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.type === filter) {
        item.style.display = '';
        item.style.opacity = '1';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

/* Lightbox (modal) for gallery images with navigation */
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('img');
const lbCaption = lightbox.querySelector('.lb-caption');
const lbClose = lightbox.querySelector('.lb-close');
const lbPrev = lightbox.querySelector('.lb-prev');
const lbNext = lightbox.querySelector('.lb-next');

let galleryArray = Array.from(document.querySelectorAll('.gallery-item img'));
let currentIndex = 0;

function openLightbox(index){
  const img = galleryArray[index];
  lbImg.src = img.src;
  lbImg.alt = img.alt || '';
  lbCaption.textContent = img.dataset.caption || '';
  lightbox.classList.add('show');
  lightbox.setAttribute('aria-hidden','false');
  currentIndex = index;
  document.body.style.overflow = 'hidden';
}

function closeLightbox(){
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

galleryArray.forEach((img, i) => {
  img.addEventListener('click', () => openLightbox(i));
});

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox(); // click outside content closes
});

lbPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + galleryArray.length) % galleryArray.length;
  openLightbox(currentIndex);
});
lbNext.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % galleryArray.length;
  openLightbox(currentIndex);
});

// keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('show')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lbPrev.click();
  if (e.key === 'ArrowRight') lbNext.click();
});

/* Contact form basic UX */
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // This is a frontend placeholder. Hook up to an API or mailto if desired.
  alert('Thanks! Your message was sent (demo).');
  contactForm.reset();
});