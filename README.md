# 🏆 WEBSITE TRÉ BÀ ĐỆ - OCOP 4 SAO

Website thương mại điện tử bán đặc sản Tré Bà Đệ - Di sản ẩm thực gia truyền từ 1956, được vinh danh với Chứng nhận OCOP 4 sao quốc gia.

**📍 Địa chỉ:** 77 Hải Phòng, Đà Nẵng  
**📞 Hotline:** 0963 403 222  
**🌐 Version:** 2.0.0 (Modular Architecture)

---

## 🚀 HƯỚNG DẪN CHẠY WEBSITE

### **Chỉ Cần 1 Lệnh - Server Tích Hợp Sẵn!**

```powershell
# Cách 1: Dùng PowerShell script (Khuyên dùng)
.\start-backend.ps1

# Cách 2: Chạy manual
cd backend
npm install
node server.js
```

✅ **Mở browser truy cập:**
- **Website:** http://localhost:3000
- **API Health:** http://localhost:3000/api/health
- **API Products:** http://localhost:3000/api/products

⚡ **Server tự động serve cả frontend + backend!**
- HTML, CSS, JS được serve từ thư mục gốc
- API endpoints ở `/api/*`
- Không cần chạy thêm HTTP server riêng

### **Test API (Optional)**

```powershell
# Test tất cả endpoints
.\test-api.ps1

# Hoặc test manual từng endpoint
curl http://localhost:3000/api/health
curl http://localhost:3000/api/products
```

---

## 📁 CẤU TRÚC DỰ ÁN

```
OCOP/
├── index.html          # Trang chủ
├── about.html          # Trang câu chuyện thương hiệu
├── products.html       # Trang sản phẩm
├── blog.html          # Trang góc ẩm thực
├── contact.html       # Trang liên hệ
│
├── css/
│   └── styles.css     # CSS chính (2000+ lines)
│
├── js/                # ⭐ MODULAR ARCHITECTURE v2.0
│   ├── config.js      # Configuration (API, business info, colors)
│   ├── utils.js       # Utilities (format, validation, storage)
│   ├── api.js         # API service layer (RESTful communication)
│   ├── cart.js        # Shopping cart manager (Observer pattern)
│   ├── ui.js          # UI components (notifications, loading, modal)
│   ├── app.js         # Application initializer
│   └── script.js      # Page-specific logic (tabs, gallery, modal)
│
├── backend/           # Node.js Express API Server
│   ├── server.js      # Express server với 9 endpoints
│   ├── package.json   # Dependencies
│   ├── .env.example   # Environment variables template
│   └── .gitignore     # Git ignore
│
├── images/            # Thư mục hình ảnh
│
├── start-backend.ps1  # PowerShell script khởi động backend
├── test-api.ps1       # PowerShell script test API
└── README.md          # File này
```

---

## 🎨 TÍNH NĂNG WEBSITE

### **Trang Chủ (index.html)**
- ✅ Hero section với hình nền ấn tượng
- ✅ Trust badges (OCOP 4 sao, Gia truyền 1956, An toàn vệ sinh)
- ✅ Triết lý kinh doanh "Giữ gìn tinh hoa"
- ✅ Sản phẩm nổi bật (2 products)
- ✅ Chứng nhận OCOP detail
- ✅ Testimonials (đánh giá khách hàng)

### **Trang Câu Chuyện (about.html)**
- ✅ Chân dung người sáng lập - Bà Đệ
- ✅ Timeline lịch sử (1954 → 1956 → 2024)
- ✅ Quy trình làm nghề (4 bước)
- ✅ Section OCOP chi tiết
- ✅ Giá trị cốt lõi (4 values)

### **Trang Sản Phẩm (products.html)**
- ✅ 3 sản phẩm: Tré Xâu 85K, Tré Trộn, Chả Bò 120K
- ✅ Product tabs (Mô tả / Cách dùng)
- ✅ Image gallery với thumbnails
- ✅ Quantity selector (+/-)
- ✅ Add to cart với validation

### **Trang Blog (blog.html)**
- ✅ 3 bài viết chi tiết:
  - Giải mã sức hút của Tré Bà Đệ
  - Tré trong mâm cỗ Tết miền Trung
  - Hành trình chinh phục OCOP 4 sao
- ✅ Modal xem full article
- ✅ Click outside để đóng modal

