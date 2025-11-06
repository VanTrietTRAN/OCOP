// ========================================
// CONFIGURATION FILE - TRÉ BÀ ĐỆ
// Centralized configuration for the entire application
// ========================================

const CONFIG = {
    // API Configuration
    API: {
        BASE_URL: window.location.hostname === 'localhost' 
            ? 'http://localhost:3000' 
            : 'https://api.trebade.com', // Replace with production URL
        TIMEOUT: 10000, // 10 seconds
        ENDPOINTS: {
            HEALTH: '/api/health',
            PRODUCTS: '/api/products',
            ORDERS: '/api/orders',
            CONTACT: '/api/contact',
            CONTACTS: '/api/contacts',
            STATS: '/api/stats'
        }
    },

    // Business Information
    BUSINESS: {
        NAME: 'Tré Bà Đệ',
        FULL_NAME: 'Tré Bà Đệ - Ông Chánh',
        SLOGAN: 'Tinh hoa gia truyền, đậm vị Đà Nẵng',
        TAGLINE: 'Di sản OCOP 4-sao. Bảo chứng cho chất lượng.',
        OCOP_LEVEL: '4 Sao',
        FOUNDED_YEAR: 1956,
        
        // Brand Platform
        VISION: 'Trở thành Di sản Ẩm thực Quà tặng hàng đầu của Đà Nẵng',
        MISSION: 'Gìn giữ và phát huy di sản của Bà Đệ qua từng sản phẩm với triết lý "chất lượng làm đầu"',
        
        CORE_VALUES: {
            HERITAGE: 'DI SẢN - Trân trọng lịch sử từ 1956',
            INTEGRITY: 'UY TÍN - OCOP 4-sao là lời cam kết thép',
            CRAFTSMANSHIP: 'THỦ CÔNG - Tin vào giá trị đôi bàn tay',
            AUTHENTICITY: 'BẢN SẮC - Hương vị Đà Nẵng thật nhất'
        },
        
        POSITIONING: 'Đặc sản quà tặng OCOP 4-sao duy nhất kết hợp di sản gia truyền và chất lượng bảo chứng',
        
        CONTACT: {
            ADDRESS: '77 Hải Phòng, P. Thạch Thang, Q. Hải Châu, Đà Nẵng',
            PHONE: '0963 403 222',
            EMAIL: 'hop-tac@trebade.com.vn',
            WORKING_HOURS: '7:00 Sáng - 9:00 Tối (Tất cả các ngày)'
        },

        SOCIAL: {
            FACEBOOK: '#',
            INSTAGRAM: '#',
            ZALO: '#'
        },

        MAPS: {
            LAT: 16.071990584608024,
            LNG: 108.21348017587867,
            EMBED_URL: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4612.630499639223!2d108.21348017587867!3d16.071990584608024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219691b584097%3A0xe13b0776411de462!2zVHLDqSBCw6AgxJDhu4c!5e1!3m2!1svi!2s!4v1762401338050!5m2!1svi!2s'
        }
    },

    // Design System
    COLORS: {
        PRIMARY: '#3A5B22',      // Xanh Lá Di Sản
        ACCENT: '#D90429',        // Đỏ Ớt Cay Nồng
        SUPPORT: '#EADCA6',       // Vàng Thính Mộc Mạc
        BACKGROUND: '#FDFBF5',    // Kem Uy Tín
        WHITE: '#FFFFFF',
        TEXT: '#2C2C2C',
        TEXT_LIGHT: '#666666'
    },

    // Typography
    FONTS: {
        HEADING: "'Playfair Display', serif",
        BODY: "'Inter', sans-serif"
    },

    // Storage Keys
    STORAGE_KEYS: {
        CART: 'treCart',
        USER: 'treUser',
        WISHLIST: 'treWishlist'
    },

    // Products
    PRODUCTS: {
        DEFAULT_IMAGE: 'https://via.placeholder.com/400x400?text=Product',
        CATEGORIES: ['tre', 'cha-bo', 'other']
    },

    // Cart & Orders
    CART: {
        MAX_QUANTITY: 99,
        MIN_ORDER_AMOUNT: 0,
        FREE_SHIPPING_THRESHOLD: 500000 // 500k VND
    },

    // Notifications
    NOTIFICATIONS: {
        DURATION: 3000, // 3 seconds
        POSITION: 'top-right'
    },

    // Brand Lexicon (Từ vựng thương hiệu)
    BRAND_LEXICON: {
        PREFERRED: [
            'Di sản', 'OCOP 4-sao', 'Gia truyền', 'Thủ công', 
            'Nguyên bản', 'Lên men tự nhiên', '77 Hải Phòng',
            'Giòn sật', 'Chua thanh', 'Cay nồng', 'Uy tín',
            'Bảo chứng', 'An toàn', 'Không chất bảo quản'
        ],
        AVOID: [
            'Giá rẻ', 'Ăn liền', 'Nhanh', 'Siêu cay', 
            'Công nghiệp', 'Hóa chất', 'Giảm giá', 'Sale'
        ]
    },

    // Tone of Voice
    TONE_OF_VOICE: {
        STYLE: 'Trân trọng & Gần gũi',
        PRONOUNS: {
            BRAND: 'Chúng tôi',
            CUSTOMER: 'Bạn'
        },
        PRINCIPLES: [
            'Am hiểu & Chân thực',
            'Mời gọi & Đậm vị (Appetizing)',
            'Tự hào nhưng khiêm nhường'
        ]
    },

    // SEO
    SEO: {
        TITLE: 'Tré Bà Đệ - Di Sản Ẩm Thực OCOP 4 Sao | Tinh Hoa Gia Truyền, Đậm Vị Đà Nẵng',
        DESCRIPTION: 'Tré Bà Đệ - Di sản ẩm thực gia truyền từ 1956. OCOP 4-sao. Đặc sản quà tặng Đà Nẵng uy tín, thủ công, lên men tự nhiên, không chất bảo quản. 77 Hải Phòng.',
        KEYWORDS: 'tré bà đệ, OCOP 4 sao, đặc sản Đà Nẵng, tré thủ công, quà tặng Đà Nẵng, di sản ẩm thực, 77 Hải Phòng, tré nguyên bản, tré ông chánh',
        OG_IMAGE: '/images/og-image.jpg'
    },

    // Features Flags
    FEATURES: {
        ENABLE_EMAIL: true,
        ENABLE_PAYMENT: false,
        ENABLE_SHIPPING: false,
        ENABLE_REVIEWS: false,
        ENABLE_WISHLIST: false,
        ENABLE_ANALYTICS: false
    },

    // Environment
    ENV: window.location.hostname === 'localhost' ? 'development' : 'production',
    IS_DEV: window.location.hostname === 'localhost',
    VERSION: '1.0.0'
};

// Freeze config to prevent modifications
Object.freeze(CONFIG);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
