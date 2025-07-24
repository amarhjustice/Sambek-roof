document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');

         // Toggle body scroll when menu is open
    document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Sticky Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Hero Image Slideshow
    const heroSlides = document.querySelectorAll('.hero-slideshow');
    let currentSlide = 0;
    
    function showSlide(n) {
        heroSlides.forEach(slide => {
            slide.style.opacity = 0;
        });
        
        currentSlide = (n + heroSlides.length) % heroSlides.length;
        heroSlides[currentSlide].style.opacity = 1;
    }
    
    // Start slideshow
    showSlide(0);
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 4000);
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form Validation
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            let isValid = true;
            
            // Reset error states
            [name, email, phone].forEach(field => {
                field.classList.remove('error');
            });
            
            // Validate name
            if (!name.value.trim()) {
                name.classList.add('error');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                email.classList.add('error');
                isValid = false;
            }
            
            // Validate phone (simple check)
            if (!phone.value.trim()) {
                phone.classList.add('error');
                isValid = false;
            }
            
            if (isValid) {
                // Show success modal
                document.getElementById('successModal').classList.add('active');
                
                // Reset form
                this.reset();
            }
        });
    }
    
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName');
            const email = document.getElementById('contactEmail');
            const phone = document.getElementById('contactPhone');
            const message = document.getElementById('contactMessage');
            let isValid = true;
            
            // Reset error states
            [name, email, phone, message].forEach(field => {
                field.classList.remove('error');
            });
            
            // Validate name
            if (!name.value.trim()) {
                name.classList.add('error');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                email.classList.add('error');
                isValid = false;
            }
            
            // Validate phone (simple check)
            if (!phone.value.trim()) {
                phone.classList.add('error');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                message.classList.add('error');
                isValid = false;
            }
            
            if (isValid) {
                // Show success modal
                document.getElementById('successModal').classList.add('active');
                
                // Reset form
                this.reset();
            }
        });
    }
    
    // Close Modal
    const closeModalButtons = document.querySelectorAll('.close-modal, .close-modal-btn');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('successModal').classList.remove('active');
        });
    });
    
    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // --- YouTube-style Project Lightbox Modal Logic ---

    // 1. Data structure mapping project titles to their media (videos first, then images)
    const projectMedia = {
      'Residential Apartment': {
        videos: [],
        images: [
          'images/Residential_Apartment.jpg',
          'images/res2.jpg',
          
        ],
        description: 'Complete roofing solution for a modern residential apartment complex.'
      },
      'Cladding Project': {
        videos: ['images/cladvid.mp4'],
        images: [
          'images/Cladding.jpg',
          'images/clad2.jpg',
          'images/clad3.jpg',
        ],
        description: 'High-quality cladding installation for enhanced building durability and aesthetics.'
      },
      'Secret Roofing': {
        videos: ['images/secret.mp4'],
        images: [
          'images/Secrete_ROOFING.jpg',
          'images/sec2.jpg'
        ],
        description: 'Innovative secret roofing system for superior leak protection and style.'
      },
      'Residential Home Roofing': {
        videos: [],
        images: [
          'images/Apartment.jpg',
          'images/apart2.jpg',
          'images/apart3.jpg',
          'images/apart4.jpg',
            
        ],
        description: 'Innovative roofing system for a clients home.'
      },
      'Well Structured Roofing Purlings': {
        videos: [],
        images: [
          'images/Purling.jpg',
          'images/pur2.jpg',
          'images/pur3.jpg',
          'images/pur4.jpg',
          'images/pur5.jpg',
        ],
        description: 'Expertly engineered purlins for robust and long-lasting roof support.'
      },
      'Warehouse Roofing': {
        videos: ['images/warhousevid.mp4'],
        images: [
          'images/Warehouse.jpg',
          'images/ware2.jpg',
          'images/ware3.jpg',
        ],
        description: 'Large-scale warehouse roofing project using metal tusses with durable materials and professional finish.'
      },
      'Pergola': {
        videos: [],
        images: [
          'images/pergola.jpg',
          'images/perg2.jpg',
          'images/perg3.jpg',
        ],
        description: 'A Pergolar Roofing system.'
      },
      'Esipong Stadium Roof': {
        videos: [],
        images: [
          'images/Esipong_Stadium.jpg',
        ],
        description: 'We worked on the Esipong Stadium roofing system with a well Structured system.'
      },
      'Outside Ceiling': {
        videos: [],
        images: [
          'images/Outside_Ceiling.jpg',
        ],
        description: 'Our design includes an outside ceiling design.'
      },
    };

    // 2. Modal elements
    const projectLightbox = document.querySelector('.project-lightbox');
    const lightboxContent = projectLightbox?.querySelector('.lightbox-content');
    const closeLightboxBtn = projectLightbox?.querySelector('.close-lightbox');
    const lightboxThumbnails = projectLightbox?.querySelector('.lightbox-thumbnails');
    const lightboxMainMedia = projectLightbox?.querySelector('.lightbox-media-wrapper');
    const lightboxMediaTitle = projectLightbox?.querySelector('.lightbox-media-title');
    const lightboxMediaDesc = projectLightbox?.querySelector('.lightbox-media-description');

    let currentProject = null;
    let currentMediaIndex = 0;
    let currentMediaList = [];

    // 3. Open modal on 'View Project' click
    function openProjectLightbox(projectTitle) {
      const media = projectMedia[projectTitle];
      if (!media) return;
      currentProject = projectTitle;
      // Compose media list: videos first, then images
      currentMediaList = [
        ...media.videos.map((src) => ({ type: 'video', src })),
        ...media.images.map((src) => ({ type: 'image', src })),
      ];
      currentMediaIndex = 0;
      renderLightboxThumbnails();
      renderMainMedia();
      lightboxMediaTitle.textContent = projectTitle;
      lightboxMediaDesc.textContent = media.description || '';
      projectLightbox.style.display = 'flex';
      setTimeout(() => { projectLightbox.style.opacity = '1'; }, 10);
      document.body.style.overflow = 'hidden';
      // Focus for accessibility
      closeLightboxBtn?.focus();
    }

    // 4. Render thumbnails (videos first)
    function renderLightboxThumbnails() {
      if (!lightboxThumbnails) return;
      lightboxThumbnails.innerHTML = '';
      currentMediaList.forEach((item, idx) => {
        const thumb = document.createElement('div');
        thumb.className = 'lightbox-thumbnail' + (idx === currentMediaIndex ? ' active' : '');
        thumb.setAttribute('tabindex', '0');
        thumb.setAttribute('role', 'option');
        thumb.setAttribute('aria-label', item.type === 'video' ? 'Video thumbnail' : 'Image thumbnail');
        thumb.addEventListener('click', () => switchMainMedia(idx));
        thumb.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            switchMainMedia(idx);
          }
        });
        if (item.type === 'video') {
          const video = document.createElement('video');
          video.src = item.src;
          video.muted = true;
          video.playsInline = true;
          video.preload = 'metadata';
          video.tabIndex = -1;
          thumb.appendChild(video);
          const playIcon = document.createElement('span');
          playIcon.className = 'play-icon';
          playIcon.innerHTML = '<i class="fas fa-play-circle"></i>';
          thumb.appendChild(playIcon);
        } else {
          const img = document.createElement('img');
          img.src = item.src;
          img.alt = 'Project thumbnail';
          thumb.appendChild(img);
        }
        lightboxThumbnails.appendChild(thumb);
      });
    }

    // 5. Render main media area
    function renderMainMedia() {
      if (!lightboxMainMedia) return;
      lightboxMainMedia.innerHTML = '';
      const item = currentMediaList[currentMediaIndex];
      if (!item) return;
      // Smooth fade out/in
      lightboxMainMedia.style.opacity = '0';
      setTimeout(() => {
        lightboxMainMedia.innerHTML = '';
        if (item.type === 'video') {
          const video = document.createElement('video');
          video.src = item.src;
          video.controls = true;
          video.autoplay = true;
          video.muted = true; // Always start muted
          video.style.width = '100%';
          video.style.height = '100%';
          video.tabIndex = 0;
          lightboxMainMedia.appendChild(video);
        } else {
          const img = document.createElement('img');
          img.src = item.src;
          img.alt = 'Project image';
          img.style.width = '100%';
          img.style.height = '100%';
          lightboxMainMedia.appendChild(img);
        }
        setTimeout(() => { lightboxMainMedia.style.opacity = '1'; }, 50);
      }, 200);
      // Update active thumbnail
      Array.from(lightboxThumbnails?.children || []).forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === currentMediaIndex);
      });
    }

    // 6. Switch main media
    function switchMainMedia(idx) {
      if (idx === currentMediaIndex) return;
      currentMediaIndex = idx;
      renderMainMedia();
    }

    // 7. Close modal
    function closeProjectLightbox() {
      projectLightbox.style.opacity = '0';
      setTimeout(() => {
        projectLightbox.style.display = 'none';
        document.body.style.overflow = '';
        currentProject = null;
        currentMediaIndex = 0;
        currentMediaList = [];
        if (lightboxMainMedia) lightboxMainMedia.innerHTML = '';
        if (lightboxThumbnails) lightboxThumbnails.innerHTML = '';
      }, 300);
    }

    // 8. Event listeners
    if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeProjectLightbox);
    window.addEventListener('keydown', (e) => {
      if (projectLightbox.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) {
        closeProjectLightbox();
      }
    });
    projectLightbox?.addEventListener('click', (e) => {
      if (e.target === projectLightbox) closeProjectLightbox();
    });

    // 9. Attach to 'View Project' buttons
    document.querySelectorAll('.view-project').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        // Find project title from overlay
        let projectItem = btn.closest('.project-item');
        let title = projectItem?.querySelector('h4')?.textContent?.trim();
        if (title && projectMedia[title]) {
          openProjectLightbox(title);
        }
      });
    });
    // --- End Project Lightbox Modal Logic ---


    // Close project image overlay when clicking outside the image
    const projectImageOverlay = document.querySelector('.project-image-overlay');
    if (projectImageOverlay) {
        projectImageOverlay.addEventListener('click', function(e) {
            // Only close if clicking the backdrop, not the image
            if (e.target === projectImageOverlay || e.target.classList.contains('project-image-overlay-backdrop')) {
                projectImageOverlay.style.display = 'none';
                // Restore background scroll only if the main lightbox is not open
                if (!projectLightbox || projectLightbox.style.display === 'none') {
                    document.body.style.overflow = '';
                }
            }
        });
    }

    // Close lightbox
    function closeLightbox() {
        projectLightbox.style.display = 'none';
        if (lightboxMainMedia) {
            lightboxMainMedia.innerHTML = '';
        }
        if (lightboxThumbnails) {
            lightboxThumbnails.innerHTML = '';
        }
        document.body.style.overflow = '';
        const playBtn = document.querySelector('.custom-play-btn');
        if (playBtn) playBtn.remove();
    }
    if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
    projectLightbox?.addEventListener('click', (e) => e.target === projectLightbox && closeLightbox());


















   /*  const projectOverlays = document.querySelectorAll('.project-overlay');
    const lightbox = document.querySelector('.project-lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption h3');
    const lightboxCategory = document.querySelector('.lightbox-caption p');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    projectOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target.classList.contains('view-project')) {
                const projectItem = this.parentElement;
                const imgSrc = projectItem.querySelector('img').getAttribute('src');
                const title = this.querySelector('h4').textContent;
                const category = this.querySelector('p').textContent;
                
                lightboxImg.setAttribute('src', imgSrc);
                lightboxCaption.textContent = title;
                lightboxCategory.textContent = category;
                
                lightbox.classList.add('active');
            }
        });
    });
    
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    }); */
    
    // Testimonial Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    const testimonialDots = document.querySelector('.testimonial-dots');
    let currentTestimonial = 0;
    
    // Create dots
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        testimonialDots.appendChild(dot);
    });
    
    function updateTestimonial() {
        const scrollAmount = currentTestimonial * (testimonialCards[0].offsetWidth + 32); // 32 is margin-right
        document.querySelector('.testimonials-slider').scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
        
        // Update dots
        document.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTestimonial);
        });
    }
    
    function goToTestimonial(n) {
        currentTestimonial = (n + testimonialCards.length) % testimonialCards.length;
        updateTestimonial();
    }
    
    testimonialPrev.addEventListener('click', () => {
        goToTestimonial(currentTestimonial - 1);
    });
    
    testimonialNext.addEventListener('click', () => {
        goToTestimonial(currentTestimonial + 1);
    });
    
    // Animated Stats Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const suffix = stat.textContent.includes('%') ? '%' : '';
            const duration = 2000; // Animation duration in ms
            const step = target / (duration / 16); // 16ms per frame
            
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    current = target;
                }
                stat.textContent = Math.floor(current) + suffix;
            }, 16);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Animate stats when why choose us section is visible
                if (entry.target.classList.contains('why-choose-us')) {
                    animateStats();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Initialize testimonial slider
    updateTestimonial();

    // Project Videos Slideshow Logic
    const video1 = document.getElementById('video1');
    const video2 = document.getElementById('video2');
    const leftArrow = document.querySelector('.video-arrow-left');
    const rightArrow = document.querySelector('.video-arrow-right');
    const projectVideosSection = document.getElementById('project-videos');
    let currentVideo = 0; // 0 for video1, 1 for video2
    let videoInView = true;
    if (video1 && video2) {
        function showVideoByIndex(index) {
            if (index === 0) {
                video1.style.display = '';
                video2.style.display = 'none';
                video1.currentTime = 0;
                if (videoInView) video1.play();
                video2.pause();
                currentVideo = 0;
            } else {
                video2.style.display = '';
                video1.style.display = 'none';
                video2.currentTime = 0;
                if (videoInView) video2.play();
                video1.pause();
                currentVideo = 1;
            }
        }
        // When video1 ends, show video2
        video1.addEventListener('ended', function() {
            showVideoByIndex(1);
        });
        // When video2 ends, show video1
        video2.addEventListener('ended', function() {
            showVideoByIndex(0);
        });
        // Arrow controls
        if (leftArrow && rightArrow) {
            leftArrow.addEventListener('click', function() {
                showVideoByIndex(currentVideo === 0 ? 1 : 0);
            });
            rightArrow.addEventListener('click', function() {
                showVideoByIndex(currentVideo === 0 ? 1 : 0);
            });
        }
        // Intersection Observer to pause/resume video on scroll
        if (projectVideosSection) {
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        videoInView = true;
                        if (currentVideo === 0) video1.play();
                        else video2.play();
                    } else {
                        videoInView = false;
                        video1.pause();
                        video2.pause();
                    }
                });
            }, { threshold: 0.2 });
            videoObserver.observe(projectVideosSection);
        }
        // Start with video1
        showVideoByIndex(0);
    }

     const viewAllBtn = document.getElementById('viewAllProjectsBtn');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    let isExpanded = false;

    viewAllBtn.addEventListener('click', function() {
        isExpanded = !isExpanded; // Toggle state
        
        // Toggle hidden projects
        hiddenProjects.forEach(project => {
            project.style.display = isExpanded ? 'block' : 'none';
        });

        // Update button text
        viewAllBtn.textContent = isExpanded ? 'Show Less' : 'View All Projects';
    });

    // Gallery Modal for All Projects
    /* const viewAllProjectsBtn = document.getElementById('viewAllProjectsBtn');
    const galleryModal = document.getElementById('projectsGalleryModal');
    const closeGalleryModal = document.querySelector('.close-gallery-modal');
    const galleryImagesContainer = document.querySelector('.gallery-images'); */
    // List of project images (add more as needed)
    const projectGalleryImages = [
        'images/Cladding.jpg',
        'images/Esipong Stadium.jpg',
        'images/IMG-20250219-WA0009.jpg',
        'images/IMG-20250219-WA0010.jpg',
        'images/IMG-20250219-WA0011.jpg',
        'images/IMG-20250625-WA0003.jpg',
        'images/IMG-20250625-WA0004.jpg',
        'images/IMG-20250625-WA0007.jpg',
        'images/IMG-20250625-WA0010.jpg',
        'images/IMG-20250625-WA0011.jpg',
        'images/IMG-20250625-WA0013.jpg',
        'images/IMG-20250625-WA0015.jpg',
        'images/IMG-20250625-WA0016.jpg',
        'images/IMG-20250625-WA0017.jpg',
        'images/IMG-20250625-WA0018.jpg',
        'images/IMG-20250625-WA0021.jpg',
        'images/IMG-20250625-WA0022.jpg',
        'images/IMG-20250625-WA0023.jpg',
        'images/IMG-20250625-WA0024.jpg',
        'images/IMG-20250625-WA0026.jpg',
        'images/IMG-20250625-WA0027.jpg',
        'images/IMG-20250625-WA0028.jpg',
        'images/IMG-20250625-WA0030.jpg',
        'images/Metal Tusses.jpg',
        'images/Outside Ceiling.jpg',
        'images/Residential Apartment.jpg',
        'images/Secrete ROOFING.jpg',
        'images/Well Structured Roofing Purlings.jpg'
    ];
    /*
    if (viewAllProjectsBtn && galleryModal && closeGalleryModal && galleryImagesContainer) {
        viewAllProjectsBtn.addEventListener('click', function() {
            // Populate gallery
            galleryImagesContainer.innerHTML = projectGalleryImages.map(src => `<img src=\"${src}\" alt=\"Project Photo\">`).join('');
            galleryModal.classList.add('active');
            // Center the popover in the viewport
            const popover = galleryModal.querySelector('.gallery-popover');
            const popoverWidth = popover.offsetWidth || 400; // fallback width
            const popoverHeight = popover.offsetHeight || 400; // fallback height
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            let left = (window.innerWidth / 2) - (popoverWidth / 2) + scrollLeft;
            let top = (window.innerHeight / 2) - (popoverHeight / 2) + scrollTop;
            left = Math.max(left, 12);
            const maxLeft = window.innerWidth + scrollLeft - popoverWidth - 12;
            left = Math.min(left, maxLeft);
            top = Math.max(top, 12);
            const maxTop = window.innerHeight + scrollTop - popoverHeight - 12;
            top = Math.min(top, maxTop);
            popover.style.top = top + 'px';
            popover.style.left = left + 'px';
            popover.style.right = 'auto';
            popover.style.position = 'absolute';
            document.body.style.overflow = 'hidden';
        });
        closeGalleryModal.addEventListener('click', function() {
            galleryModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        galleryModal.addEventListener('mousedown', function(e) {
            const popover = galleryModal.querySelector('.gallery-popover');
            if (e.target === galleryModal && !popover.contains(e.target)) {
                galleryModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    */

