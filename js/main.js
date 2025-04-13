// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Navigation toggle for mobile
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      navToggle &&
      !navToggle.contains(e.target) &&
      !navMenu.contains(e.target) &&
      navMenu.classList.contains("active")
    ) {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  const scrollTopBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
      if (scrollTopBtn) scrollTopBtn.classList.add("visible");
    } else {
      navbar.classList.remove("scrolled");
      if (scrollTopBtn) scrollTopBtn.classList.remove("visible");
    }
  });

  // Scroll to top button
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Form submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Show success message (in a real app, you'd send the form data to a server here)
      const formContainer = this.parentElement;
      const successMessage = document.createElement("div");
      successMessage.className = "form-success";
      successMessage.innerHTML =
        '<i class="fas fa-check-circle"></i><h3>Thank You!</h3><p>Your message has been sent successfully. We\'ll get back to you soon.</p>';

      // Hide form and show success message
      this.style.display = "none";
      formContainer.appendChild(successMessage);

      // Reset form for future submissions
      setTimeout(() => {
        this.reset();
        successMessage.remove();
        this.style.display = "block";
      }, 5000);
    });
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        if (navMenu.classList.contains("active")) {
          navToggle.classList.remove("active");
          navMenu.classList.remove("active");
        }

        // Scroll to element
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Offset to account for sticky header
          behavior: "smooth",
        });
      }
    });
  });

  // Animation for story cards with more interactive effects
  const storyItems = document.querySelectorAll(".story-item");
  storyItems.forEach((item, index) => {
    // Create staggered entrance animations
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        once: true,
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: index * 0.3,
      ease: "power2.out",
    });

    // Add parallax effect to the images
    const illustration = item.querySelector(".story-illustration img");
    if (illustration) {
      ScrollTrigger.create({
        trigger: item,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(illustration, {
            y: progress * 50,
            duration: 0.1,
            ease: "none",
          });
        },
      });
    }

    // Add rotation effect to the numbers
    const number = item.querySelector(".story-number");
    if (number) {
      ScrollTrigger.create({
        trigger: item,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.from(number, {
            rotation: -180,
            scale: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
          });
        },
      });
    }
  });

  // Animation for solution cards
  const solutionCards = document.querySelectorAll(".solution-card");
  solutionCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        once: true,
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.2,
      ease: "power2.out",
    });
  });

  // Hover animations for cards
  const cardImages = document.querySelectorAll(".card-img img");
  cardImages.forEach((img) => {
    img.addEventListener("mouseenter", () => {
      gsap.to(img, {
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    img.addEventListener("mouseleave", () => {
      gsap.to(img, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    });
  });

  // Hero background animation - create a more visible animation effect
  gsap.fromTo(
    ".hero-background",
    {
      backgroundPosition: "0% 0%",
    },
    {
      backgroundPosition: "0% 100%",
      duration: 30,
      repeat: -1,
      yoyo: true,
      ease: "none",
    }
  );

  // For-Who section tabs
  const personaTabs = document.querySelectorAll(".persona-tab");
  const personaPanels = document.querySelectorAll(".persona-panel");

  personaTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.target;

      // Remove active class from all tabs and panels
      personaTabs.forEach((t) => t.classList.remove("active"));
      personaPanels.forEach((p) => p.classList.remove("active"));

      // Add active class to clicked tab and matching panel
      tab.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });

  // CTA section option tabs
  const ctaOptions = document.querySelectorAll(".cta-option");
  const formHeader = document.querySelector(".form-header h3");
  const formSubheader = document.querySelector(".form-header p");
  const submitBtn = document.querySelector(".submit-btn");

  ctaOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const formType = option.dataset.form;

      // Remove active class from all options
      ctaOptions.forEach((o) => o.classList.remove("active"));

      // Add active class to clicked option
      option.classList.add("active");

      // Change form texts based on form type
      if (formHeader && formSubheader && submitBtn) {
        switch (formType) {
          case "tour":
            formHeader.textContent = "Book Your Tour";
            formSubheader.textContent = "Experience TACH homes in person";
            submitBtn.textContent = "Book My Tour";
            break;
          case "info":
            formHeader.textContent = "Request Information";
            formSubheader.textContent = "Learn more about TACH homes";
            submitBtn.textContent = "Send Request";
            break;
          case "invest":
            formHeader.textContent = "Investment Opportunities";
            formSubheader.textContent = "Discover how to invest in TACH";
            submitBtn.textContent = "Get Investment Details";
            break;
        }
      }
    });
  });

  // Image hover animations
  const modelImages = document.querySelectorAll(".model-card .model-image");
  modelImages.forEach((image) => {
    image.addEventListener("mouseenter", () => {
      const img = image.querySelector("img");
      if (img) {
        gsap.to(img, {
          scale: 1.05,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    });

    image.addEventListener("mouseleave", () => {
      const img = image.querySelector("img");
      if (img) {
        gsap.to(img, {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    });
  });

  // Story navigation
  const storyPrev = document.querySelector(".story-nav-btn.prev");
  const storyNext = document.querySelector(".story-nav-btn.next");
  const storySlides = document.querySelectorAll(".story-slide");
  const storyDots = document.querySelectorAll(".story-dot");
  let currentSlide = 0;

  if (
    storyNext &&
    storyPrev &&
    storySlides.length > 0 &&
    storyDots.length > 0
  ) {
    const updateStoryNav = (index) => {
      storySlides.forEach((slide) => slide.classList.remove("active"));
      storyDots.forEach((dot) => dot.classList.remove("active"));

      storySlides[index].classList.add("active");
      storyDots[index].classList.add("active");
    };

    storyNext.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % storySlides.length;
      updateStoryNav(currentSlide);
    });

    storyPrev.addEventListener("click", () => {
      currentSlide =
        (currentSlide - 1 + storySlides.length) % storySlides.length;
      updateStoryNav(currentSlide);
    });

    storyDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index;
        updateStoryNav(currentSlide);
      });
    });
  }

  // Scroll animations
  const fadeInElements = document.querySelectorAll("[data-scroll]");

  fadeInElements.forEach((element) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  // Counter animation
  const animateCounter = (el, target) => {
    const duration = 2000;
    const stepTime = 50;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current > target) current = target;
      el.textContent = Math.floor(current);

      if (current === target) clearInterval(timer);
    }, stepTime);
  };

  // Start counter animation when counter section is visible
  const counterItems = document.querySelectorAll(".counter");

  counterItems.forEach((counter) => {
    if (counter.hasAttribute("data-target")) {
      const targetValue = parseInt(counter.getAttribute("data-target"));

      ScrollTrigger.create({
        trigger: counter,
        start: "top 90%",
        onEnter: () => animateCounter(counter, targetValue),
      });
    }
  });

  // Hero intro animation
  const heroTimeline = gsap.timeline();

  heroTimeline
    .fromTo(
      ".hero-title .line",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 }
    )
    .fromTo(
      ".hero-subtitle",
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      "-=0.3"
    )
    .fromTo(
      ".hero-cta",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      "-=0.3"
    )
    .fromTo(
      ".scroll-indicator",
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      "-=0.2"
    );

  // Enhanced animation for the story conclusion
  const storyConclusion = document.querySelector(".story-conclusion");
  if (storyConclusion) {
    gsap.from(storyConclusion, {
      scrollTrigger: {
        trigger: storyConclusion,
        start: "top 80%",
        once: true,
      },
      opacity: 0,
      scale: 0.9,
      y: 30,
      duration: 1,
      ease: "power3.out",
    });

    // Add pulse animation to the CTA button
    const storyCta = storyConclusion.querySelector(".story-cta");
    if (storyCta) {
      const pulseTimeline = gsap.timeline({
        repeat: -1,
        yoyo: true,
        repeatDelay: 1,
      });
      pulseTimeline.to(storyCta, {
        boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)",
        scale: 1.05,
        duration: 1.5,
        ease: "power1.inOut",
      });
    }
  }

  // Crisis section animations - updated for Galaxy theme
  initCrisisSection();

  // Solution section interactive 3D container model
  initSolutionInteractive();

  // Initialize the solution showcase section
  initSolutionShowcase();

  // Models section tabs functionality
  initModelsSection();

  // Initialize the Solution Section
  initInnovativeSolution();

  // Initialize the Solution Wheel
  initSolutionWheel();

  // Initialize Solution Perspective with 3D Card Flip
  initSolutionPerspective();

  // Initialize the 3D cube solution section
  initSolutionCube();

  // Initialize the solution carousel
  initSolutionCarousel();

  // Solution section static functionality
  initSolutionsStatic();

  // Experience section features animation
  initExperienceFeatures();

  // For who section tabs
  initForWhoTabs();

  // Impact section counters
  initImpactCounters();

  // CTA option switcher
  initCtaOptions();

  // Initialize model tabs
  initModelTabs();

  // Initialize language switcher
  initLanguageSwitcher();
});

