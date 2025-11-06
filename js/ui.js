// ========================================
// UI MANAGER - TRÉ BÀ ĐỆ
// User interface management
// ========================================

class UIManager {
    constructor() {
        this.elements = {};
        this.init();
    }

    /**
     * Initialize and cache DOM elements
     */
    init() {
        // Cache commonly used elements
        this.elements = {
            // Cart
            cartBtn: document.getElementById('cartBtn'),
            cartPopup: document.getElementById('cartPopup'),
            closeCart: document.getElementById('closeCart'),
            cartCount: document.getElementById('cartCount'),
            cartItems: document.getElementById('cartItems'),
            cartTotal: document.getElementById('cartTotal'),
            
            // Mobile menu
            mobileMenuBtn: document.getElementById('mobileMenuBtn'),
            navMenu: document.querySelector('.nav-menu'),
            
            // Forms
            contactForm: document.getElementById('contactForm'),
            formSuccess: document.getElementById('formSuccess')
        };
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        const styles = {
            position: 'fixed',
            top: '100px',
            right: '20px',
            backgroundColor: type === 'success' ? CONFIG.COLORS.PRIMARY : CONFIG.COLORS.ACCENT,
            color: CONFIG.COLORS.WHITE,
            padding: '15px 25px',
            borderRadius: '10px',
            zIndex: '9999',
            animation: 'slideIn 0.3s ease',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
            maxWidth: '300px',
            wordWrap: 'break-word'
        };

        Object.assign(notification.style, styles);
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, CONFIG.NOTIFICATIONS.DURATION);
    }

    /**
     * Show loading state
     */
    showLoading(element, text = 'Đang xử lý...') {
        if (!element) return;

        const originalContent = element.innerHTML;
        element.dataset.originalContent = originalContent;
        element.disabled = true;
        element.innerHTML = `
            <span class="spinner"></span>
            <span>${text}</span>
        `;
    }

    /**
     * Hide loading state
     */
    hideLoading(element) {
        if (!element || !element.dataset.originalContent) return;

        element.disabled = false;
        element.innerHTML = element.dataset.originalContent;
        delete element.dataset.originalContent;
    }

    /**
     * Show error message
     */
    showError(message, element = null) {
        if (element) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            errorDiv.style.cssText = `
                color: ${CONFIG.COLORS.ACCENT};
                padding: 10px;
                margin-top: 10px;
                border-radius: 5px;
                background-color: rgba(217, 4, 41, 0.1);
            `;
            
            // Remove existing error messages
            const existing = element.querySelector('.error-message');
            if (existing) existing.remove();
            
            element.appendChild(errorDiv);
            
            setTimeout(() => errorDiv.remove(), 5000);
        } else {
            this.showNotification(message, 'error');
        }
    }

    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        if (this.elements.navMenu) {
            this.elements.navMenu.classList.toggle('active');
        }
    }

    /**
     * Open cart popup
     */
    openCart() {
        if (this.elements.cartPopup) {
            this.elements.cartPopup.classList.add('active');
        }
    }

    /**
     * Close cart popup
     */
    closeCart() {
        if (this.elements.cartPopup) {
            this.elements.cartPopup.classList.remove('active');
        }
    }

    /**
     * Update cart count badge
     */
    updateCartCount(count) {
        if (this.elements.cartCount) {
            this.elements.cartCount.textContent = count;
        }
    }

    /**
     * Render cart items
     */
    renderCartItems(items) {
        if (!this.elements.cartItems) return;

        if (items.length === 0) {
            this.elements.cartItems.innerHTML = '<p class="empty-cart">Giỏ hàng trống</p>';
            if (this.elements.cartTotal) {
                this.elements.cartTotal.textContent = '0 VNĐ';
            }
            return;
        }

        this.elements.cartItems.innerHTML = items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" 
                         onerror="this.src='${CONFIG.PRODUCTS.DEFAULT_IMAGE}'">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${Utils.sanitizeHTML(item.name)}</div>
                    <div class="cart-item-price">
                        ${Utils.formatPrice(item.price)} x ${item.quantity}
                    </div>
                </div>
                <button class="cart-item-remove" onclick="UI.removeFromCart('${item.id}')" 
                        aria-label="Xóa sản phẩm">
                    ×
                </button>
            </div>
        `).join('');
    }

    /**
     * Update cart total
     */
    updateCartTotal(total) {
        if (this.elements.cartTotal) {
            this.elements.cartTotal.textContent = Utils.formatPrice(total);
        }
    }

    /**
     * Remove item from cart UI
     */
    removeFromCart(id) {
        try {
            Cart.removeItem(id);
            this.showNotification('Đã xóa sản phẩm khỏi giỏ hàng');
        } catch (error) {
            this.showError(error.message);
        }
    }

    /**
     * Scroll reveal animation
     */
    initScrollReveal() {
        const reveals = document.querySelectorAll('.scroll-reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        reveals.forEach(el => revealObserver.observe(el));
    }

    /**
     * Lazy load images
     */
    initLazyLoad() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('fade-in');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    /**
     * Initialize all UI features
     */
    initializeAll() {
        // Mobile menu
        if (this.elements.mobileMenuBtn) {
            this.elements.mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Close mobile menu on link click
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                if (this.elements.navMenu) {
                    this.elements.navMenu.classList.remove('active');
                }
            });
        });

        // Cart buttons
        if (this.elements.cartBtn) {
            this.elements.cartBtn.addEventListener('click', () => this.openCart());
        }

        if (this.elements.closeCart) {
            this.elements.closeCart.addEventListener('click', () => this.closeCart());
        }

        // Close cart when clicking outside
        if (this.elements.cartPopup) {
            this.elements.cartPopup.addEventListener('click', (e) => {
                if (e.target === this.elements.cartPopup) {
                    this.closeCart();
                }
            });
        }

        // Initialize animations
        this.initScrollReveal();
        this.initLazyLoad();

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href.startsWith('#article-')) return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    Utils.scrollTo(target, 80);
                }
            });
        });

        console.log('✅ UI Manager initialized');
    }
}

// Create singleton instance
const UI = new UIManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIManager;
}
