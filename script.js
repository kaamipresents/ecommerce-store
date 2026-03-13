// Product Data
const products = [
    {
        id: 1,
        name: "Glass Meal Prep Set (5-Pack)",
        category: "glass",
        price: 34.99,
        image: "http://static.photos/glass/640x360/1",
        description: "Premium borosilicate glass containers with snap-lock lids. Perfect for meal prep and portion control. Includes 5 containers of varying sizes."
    },
    {
        id: 2,
        name: "Airtight Cereal Dispenser",
        category: "specialty",
        price: 18.99,
        image: "http://static.photos/kitchen/640x360/5",
        description: "Large capacity dispenser with easy-pour spout. Keeps cereal, pasta, or dry goods fresh with silicone seal technology."
    },
    {
        id: 3,
        name: "Stackable Bento Lunch Box",
        category: "plastic",
        price: 24.99,
        image: "http://static.photos/food/640x360/8",
        description: "3-tier stackable design with leak-proof compartments. Includes utensils and dressing container. Microwave safe."
    },
    {
        id: 4,
        name: "16-Piece Storage Set",
        category: "sets",
        price: 49.99,
        image: "http://static.photos/kitchen/640x360/12",
        description: "Complete kitchen organization solution. 8 containers with matching lids in various sizes. Nestable design saves space."
    },
    {
        id: 5,
        name: "Mason Jar Storage Set (6pc)",
        category: "glass",
        price: 29.99,
        image: "http://static.photos/glass/640x360/15",
        description: "Classic mason jars with modern airtight lids. Perfect for pantry organization, canning, or overnight oats."
    },
    {
        id: 6,
        name: "Spice Jar Organizer (24 Bottles)",
        category: "specialty",
        price: 32.99,
        image: "http://static.photos/kitchen/640x360/18",
        description: "Uniform glass bottles with shaker lids and labels. Includes rack organizer. Transform your pantry today."
    },
    {
        id: 7,
        name: "Large Bulk Storage Bins (2-Pack)",
        category: "plastic",
        price: 27.99,
        image: "http://static.photos/kitchen/640x360/22",
        description: "10-liter capacity bins with wheels for easy moving. Perfect for flour, rice, pet food, or bulk items."
    },
    {
        id: 8,
        name: "Deluxe Glass Container Set",
        category: "sets",
        price: 79.99,
        image: "http://static.photos/glass/640x360/25",
        description: "Our premium collection featuring 12 glass containers with bamboo lids. Oven safe and beautiful enough for serving."
    },
    {
        id: 9,
        name: "Produce Saver Containers",
        category: "specialty",
        price: 21.99,
        image: "http://static.photos/food/640x360/28",
        description: "Ventilated design with adjustable humidity controls. Keeps fruits and vegetables fresh 2x longer."
    },
    {
        id: 10,
        name: "Soup & Stew Thermos",
        category: "plastic",
        price: 19.99,
        image: "http://static.photos/food/640x360/32",
        description: "Vacuum insulated container keeps food hot for 6 hours or cold for 12. Wide mouth design for easy eating."
    },
    {
        id: 11,
        name: "Divided Snack Containers",
        category: "sets",
        price: 15.99,
        image: "http://static.photos/food/640x360/35",
        description: "Set of 4 containers with removable dividers. Perfect for bento lunches, snack prep, or portion control."
    },
    {
        id: 12,
        name: "Oven-Safe Baking Dishes",
        category: "glass",
        price: 42.99,
        image: "http://static.photos/food/640x360/38",
        description: "Set of 3 rectangular glass dishes with lids. Bake, store, and serve all in one dish."
    }
];

// Cart State
let cart = [];
let currentModalProduct = null;
let modalQty = 1;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    updateCartCount();
    
    // Search functionality
    document.getElementById('search-input').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = products.filter(p => 
            p.name.toLowerCase().includes(term) || 
            p.description.toLowerCase().includes(term)
        );
        renderProducts(filtered);
    });
});