### **Trang Liên Hệ (contact.html)**
- ✅ Form liên hệ với validation
- ✅ Thông tin doanh nghiệp đầy đủ
- ✅ Google Maps nhúng (tọa độ thật)
- ✅ Social media links

### **Giỏ Hàng & Checkout**
- ✅ Shopping cart popup
- ✅ Add/Remove sản phẩm
- ✅ Quantity update
- ✅ LocalStorage persistence
- ✅ Cart counter badge
- ✅ Checkout flow với email notification

---

## 🔧 CÔNG NGHỆ SỬ DỤNG

### **Frontend**
- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, Animations (2000+ lines)
- **JavaScript ES6+**: Modular architecture (7 modules)
  - Classes, Arrow functions, Async/Await
  - Observer Pattern, Singleton Pattern
  - LocalStorage, IntersectionObserver
- **Google Fonts**: Playfair Display (serif) + Inter (sans-serif)

### **Backend**
- **Node.js**: v18+ runtime
- **Express.js**: v4.18.2 - Web framework
- **Nodemailer**: v6.9.7 - Email notifications
- **CORS**: v2.8.5 - Cross-origin support
- **body-parser**: v1.20.2
- **dotenv**: v16.3.1

### **Design Patterns**
- **Observer Pattern**: Cart subscription → Reactive UI
- **Singleton Pattern**: API, Cart, UI, App instances
- **Module Pattern**: Encapsulation, frozen objects

---

## ⚙️ CẤU HÌNH

### **Backend Configuration**

Tạo file `backend/.env`:
```env
PORT=3000

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Admin Email
ADMIN_EMAIL=admin@trebade.com

# Business Info
BUSINESS_NAME=Tré Bà Đệ
BUSINESS_PHONE=0963 403 222
BUSINESS_ADDRESS=77 Hải Phòng, Đà Nẵng
```

**Lấy Gmail App Password:**
1. Vào: https://myaccount.google.com/security
2. Bật "2-Step Verification"
3. Tạo "App Password" cho "Mail"
4. Copy password vào `.env`

### **Frontend Configuration**

File `js/config.js` (đã có sẵn):
```javascript
const CONFIG = {
    API: {
        BASE_URL: 'http://localhost:3000',
        TIMEOUT: 10000
    },
    BUSINESS: {
        NAME: 'Tré Bà Đệ',
        CONTACT: {
            PHONE: '0963 403 222',
            EMAIL: 'contact@trebade.com',
            ADDRESS: '77 Hải Phòng, Đà Nẵng'
        }
    }
};
```

**Đổi production URL:**
```javascript
// Trong js/config.js
BASE_URL: 'https://your-domain.com' // Thay vì localhost
```

---

## 🌈 BẢNG MÀU OCOP

Tất cả màu đã được định nghĩa trong `css/styles.css`:

```css
:root {
    --color-primary: #3A5B22;    /* Xanh Lá Di Sản */
    --color-accent: #D90429;     /* Đỏ Ớt Cay Nồng */
    --color-support: #EADCA6;    /* Vàng Thính Mộc Mạc */
    --color-background: #FDFBF5; /* Kem Uy Tín */
    --color-white: #FFFFFF;
    --color-text: #2C3E50;
}
```

---

## 📱 RESPONSIVE DESIGN

Website đã được tối ưu cho:
- ✅ **Desktop**: > 968px (Full layout)
- ✅ **Tablet**: 768px - 968px (2-column grid)
- ✅ **Mobile**: < 768px (1-column stack)

Test responsive:
- Chrome DevTools (F12) → Toggle device toolbar
- Test trên điện thoại thật

---

## 🎯 API ENDPOINTS

### **Products**
```http
GET    /api/products       # Lấy danh sách sản phẩm
GET    /api/products/:id   # Lấy chi tiết 1 sản phẩm
```

### **Orders**
```http
POST   /api/orders         # Tạo đơn hàng
GET    /api/orders         # Lấy danh sách đơn hàng
```

**Request Body (POST /api/orders):**
```json
{
    "customerName": "Nguyễn Văn A",
    "phone": "0987654321",
    "email": "customer@email.com",
    "address": "123 Đường ABC, Đà Nẵng",
    "items": [
        {
            "id": "1",
            "name": "Tré Xâu Gia Truyền",
            "price": 85000,
            "quantity": 2
        }
    ],
    "totalAmount": 170000,
    "note": "Giao giờ hành chính"
}
```

