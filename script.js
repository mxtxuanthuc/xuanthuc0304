

// 1. QUẢN LÝ GIỎ HÀNG
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartCount();
    }

    addItem(productId, productName, price, quantity = 1) {
        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: productId,
                name: productName,
                price: price,
                quantity: quantity
            });
        }
        
        this.saveCart();
        this.updateCartCount();
        this.showNotification(`✓ Đã thêm "${productName}" vào giỏ hàng`);
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity > 0 ? quantity : 1;
            this.saveCart();
            this.updateCartCount();
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    saveCart() {
        localStorage.setItem('tendyshop_cart', JSON.stringify(this.items));
    }

    loadCart() {
        const saved = localStorage.getItem('tendyshop_cart');
        return saved ? JSON.parse(saved) : [];
    }

    updateCartCount() {
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            const count = this.getItemCount();
            let badge = cartIcon.querySelector('.cart-badge');
            
            if (count > 0) {
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'cart-badge';
                    cartIcon.appendChild(badge);
                }
                badge.textContent = count;
            } else if (badge) {
                badge.remove();
            }
        }
    }

    clear() {
        this.items = [];
        this.saveCart();
        this.updateCartCount();
    }
}

// 2. XÁC THỰC NGƯỜI DÙNG
class UserAuth {
    constructor() {
        this.currentUser = this.loadUser();
    }

    register(username, email, password) {
        if (this.validateEmail(email)) {
            const user = {
                username: username,
                email: email,
                password: this.hashPassword(password),
                createdAt: new Date().toISOString()
            };
            localStorage.setItem('tendyshop_user_' + email, JSON.stringify(user));
            return { success: true, message: 'Đăng kí thành công!' };
        }
        return { success: false, message: 'Email không hợp lệ!' };
    }

    login(email, password) {
        const user = JSON.parse(localStorage.getItem('tendyshop_user_' + email));
        
        if (user && user.password === this.hashPassword(password)) {
            this.currentUser = user;
            localStorage.setItem('tendyshop_current_user', JSON.stringify(user));
            return { success: true, message: 'Đăng nhập thành công!' };
        }
        return { success: false, message: 'Email hoặc mật khẩu không chính xác!' };
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('tendyshop_current_user');
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    loadUser() {
        const saved = localStorage.getItem('tendyshop_current_user');
        return saved ? JSON.parse(saved) : null;
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    hashPassword(password) {
        // Hash đơn giản (trong production, sử dụng hash thích hợp)
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString();
    }
}

// 3. TÌM KIẾM SẢN PHẨM
class ProductSearch {
    constructor() {
        this.searchInput = document.querySelector('.search-box input');
        if (this.searchInput) {
            this.searchInput.addEventListener('keypress', (e) => this.handleSearch(e));
        }
    }

    handleSearch(event) {
        if (event.key === 'Enter') {
            const query = this.searchInput.value.trim();
            if (query.length > 0) {
                this.performSearch(query);
            }
        }
    }

    performSearch(query) {
        // Chuyển hướng đến trang kết quả tìm kiếm
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }
}

// 4. THÔNG BÁO
function showNotification(message, type = 'success', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// 5. KIỂM ĐỊNH FORM
class FormValidator {
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validatePassword(password) {
        return password.length >= 6;
    }

    static validateUsername(username) {
        return username.length >= 3 && username.length <= 20;
    }

    static validateForm(formElement) {
        const inputs = formElement.querySelectorAll('input[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });

        return isValid;
    }
}

// 6. QUẢN LÝ CHI TIẾT SẢN PHẨM
class ProductDetail {
    constructor() {
        this.initializeProductDetail();
    }

    initializeProductDetail() {
        const addToCartBtn = document.querySelector('.btn-add-cart');
        const buyNowBtn = document.querySelector('.btn-buy-now');

        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => this.addToCart());
        }

        if (buyNowBtn) {
            buyNowBtn.addEventListener('click', () => this.buyNow());
        }

        // Khởi tạo hình ảnh thu nhỏ
        this.initializeThumbnails();
    }

    initializeThumbnails() {
        const thumbnails = document.querySelectorAll('.thumbnail-images img');
        const mainImage = document.querySelector('.main-image img');

        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                mainImage.src = thumbnail.src;
                mainImage.alt = thumbnail.alt;
            });
        });
    }

    addToCart() {
        const productName = document.querySelector('.product-info-section h1')?.textContent || 'Sản phẩm';
        const quantity = parseInt(document.querySelector('.option-group input[type="number"]')?.value) || 1;
        const price = this.parsePrice(document.querySelector('.price-value')?.textContent);

        if (cart && typeof cart.addItem === 'function') {
            cart.addItem('product-1', productName, price, quantity);
        }
    }

    buyNow() {
        this.addToCart();
        // Chuyển hướng đến trang thanh toán
        setTimeout(() => {
            window.location.href = 'checkout.html';
        }, 500);
    }

    parsePrice(priceText) {
        return parseInt(priceText.replace(/[^\d]/g, '')) || 0;
    }
}