// Crisis section animations - updated for Galaxy theme
function initCrisisSection() {
  const crisisSection = document.querySelector(".crisis-galaxy");
  if (!crisisSection) return;

  // Variables for navigation
  const galaxyNavItems = document.querySelectorAll(".galaxy-nav-item");
  const galaxySlides = document.querySelectorAll(".galaxy-slide");
  // const progressFill = document.querySelector('.progress-fill');
  let currentSlideIndex = 0;
  let isAnimating = false;
  let touchStartY = 0;
  let touchEndY = 0;
  let autoSlideTimer; // Timer for auto-sliding

  // Initialize slides
  function setActiveSlide(index) {
    // Prevent rapid changes
    if (isAnimating) return;
    isAnimating = true;

    // Constrain index
    if (index < 0) index = 0;
    if (index >= galaxySlides.length) index = galaxySlides.length - 1;

    // Update current index
    currentSlideIndex = index;

    // Update navigation items
    galaxyNavItems.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });

    // Update slides
    galaxySlides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    // Update progress bar
    // if (progressFill) {
    //     const progressWidth = ((index + 1) / galaxySlides.length) * 100;
    //     progressFill.style.width = `${progressWidth}%`;
    // }

    // Allow animations after a delay
    setTimeout(() => {
      isAnimating = false;
    }, 800); // Match this with slide transition duration

    // Reset auto-slide timer when manually changing slides
    resetAutoSlideTimer();
  }

  // Start auto-slide timer
  function startAutoSlideTimer() {
    clearTimeout(autoSlideTimer); // Clear any existing timer
    autoSlideTimer = setTimeout(() => {
      let nextIndex = currentSlideIndex + 1;
      if (nextIndex >= galaxySlides.length) nextIndex = 0; // Loop back to first slide
      setActiveSlide(nextIndex);
    }, 30000); // Auto-slide every 30 seconds
  }

  // Reset auto-slide timer
  function resetAutoSlideTimer() {
    clearTimeout(autoSlideTimer);
    startAutoSlideTimer();
  }

  // Initialize auto-slide
  startAutoSlideTimer();

  // Navigation click events
  galaxyNavItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      setActiveSlide(index);
    });
  });

  // Touch events for mobile
  crisisSection.addEventListener("touchstart", (e) => {
    touchStartY = e.changedTouches[0].screenY;
  });

  crisisSection.addEventListener("touchend", (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;

    if (touchStartY - touchEndY > swipeThreshold) {
      // Swipe up
      setActiveSlide(currentSlideIndex + 1);
    } else if (touchEndY - touchStartY > swipeThreshold) {
      // Swipe down
      setActiveSlide(currentSlideIndex - 1);
    }
  }

  // Keyboard navigation, only active when crisis section is in viewport
  document.addEventListener("keydown", (e) => {
    // Check if crisis section is in viewport before handling keyboard events
    const rect = crisisSection.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInViewport) {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        setActiveSlide(currentSlideIndex + 1);
        e.preventDefault();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        setActiveSlide(currentSlideIndex - 1);
        e.preventDefault();
      }
    }
  });

  // Pause auto-slide when user is interacting with the section
  crisisSection.addEventListener("mouseenter", () => {
    clearTimeout(autoSlideTimer);
  });

  crisisSection.addEventListener("mouseleave", () => {
    startAutoSlideTimer();
  });

  // GSAP Animations for slide content
  if (window.gsap) {
    // Initial animations for the first slide
    animateSlideContent(galaxySlides[0]);

    // Observer to detect when slides become active
    const slideObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const slide = mutation.target;
          if (slide.classList.contains("active")) {
            animateSlideContent(slide);
          }
        }
      });
    });

    // Observe all slides for class changes
    galaxySlides.forEach((slide) => {
      slideObserver.observe(slide, { attributes: true });
    });

    // Function to animate slide content
    function animateSlideContent(slide) {
      if (!slide) return;

      const tl = gsap.timeline();

      // Animate title
      tl.fromTo(
        slide.querySelector(".slide-title"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      // Animate stat
      tl.fromTo(
        slide.querySelector(".slide-stat"),
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.5"
      );

      // Animate description
      tl.fromTo(
        slide.querySelector(".slide-description"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );

      // Animate impact section
      tl.fromTo(
        slide.querySelector(".slide-impact"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );

      // Animate the floating illustration
      const illustration = slide.querySelector(".floating-illustration");
      if (illustration) {
        gsap.fromTo(
          illustration,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          }
        );
      }
    }

    // Enhanced parallax effect for the background patterns
    const starsBg = document.querySelector(".stars-bg");

    // Parallax effect on mouse movement
    crisisSection.addEventListener("mousemove", (e) => {
      if (!starsBg) return;

      // Calculate mouse position percentage
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      // Apply subtle parallax movement to the background patterns
      gsap.to(starsBg, {
        x: (mouseX - 0.5) * 30,
        y: (mouseY - 0.5) * 30,
        duration: 0.5,
        ease: "power1.out",
      });

      // Apply movement to the before/after pseudo-elements using CSS variables
      crisisSection.style.setProperty(
        "--parallax-x",
        `${(mouseX - 0.5) * 20}px`
      );
      crisisSection.style.setProperty(
        "--parallax-y",
        `${(mouseY - 0.5) * 20}px`
      );
    });

    // Create a scroll-triggered parallax effect
    ScrollTrigger.create({
      trigger: crisisSection,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const scrollProgress = self.progress;

        // Move background elements based on scroll position
        gsap.to(crisisSection, {
          backgroundPosition: `0% ${scrollProgress * 20}%`,
          duration: 0.1,
          ease: "none",
        });

        // Parallax effect for floating illustrations
        const illustrations = crisisSection.querySelectorAll(
          ".floating-illustration"
        );
        illustrations.forEach((illustration) => {
          gsap.to(illustration, {
            y: (scrollProgress - 0.5) * 30,
            duration: 0.1,
            ease: "none",
          });
        });
      },
    });
  }
}

