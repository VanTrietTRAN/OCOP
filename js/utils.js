// ========================================
// UTILITIES - TRÉ BÀ ĐỆ
// Common utility functions
// ========================================

const Utils = {
    /**
     * Format price to Vietnamese currency
     */
    formatPrice(price) {
        if (!price || isNaN(price)) return 'Liên hệ';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    },

    /**
     * Format Vietnamese phone number
     */
    formatPhone(phone) {
        if (!phone) return '';
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
    },

    /**
     * Format date to Vietnamese format
     */
    formatDate(date, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            ...options
        };
        return new Date(date).toLocaleDateString('vi-VN', defaultOptions);
    },

    /**
     * Debounce function
     */
    debounce(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle function
     */
    throttle(func, limit = 300) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Copy to clipboard
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy:', err);
            return false;
        }
    },

    /**
     * Validate email
     */
    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    /**
     * Validate phone number (Vietnamese)
     */
    isValidPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length >= 10 && cleaned.length <= 11;
    },

    /**
     * Sanitize HTML to prevent XSS
     */
    sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    },

    /**
     * Get query parameter from URL
     */
    getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    },

    /**
     * Set query parameter to URL
     */
    setQueryParam(param, value) {
        const url = new URL(window.location);
        url.searchParams.set(param, value);
        window.history.pushState({}, '', url);
    },

    /**
     * Local Storage helpers
     */
    storage: {
        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (err) {
                console.error('Storage get error:', err);
                return defaultValue;
            }
        },

        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (err) {
                console.error('Storage set error:', err);
                return false;
            }
        },

        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (err) {
                console.error('Storage remove error:', err);
                return false;
            }
        },

        clear() {
            try {
                localStorage.clear();
                return true;
            } catch (err) {
                console.error('Storage clear error:', err);
                return false;
            }
        }
    },

    /**
     * Scroll to element smoothly
     */
    scrollTo(element, offset = 0) {
        const target = typeof element === 'string' 
            ? document.querySelector(element) 
            : element;
        
        if (target) {
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top,
                behavior: 'smooth'
            });
        }
    },

    /**
     * Check if element is in viewport
     */
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    /**
     * Generate unique ID
     */
    generateId(prefix = '') {
        return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    },

    /**
     * Wait for specified time
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Share on social media
     */
    share: {
        facebook(url = window.location.href, text = '') {
            window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
                '_blank',
                'width=600,height=400'
            );
        },

        zalo(url = window.location.href) {
            window.open(
                `https://zalo.me/share?url=${encodeURIComponent(url)}`,
                '_blank',
                'width=600,height=400'
            );
        },

        email(subject = '', body = '') {
            window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }
    },

    /**
     * Device detection
     */
    device: {
        isMobile() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },

        isTablet() {
            return /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;
        },

        isDesktop() {
            return !this.isMobile() && !this.isTablet();
        }
    },

    /**
     * Performance helpers
     */
    performance: {
        mark(name) {
            if (performance && performance.mark) {
                performance.mark(name);
            }
        },

        measure(name, startMark, endMark) {
            if (performance && performance.measure) {
                performance.measure(name, startMark, endMark);
            }
        },

        getEntries() {
            if (performance && performance.getEntriesByType) {
                return performance.getEntriesByType('measure');
            }
            return [];
        }
    }
};

// Freeze utilities to prevent modifications
Object.freeze(Utils);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}