// 7. FORM XÁC THỰC
class AuthForms {
    constructor() {
        this.initializeLoginForm();
        this.initializeRegisterForm();
    }

    initializeLoginForm() {
        const loginForm = document.querySelector('.auth-form');
        if (loginForm && document.title.includes('Đăng nhập')) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e, loginForm));
        }
    }

    initializeRegisterForm() {
        const registerForm = document.querySelector('.auth-form');
        if (registerForm && document.title.includes('Đăng kí')) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e, registerForm));
        }
    }

    handleLogin(e, form) {
        e.preventDefault();

        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;

        if (!FormValidator.validateEmail(email)) {
            showNotification('Email không hợp lệ!', 'error');
            return;
        }

        if (!FormValidator.validatePassword(password)) {
            showNotification('Mật khẩu phải có ít nhất 6 ký tự!', 'error');
            return;
        }

        const result = auth.login(email, password);
        showNotification(result.message, result.success ? 'success' : 'error');

        if (result.success) {
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }
    }

    handleRegister(e, form) {
        e.preventDefault();

        const username = form.querySelector('input[type="text"]').value;
        const email = form.querySelectorAll('input[type="email"]')[0]?.value;
        const password = form.querySelector('input[type="password"]').value;
        const confirmPassword = form.querySelectorAll('input[type="password"]')[1]?.value;

        if (!FormValidator.validateUsername(username)) {
            showNotification('Tên đăng nhập phải từ 3-20 ký tự!', 'error');
            return;
        }

        if (!FormValidator.validateEmail(email)) {
            showNotification('Email không hợp lệ!', 'error');
            return;
        }

        if (!FormValidator.validatePassword(password)) {
            showNotification('Mật khẩu phải có ít nhất 6 ký tự!', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showNotification('Mật khẩu không khớp!', 'error');
            return;
        }

        const result = auth.register(username, email, password);
        showNotification(result.message, result.success ? 'success' : 'error');

        if (result.success) {
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        }
    }
}

// 8. ĐIỀU HƯỚNG
class Navigation {
    constructor() {
        this.updateNavigation();
    }

    updateNavigation() {
        const isLoggedIn = auth.isLoggedIn();
        const loginLink = document.querySelector('a[href="login.html"]');
        const registerLink = document.querySelector('a[href="register.html"]');

        if (isLoggedIn && loginLink && registerLink) {
            const user = auth.currentUser;
            loginLink.textContent = '👤 ' + user.username;
            loginLink.href = 'profile.html';
            registerLink.textContent = 'Đăng xuất';
            registerLink.href = '#';
            registerLink.addEventListener('click', (e) => {
                e.preventDefault();
                auth.logout();
                location.reload();
            });
        }
    }
}

// 9. KHỞI TẠO
let cart;
let auth;

document.addEventListener('DOMContentLoaded', () => {
    // Khởi tạo các hệ thống cốt lõi
    cart = new ShoppingCart();
    auth = new UserAuth();

    // Khởi tạo các tính năng
    new ProductSearch();
    new ProductDetail();
    new AuthForms();
    new Navigation();

    console.log('TendyShop đã khởi tạo thành công!');
});