// === Service Images Modal Logic (dedicated modal, only image grid) ===
const serviceImages = {
    'roof-installation': [
        'images/Residential_Apartment.jpg',
        'images/Apartment.jpg',
        'images/Secrete_ROOFING.jpg',
        'images/ware2.jpg'
    ],
    'roof-repairs': [
        'images/Secrete_ROOFING.jpg',
        'images/pur2.jpg',
        'images/IMG-20250625-WA0011.jpg'
    ],
    'gutter-systems': [
        'images/Outside_Ceiling.jpg',
        'images/out2.jpg',
        'images/out3.jpg',
        'images/out4.jpg',
        
    ],
    'metal-tusses': [
        'images/Metal_Tusses.jpg',
        
        'images/ware2.jpg',
        'images/ware3.jpg',
        'images/Warehouse.jpg'
    ],
    'pergola': [
        'images/pergola.jpg',
        'images/perg2.jpg',
        'images/perg3.jpg',
        
    ],
    'cladding': [
        'images/Cladding.jpg',
        'images/clad2.jpg',
        'images/clad3.jpg'
    ]
};
const serviceTitles = {
    'roof-installation': 'Roof Installation Projects',
    'roof-repairs': 'Roof Repairs or Replacement Projects',
    'gutter-systems': 'Gutter Systems Projects',
    'metal-tusses': 'Metal Tusses Projects',
    'pergola': 'Pergola Projects',
    'cladding': 'Cladding Projects'
};
const viewServiceBtns = document.querySelectorAll('.service-view-link');
const serviceLightbox = document.querySelector('.service-lightbox');
const serviceLightboxTitle = document.querySelector('.service-lightbox-title');
const serviceThumbnailsContainer = document.querySelector('.service-image-thumbnails');

viewServiceBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const service = btn.getAttribute('data-service');
        const images = serviceImages[service] || [];
        // Set title
        serviceLightboxTitle.textContent = serviceTitles[service] || '';
        // Thumbnails grid
        serviceThumbnailsContainer.innerHTML = '';
        images.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            serviceThumbnailsContainer.appendChild(img);
        });
        // Show service lightbox
        serviceLightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});
// Close service lightbox
function closeServiceLightbox() {
    serviceLightbox.style.display = 'none';
    document.body.style.overflow = '';
}
document.querySelector('.close-service-lightbox').addEventListener('click', closeServiceLightbox);
serviceLightbox.addEventListener('click', (e) => e.target === serviceLightbox && closeServiceLightbox());
});
// Scroll to Top Button
const scrollToTop = document.querySelector('.scroll-to-top');
const floatingCTA = document.querySelector('.floating-cta');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollToTop.classList.add('active');
        floatingCTA.style.display = 'none';
    } else {
        scrollToTop.classList.remove('active');
        floatingCTA.style.display = 'flex';
    }
});

// Make floating CTA and scroll-to-top work together
floatingCTA.addEventListener('click', function(e) {
    if (window.scrollY > 300) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// Bounce and focus consultation form on anchor navigation
function bounceConsultationForm() {
    const consultationContainer = document.getElementById('consultation');
    if (consultationContainer) {
        consultationContainer.classList.remove('bounce');
        // Force reflow to restart animation
        void consultationContainer.offsetWidth;
        consultationContainer.classList.add('bounce');
        // Optionally focus the first input
        const firstInput = consultationContainer.querySelector('input, textarea');
        if (firstInput) firstInput.focus();
        setTimeout(() => consultationContainer.classList.remove('bounce'), 800);
    }
}
// Listen for hashchange and initial load with #consultation
function checkConsultationHash() {
    if (window.location.hash === '#consultation') {
        setTimeout(bounceConsultationForm, 300);
    }
}
window.addEventListener('hashchange', checkConsultationHash);
document.addEventListener('DOMContentLoaded', checkConsultationHash);
// Also add click listeners to .free-estimate-btn and .btn-primary[href="#consultation"]
document.querySelectorAll('.free-estimate-btn, .btn-primary[href="#consultation"]').forEach(btn => {
    btn.addEventListener('click', function(e) {
        setTimeout(bounceConsultationForm, 400);
    });
});
