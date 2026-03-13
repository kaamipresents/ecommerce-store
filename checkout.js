// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('freshkeep_cart')) || [];
let currentStep = 1;
let selectedPayment = 'card';
let shippingCost = 0;
const TAX_RATE = 0.08;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (cart.length === 0) {
        alert('Your cart is empty. Redirecting to store...');
        window.location.href = 'index.html';
        return;
    }
    
    renderCheckoutItems();
    updateOrderSummary();
    setupInputFormatters();
    updateStepIndicators();
});

// Render cart items in checkout
function renderCheckoutItems() {
    const container = document.getElementById('checkout-items');
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center">Your cart is empty</p>';
        return;
    }
    
    container.innerHTML = cart.map(item => `
        <div class="flex gap-3">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-md bg-gray-100">
            <div class="flex-1">
                <h4 class="font-medium text-gray-900 text-sm line-clamp-1">${item.name}</h4>
                <p class="text-sm text-gray-500">Qty: ${item.quantity}</p>
                <p class="text-emerald-600 font-semibold">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        </div>
    `).join('');
}

// Calculate and update totals
function updateOrderSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * TAX_RATE;
    
    // Determine shipping cost
    const shippingMethod = document.querySelector('input[name="shipping"]:checked')?.value || 'standard';
    shippingCost = shippingMethod === 'express' ? 9.99 : (subtotal >= 50 ? 0 : 5.99);
    
    // If subtotal is 0 (shouldn't happen), set free shipping
    if (subtotal === 0) shippingCost = 0;
    
    const total = subtotal + tax + shippingCost;
    
    // Update display
    document.getElementById('checkout-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkout-tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('checkout-shipping').textContent = shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `$${total.toFixed(2)}`;
    document.getElementById('order-total-btn').textContent = `$${total.toFixed(2)}`;
    
    return { subtotal, tax, shipping: shippingCost, total };
}

// Navigation between steps
function goToStep(step) {
    // Validate current step before proceeding
    if (step > currentStep && !validateStep(currentStep)) {
        return;
    }
    
    // Hide all steps
    document.getElementById('step-1').classList.add('hidden');
    document.getElementById('step-2').classList.add('hidden');
    document.getElementById('step-3').classList.add('hidden');
    
    // Show target step
    document.getElementById(`step-${step}`).classList.remove('hidden');
    
    // Update indicators
    currentStep = step;
    updateStepIndicators();
    
    // Scroll to top of form
    document.getElementById(`step-${step}`).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateStepIndicators() {
    // Update step indicators
    for (let i = 1; i <= 3; i++) {
        const indicator = document.getElementById(`step-${i}-indicator`);
        const label = indicator.nextElementSibling;
        
        if (i < currentStep) {
            indicator.className = 'w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold text-sm step-completed transition-colors duration-300';
            indicator.innerHTML = '<i data-lucide="check" class="w-5 h-5"></i>';
            label.className = 'text-xs mt-2 font-medium text-emerald-600';
        } else if (i === currentStep) {
            indicator.className = 'w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold text-sm step-active transition-colors duration-300';
            indicator.textContent = i;
            label.className = 'text-xs mt-2 font-medium text-gray-900';
        } else {
            indicator.className = 'w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold text-sm step-pending transition-colors duration-300';
            indicator.textContent = i;
            label.className = 'text-xs mt-2 font-medium text-gray-500';
        }
    }
    
    // Update progress bars
    const progressBar1 = document.getElementById('progress-bar-1');
    const progressBar2 = document.getElementById('progress-bar-2');
    
    if (currentStep >= 2) {
        progressBar1.style.width = '100%';
    } else {
        progressBar1.style.width = '0%';
    }
    
    if (currentStep >= 3) {
        progressBar2.style.width = '100%';
    } else {
        progressBar2.style.width = '0%';
    }
    
    lucide.createIcons();
}

function validateStep(step) {
    const stepElement = document.getElementById(`step-${step}`);
    const requiredInputs = stepElement.querySelectorAll('input[required], select[required]');
    
    let isValid = true;
    
    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('border-red-500');
            isValid = false;
            
            // Remove error class after user starts typing
            input.addEventListener('input', () => {
                input.classList.remove('border-red-500');
            }, { once: true });
        } else {
            input.classList.remove('border-red-500');
        }
    });
    
    if (!isValid) {
        showToast('Please fill in all required fields');
    }
    
    return isValid;
}