// Helper function to check if element is in viewport
function isElementInViewport(el) {
  if (!el) return false;

  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Solution section interactive 3D container model
function initSolutionInteractive() {
  const containerSection = document.querySelector(".solution-interactive");
  if (!containerSection) return;

  const container3D = document.getElementById("containerModel");
  const transformBtns = document.querySelectorAll(".transform-btn");
  const featurePanels = document.querySelectorAll(".feature-panel");

  let isDragging = false;
  let startX, startY;
  let currentX = 30,
    currentY = -20;

  // Initialize with first state active
  container3D.setAttribute("data-state", "container");

  // Mouse/touch controls for 3D rotation
  const containerScene = document.querySelector(".container-3d-scene");

  containerScene.addEventListener("mousedown", handleDragStart);
  containerScene.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    handleDragStart({ clientX: touch.clientX, clientY: touch.clientY });
  });

  document.addEventListener("mousemove", handleDragMove);
  document.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      e.preventDefault();
      handleDragMove({ clientX: touch.clientX, clientY: touch.clientY });
    },
    { passive: false }
  );

  document.addEventListener("mouseup", handleDragEnd);
  document.addEventListener("touchend", handleDragEnd);

  function handleDragStart(e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    containerScene.style.cursor = "grabbing";
  }

  function handleDragMove(e) {
    if (!isDragging) return;

    // Calculate rotation based on mouse/touch movement
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    // Update rotation values (limit to reasonable angles)
    currentX = Math.min(180, Math.max(-180, currentX + deltaX * 0.5));
    currentY = Math.min(45, Math.max(-90, currentY + deltaY * 0.5));

    // Apply rotation transform
    updateContainerRotation();

    // Update starting position for next move
    startX = e.clientX;
    startY = e.clientY;
  }

  function handleDragEnd() {
    isDragging = false;
    containerScene.style.cursor = "grab";
  }

  function updateContainerRotation() {
    const state = container3D.getAttribute("data-state") || "container";
    let additionalTransform = "";

    // Add state-specific transforms
    switch (state) {
      case "frame":
        additionalTransform = "scale(1.1)";
        break;
      case "living":
        additionalTransform = "scale(1.1)";
        break;
      case "solar":
        additionalTransform = "scale(1.15)";
        break;
      case "complete":
        additionalTransform = "scale(1.2)";
        break;
      default:
        additionalTransform = "";
    }

    container3D.style.transform = `rotateY(${currentX}deg) rotateX(${currentY}deg) ${additionalTransform}`;
  }

  // Transform button event listeners
  transformBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const transformType = btn.getAttribute("data-transform");

      // Update active state for buttons
      transformBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Update container state
      container3D.setAttribute("data-state", transformType);
      updateContainerRotation();

      // Update visible panel
      featurePanels.forEach((panel) => {
        panel.classList.remove("active");
        if (panel.id === `${transformType}-panel`) {
          panel.classList.add("active");
        }
      });
    });
  });

  // Optional: fade in and show interaction hint after a delay
  setTimeout(() => {
    const hint = document.querySelector(".interaction-hint");
    if (hint) {
      hint.style.opacity = "1";
    }
  }, 2000);

  // Optional: GSAP animations for enhanced visual effects
  if (window.gsap) {
    // Initial animation
    gsap.from(container3D, {
      duration: 1.5,
      y: 50,
      opacity: 0,
      rotateX: -90,
      ease: "back.out(1.7)",
    });

    // Animate in buttons with stagger
    gsap.from(".transform-btn", {
      duration: 0.5,
      y: 30,
      opacity: 0,
      stagger: 0.1,
      delay: 0.5,
      ease: "power2.out",
    });

    // Animate initial panel
    gsap.from("#container-panel", {
      duration: 0.8,
      y: 30,
      opacity: 0,
      delay: 0.8,
      ease: "power2.out",
    });

    // Create scroll trigger for container
    ScrollTrigger.create({
      trigger: ".solution-stage",
      start: "top bottom-=100",
      end: "bottom top+=200",
      onEnter: () => {
        // Additional animation when container enters viewport
        gsap.to(container3D, {
          duration: 1,
          rotateY: 360,
          ease: "power2.inOut",
          onComplete: () => {
            currentX = 30; // Reset to default position after full rotation
            updateContainerRotation();
          },
        });
      },
      once: true,
    });
  }
}

