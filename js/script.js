document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. PHOTO GALLERY CONTROLLER
     ========================================================================== */
  const photos = [
    { 
      src: 'images/photo1.jpg', 
      caption: '1. Chilling home outside' 
    },
    { 
      src: 'images/photo2.jpg', 
      caption: '2. after church.' 
    },
    { 
      src: 'images/photo3.jpg', 
      caption: '3. new haircut done at Mulungushi University.' 
    }
  ];

  // Preload images into memory so they switch instantly on click
  photos.forEach(photo => {
    const img = new Image();
    img.src = photo.src;
  });

  let currentIndex = 0;

  const galleryImg = document.getElementById('gallery-img');
  const galleryCaption = document.getElementById('gallery-caption');
  const photoCounter = document.getElementById('photo-counter');
  const prevBtn = document.getElementById('prev-photo');
  const nextBtn = document.getElementById('next-photo');

  function updateGallery() {
    if (galleryImg && galleryCaption && photoCounter) {
      galleryImg.src = photos[currentIndex].src;
      galleryCaption.textContent = photos[currentIndex].caption;
      photoCounter.textContent = `Showing photo ${currentIndex + 1} of ${photos.length}.`;
    }
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + photos.length) % photos.length;
      updateGallery();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % photos.length;
      updateGallery();
    });
  }


  /* ==========================================================================
     2. THEME SWITCHER (TOGGLES LIGHT AND DARK MODE)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');

      if (document.body.classList.contains('dark-theme')) {
        themeToggleBtn.textContent = 'Light mode';
      } else {
        themeToggleBtn.textContent = 'Dark mode';
      }
    });
  }


  /* ==========================================================================
     3. PROJECT CATEGORY FILTER
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const noProjectsMsg = document.getElementById('no-projects-msg');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const selectedCategory = button.getAttribute('data-category');
      let visibleCount = 0;

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      if (noProjectsMsg) {
        if (visibleCount === 0) {
          noProjectsMsg.classList.remove('hidden');
        } else {
          noProjectsMsg.classList.add('hidden');
        }
      }
    });
  });


  /* ==========================================================================
     4. CONTACT FORM VALIDATION
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Clear previous error messages
      document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      let isValid = true;

      if (!name) {
        document.getElementById('name-error').textContent = 'Full Name is required.';
        isValid = false;
      }

      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('email-error').textContent = 'A valid email address is required.';
        isValid = false;
      }

      if (!message) {
        document.getElementById('message-error').textContent = 'Message content is required.';
        isValid = false;
      }

      if (isValid) {
        document.getElementById('preview-name').textContent = name;
        document.getElementById('preview-email').textContent = email;
        document.getElementById('preview-message').textContent = message;

        const previewContainer = document.getElementById('form-preview');
        if (previewContainer) {
          previewContainer.classList.remove('hidden');
        }

        contactForm.reset();
      }
    });
  }

});