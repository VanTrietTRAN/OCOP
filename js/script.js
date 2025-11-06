// ========================================
// TRÉ BÀ ĐỆ - PAGE-SPECIFIC SCRIPTS
// Common functionality moved to app.js
// ========================================

// === PRODUCT TABS (Products Page) ===
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const tabName = e.target.dataset.tab;
        const parentTabs = e.target.closest('.product-tabs');
        
        if (!parentTabs) return;
        
        // Remove active class from all tabs and buttons
        parentTabs.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        parentTabs.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        e.target.classList.add('active');
        const targetContent = parentTabs.querySelector(`#${tabName}`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// === THUMBNAIL IMAGES (Products Page) ===
document.querySelectorAll('.thumbnail-images img').forEach(thumbnail => {
    thumbnail.addEventListener('click', (e) => {
        const productImages = e.target.closest('.product-detail-images');
        if (!productImages) return;
        
        const mainImage = productImages.querySelector('.main-image img');
        if (mainImage) {
            mainImage.src = e.target.src;
            mainImage.alt = e.target.alt;
        }
    });
});

// === BLOG ARTICLE MODAL (Blog Page) ===
document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const articleId = button.getAttribute('href');
        const article = document.querySelector(articleId);
        if (article) {
            article.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

document.querySelectorAll('.close-article').forEach(button => {
    button.addEventListener('click', () => {
        const article = button.closest('.full-article');
        if (article) {
            article.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Close article when clicking outside
document.querySelectorAll('.full-article').forEach(article => {
    article.addEventListener('click', (e) => {
        if (e.target === article) {
            article.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// === STICKY HEADER WITH AUTO HIDE ===
let lastScroll = 0;
const header = document.querySelector('.header');

if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll Down - Hide header
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll Up - Show header
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
}

// === UTILITIES FOR INLINE USE ===

// Copy to clipboard (used in HTML onclick attributes)
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            if (typeof UI !== 'undefined') {
                UI.showNotification('Đã sao chép!');
            } else {
                alert('Đã sao chép: ' + text);
            }
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }
}

// Share on social media (used in HTML onclick attributes)
function shareOnFacebook(url) {
    const shareUrl = url || window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
}

function shareOnZalo(url) {
    const shareUrl = url || window.location.href;
    window.open(`https://zalo.me/share?url=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
}

// Export functions to global scope for inline HTML usage
window.copyToClipboard = copyToClipboard;
window.shareOnFacebook = shareOnFacebook;
window.shareOnZalo = shareOnZalo;

console.log('✅ Page-specific scripts loaded');