// Initialize the solution showcase section
function initSolutionShowcase() {
  const solutionSection = document.querySelector(".solution-showcase");
  if (!solutionSection) return;

  const pathDots = document.querySelectorAll(".path-dot");
  const detailPanels = document.querySelectorAll(".detail-panel");

  let currentStep = 1;
  const totalSteps = detailPanels.length;
  let autoSlideTimer; // Timer for auto-sliding

  // Initialize the first step (usually already set in HTML)
  function setActiveStep(step) {
    // Update current step
    currentStep = step;

    // Update path dots
    pathDots.forEach((dot) => {
      const dotStep = parseInt(dot.getAttribute("data-step"));
      dot.classList.toggle("active", dotStep === step);
    });

    // Update detail panels
    detailPanels.forEach((panel) => {
      const panelStep = parseInt(panel.getAttribute("data-step"));
      panel.classList.toggle("active", panelStep === step);
    });

    // Reset auto-slide timer when manually changing steps
    resetAutoSlideTimer();
  }

  // Start auto-slide timer
  function startAutoSlideTimer() {
    clearTimeout(autoSlideTimer); // Clear any existing timer
    autoSlideTimer = setTimeout(() => {
      let nextStep = currentStep + 1;
      if (nextStep > totalSteps) nextStep = 1; // Loop back to first step
      setActiveStep(nextStep);
    }, 30000); // Auto-slide every 30 seconds
  }

  // Reset auto-slide timer
  function resetAutoSlideTimer() {
    clearTimeout(autoSlideTimer);
    startAutoSlideTimer();
  }

  // Initialize auto-slide
  startAutoSlideTimer();

  // Path dot click events
  pathDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const step = parseInt(dot.getAttribute("data-step"));
      setActiveStep(step);
    });
  });

  // Navigation buttons for path
  const prevPathNav = document.querySelector(".solution-path .path-nav.prev");
  const nextPathNav = document.querySelector(".solution-path .path-nav.next");

  if (prevPathNav) {
    prevPathNav.addEventListener("click", () => {
      let prevStep = currentStep - 1;
      if (prevStep < 1) prevStep = totalSteps;
      setActiveStep(prevStep);
    });
  }

  if (nextPathNav) {
    nextPathNav.addEventListener("click", () => {
      let nextStep = currentStep + 1;
      if (nextStep > totalSteps) nextStep = 1;
      setActiveStep(nextStep);
    });
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    // Only handle keyboard when the solution section is in view
    if (!isElementInViewport(solutionSection)) return;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      let nextStep = currentStep + 1;
      if (nextStep > totalSteps) nextStep = 1;
      setActiveStep(nextStep);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      let prevStep = currentStep - 1;
      if (prevStep < 1) prevStep = totalSteps;
      setActiveStep(prevStep);
    }
  });

  // Pause auto-slide when user is interacting with the section
  solutionSection.addEventListener("mouseenter", () => {
    clearTimeout(autoSlideTimer);
  });

  solutionSection.addEventListener("mouseleave", () => {
    startAutoSlideTimer();
  });

  // GSAP animations
  if (window.gsap) {
    // Entrance animation for the path
    gsap.from(".solution-path", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".solution-path",
        start: "top 85%",
      },
    });

    // Shimmer effect on path lines
    gsap.to(".path-line::after", {
      left: "130%",
      duration: 2,
      repeat: -1,
      ease: "none",
    });

    // Float animation for the next-section button
    gsap.to(".next-section-btn", {
      y: -10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Animate the current detail panel when it becomes active
    function animateActivePanel() {
      const activePanel = document.querySelector(".detail-panel.active");

      if (activePanel) {
        // Reset any previous animations first
        gsap.set(activePanel.querySelectorAll(".feature-item"), {
          clearProps: "all",
        });

        // Animate the detail panel elements
        const tl = gsap.timeline();

        tl.fromTo(
          activePanel.querySelector(".detail-icon"),
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
        );

        tl.fromTo(
          activePanel.querySelector(".detail-heading"),
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        );

        tl.fromTo(
          activePanel.querySelector(".detail-description p"),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        );

        // Animate feature items with stagger
        tl.fromTo(
          activePanel.querySelectorAll(".feature-item"),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
          "-=0.2"
        );
      }
    }

    // Initial animation for the first panel
    animateActivePanel();

    // Observe changes to detail panels to animate when they become active
    const panelObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === "class" &&
          mutation.target.classList.contains("active")
        ) {
          animateActivePanel();
        }
      });
    });

    // Observe all detail panels
    detailPanels.forEach((panel) => {
      panelObserver.observe(panel, { attributes: true });
    });
  }
}

// Models section tabs and thumbnail functionality
function initModelsSection() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const modelPanels = document.querySelectorAll(".model-panel");
  const thumbnails = document.querySelectorAll(".thumbnail");

  // Tab switching functionality
  if (tabButtons.length > 0 && modelPanels.length > 0) {
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const modelType = button.getAttribute("data-model");

        // Update active tab button
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // Update active model panel
        modelPanels.forEach((panel) => {
          panel.classList.remove("active");
          if (panel.id === `${modelType}-panel`) {
            panel.classList.add("active");

            // Animate panel entrance
            if (window.gsap) {
              gsap.fromTo(
                panel,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
              );
            }
          }
        });
      });
    });
  }

  // Thumbnail image switching
  if (thumbnails.length > 0) {
    thumbnails.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        // Get parent container and main image
        const slider = thumb.closest(".model-image-slider");
        const mainImage = slider.querySelector(".model-main-image img");
        const thumbImage = thumb.querySelector("img");

        // Update active thumbnail
        slider
          .querySelectorAll(".thumbnail")
          .forEach((t) => t.classList.remove("active"));
        thumb.classList.add("active");

        // Update main image with thumbnail source (but larger size)
        // We're using a simple string replacement to get the high-res version
        const highResUrl = thumbImage.src.replace("w=200", "w=1200");

        // Animate the image change
        if (window.gsap) {
          gsap.to(mainImage, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
              mainImage.src = highResUrl;
              gsap.to(mainImage, { opacity: 1, duration: 0.3 });
            },
          });
        } else {
          mainImage.src = highResUrl;
        }
      });
    });
  }

  // Floor plan view functionality
  const floorplanButtons = document.querySelectorAll(".view-floorplan");

  if (floorplanButtons.length > 0) {
    floorplanButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const modelType = button.getAttribute("data-model");

        // Here you would typically show a modal with the floor plan
        // For this implementation, we'll use a simple alert
        alert(`Floor plan for ${modelType} would display in a modal here`);

        // In a real implementation, you might have:
        // openFloorplanModal(modelType);
      });
    });
  }
}