### **Contacts**
```http
POST   /api/contact        # Gửi form liên hệ
GET    /api/contacts       # Lấy danh sách liên hệ
```

### **System**
```http
GET    /api/stats          # Thống kê (orders, contacts, revenue)
GET    /api/health         # Health check
```

---

## 🧪 TESTING

### **Test Backend API**
```powershell
.\test-api.ps1
```

Output mong đợi:
```
✅ Health Check: OK
✅ Products: 3 items
✅ Order Created: ORD-xxxxx
✅ Contact Sent: Success
✅ Stats: X orders, Y contacts
```

### **Test Frontend**
1. Mở browser console (F12)
2. Kiểm tra modules:
```javascript
console.log(typeof CONFIG);  // 'object'
console.log(typeof Cart);    // 'object'
console.log(typeof API);     // 'object'
console.log(typeof UI);      // 'object'
```

3. Test cart:
```javascript
Cart.addItem({id:'1', name:'Test', price:1000}, 1);
console.log(Cart.getItems());
```

### **Manual Testing Checklist**
- [ ] Thêm sản phẩm vào giỏ hàng
- [ ] Xóa sản phẩm khỏi giỏ hàng
- [ ] Checkout → Nhận email
- [ ] Form liên hệ → Nhận email
- [ ] Mobile menu toggle
- [ ] Product tabs
- [ ] Blog modal open/close
- [ ] Responsive trên mobile

---

## 🐛 TROUBLESHOOTING

### **Backend không chạy**
```powershell
# Check Node.js version
node --version  # Should be v18+

# Clear cache và reinstall
cd backend
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json -Force
npm install
```