// Payment method selection
function selectPayment(method) {
    selectedPayment = method;
    
    // Update button styles
    document.querySelectorAll('.payment-btn').forEach(btn => {
        btn.classList.remove('border-emerald-500', 'bg-emerald-50');
        btn.classList.add('border-gray-200');
        btn.querySelector('i').classList.remove('text-emerald-600');
        btn.querySelector('i').classList.add('text-gray-400');
        btn.querySelector('span').classList.remove('text-emerald-800');
        btn.querySelector('span').classList.add('text-gray-600');
    });
    
    const selectedBtn = document.getElementById(`pay-${method}`);
    selectedBtn.classList.remove('border-gray-200');
    selectedBtn.classList.add('border-emerald-500', 'bg-emerald-50');
    selectedBtn.querySelector('i').classList.remove('text-gray-400');
    selectedBtn.querySelector('i').classList.add('text-emerald-600');
    selectedBtn.querySelector('span').classList.remove('text-gray-600');
    selectedBtn.querySelector('span').classList.add('text-emerald-800', 'font-medium');
    
    // Show relevant fields
    document.getElementById('card-fields').classList.add('hidden');
    document.getElementById('paypal-fields').classList.add('hidden');
    document.getElementById('apple-fields').classList.add('hidden');
    
    if (method === 'card') {
        document.getElementById('card-fields').classList.remove('hidden');
    } else if (method === 'paypal') {
        document.getElementById('paypal-fields').classList.remove('hidden');
    } else if (method === 'apple') {
        document.getElementById('apple-fields').classList.remove('hidden');
    }
}

// Setup input formatters
function setupInputFormatters() {
    // Phone number formatter
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        } else if (value.length >= 3) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        }
        e.target.value = value;
    });
    
    // Card number formatter
    const cardInput = document.getElementById('card-number');
    cardInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = value;
    });
    
    // Expiry date formatter
    const expiryInput = document.getElementById('expiry');
    expiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });
    
    // CVC formatter (numbers only)
    const cvcInput = document.getElementById('cvc');
    cvcInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
    });
    
    // ZIP formatter
    const zipInput = document.getElementById('zip');
    zipInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5);
    });
    
    // Shipping method change listener
    document.querySelectorAll('input[name="shipping"]').forEach(radio => {
        radio.addEventListener('change', updateOrderSummary);
    });
}

// Place order
function placeOrder() {
    if (!validateStep(3)) return;
    
    // Additional validation for card payments
    if (selectedPayment === 'card') {
        const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
        const expiry = document.getElementById('expiry').value;
        const cvc = document.getElementById('cvc').value;
        const cardName = document.getElementById('card-name').value;
        
        if (cardNumber.length < 16) {
            showToast('Please enter a valid card number');
            document.getElementById('card-number').classList.add('border-red-500');
            return;
        }
        
        if (!expiry.includes('/') || expiry.length < 5) {
            showToast('Please enter a valid expiry date');
            document.getElementById('expiry').classList.add('border-red-500');
            return;
        }
        
        if (cvc.length < 3) {
            showToast('Please enter a valid CVC');
            document.getElementById('cvc').classList.add('border-red-500');
            return;
        }
        
        if (!cardName.trim()) {
            showToast('Please enter the name on card');
            document.getElementById('card-name').classList.add('border-red-500');
            return;
        }
    }
    
    // Show processing overlay
    document.getElementById('processing-overlay').classList.remove('hidden');
    
    // Simulate order processing
    setTimeout(() => {
        document.getElementById('processing-overlay').classList.add('hidden');
        showConfirmation();
    }, 2000);
}

function showConfirmation() {
    const orderNumber = 'FK-' + Date.now().toString().slice(-8);
    const orderDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    const email = document.getElementById('email').value;
    const totals = updateOrderSummary();
    
    // Populate confirmation modal
    document.getElementById('order-number').textContent = orderNumber;
    document.getElementById('order-date').textContent = orderDate;
    document.getElementById('confirm-email').textContent = email;
    document.getElementById('confirm-total').textContent = `$${totals.total.toFixed(2)}`;
    
    // Render confirmation items
    const itemsContainer = document.getElementById('confirmation-items');
    itemsContainer.innerHTML = cart.map(item => `
        <div class="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
            <div class="flex items-center gap-3">
                <img src="${item.image}" class="w-10 h-10 object-cover rounded bg-gray-100">
                <div>
                    <p class="font-medium text-gray-900 text-sm">${item.name}</p>
                    <p class="text-xs text-gray-500">Qty: ${item.quantity}</p>
                </div>
            </div>
            <span class="font-semibold text-gray-900">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    // Show modal
    document.getElementById('confirmation-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Clear cart from localStorage
    localStorage.removeItem('freshkeep_cart');
    
    // Also try to clear cart in parent window if it exists
    if (window.opener && !window.opener.closed) {
        try {
            window.opener.cart = [];
            window.opener.updateCart();
        } catch (e) {
            console.log('Could not clear parent cart');
        }
    }
    
    lucide.createIcons();
}

// Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg transform translate-y-0 opacity-100 transition-all duration-300 z-50 flex items-center gap-3';
    toast.innerHTML = `
        <i data-lucide="alert-circle" class="w-5 h-5 text-red-400"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    lucide.createIcons();
    
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Handle browser back button
window.onbeforeunload = function() {
    // Save cart before leaving if order not completed
    if (!document.getElementById('confirmation-modal').classList.contains('hidden') === false) {
        localStorage.setItem('freshkeep_cart', JSON.stringify(cart));
    }
};