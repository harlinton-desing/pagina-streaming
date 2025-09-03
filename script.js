// Variables globales
let currentSlide = 0;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadProducts();
    updateCartCount();
    initializeCarousel();
}

// Configurar event listeners
function setupEventListeners() {
    // Menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Cerrar menu al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Búsqueda
    const searchInput = document.getElementById('searchInput');
    const searchInputMobile = document.querySelector('.search-input-mobile');
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    if (searchInputMobile) {
        searchInputMobile.addEventListener('input', handleSearch);
    }

    // Carousel controls
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) prevBtn.addEventListener('click', () => changeSlide(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => changeSlide(1));

    // Indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // Modal
    const modal = document.getElementById('productModal');
    const closeModal = document.getElementById('closeModal');
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Cerrar modal al hacer click fuera
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
    
    // Crear overlay si no existe
    let overlay = document.querySelector('.overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
    }
    
    overlay.classList.toggle('active');
    overlay.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.querySelector('.overlay');
    
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

// Funciones del carousel
function initializeCarousel() {
    // Auto-play carousel
    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Remover clase active del slide actual
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Calcular nuevo slide
    currentSlide += direction;
    
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    // Activar nuevo slide
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function goToSlide(slideIndex) {
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Remover clase active del slide actual
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Ir al slide seleccionado
    currentSlide = slideIndex;
    
    // Activar nuevo slide
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Cargar productos
function loadProducts(productsToShow = products) {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '<p class="no-products">No se encontraron productos</p>';
        return;
    }
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Crear tarjeta de producto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const isInWishlist = wishlist.some(item => item.id === product.id);
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" onclick="toggleWishlist(${product.id})">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="${isInWishlist ? '#ff4757' : 'none'}" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-rating">
                <div class="stars">
                    ${generateStars(product.rating)}
                </div>
                <span class="rating-text">Valorado con ${product.rating} de 5</span>
            </div>
            <div class="product-price">
                ${product.price}
                ${product.priceRange ? `<div class="price-range">Rango de precios: ${product.priceRange}</div>` : ''}
            </div>
            <div class="product-actions">
                ${product.hasVariants ? 
                    `<button class="btn btn-primary" onclick="showProductDetails(${product.id})">Seleccionar</button>
                     <button class="btn btn-secondary" onclick="showQuickView(${product.id})">Vista Rápida</button>` :
                    `<button class="btn btn-add-cart" onclick="addToCart(${product.id})">Añadir Al Carrito</button>
                     <button class="btn btn-secondary" onclick="showQuickView(${product.id})">Vista Rápida</button>`
                }
            </div>
        </div>
    `;
    
    return card;
}

// Generar estrellas de rating
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        const filled = i <= rating;
        stars += `<svg class="star" viewBox="0 0 24 24" fill="${filled ? '#ffd700' : 'none'}" stroke="#666" stroke-width="2">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
        </svg>`;
    }
    return stars;
}

// Búsqueda de productos
function handleSearch(e) {
    const query = e.target.value.trim();
    
    if (query === '') {
        loadProducts();
        return;
    }
    
    const filteredProducts = searchProducts(query);
    loadProducts(filteredProducts);
}

// Mostrar detalles del producto
function showProductDetails(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = createProductDetailsHTML(product);
    modal.style.display = 'block';
}

// Mostrar vista rápida
function showQuickView(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = createQuickViewHTML(product);
    modal.style.display = 'block';
}

// Crear HTML de detalles del producto
function createProductDetailsHTML(product) {
    let variantsHTML = '';
    
    if (product.variants && product.variants.length > 0) {
        variantsHTML = `
            <div class="product-options">
                <h3>Opciones Disponibles</h3>
                <table class="options-table">
                    <thead>
                        <tr>
                            ${product.variants[0].screens ? '<th>Pantallas</th>' : ''}
                            ${product.variants[0].duration ? '<th>Duración</th>' : ''}
                            ${product.variants[0].devices ? '<th>Dispositivos</th>' : ''}
                            ${product.variants[0].renewal ? '<th>Renovación</th>' : ''}
                            ${product.variants[0].noRenewal ? '<th>Sin Renovación</th>' : ''}
                            ${product.variants[0].price && !product.variants[0].renewal ? '<th>Precio</th>' : ''}
                        </tr>
                    </thead>
                    <tbody>
                        ${product.variants.map((variant, index) => `
                            <tr class="variant-row" data-variant-index="${index}" onclick="selectVariant(${product.id}, ${index})">
                                ${variant.screens ? `<td>${variant.screens}</td>` : ''}
                                ${variant.duration ? `<td>${variant.duration}</td>` : ''}
                                ${variant.devices ? `<td>${variant.devices}</td>` : ''}
                                ${variant.renewal ? `<td>${variant.renewal}</td>` : ''}
                                ${variant.noRenewal ? `<td>${variant.noRenewal}</td>` : ''}
                                ${variant.price && !variant.renewal ? `<td>${variant.price}</td>` : ''}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
    
    let conditionsHTML = '';
    if (product.conditions && product.conditions.length > 0) {
        conditionsHTML = `
            <div class="product-conditions">
                <h3>Condiciones Especiales</h3>
                <ul class="conditions-list">
                    ${product.conditions.map(condition => `<li>${condition}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    return `
        <div class="product-details">
            <div class="product-details-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details-info">
                <h2>${product.name}</h2>
                <div class="product-details-price">${product.price}</div>
                <div class="product-description">${product.description}</div>
                
                ${product.features ? `
                    <div class="product-features">
                        <h3>Características</h3>
                        <ul class="product-features">
                            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${variantsHTML}
                ${conditionsHTML}
                
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="showOrderForm(${product.id})">Hacer Pedido</button>
                    <button class="btn btn-add-cart" onclick="addToCart(${product.id})">Añadir al Carrito</button>
                </div>
            </div>
        </div>
    `;
}

// Crear HTML de vista rápida
function createQuickViewHTML(product) {
    return `
        <div class="quick-view">
            <div class="product-details">
                <div class="product-details-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-details-info">
                    <h2>${product.name}</h2>
                    <div class="product-details-price">${product.price}</div>
                    <div class="product-description">${product.description}</div>
                    
                    ${product.features ? `
                        <ul class="product-features">
                            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    ` : ''}
                    
                    <div class="product-actions">
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Añadir al Carrito</button>
                        <button class="btn btn-secondary" onclick="showProductDetails(${product.id})">Ver Detalles Completos</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Funciones del carrito
function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} añadido al carrito`);
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Funciones de wishlist
function toggleWishlist(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const existingIndex = wishlist.findIndex(item => item.id === productId);
    
    if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
        showNotification(`${product.name} eliminado de la lista de deseos`);
    } else {
        wishlist.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        });
        showNotification(`${product.name} añadido a la lista de deseos`);
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // Actualizar el botón de wishlist en la tarjeta
    const wishlistBtn = document.querySelector(`[onclick="toggleWishlist(${productId})"]`);
    if (wishlistBtn) {
        const isInWishlist = wishlist.some(item => item.id === productId);
        const svg = wishlistBtn.querySelector('svg');
        if (svg) {
            svg.setAttribute('fill', isInWishlist ? '#ff4757' : 'none');
        }
        wishlistBtn.classList.toggle('active', isInWishlist);
    }
    
    // Si estamos en el modal, actualizar el botón también
    const modalBtn = document.querySelector('.modal .btn-secondary');
    if (modalBtn && modalBtn.textContent.includes('Deseos')) {
        const isInWishlist = wishlist.some(item => item.id === productId);
        modalBtn.textContent = isInWishlist ? 'Quitar de Deseos' : 'Añadir a Deseos';
    }
}

// Mostrar notificación
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #00bcd4;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 188, 212, 0.4);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar y eliminar notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Filtrar productos por categoría
function filterByCategory(category) {
    const filteredProducts = getProductsByCategory(category);
    loadProducts(filteredProducts);
}

// Funciones de navegación
function goToHome() {
    loadProducts();
    closeMobileMenu();
}

function goToStore() {
    loadProducts();
    closeMobileMenu();
}

function goToStreaming() {
    filterByCategory('streaming');
    closeMobileMenu();
}

function goToVPN() {
    filterByCategory('vpn');
    closeMobileMenu();
}

function goToApps() {
    filterByCategory('apps');
    closeMobileMenu();
}

function goToIPTV() {
    filterByCategory('iptv');
    closeMobileMenu();
}

// Agregar event listeners para la navegación
document.addEventListener('DOMContentLoaded', function() {
    // Agregar event listeners a los enlaces del menú
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.textContent.toLowerCase();
            
            if (text.includes('inicio')) {
                goToHome();
            } else if (text.includes('tienda')) {
                goToStore();
            } else if (text.includes('series') || text.includes('películas')) {
                goToStreaming();
            } else if (text.includes('vpn')) {
                goToVPN();
            } else if (text.includes('apps')) {
                goToApps();
            }
        });
    });
    
    // Event listeners para la navegación inferior
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Agregar clase active al item clickeado
            this.classList.add('active');
            
            const text = this.textContent.toLowerCase();
            
            if (text.includes('tienda')) {
                goToStore();
            } else if (text.includes('deseos')) {
                showWishlist();
            } else if (text.includes('carrito')) {
                showCart();
            } else if (text.includes('cuenta')) {
                showAccount();
            }
        });
    });
});

