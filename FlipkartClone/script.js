// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize banner slider
    initBannerSlider();

    // Initialize countdown timer
    initCountdownTimer();

    // Initialize login modal
    initLoginModal();

    // Initialize product hover effects
    initProductHoverEffects();

    // Initialize add to cart functionality
    initAddToCart();

    // Initialize mobile menu
    initMobileMenu();

    // Banner slider functionality
    function initBannerSlider() {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentSlide = 0;

        // Show first slide
        if (slides.length > 0) {
            slides[0].classList.add('active');
        }

        // Auto slide change
        let slideInterval = setInterval(nextSlide, 5000);

        // Next slide function
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        // Previous slide function
        function prevSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        // Event listeners for buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                clearInterval(slideInterval);
                nextSlide();
                slideInterval = setInterval(nextSlide, 5000);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                clearInterval(slideInterval);
                prevSlide();
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
    }

    // Countdown timer functionality
    function initCountdownTimer() {
        const timerElement = document.getElementById('deals-timer');
        if (!timerElement) return;

        // Set end time to 24 hours from now
        const endTime = new Date();
        endTime.setHours(endTime.getHours() + 24);

        function updateTimer() {
            const now = new Date();
            const diff = endTime - now;

            if (diff <= 0) {
                timerElement.textContent = "Deal Ended";
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            timerElement.textContent = `${hours}h ${minutes}m ${seconds}s Left`;
        }

        // Update timer immediately and then every second
        updateTimer();
        setInterval(updateTimer, 1000);
    }

    // Login modal functionality
    function initLoginModal() {
        const loginBtn = document.querySelector('.login-btn');
        const loginModal = document.getElementById('loginModal');
        const closeModal = document.querySelector('.close-modal');

        if (!loginBtn || !loginModal || !closeModal) return;

        loginBtn.addEventListener('click', function() {
            loginModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        closeModal.addEventListener('click', function() {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Prevent form submission
        const loginForm = document.querySelector('.login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Login functionality would be implemented in a real application.');
            });
        }
    }

    // Product hover effects
    function initProductHoverEffects() {
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const actions = this.querySelector('.product-actions');
                if (actions) {
                    actions.style.opacity = '1';
                }
            });

            card.addEventListener('mouseleave', function() {
                const actions = this.querySelector('.product-actions');
                if (actions) {
                    actions.style.opacity = '0';
                }
            });
        });

        // Wishlist button functionality
        const wishlistBtns = document.querySelectorAll('.wishlist-btn');
        wishlistBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                this.innerHTML = '<i class="fa fa-heart" style="color: #ff6161;"></i>';
                showToast('Product added to wishlist!');
            });
        });

        // Quick view button functionality
        const quickViewBtns = document.querySelectorAll('.quick-view-btn');
        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const productName = this.closest('.product-card').querySelector('.product-title').textContent;
                alert(`Quick view for ${productName} would open in a real application.`);
            });
        });
    }

    // Add to cart functionality
    function initAddToCart() {
        const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
        const cartLink = document.querySelector('.cart-link');
        let cartCount = 0;

        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                cartCount++;
                updateCartCount();

                const productName = this.closest('.product-info').querySelector('.product-title').textContent;
                showToast(`${productName} added to cart!`);

                // Change button text temporarily
                const originalText = this.textContent;
                this.textContent = 'Added!';
                this.style.backgroundColor = '#388e3c';

                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '#ff9f00';
                }, 2000);
            });
        });

        function updateCartCount() {
            if (cartCount > 0 && cartLink) {
                // Check if count element already exists
                let countElement = cartLink.querySelector('.cart-count');

                if (!countElement) {
                    countElement = document.createElement('span');
                    countElement.className = 'cart-count';
                    cartLink.appendChild(countElement);
                }

                countElement.textContent = cartCount;
                countElement.style.backgroundColor = '#ff6161';
                countElement.style.color = 'white';
                countElement.style.borderRadius = '50%';
                countElement.style.padding = '2px 6px';
                countElement.style.fontSize = '12px';
                countElement.style.marginLeft = '5px';
            }
        }
    }

    // Toast notification function
    function showToast(message) {
        // Check if a toast container already exists
        let toastContainer = document.querySelector('.toast-container');

        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            toastContainer.style.position = 'fixed';
            toastContainer.style.bottom = '20px';
            toastContainer.style.right = '20px';
            toastContainer.style.zIndex = '1000';
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.backgroundColor = '#388e3c';
        toast.style.color = 'white';
        toast.style.padding = '12px 20px';
        toast.style.borderRadius = '4px';
        toast.style.marginTop = '10px';
        toast.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';

        toastContainer.appendChild(toast);

        // Fade in
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                toastContainer.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Mobile menu functionality
    function initMobileMenu() {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fa fa-bars"></i>';
        mobileMenuBtn.style.display = 'none';
        mobileMenuBtn.style.backgroundColor = 'transparent';
        mobileMenuBtn.style.border = 'none';
        mobileMenuBtn.style.color = 'white';
        mobileMenuBtn.style.fontSize = '20px';
        mobileMenuBtn.style.cursor = 'pointer';

        const headerActions = document.querySelector('.header-actions');
        if (headerActions) {
            headerActions.parentNode.insertBefore(mobileMenuBtn, headerActions);

            // Show/hide based on screen size
            function checkScreenSize() {
                if (window.innerWidth <= 768) {
                    mobileMenuBtn.style.display = 'block';
                    headerActions.style.display = 'none';
                } else {
                    mobileMenuBtn.style.display = 'none';
                    headerActions.style.display = 'flex';
                    headerActions.classList.remove('active');
                }
            }

            // Initial check
            checkScreenSize();

            // Check on resize
            window.addEventListener('resize', checkScreenSize);

            // Toggle menu
            mobileMenuBtn.addEventListener('click', function() {
                if (headerActions.classList.contains('active')) {
                    headerActions.classList.remove('active');
                    headerActions.style.display = 'none';
                } else {
                    headerActions.classList.add('active');
                    headerActions.style.display = 'flex';
                    headerActions.style.flexDirection = 'column';
                    headerActions.style.position = 'absolute';
                    headerActions.style.top = '100%';
                    headerActions.style.right = '0';
                    headerActions.style.backgroundColor = '#2874f0';
                    headerActions.style.padding = '15px';
                    headerActions.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
                    headerActions.style.zIndex = '100';
                    headerActions.style.gap = '15px';
                }
            });
        }
    }
});