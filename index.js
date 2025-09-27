// The cart object will store all the items.
// Key: item name (string)
// Value: { price: number, quantity: number }
let cart = {};

// --- DOM ELEMENTS ---
const cartModal = document.getElementById('cart-modal');
const closeBtn = document.querySelector('.close-btn');
const cartLink = document.querySelector('.cart-link'); // The shopping cart icon in the navbar
const cartList = document.getElementById('cart-items');
const cartTotalDisplay = document.getElementById('cart-total-display');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

// --- EVENT LISTENERS ---

// 1. Add item to cart when button is clicked
addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        // Find the parent item card element
        const itemCard = event.target.closest('.menu-item-card');
        
        // Extract data
        const name = itemCard.querySelector('.item-name').textContent;
        // Get the price from the data-price attribute and convert to a float
        const price = parseFloat(itemCard.querySelector('.item-price').dataset.price);
        
        addItemToCart(name, price);
    });
});

// 2. Open Cart Modal
cartLink.addEventListener('click', (e) => {
    e.preventDefault(); // Stop the link from navigating
    cartModal.style.display = 'block';
    updateCartDisplay(); // Make sure the display is fresh when opened
});

// 3. Close Cart Modal (using the X button)
closeBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// 4. Close Cart Modal (clicking outside the modal)
window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});


// --- CART FUNCTIONS ---

/**
 * Adds a product to the cart or increments its quantity.
 * @param {string} name - The name of the item.
 * @param {number} price - The price of the item.
 */
function addItemToCart(name, price) {
    if (cart[name]) {
        // Item exists: increase quantity
        cart[name].quantity += 1;
    } else {
        // New item: add it to the cart
        cart[name] = {
            price: price,
            quantity: 1
        };
    }
    
    // Optionally show a confirmation
    alert(`Added ${name} to your order! Current quantity: ${cart[name].quantity}`);

    // Update the visual display
    updateCartDisplay();
}

/**
 * Recalculates the total and updates the cart list HTML.
 */
function updateCartDisplay() {
    let total = 0;

    // Clear the current list
    cartList.innerHTML = ''; 

    // Loop through all items in the cart object
    for (const name in cart) {
        if (cart.hasOwnProperty(name)) {
            const item = cart[name];
            
            // Calculate item subtotal and add to grand total
            const itemSubtotal = item.price * item.quantity;
            total += itemSubtotal;

            // Create a list item for the modal
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${name}</span>
                <span>$${item.price.toFixed(2)} x ${item.quantity} = <strong>$${itemSubtotal.toFixed(2)}</strong></span>
            `;
            
            cartList.appendChild(listItem);
        }
    }

    // Update the total price displayed in the modal
    cartTotalDisplay.textContent = `$${total.toFixed(2)}`;
}