// Funciones adicionales para la navegación
function showWishlist() {
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    let wishlistHTML = '<h2>Lista de Deseos</h2>';
    
    if (wishlist.length === 0) {
        wishlistHTML += '<p>Tu lista de deseos está vacía</p>';
    } else {
        wishlistHTML += '<div class="wishlist-items">';
        wishlist.forEach(item => {
            wishlistHTML += `
                <div class="wishlist-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-info">
                        <h3>${item.name}</h3>
                        <p class="item-price">${item.price}</p>
                        <button class="btn btn-primary" onclick="addToCart(${item.id})">Añadir al Carrito</button>
                        <button class="btn btn-secondary" onclick="toggleWishlist(${item.id})">Eliminar</button>
                    </div>
                </div>
            `;
        });
        wishlistHTML += '</div>';
    }
    
    modalBody.innerHTML = wishlistHTML;
    modal.style.display = 'block';
}

function showCart() {
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    let cartHTML = '<h2>Carrito de Compras</h2>';
    
    if (cart.length === 0) {
        cartHTML += '<p>Tu carrito está vacío</p>';
    } else {
        cartHTML += '<div class="cart-items">';
        let total = 0;
        
        cart.forEach(item => {
            const itemPrice = parseFloat(item.price.replace('$', '').replace(',', '.'));
            const itemTotal = itemPrice * item.quantity;
            total += itemTotal;
            
            cartHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-info">
                        <h3>${item.name}</h3>
                        <p class="item-price">${item.price}</p>
                        <div class="quantity-controls">
                            <button onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button class="btn btn-secondary" onclick="removeFromCart(${item.id})">Eliminar</button>
                    </div>
                </div>
            `;
        });
        
        cartHTML += `
            </div>
            <div class="cart-total">
                <h3>Total: $${total.toFixed(2)}</h3>
                <button class="btn btn-primary" onclick="showCartOrderForm()">Proceder al Pago</button>
            </div>
        `;
    }
    
    modalBody.innerHTML = cartHTML;
    modal.style.display = 'block';
}

function showAccount() {
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2>Mi Cuenta</h2>
        <div class="account-options">
            <button class="btn btn-primary">Iniciar Sesión</button>
            <button class="btn btn-secondary">Registrarse</button>
        </div>
        <div class="service-info">
            <h3>Información de Servicio</h3>
            <div class="conditions">
                ${serviceInfo.conditions.map(condition => `<p>${condition}</p>`).join('')}
            </div>
            <div class="schedule">
                ${serviceInfo.schedule.map(schedule => `<p>${schedule}</p>`).join('')}
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            showCart(); // Refresh cart display
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCart(); // Refresh cart display
}

// Variables para el pedido actual
let currentOrder = {
    product: null,
    variant: null,
    selectedPlan: ''
};

// Función para seleccionar variante
function selectVariant(productId, variantIndex) {
    const product = getProductById(productId);
    if (product && product.variants) {
        currentOrder.variant = product.variants[variantIndex];
        
        // Resaltar la fila seleccionada
        const rows = document.querySelectorAll('.variant-row');
        rows.forEach(row => row.classList.remove('selected'));
        
        const selectedRow = document.querySelector(`[data-variant-index="${variantIndex}"]`);
        if (selectedRow) {
            selectedRow.classList.add('selected');
        }
    }
}

// Función para mostrar el formulario de pedido
function showOrderForm(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    currentOrder.product = product;
    
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    let planOptions = '';
    if (product.variants && product.variants.length > 0) {
        planOptions = product.variants.map((variant, index) => {
            let label = '';
            if (variant.screens) label += `${variant.screens} pantalla(s) `;
            if (variant.duration) label += `${variant.duration} `;
            if (variant.devices) label += `${variant.devices} dispositivo(s) `;
            if (variant.renewal) label += `Renovación: ${variant.renewal} `;
            if (variant.noRenewal) label += `Sin renovación: ${variant.noRenewal} `;
            if (variant.price && !variant.renewal) label += `${variant.price}`;
            
            return `<option value="${index}">${label}</option>`;
        }).join('');
    } else {
        planOptions = `<option value="standard">Plan Estándar - ${product.price}</option>`;
    }
    
    modalBody.innerHTML = `
        <div class="order-form-container">
            <h2>Formulario de Pedido</h2>
            <h3>${product.name}</h3>
            
            <form id="orderForm" class="order-form">
                <div class="form-group">
                    <label for="customerName">Nombre *</label>
                    <input type="text" id="customerName" name="customerName" required 
                           placeholder="Ingrese su nombre completo">
                </div>
                
                <div class="form-group">
                    <label for="platform">Plataforma *</label>
                    <input type="text" id="platform" name="platform" required 
                           value="${product.name}" readonly>
                </div>
                
                <div class="form-group">
                    <label for="phone">Teléfono *</label>
                    <input type="tel" id="phone" name="phone" required 
                           placeholder="Ej: +54 9 381 123-4567">
                </div>
                
                <div class="form-group">
                    <label for="plan">Plan *</label>
                    <select id="plan" name="plan" required onchange="updatePlanPrice()">
                        <option value="">Seleccione un plan</option>
                        ${planOptions}
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="planValue">Valor del Plan</label>
                    <input type="text" id="planValue" name="planValue" readonly 
                           value="${product.price}">
                </div>
                
                <div class="form-group">
                    <label for="promotions">Promociones (Opcional)</label>
                    <textarea id="promotions" name="promotions" rows="3" 
                              placeholder="Ingrese código de promoción o comentarios"></textarea>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Enviar Pedido por WhatsApp</button>
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                </div>
            </form>
        </div>
    `;
    
    // Agregar event listener al formulario
    document.getElementById('orderForm').addEventListener('submit', handleOrderSubmit);
    
    modal.style.display = 'block';
}

// Función para actualizar el precio del plan seleccionado
function updatePlanPrice() {
    const planSelect = document.getElementById('plan');
    const planValueInput = document.getElementById('planValue');
    
    if (!currentOrder.product) return;
    
    const selectedIndex = planSelect.value;
    
    if (currentOrder.product.variants && selectedIndex !== '') {
        const variant = currentOrder.product.variants[selectedIndex];
        let price = '';
        
        if (variant.price) {
            price = variant.price;
        } else if (variant.renewal) {
            price = variant.renewal;
        } else if (variant.noRenewal) {
            price = variant.noRenewal;
        }
        
        planValueInput.value = price || currentOrder.product.price;
        currentOrder.selectedPlan = variant;
    } else {
        planValueInput.value = currentOrder.product.price;
    }
}

// Función para manejar el envío del formulario
function handleOrderSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const orderData = {
        nombre: formData.get('customerName'),
        plataforma: formData.get('platform'),
        telefono: formData.get('phone'),
        plan: document.getElementById('plan').options[document.getElementById('plan').selectedIndex].text,
        valorPlan: formData.get('planValue'),
        promociones: formData.get('promotions') || 'Sin promociones'
    };
    
    // Validar que todos los campos requeridos estén completos
    if (!orderData.nombre || !orderData.telefono || !orderData.plan) {
        showNotification('Por favor complete todos los campos requeridos', 'error');
        return;
    }
    
    // Formatear el mensaje para WhatsApp
    const message = formatWhatsAppMessage(orderData);
    
    // Enviar a WhatsApp
    sendToWhatsApp(message);
    
    // Cerrar modal y mostrar confirmación
    closeModal();
    showNotification('¡Pedido enviado! Serás redirigido a WhatsApp', 'success');
}

// Función para formatear el mensaje de WhatsApp
function formatWhatsAppMessage(orderData) {
    const message = `
🛒 *NUEVO PEDIDO - JC STREAM*
━━━━━━━━━━━━━━━━━━━━

📝 *DATOS DEL CLIENTE*
• *Nombre:* ${orderData.nombre}
• *Teléfono:* ${orderData.telefono}

📺 *DETALLES DEL SERVICIO*
• *Plataforma:* ${orderData.plataforma}
• *Plan Seleccionado:* ${orderData.plan}
• *Valor:* ${orderData.valorPlan}

🎁 *PROMOCIONES/COMENTARIOS*
${orderData.promociones}

━━━━━━━━━━━━━━━━━━━━
_Pedido generado desde el sitio web_
    `.trim();
    
    return encodeURIComponent(message);
}

// Función para enviar a WhatsApp
function sendToWhatsApp(message) {
    const phoneNumber = '5493816282866'; // Número sin espacios ni guiones
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Función para mostrar formulario de pedido desde el carrito
function showCartOrderForm() {
    if (cart.length === 0) {
        showNotification('El carrito está vacío', 'error');
        return;
    }
    
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    // Calcular el total del carrito
    let total = 0;
    let cartDetails = '';
    
    cart.forEach(item => {
        const itemPrice = parseFloat(item.price.replace('$', '').replace(',', '.'));
        const itemTotal = itemPrice * item.quantity;
        total += itemTotal;
        cartDetails += `• ${item.name} x${item.quantity} - ${item.price}\n`;
    });
    
    modalBody.innerHTML = `
        <div class="order-form-container">
            <h2>Finalizar Pedido</h2>
            <div class="cart-summary">
                <h3>Resumen del Carrito</h3>
                <div class="cart-summary-items">
                    ${cart.map(item => `
                        <div class="summary-item">
                            <span>${item.name} x${item.quantity}</span>
                            <span>${item.price}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="cart-summary-total">
                    <strong>Total: $${total.toFixed(2)}</strong>
                </div>
            </div>
            
            <form id="cartOrderForm" class="order-form">
                <div class="form-group">
                    <label for="customerName">Nombre *</label>
                    <input type="text" id="customerName" name="customerName" required 
                           placeholder="Ingrese su nombre completo">
                </div>
                
                <div class="form-group">
                    <label for="phone">Teléfono *</label>
                    <input type="tel" id="phone" name="phone" required 
                           placeholder="Ej: +54 9 381 123-4567">
                </div>
                
                <div class="form-group">
                    <label for="promotions">Promociones / Comentarios (Opcional)</label>
                    <textarea id="promotions" name="promotions" rows="3" 
                              placeholder="Ingrese código de promoción o comentarios adicionales"></textarea>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Enviar Pedido por WhatsApp</button>
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                </div>
            </form>
        </div>
    `;
    
    // Agregar event listener al formulario del carrito
    document.getElementById('cartOrderForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleCartOrderSubmit(e, cartDetails, total);
    });
    
    modal.style.display = 'block';
}

// Función para manejar el envío del formulario del carrito
function handleCartOrderSubmit(e, cartDetails, total) {
    const formData = new FormData(e.target);
    
    const orderData = {
        nombre: formData.get('customerName'),
        telefono: formData.get('phone'),
        promociones: formData.get('promotions') || 'Sin promociones',
        productos: cartDetails,
        total: `$${total.toFixed(2)}`
    };
    
    // Validar campos requeridos
    if (!orderData.nombre || !orderData.telefono) {
        showNotification('Por favor complete todos los campos requeridos', 'error');
        return;
    }
    
    // Formatear mensaje para WhatsApp
    const message = formatCartWhatsAppMessage(orderData);
    
    // Enviar a WhatsApp
    sendToWhatsApp(message);
    
    // Limpiar carrito
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Cerrar modal y mostrar confirmación
    closeModal();
    showNotification('¡Pedido enviado! Serás redirigido a WhatsApp', 'success');
}

// Función para formatear el mensaje del carrito para WhatsApp
function formatCartWhatsAppMessage(orderData) {
    const message = `
🛒 *PEDIDO MÚLTIPLE - JC STREAM*
━━━━━━━━━━━━━━━━━━━━

📝 *DATOS DEL CLIENTE*
• *Nombre:* ${orderData.nombre}
• *Teléfono:* ${orderData.telefono}

📦 *PRODUCTOS SOLICITADOS*
${orderData.productos}

💰 *TOTAL:* ${orderData.total}

🎁 *PROMOCIONES/COMENTARIOS*
${orderData.promociones}

━━━━━━━━━━━━━━━━━━━━
_Pedido generado desde el sitio web_
    `.trim();
    
    return encodeURIComponent(message);
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
}

// Función mejorada para mostrar notificaciones
function showNotification(message, type = 'success') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Color según el tipo
    const bgColor = type === 'error' ? '#ff4757' : '#00bcd4';
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar y eliminar notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