// Initialize Innovative Solution Section
function initInnovativeSolution() {
  // Solution Cards Flip Effect
  const solutionCards = document.querySelectorAll(".solution-card");

  solutionCards.forEach((card) => {
    card.addEventListener("click", function () {
      this.querySelector(".card-inner").classList.toggle("flipped");
    });

    // Allow clicking the back button specifically
    const backBtn = card.querySelector(".card-back .card-flip-btn");
    if (backBtn) {
      backBtn.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent the card click event
        card.querySelector(".card-inner").classList.remove("flipped");
      });
    }
  });

  // Showcase Tabs
  const showcaseTabs = document.querySelectorAll(".showcase-tab");
  const showcasePanels = document.querySelectorAll(".showcase-panel");

  showcaseTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const target = this.getAttribute("data-showcase");

      // Update active tab
      showcaseTabs.forEach((tab) => tab.classList.remove("active"));
      this.classList.add("active");

      // Show corresponding panel
      showcasePanels.forEach((panel) => {
        panel.classList.remove("active");
        if (panel.getAttribute("data-showcase") === target) {
          panel.classList.add("active");
        }
      });
    });
  });

  // Hotspot animations
  const hotspots = document.querySelectorAll(".hotspot");

  hotspots.forEach((hotspot) => {
    // Add entrance animation for hotspots
    gsap.from(hotspot, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      delay: Math.random() * 0.8,
      ease: "back.out",
    });
  });

  // Animate solution section elements on scroll
  gsap.registerPlugin(ScrollTrigger);

  // Animate background shapes
  gsap.utils.toArray(".bg-shape").forEach((shape, i) => {
    gsap.from(shape, {
      opacity: 0,
      scale: 0.8,
      duration: 1.5,
      delay: i * 0.2,
      scrollTrigger: {
        trigger: ".solution-innovative",
        start: "top 80%",
      },
    });
  });

  // Animate solution cards
  gsap.from(".solution-card", {
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".solution-cards",
      start: "top 80%",
    },
  });

  // Animate showcase container
  gsap.from(".showcase-container", {
    y: 80,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".showcase-container",
      start: "top 80%",
    },
  });

  // Floating particles
  const particles = document.querySelectorAll(".solution-particle");

  particles.forEach((particle, i) => {
    gsap.to(particle, {
      x: `random(-100, 100)`,
      y: `random(-100, 100)`,
      opacity: `random(0.2, 0.5)`,
      duration: `random(20, 40)`,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });
}

// Initialize the Solution Wheel
function initSolutionWheel() {
  const solutionSpokes = document.querySelectorAll(".solution-spoke");
  const solutionDetails = document.querySelectorAll(".solution-detail");
  const navDots = document.querySelectorAll(".nav-dot");
  const prevButton = document.querySelector(".prev-solution");
  const nextButton = document.querySelector(".next-solution");

  // Array of solution types in order
  const solutionTypes = [
    "housing",
    "energy",
    "innovation",
    "financial",
    "urbanization",
  ];
  let currentIndex = 0;

  // Set the active solution
  function setActiveSolution(solutionType) {
    // Get the index from the solution type
    const index = solutionTypes.indexOf(solutionType);
    if (index === -1) return;

    // Update current index
    currentIndex = index;

    // Update spokes
    solutionSpokes.forEach((spoke) => {
      spoke.classList.toggle(
        "active",
        spoke.getAttribute("data-solution") === solutionType
      );
    });

    // Update details
    solutionDetails.forEach((detail) => {
      detail.classList.toggle("active", detail.id === `${solutionType}-detail`);
    });

    // Update nav dots
    navDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    // Animate the active solution
    animateActiveSolution(solutionType);
  }

  // Handle next/previous navigation
  function goToNextSolution() {
    currentIndex = (currentIndex + 1) % solutionTypes.length;
    setActiveSolution(solutionTypes[currentIndex]);
  }

  function goToPrevSolution() {
    currentIndex =
      (currentIndex - 1 + solutionTypes.length) % solutionTypes.length;
    setActiveSolution(solutionTypes[currentIndex]);
  }

  // Animate the solution content when it becomes active
  function animateActiveSolution(solutionType) {
    if (!window.gsap) return;

    const activeDetail = document.getElementById(`${solutionType}-detail`);
    if (!activeDetail) return;

    // Animate the visual stat
    const statElement = activeDetail.querySelector(".visual-stat");
    gsap.fromTo(
      statElement,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
    );

    // Animate the content elements
    const contentElements = activeDetail.querySelectorAll(
      ".detail-content > *"
    );
    gsap.fromTo(
      contentElements,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );

    // Animate benefits with stagger
    const benefits = activeDetail.querySelectorAll(".benefit");
    gsap.fromTo(
      benefits,
      { x: -10, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3,
      }
    );
  }

  // Add event listeners to spokes
  solutionSpokes.forEach((spoke) => {
    spoke.addEventListener("click", () => {
      const solutionType = spoke.getAttribute("data-solution");
      setActiveSolution(solutionType);
    });
  });

  // Add event listeners to nav dots
  navDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      setActiveSolution(solutionTypes[index]);
    });
  });

  // Add event listeners to nav buttons
  if (prevButton) prevButton.addEventListener("click", goToPrevSolution);
  if (nextButton) nextButton.addEventListener("click", goToNextSolution);

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    // Only handle if solution section is visible in viewport
    const solutionSection = document.querySelector(".solution-wheel");
    if (!solutionSection) return;

    const rect = solutionSection.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInViewport) {
      if (e.key === "ArrowRight") {
        goToNextSolution();
      } else if (e.key === "ArrowLeft") {
        goToPrevSolution();
      }
    }
  });

  // Add wheel hub click event to show a random solution
  const wheelHub = document.querySelector(".wheel-hub");
  if (wheelHub) {
    wheelHub.addEventListener("click", () => {
      // Get random solution except current one
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * solutionTypes.length);
      } while (randomIndex === currentIndex);

      setActiveSolution(solutionTypes[randomIndex]);
    });
  }

  // Initialize with first solution
  setActiveSolution(solutionTypes[0]);

  // Create particles animation for background
  if (window.gsap) {
    const particles = document.querySelector(".solution-particles");
    if (particles) {
      gsap.to(particles, {
        backgroundPosition: "100% 100%",
        duration: 30,
        repeat: -1,
        ease: "none",
        yoyo: true,
      });
    }

    // Create pulse animation for wheel hub
    gsap.to(".wheel-hub", {
      boxShadow: "0 10px 40px rgba(var(--color-primary-rgb), 0.3)",
      scale: 1.03,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }
}

// Initialize Solution Perspective with 3D Card Flip
function initSolutionPerspective() {
  const perspectiveCards = document.querySelectorAll(".perspective-card");

  // Add event listeners to each card
  perspectiveCards.forEach((card) => {
    // Flip card on click
    card.addEventListener("click", function () {
      this.classList.toggle("flipped");
    });

    // Add close button functionality
    const closeBtn = card.querySelector(".back-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent card click event
        card.classList.remove("flipped");
      });
    }
  });

  // Create and animate floating shapes
  const shapeContainer = document.querySelector(".shape-container");
  if (shapeContainer) {
    // Animation is handled by CSS

    // Add intersection observer for animation optimization
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add class to start animations when in view
            shapeContainer.classList.add("animate");
          } else {
            // Optionally pause animations when out of view
            shapeContainer.classList.remove("animate");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(document.querySelector(".solution-perspective"));
  }

  // Add keyboard accessibility
  document.addEventListener("keydown", function (e) {
    const activeCard = document.activeElement.closest(".perspective-card");
    if (activeCard) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activeCard.classList.toggle("flipped");
      } else if (e.key === "Escape") {
        activeCard.classList.remove("flipped");
      }
    }
  });

  // Add focus management for accessibility
  perspectiveCards.forEach((card) => {
    // Make cards focusable
    card.setAttribute("tabindex", "0");

    // Add ARIA attributes for screen readers
    card.setAttribute("role", "button");
    card.setAttribute("aria-expanded", "false");

    // Update ARIA attributes when flipped
    card.addEventListener("click", function () {
      const isFlipped = this.classList.contains("flipped");
      this.setAttribute("aria-expanded", isFlipped.toString());
    });
  });
}

