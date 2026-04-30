// Initialize Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

// Search Function
function filterMenu() {
    const input = document.getElementById('menuSearch').value.toLowerCase();
    const items = document.querySelectorAll('.menu-item');
    items.forEach(item => {
        const name = item.querySelector('h3').innerText.toLowerCase();
        item.classList.toggle('hidden', !name.includes(input));
    });
}

// Add to Cart Function
document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        
        const existing = cart.find(item => item.name === name);
        if (existing) { existing.quantity++; } 
        else { cart.push({ name, price, quantity: 1 }); }
        
        saveCart();
        alert(`${name} added!`);
    });
});

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if(badge) badge.innerText = count;
}