### **Page không load được**
Đảm bảo:
1. Backend đang chạy tại `localhost:3000`
2. Truy cập đúng URL: `http://localhost:3000` (không phải file://)
3. Check console log của server xem có lỗi không
4. Clear browser cache: `Ctrl + Shift + Delete`

### **Email không gửi**
1. Check `.env` có đúng email/password
2. Bật "Less secure app access" (nếu dùng Gmail)
3. Hoặc dùng App Password thay vì password thật
4. Check console log trong `server.js`

### **LocalStorage không hoạt động**
```javascript
// Clear localStorage
localStorage.clear();
location.reload();
```

### **Modules không load**
1. Hard refresh: `Ctrl + F5`
2. Clear cache: `Ctrl + Shift + Delete`
3. Check thứ tự scripts trong HTML:
```html
<script src="js/config.js"></script>  <!-- Phải đầu tiên -->
<script src="js/utils.js"></script>
<script src="js/api.js"></script>
<script src="js/cart.js"></script>
<script src="js/ui.js"></script>
<script src="js/app.js"></script>
<script src="js/script.js"></script>  <!-- Cuối cùng -->
```

---

## 📊 PERFORMANCE

### **Optimization Features**
- ✅ Lazy loading images (IntersectionObserver)
- ✅ Debounce/throttle expensive operations
- ✅ DOM element caching
- ✅ LocalStorage caching
- ✅ Request timeout control (10s)
- ✅ Responsive images

### **Expected Lighthouse Scores**
- Performance: **92+**
- Accessibility: **95+**
- Best Practices: **93+**
- SEO: **95+**

---

## 🔐 BẢO MẬT

### **Đã Implement**
- ✅ HTML sanitization (XSS prevention)
- ✅ Email/phone validation
- ✅ Input length limits
- ✅ CORS configuration
- ✅ Error handling (không expose stack trace)

### **Cần Implement (Production)**
- ⏳ HTTPS/SSL certificate
- ⏳ Rate limiting (prevent spam)
- ⏳ User authentication (JWT)
- ⏳ Database encryption
- ⏳ Security headers (helmet.js)

---

## 🚀 DEPLOYMENT

### **Frontend (Netlify/Vercel)**
1. Push code lên GitHub
2. Connect repo với Netlify/Vercel
3. Build settings:
   - Build command: (none)
   - Publish directory: `/`
4. Update `js/config.js` với production API URL

### **Backend (Heroku/Railway)**
1. Create new app
2. Set environment variables (.env)
3. Deploy từ GitHub
4. Note: Heroku free tier ngủ sau 30 phút không hoạt động

### **Database (Optional)**
- MongoDB Atlas (free tier)
- PostgreSQL (ElephantSQL)
- Firebase Realtime Database

---

## 📝 TÙY CHỈNH

### **Thay Đổi Màu Sắc**
File `css/styles.css`:
```css
:root {
    --color-primary: #YOUR_COLOR;
    --color-accent: #YOUR_COLOR;
}
```

### **Thêm/Sửa Sản Phẩm**
1. **Frontend**: `products.html` → Copy `.product-detail-card`
2. **Backend**: `backend/server.js` → Update `products` array

### **Thay Đổi Thông Tin Liên Hệ**
File `js/config.js`:
```javascript
BUSINESS: {
    NAME: 'Tên Mới',
    CONTACT: {
        PHONE: '0xxx xxx xxx',
        EMAIL: 'new@email.com',
        ADDRESS: 'Địa chỉ mới'
    }
}
```

### **Thêm Hình Ảnh**
1. Copy ảnh vào thư mục `images/`
2. Update `src` trong HTML:
```html
<img src="images/your-image.jpg" alt="Description">
```

---

## 🎨 BRAND PLATFORM COMPLIANCE

Website được xây dựng tuân thủ 100% **Brand Platform** của Tré Bà Đệ:

### **✅ Nền Tảng Chiến Lược**
- **Tầm nhìn:** Trở thành Di sản Ẩm thực Quà tặng hàng đầu Đà Nẵng
- **Sứ mệnh:** Gìn giữ di sản Bà Đệ với triết lý "chất lượng làm đầu"
- **Giá trị cốt lõi:** **DI SẢN** • **UY TÍN** • **THỦ CÔNG** • **BẢN SẮC**
- **Định vị:** Đặc sản OCOP 4-sao kết hợp di sản gia truyền & chất lượng bảo chứng

### **✅ Nhận Diện Ngôn Từ**
- **Tone of Voice:** Trân trọng & Gần gũi, Am hiểu & Chân thực, Mời gọi & Đậm vị
- **Slogan:** *"Tinh hoa gia truyền, đậm vị Đà Nẵng"*
- **Tagline:** *"Di sản OCOP 4-sao. Bảo chứng cho chất lượng."*
- **Từ vựng ưu tiên:** Di sản, OCOP 4-sao, Gia truyền, Thủ công, Nguyên bản, Lên men tự nhiên, 77 Hải Phòng, Giòn sật, Chua thanh, Cay nồng
- **Tránh dùng:** Giá rẻ, Ăn liền, Nhanh, Siêu cay, Công nghiệp

### **✅ Nhận Diện Hình Ảnh**
- **Bảng màu chính:** 
  - `#3A5B22` Xanh Lá Di Sản (Primary)
  - `#D90429` Đỏ Ớt Cay Nồng (Accent)
  - `#EADCA6` Vàng Thính Mộc Mạc (Support)
  - `#FDFBF5` Kem Uy Tín (Background)
- **Typography:** Playfair Display (headings) + Inter (body text)
- **Photography Style:** Chân thực, mộc mạc (rustic), ánh sáng tự nhiên, tập trung texture

---

## 🔮 ROADMAP

### **v2.1 - CSS Modularization** (Next)
- Tách `styles.css` thành modules
- base.css, layout.css, components.css

### **v2.2 - Backend Refactoring**
- Routes/Controllers/Services separation
- Database integration (MongoDB)

### **v3.0 - Advanced Features**
- User authentication
- Admin panel
- Payment gateway (VNPay, MoMo)
- Order tracking
- Product reviews

---

## 📞 HỖ TRỢ

**Thông Tin Liên Hệ:**
- **Email**: contact@trebade.com
- **Hotline**: 0963 403 222
- **Địa chỉ**: 77 Hải Phòng, Đà Nẵng

**Báo Lỗi:**
- Mở issue trên GitHub (nếu có)
- Hoặc liên hệ qua email

---

## 📄 LICENSE

© 2024-2025 Tré Bà Đệ. All rights reserved.

---

## 🎉 CREDITS

**Developed by:** GitHub Copilot  
**Version:** 2.0.0 (Modular Architecture)  
**Last Updated:** January 2025

---

**🏆 Tré Bà Đệ - OCOP 4 Sao**  
*Di sản ẩm thực gia truyền từ 1956*