// Interactive 3D Cube Solution Section
function initSolutionCube() {
  const cube = document.querySelector(".cube");
  const detailPanels = document.querySelectorAll(".detail-panel");
  const actionButtons = document.querySelectorAll(".action-btn");
  const rotateButtons = document.querySelectorAll(".rotate-btn");
  const resetButton = document.querySelector(".reset-btn");

  if (!cube) return;

  // Initialize particles
  const particlesContainer = document.querySelector(".solution-particles");
  if (particlesContainer) {
    for (let i = 1; i <= 4; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle", `p${i}`);
      particlesContainer.appendChild(particle);
    }
  }

  let isDragging = false;
  let previousX = 0;
  let previousY = 0;
  let rotX = -15;
  let rotY = 15;

  // Generate initial transform
  updateCubeRotation();

  // Cube rotation functions
  function updateCubeRotation() {
    cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  }

  function handleMouseDown(e) {
    isDragging = true;
    previousX = e.clientX;
    previousY = e.clientY;
    document.querySelector(".cube-scene").style.cursor = "grabbing";
  }

  function handleMouseMove(e) {
    if (!isDragging) return;

    const deltaX = e.clientX - previousX;
    const deltaY = e.clientY - previousY;

    rotY += deltaX * 0.5;
    rotX -= deltaY * 0.5;

    // Limit rotation to reasonable angles
    rotX = Math.max(-60, Math.min(60, rotX));

    updateCubeRotation();

    previousX = e.clientX;
    previousY = e.clientY;
  }

  function handleMouseUp() {
    isDragging = false;
    document.querySelector(".cube-scene").style.cursor = "grab";
  }

  // Touch events for mobile
  function handleTouchStart(e) {
    if (e.touches.length === 1) {
      isDragging = true;
      previousX = e.touches[0].clientX;
      previousY = e.touches[0].clientY;
    }
  }

  function handleTouchMove(e) {
    if (!isDragging || e.touches.length !== 1) return;

    const deltaX = e.touches[0].clientX - previousX;
    const deltaY = e.touches[0].clientY - previousY;

    rotY += deltaX * 0.5;
    rotX -= deltaY * 0.5;

    // Limit rotation to reasonable angles
    rotX = Math.max(-60, Math.min(60, rotX));

    updateCubeRotation();

    previousX = e.touches[0].clientX;
    previousY = e.touches[0].clientY;

    // Prevent scrolling while rotating the cube
    e.preventDefault();
  }

  function handleTouchEnd() {
    isDragging = false;
  }

  // Control button rotation
  function rotateLeft() {
    rotY -= 90;
    updateCubeRotation();
    checkActiveFace();
  }

  function rotateRight() {
    rotY += 90;
    updateCubeRotation();
    checkActiveFace();
  }

  function rotateUp() {
    rotX -= 90;
    updateCubeRotation();
    checkActiveFace();
  }

  function rotateDown() {
    rotX += 90;
    updateCubeRotation();
    checkActiveFace();
  }

  function resetRotation() {
    rotX = -15;
    rotY = 15;
    updateCubeRotation();
    hideAllDetailPanels();
  }

  // Check which face is active based on rotation
  function checkActiveFace() {
    // Normalize angles
    let normalizedX = ((rotX % 360) + 360) % 360;
    let normalizedY = ((rotY % 360) + 360) % 360;

    // Simple algorithm to determine the most front-facing side
    let activeFace = "front";

    if (normalizedX > 45 && normalizedX < 135) {
      activeFace = "bottom";
    } else if (normalizedX > 225 && normalizedX < 315) {
      activeFace = "top";
    } else if (normalizedY > 45 && normalizedY < 135) {
      activeFace = "right";
    } else if (normalizedY > 225 && normalizedY < 315) {
      activeFace = "left";
    } else if (
      (normalizedY > 135 && normalizedY < 225) ||
      normalizedY > 315 ||
      normalizedY < 45
    ) {
      if (Math.abs(normalizedY - 180) < 45) {
        activeFace = "back";
      } else {
        activeFace = "front";
      }
    }

    return activeFace;
  }

  // Show detail panel based on active face
  function showDetailPanel(faceName) {
    hideAllDetailPanels();

    // Map face names to panel IDs
    const panelMap = {
      front: "housing",
      right: "energy",
      back: "innovation",
      left: "financial",
      top: "urbanization",
      bottom: "company",
    };

    const panelId = panelMap[faceName];
    if (panelId) {
      const panel = document.getElementById(`${panelId}-panel`);
      if (panel) {
        panel.classList.add("active");

        // Scroll to panel if it's below the fold
        const panelRect = panel.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (panelRect.top > viewportHeight * 0.8) {
          panel.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  }

  function hideAllDetailPanels() {
    detailPanels.forEach((panel) => {
      panel.classList.remove("active");
    });
  }

  // Set up event listeners
  const cubeScene = document.querySelector(".cube-scene");
  if (cubeScene) {
    cubeScene.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    cubeScene.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    cubeScene.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    document.addEventListener("touchend", handleTouchEnd);
  }

  // Button controls
  if (rotateButtons.length > 0) {
    rotateButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const direction = this.getAttribute("data-direction");
        switch (direction) {
          case "left":
            rotateLeft();
            break;
          case "right":
            rotateRight();
            break;
          case "up":
            rotateUp();
            break;
          case "down":
            rotateDown();
            break;
        }

        // Show corresponding detail panel
        const activeFace = checkActiveFace();
        showDetailPanel(activeFace);
      });
    });
  }

  if (resetButton) {
    resetButton.addEventListener("click", resetRotation);
  }

  // Action buttons in cube faces
  if (actionButtons.length > 0) {
    actionButtons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const solutionId = this.getAttribute("data-solution");
        if (solutionId) {
          showDetailPanel(solutionId);
        }
      });
    });
  }

  // Keyboard controls
  document.addEventListener("keydown", function (e) {
    if (!isElementInViewport(cube)) return;

    switch (e.key) {
      case "ArrowLeft":
        rotateLeft();
        break;
      case "ArrowRight":
        rotateRight();
        break;
      case "ArrowUp":
        rotateUp();
        break;
      case "ArrowDown":
        rotateDown();
        break;
      case "Escape":
        resetRotation();
        break;
    }

    // Show corresponding detail panel
    const activeFace = checkActiveFace();
    showDetailPanel(activeFace);
  });

  // Helper function to check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }
}