// Render Products
function renderProducts(productsToRender) {
    const grid = document.getElementById('products-grid');
    
    if (productsToRender.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12 text-gray-500">
                <i data-lucide="search-x" class="w-12 h-12 mx-auto mb-3 opacity-50"></i>
                <p>No products found matching your criteria.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    grid.innerHTML = productsToRender.map(product => `
        <div class="product-card group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col fade-in">
            <div class="relative aspect-square bg-gray-100 overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center quick-view">
                    <button onclick="openProductModal(${product.id})" class="bg-white text-gray-900 px-4 py-2 rounded-full font-medium transform hover:scale-105 transition shadow-lg">
                        Quick View
                    </button>
                </div>
                <span class="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
                    ${product.category}
                </span>
            </div>
            <div class="p-4 flex-1 flex flex-col">
                <h3 class="font-semibold text-gray-900 mb-1 line-clamp-2">${product.name}</h3>
                <p class="text-sm text-gray-500 mb-3 line-clamp-2">${product.description}</p>
                <div class="mt-auto flex items-center justify-between">
                    <span class="text-xl font-bold text-emerald-600">$${product.price.toFixed(2)}</span>
                    <button onclick="addToCart(${product.id})" class="p-2 bg-gray-100 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors duration-200" title="Add to Cart">
                        <i data-lucide="plus" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

// Filter Products
function filterProducts(category) {
    // Update button states
    document.querySelectorAll('.category-btn').forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.remove('bg-white', 'text-gray-700');
            btn.classList.add('bg-emerald-600', 'text-white');
        } else {
            btn.classList.remove('bg-emerald-600', 'text-white');
            btn.classList.add('bg-white', 'text-gray-700');
        }
    });
    
    // Filter and render
    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// Cart Functions
function addToCart(productId, qty = 1) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({ ...product, quantity: qty });
    }
    
    updateCart();
    showToast(`${product.name} added to cart`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    updateCartCount();
    renderCartItems();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function renderCartItems() {
    const container = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center text-gray-500 mt-12">
                <i data-lucide="shopping-bag" class="w-12 h-12 mx-auto mb-3 opacity-30"></i>
                <p>Your cart is empty</p>
                <button onclick="toggleCart(); window.location.href='#products'" class="mt-4 text-emerald-600 font-medium hover:underline">Start Shopping</button>
            </div>
        `;
        lucide.createIcons();
    } else {
        container.innerHTML = cart.map(item => `
            <div class="flex gap-3 bg-gray-50 p-3 rounded-lg">
                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-md bg-white">
                <div class="flex-1 flex flex-col justify-between">
                    <div>
                        <h4 class="font-medium text-gray-900 text-sm line-clamp-1">${item.name}</h4>
                        <p class="text-emerald-600 font-semibold">$${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2 bg-white border border-gray-300 rounded-md">
                            <button onclick="updateCartQuantity(${item.id}, -1)" class="px-2 py-1 hover:bg-gray-100 text-gray-600 transition">-</button>
                            <span class="text-sm font-medium w-6 text-center">${item.quantity}</span>
                            <button onclick="updateCartQuantity(${item.id}, 1)" class="px-2 py-1 hover:bg-gray-100 text-gray-600 transition">+</button>
                        </div>
                        <button onclick="removeFromCart(${item.id})" class="text-gray-400 hover:text-red-500 transition">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        lucide.createIcons();
    }
    
    // Update totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${subtotal.toFixed(2)}`;
}

// Modal Functions
function openProductModal(productId) {
    currentModalProduct = products.find(p => p.id === productId);
    modalQty = 1;
    
    document.getElementById('modal-image').src = currentModalProduct.image;
    document.getElementById('modal-category').textContent = currentModalProduct.category;
    document.getElementById('modal-title').textContent = currentModalProduct.name;
    document.getElementById('modal-price').textContent = `$${currentModalProduct.price.toFixed(2)}`;
    document.getElementById('modal-description').textContent = currentModalProduct.description;
    document.getElementById('modal-qty').value = modalQty;
    
    document.getElementById('product-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
}

function closeProductModal() {
    document.getElementById('product-modal').classList.add('hidden');
    document.body.style.overflow = '';
    currentModalProduct = null;
}

function adjustModalQty(change) {
    modalQty = Math.max(1, modalQty + change);
    document.getElementById('modal-qty').value = modalQty;
}

function addToCartFromModal() {
    if (currentModalProduct) {
        addToCart(currentModalProduct.id, modalQty);
        closeProductModal();
    }
}

// UI Toggles
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    const isOpen = sidebar.classList.contains('open');
    
    if (isOpen) {
        sidebar.classList.remove('open');
        overlay.classList.add('hidden');
        overlay.classList.remove('opacity-100');
        document.body.style.overflow = '';
    } else {
        sidebar.classList.add('open');
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.add('opacity-100'), 10);
        document.body.style.overflow = 'hidden';
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

function toggleSearch() {
    const searchBar = document.getElementById('search-bar');
    searchBar.classList.toggle('hidden');
    if (!searchBar.classList.contains('hidden')) {
        document.getElementById('search-input').focus();
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').textContent = message;
    
    toast.classList.remove('translate-y-20', 'opacity-0');
    
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

function handleNewsletter(e) {
    e.preventDefault();
    showToast('Thank you for subscribing!');
    e.target.reset();
}

function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    goToCheckout();
}

function goToCheckout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    // Save cart to localStorage for checkout page
    localStorage.setItem('freshkeep_cart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
}

// Save cart to localStorage whenever it changes
function saveCart() {
    localStorage.setItem('freshkeep_cart', JSON.stringify(cart));
}

// Load cart from localStorage on page load
function loadCart() {
    const savedCart = localStorage.getItem('freshkeep_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Update existing cart functions to persist
const originalUpdateCart = updateCart;
updateCart = function() {
    originalUpdateCart();
    saveCart();
};

// Load cart when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

// Close modals on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
        const cartSidebar = document.getElementById('cart-sidebar');
        if (cartSidebar.classList.contains('open')) {
            toggleCart();
        }
    }
});