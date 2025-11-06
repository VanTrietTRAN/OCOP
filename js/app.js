// ========================================
// APPLICATION INITIALIZATION - TRÉ BÀ ĐỆ
// Main entry point for the application
// ========================================

class Application {
    constructor() {
        this.initialized = false;
    }

    /**
     * Initialize the application
     */
    async init() {
        if (this.initialized) {
            console.warn('⚠️ Application already initialized');
            return;
        }

        console.log('🚀 Initializing Tré Bà Đệ Application...');

        try {
            // 1. Subscribe cart to UI updates
            this.setupCartSubscription();

            // 2. Initialize UI components
            UI.initializeAll();

            // 3. Setup all event listeners
            this.setupEventListeners();

            // 4. Load products if on products page
            await this.loadPageSpecificData();

            // 5. Check backend health
            await this.checkBackendHealth();

            this.initialized = true;
            console.log('✅ Application initialized successfully');
        } catch (error) {
            console.error('❌ Application initialization failed:', error);
            UI.showNotification('Có lỗi xảy ra khi khởi động ứng dụng', 'error');
        }
    }

    /**
     * Setup cart subscription to update UI
     */
    setupCartSubscription() {
        Cart.subscribe((items) => {
            const summary = Cart.getSummary();
            
            // Update cart counter
            UI.updateCartCount(summary.totalItems);
            
            // Update cart items display
            UI.renderCartItems(items);
            
            // Update cart total
            UI.updateCartTotal(summary.totalPrice);

            console.log(`🛒 Cart updated: ${summary.totalItems} items, ${Utils.formatPrice(summary.totalPrice)}`);
        });

        // Initial render
        const items = Cart.getItems();
        const summary = Cart.getSummary();
        UI.updateCartCount(summary.totalItems);
        UI.renderCartItems(items);
        UI.updateCartTotal(summary.totalPrice);
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Contact form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
        }

        // Checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.handleCheckout());
        }

        // Add to cart buttons (all pages)
        document.querySelectorAll('.add-to-cart, .add-to-cart-large').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleAddToCart(e));
        });

        // Quantity controls on product detail page
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleQuantityChange(e));
        });

        console.log('✅ Event listeners registered');
    }

    /**
     * Handle add to cart
     */
    handleAddToCart(event) {
        event.preventDefault();
        
        const button = event.currentTarget;
        const productId = button.dataset.id;
        const productName = button.dataset.name;
        const productPrice = parseFloat(button.dataset.price);
        
        // Get quantity from input (for product detail page) or default to 1
        const qtyInput = button.closest('.product-detail-card')?.querySelector('.quantity-input input');
        const quantity = qtyInput ? parseInt(qtyInput.value) : 1;

        try {
            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                image: `images/${productId}.jpg`
            };

            Cart.addItem(product, quantity);
            
            UI.showNotification(`Đã thêm ${productName} vào giỏ hàng`);
            
            // Animate button
            button.classList.add('added');
            setTimeout(() => button.classList.remove('added'), 1000);
            
        } catch (error) {
            UI.showError(error.message);
        }
    }

    /**
     * Handle quantity change
     */
    handleQuantityChange(event) {
        const button = event.currentTarget;
        const input = button.parentElement.querySelector('input');
        const currentValue = parseInt(input.value);
        
        if (button.dataset.action === 'increase') {
            input.value = Math.min(currentValue + 1, CONFIG.CART.MAX_QUANTITY);
        } else if (button.dataset.action === 'decrease') {
            input.value = Math.max(currentValue - 1, 1);
        }
    }

    /**
     * Handle checkout process
     */
    async handleCheckout() {
        // Validate cart
        const validation = Cart.validate();
        if (!validation.isValid) {
            UI.showError(validation.message);
            return;
        }

        // Get customer info (you can add a modal for this)
        const customerInfo = await this.showCheckoutModal();
        if (!customerInfo) return; // User cancelled

        try {
            const checkoutBtn = document.getElementById('checkoutBtn');
            UI.showLoading(checkoutBtn, 'Đang xử lý...');

            // Prepare order data
            const orderData = Cart.prepareOrderData(customerInfo);

            // Send to backend
            const result = await API.createOrder(orderData);

            UI.hideLoading(checkoutBtn);

            if (result.success) {
                UI.showNotification('Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm.');
                Cart.clear();
                UI.closeCart();
            } else {
                throw new Error(result.error || 'Đặt hàng thất bại');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            UI.showError(error.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.');
            UI.hideLoading(document.getElementById('checkoutBtn'));
        }
    }

    /**
     * Show checkout modal (simplified version)
     */
    async showCheckoutModal() {
        // For now, use prompt (in production, use a proper modal)
        const name = prompt('Họ và tên:');
        if (!name) return null;

        const phone = prompt('Số điện thoại:');
        if (!phone || !Utils.isValidPhone(phone)) {
            UI.showError('Số điện thoại không hợp lệ');
            return null;
        }

        const address = prompt('Địa chỉ giao hàng:');
        if (!address) return null;

        return { name, phone, address, email: '' };
    }

    /**
     * Handle contact form submission
     */
    async handleContactSubmit(event) {
        event.preventDefault();
        
        const form = event.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Get form data
        const formData = {
            name: form.querySelector('#name')?.value.trim(),
            email: form.querySelector('#email')?.value.trim(),
            phone: form.querySelector('#phone')?.value.trim(),
            message: form.querySelector('#message')?.value.trim()
        };

        // Validate
        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            UI.showError('Vui lòng điền đầy đủ thông tin', form);
            return;
        }

        if (!Utils.isValidEmail(formData.email)) {
            UI.showError('Email không hợp lệ', form);
            return;
        }

        if (!Utils.isValidPhone(formData.phone)) {
            UI.showError('Số điện thoại không hợp lệ', form);
            return;
        }

        try {
            UI.showLoading(submitBtn, 'Đang gửi...');

            const result = await API.sendContact(formData);

            UI.hideLoading(submitBtn);

            if (result.success) {
                // Show success message
                const successDiv = document.getElementById('formSuccess');
                if (successDiv) {
                    successDiv.style.display = 'block';
                    successDiv.textContent = 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.';
                }

                // Reset form
                form.reset();

                // Auto hide success message
                setTimeout(() => {
                    if (successDiv) successDiv.style.display = 'none';
                }, 5000);

                UI.showNotification('Gửi liên hệ thành công!');
            } else {
                throw new Error(result.error || 'Gửi liên hệ thất bại');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            UI.showError(error.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.', form);
            UI.hideLoading(submitBtn);
        }
    }

    /**
     * Load page-specific data
     */
    async loadPageSpecificData() {
        const currentPage = this.getCurrentPage();
        
        switch (currentPage) {
            case 'products':
                await this.loadProducts();
                break;
            case 'index':
                await this.loadFeaturedProducts();
                break;
        }
    }

    /**
     * Get current page name
     */
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '') || 'index';
        return page;
    }

    /**
     * Load products for products page
     */
    async loadProducts() {
        try {
            const products = await API.getProducts();
            console.log(`✅ Loaded ${products.length} products`);
            // Products are already in HTML, this is for future dynamic loading
        } catch (error) {
            console.error('Failed to load products:', error);
        }
    }

    /**
     * Load featured products for homepage
     */
    async loadFeaturedProducts() {
        try {
            const products = await API.getProducts();
            console.log(`✅ Loaded ${products.length} featured products`);
            // Products are already in HTML, this is for future dynamic loading
        } catch (error) {
            console.error('Failed to load featured products:', error);
        }
    }

    /**
     * Check backend health
     */
    async checkBackendHealth() {
        try {
            const health = await API.checkHealth();
            if (health.status === 'ok') {
                console.log('✅ Backend is healthy');
            }
        } catch (error) {
            console.warn('⚠️ Backend is not available:', error.message);
            // Don't show error to user, app can work without backend for browsing
        }
    }
}

// Create singleton instance
const App = new Application();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Application;
}