// Initialize Solution Carousel
function initSolutionCarousel() {
  const container = document.querySelector(".carousel-container");
  const cards = document.querySelectorAll(".solution-card");
  const prevBtn = document.querySelector(".nav-arrow.prev");
  const nextBtn = document.querySelector(".nav-arrow.next");
  const navDots = document.querySelectorAll(".nav-dot");

  let currentIndex = 0;
  let startX,
    moveX,
    isAnimating = false;

  // Initialize card positions
  function initCarousel() {
    updateCardClasses();

    // Add event listeners
    prevBtn.addEventListener("click", goToPrevSlide);
    nextBtn.addEventListener("click", goToNextSlide);

    // Navigation dots
    navDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        if (isAnimating || currentIndex === index) return;
        currentIndex = index;
        updateCardClasses();
      });
    });

    // Touch events
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Mouse drag events
    container.addEventListener("mousedown", handleMouseDown);

    // Keyboard navigation
    document.addEventListener("keydown", handleKeydown);
  }

  function updateCardClasses() {
    isAnimating = true;

    cards.forEach((card, index) => {
      card.classList.remove("active", "prev", "next");

      if (index === currentIndex) {
        card.classList.add("active");
      } else if (index === getPrevIndex()) {
        card.classList.add("prev");
      } else if (index === getNextIndex()) {
        card.classList.add("next");
      }
    });

    // Update navigation dots
    navDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });

    // Use GSAP to animate card transitions
    gsap.fromTo(
      ".solution-card.active .card-icon",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, delay: 0.2, ease: "back.out(1.7)" }
    );

    gsap.fromTo(
      ".solution-card.active h3",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: "power2.out" }
    );

    gsap.fromTo(
      ".solution-card.active .card-stat",
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 0.4, ease: "power2.out" }
    );

    gsap.fromTo(
      ".solution-card.active p, .solution-card.active .feature-list",
      { y: 10, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: 0.5,
        ease: "power2.out",
        onComplete: () => {
          isAnimating = false;
        },
      }
    );
  }

  function getPrevIndex() {
    return currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
  }

  function getNextIndex() {
    return currentIndex === cards.length - 1 ? 0 : currentIndex + 1;
  }

  function goToPrevSlide() {
    if (isAnimating) return;
    currentIndex = getPrevIndex();
    updateCardClasses();
  }

  function goToNextSlide() {
    if (isAnimating) return;
    currentIndex = getNextIndex();
    updateCardClasses();
  }

  // Touch event handlers
  function handleTouchStart(e) {
    if (isAnimating) return;
    startX = e.touches[0].clientX;
    moveX = 0;
  }

  function handleTouchMove(e) {
    if (startX === null) return;
    moveX = e.touches[0].clientX - startX;
  }

  function handleTouchEnd() {
    if (startX === null || isAnimating) return;

    if (moveX < -50) {
      goToNextSlide();
    } else if (moveX > 50) {
      goToPrevSlide();
    }

    startX = null;
    moveX = 0;
  }

  // Mouse drag event handlers
  function handleMouseDown(e) {
    if (isAnimating) return;
    startX = e.clientX;
    moveX = 0;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(e) {
    if (startX === null) return;
    moveX = e.clientX - startX;
  }

  function handleMouseUp() {
    if (startX === null || isAnimating) return;

    if (moveX < -50) {
      goToNextSlide();
    } else if (moveX > 50) {
      goToPrevSlide();
    }

    startX = null;
    moveX = 0;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  // Keyboard navigation
  function handleKeydown(e) {
    // Only handle keyboard navigation when the solution section is in viewport
    const solutionSection = document.querySelector(".solution-carousel");
    if (!isElementInViewport(solutionSection)) return;

    if (e.key === "ArrowLeft") {
      goToPrevSlide();
    } else if (e.key === "ArrowRight") {
      goToNextSlide();
    }
  }

  // Initialize carousel
  if (cards.length > 0) {
    initCarousel();

    // Add subtle floating animation to active card
    function animateActiveCard() {
      gsap.to(".solution-card.active .card-inner", {
        y: -10,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }

    // Wait for initial animations to complete
    setTimeout(animateActiveCard, 1200);
  }
}

function initSolutionsStatic() {
  const solutionsSection = document.querySelector(".solutions-static");
  if (!solutionsSection) return;

  const navTabs = document.querySelectorAll(".nav-tab");
  const panels = document.querySelectorAll(".solution-panel");

  // Initialize panels
  panels.forEach((panel, index) => {
    if (index === 0) {
      panel.classList.add("active");
    } else {
      panel.classList.remove("active");
    }
  });

  // Tab click event
  navTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Get the panel ID from the tab
      const targetPanelId = this.getAttribute("data-panel");

      // Remove active class from all tabs and panels
      navTabs.forEach((tab) => tab.classList.remove("active"));
      panels.forEach((panel) => panel.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      // Activate the corresponding panel
      const targetPanel = document.getElementById(`${targetPanelId}-panel`);
      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });

  // Initialize feature card hover animations
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "var(--shadow-lg)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "var(--shadow-md)";
    });
  });

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    // Only handle keyboard navigation when the solution section is in viewport
    if (!isInViewport(solutionsSection)) return;

    const activeTab = document.querySelector(".nav-tab.active");
    if (!activeTab) return;

    const currentIndex = Array.from(navTabs).indexOf(activeTab);
    let nextIndex = currentIndex;

    // Left/Right arrow keys
    if (e.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + navTabs.length) % navTabs.length;
    } else if (e.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % navTabs.length;
    } else {
      return; // If not arrow keys, do nothing
    }

    // Trigger click on the next tab
    navTabs[nextIndex].click();
  });
}

