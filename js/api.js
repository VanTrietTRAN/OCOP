// ========================================
// API SERVICE - TRÉ BÀ ĐỆ
// Centralized API communication
// ========================================

class APIService {
    constructor() {
        this.baseURL = CONFIG.API.BASE_URL;
        this.timeout = CONFIG.API.TIMEOUT;
    }

    /**
     * Generic request method with error handling
     */
    async request(endpoint, options = {}) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            signal: controller.signal
        };

        const config = { ...defaultOptions, ...options };

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, config);
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new Error('Request timeout');
            }
            
            console.error('API Error:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * GET request
     */
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    /**
     * POST request
     */
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    /**
     * PUT request
     */
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    /**
     * DELETE request
     */
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }

    // ========================================
    // PRODUCT ENDPOINTS
    // ========================================

    async getProducts() {
        return this.get(CONFIG.API.ENDPOINTS.PRODUCTS);
    }

    async getProduct(id) {
        return this.get(`${CONFIG.API.ENDPOINTS.PRODUCTS}/${id}`);
    }

    // ========================================
    // ORDER ENDPOINTS
    // ========================================

    async createOrder(orderData) {
        // Validate order data
        if (!orderData.customerName || !orderData.phone || !orderData.items || orderData.items.length === 0) {
            return {
                success: false,
                error: 'Thông tin đơn hàng không đầy đủ'
            };
        }

        return this.post(CONFIG.API.ENDPOINTS.ORDERS, orderData);
    }

    async getOrders() {
        return this.get(CONFIG.API.ENDPOINTS.ORDERS);
    }

    async getOrder(id) {
        return this.get(`${CONFIG.API.ENDPOINTS.ORDERS}/${id}`);
    }

    // ========================================
    // CONTACT ENDPOINTS
    // ========================================

    async sendContact(contactData) {
        // Validate contact data
        if (!contactData.name || !contactData.phone || !contactData.subject || !contactData.message) {
            return {
                success: false,
                error: 'Vui lòng điền đầy đủ thông tin'
            };
        }

        // Validate email if provided
        if (contactData.email && !Utils.isValidEmail(contactData.email)) {
            return {
                success: false,
                error: 'Email không hợp lệ'
            };
        }

        // Validate phone
        if (!Utils.isValidPhone(contactData.phone)) {
            return {
                success: false,
                error: 'Số điện thoại không hợp lệ'
            };
        }

        return this.post(CONFIG.API.ENDPOINTS.CONTACT, contactData);
    }

    async getContacts() {
        return this.get(CONFIG.API.ENDPOINTS.CONTACTS);
    }

    // ========================================
    // STATISTICS ENDPOINTS
    // ========================================

    async getStats() {
        return this.get(CONFIG.API.ENDPOINTS.STATS);
    }

    // ========================================
    // HEALTH CHECK
    // ========================================

    async checkHealth() {
        return this.get(CONFIG.API.ENDPOINTS.HEALTH);
    }
}

// Create singleton instance
const API = new APIService();

// Freeze API instance
Object.freeze(API);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API;
}
