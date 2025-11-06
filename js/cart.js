// ========================================
// CART MANAGER - TRÉ BÀ ĐỆ
// Shopping cart management
// ========================================

class CartManager {
    constructor() {
        this.storageKey = CONFIG.STORAGE_KEYS.CART;
        this.cart = this.loadCart();
        this.listeners = [];
    }

    /**
     * Load cart from localStorage
     */
    loadCart() {
        return Utils.storage.get(this.storageKey, []);
    }

    /**
     * Save cart to localStorage
     */
    saveCart() {
        Utils.storage.set(this.storageKey, this.cart);
        this.notifyListeners();
    }

    /**
     * Subscribe to cart changes
     */
    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
        };
    }

    /**
     * Notify all listeners
     */
    notifyListeners() {
        this.listeners.forEach(callback => callback(this.cart));
    }

    /**
     * Get all items in cart
     */
    getItems() {
        return [...this.cart];
    }

    /**
     * Get item by ID
     */
    getItem(id) {
        return this.cart.find(item => item.id === id);
    }

    /**
     * Add item to cart
     */
    addItem(product, quantity = 1) {
        // Validate quantity
        if (quantity < 1 || quantity > CONFIG.CART.MAX_QUANTITY) {
            throw new Error(`Số lượng phải từ 1 đến ${CONFIG.CART.MAX_QUANTITY}`);
        }

        // Check if item exists
        const existingItem = this.getItem(product.id);

        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            
            if (newQuantity > CONFIG.CART.MAX_QUANTITY) {
                throw new Error(`Số lượng tối đa là ${CONFIG.CART.MAX_QUANTITY}`);
            }

            existingItem.quantity = newQuantity;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: quantity,
                image: product.image || CONFIG.PRODUCTS.DEFAULT_IMAGE
            });
        }

        this.saveCart();
        return true;
    }

    /**
     * Update item quantity
     */
    updateQuantity(id, quantity) {
        if (quantity < 1 || quantity > CONFIG.CART.MAX_QUANTITY) {
            throw new Error(`Số lượng phải từ 1 đến ${CONFIG.CART.MAX_QUANTITY}`);
        }

        const item = this.getItem(id);
        if (item) {
            item.quantity = quantity;
            this.saveCart();
            return true;
        }

        return false;
    }

    /**
     * Remove item from cart
     */
    removeItem(id) {
        const index = this.cart.findIndex(item => item.id === id);
        if (index !== -1) {
            this.cart.splice(index, 1);
            this.saveCart();
            return true;
        }
        return false;
    }

    /**
     * Clear entire cart
     */
    clear() {
        this.cart = [];
        this.saveCart();
    }

    /**
     * Get total items count
     */
    getTotalItems() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    /**
     * Get total price
     */
    getTotalPrice() {
        return this.cart.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
    }

    /**
     * Check if cart is empty
     */
    isEmpty() {
        return this.cart.length === 0;
    }

    /**
     * Get cart summary
     */
    getSummary() {
        const totalItems = this.getTotalItems();
        const totalPrice = this.getTotalPrice();
        const freeShipping = totalPrice >= CONFIG.CART.FREE_SHIPPING_THRESHOLD;

        return {
            items: this.getItems(),
            totalItems,
            totalPrice,
            formattedTotal: Utils.formatPrice(totalPrice),
            freeShipping,
            shippingThreshold: CONFIG.CART.FREE_SHIPPING_THRESHOLD
        };
    }

    /**
     * Validate cart before checkout
     */
    validate() {
        const errors = [];

        if (this.isEmpty()) {
            errors.push('Giỏ hàng trống');
        }

        // Check for items with invalid prices
        const invalidItems = this.cart.filter(item => !item.price || item.price <= 0);
        if (invalidItems.length > 0) {
            errors.push('Một số sản phẩm không có giá, vui lòng liên hệ');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    /**
     * Prepare order data for API
     */
    prepareOrderData(customerInfo) {
        return {
            ...customerInfo,
            items: this.getItems().map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            totalAmount: this.getTotalPrice()
        };
    }
}

// Create singleton instance
const Cart = new CartManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CartManager;
}