// Helper function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

function initExperienceFeatures() {
  const featureItems = document.querySelectorAll(".experience .feature-item");

  featureItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.classList.add("active");
    });

    item.addEventListener("mouseleave", function () {
      this.classList.remove("active");
    });
  });
}

function initForWhoTabs() {
  const personaTabs = document.querySelectorAll(".persona-tab");
  const personaPanels = document.querySelectorAll(".persona-panel");

  personaTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const target = this.getAttribute("data-target");

      // Remove active class from all tabs and panels
      personaTabs.forEach((tab) => tab.classList.remove("active"));
      personaPanels.forEach((panel) => panel.classList.remove("active"));

      // Add active class to clicked tab and corresponding panel
      this.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });
}

function initImpactCounters() {
  const counters = document.querySelectorAll(".impact .counter");

  // Only run animation when counters are in viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute("data-target"));
          let count = 0;
          const interval = setInterval(() => {
            count += Math.ceil(target / 30);
            counter.innerText = count;

            if (count >= target) {
              counter.innerText = target;
              clearInterval(interval);
            }
          }, 30);

          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

function initCtaOptions() {
  const ctaOptions = document.querySelectorAll(".cta-option");
  const contactForm = document.getElementById("contactForm");
  const formHeader = document.querySelector(".form-header h3");
  const formDesc = document.querySelector(".form-header p");
  const submitBtn = document.querySelector(".submit-btn");

  ctaOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const formType = this.getAttribute("data-form");

      // Remove active class from all options
      ctaOptions.forEach((opt) => opt.classList.remove("active"));

      // Add active class to clicked option
      this.classList.add("active");

      // Update form UI based on selected option
      if (formType === "tour") {
        formHeader.textContent = "Book Your Tour";
        formDesc.textContent = "Experience TACH homes in person";
        submitBtn.textContent = "Book My Tour";
      } else if (formType === "info") {
        formHeader.textContent = "Request Information";
        formDesc.textContent = "Get detailed information about our solutions";
        submitBtn.textContent = "Send Request";
      } else if (formType === "invest") {
        formHeader.textContent = "Investment Inquiry";
        formDesc.textContent = "Learn about investment opportunities";
        submitBtn.textContent = "Submit Inquiry";
      }
    });
  });
}

function initModelTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const modelPanels = document.querySelectorAll(".model-panel");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modelId = this.getAttribute("data-model");

      // Remove active class from all buttons and panels
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      modelPanels.forEach((panel) => panel.classList.remove("active"));

      // Add active class to clicked button and corresponding panel
      this.classList.add("active");
      document.getElementById(`${modelId}-panel`).classList.add("active");
    });
  });
}

// Language switcher functionality
function initLanguageSwitcher() {
  const langToggle = document.getElementById("lang-toggle");
  const currentLang = document.getElementById("current-lang");
  const langOptions = document.querySelectorAll(".lang-option");

  // Set initial language based on localStorage or default
  const savedLang = localStorage.getItem("tach-language") || "en";
  currentLang.textContent = savedLang.toUpperCase();

  // Update document language attribute
  document.documentElement.setAttribute("lang", savedLang);

  // Mark the active language option
  langOptions.forEach((option) => {
    if (option.getAttribute("data-lang") === savedLang) {
      option.classList.add("active");
    } else {
      option.classList.remove("active");
    }

    // Add click event listener
    option.addEventListener("click", function (e) {
      e.preventDefault();
      const lang = this.getAttribute("data-lang");

      // Update UI
      currentLang.textContent = lang.toUpperCase();
      langOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");

      // Change the language
      if (typeof window.changeLanguage === "function") {
        // Call the changeLanguage function from i18n/main.js
        window.changeLanguage(lang);
      } else {
        console.warn(
          "Language switching function not available. Loading language module dynamically..."
        );
        // Fallback: try to load the language module dynamically
        import("./i18n/main.js")
          .then((module) => {
            if (typeof window.changeLanguage === "function") {
              window.changeLanguage(lang);
            } else {
              // Basic fallback if module loading fails
              localStorage.setItem("tach-language", lang);
              document.documentElement.setAttribute("lang", lang);
              location.reload(); // Reload page to apply language change
            }
          })
          .catch((err) => {
            console.error("Failed to load language module:", err);
            // Most basic fallback
            localStorage.setItem("tach-language", lang);
            document.documentElement.setAttribute("lang", lang);
            location.reload(); // Reload page as last resort
          });
      }
    });
  });

  // Make language dropdown also work on mobile
  if (langToggle) {
    langToggle.addEventListener("click", function (e) {
      // Prevent immediate closing of dropdown
      e.stopPropagation();
      const menu = this.nextElementSibling;

      // Toggle menu visibility explicitly (for mobile)
      if (menu.style.opacity === "1") {
        menu.style.opacity = "0";
        menu.style.visibility = "hidden";
        menu.style.transform = "translateY(10px)";
      } else {
        menu.style.opacity = "1";
        menu.style.visibility = "visible";
        menu.style.transform = "translateY(0)";
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      const menu = document.querySelector(".language-menu");
      if (menu && !e.target.closest(".language-switcher")) {
        menu.style.opacity = "0";
        menu.style.visibility = "hidden";
        menu.style.transform = "translateY(10px)";
      }
    });
  }

  // Initialize language on page load
  if (savedLang && typeof window.changeLanguage === "function") {
    window.changeLanguage(savedLang);
  }
}
