// Sample menu data
const menuData = [
  { id: 1, name: "Pizza", price: 10.99 },
  { id: 2, name: "Burger", price: 7.49 },
  { id: 3, name: "Pasta", price: 8.99 },
  { id: 4, name: "Salad", price: 5.99 },
  { id: 5, name: "Sushi", price: 12.99 }
];

const menuDiv = document.getElementById('menu');
const cartUl = document.getElementById('cart');
const cartTotalDiv = document.getElementById('cart-total');
const placeOrderBtn = document.getElementById('place-order');
const orderMessageDiv = document.getElementById('order-message');

let cart = [];

// Display menu
function renderMenu() {
  menuDiv.innerHTML = '';
  menuData.forEach(item => {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `
      <span>${item.name} - $${item.price.toFixed(2)}</span>
      <button onclick="addToCart(${item.id})">Add</button>
    `;
    menuDiv.appendChild(div);
  });
}

// Add to cart
function addToCart(id) {
  const item = menuData.find(m => m.id === id);
  const cartItem = cart.find(c => c.id === id);
  if (cartItem) {
    cartItem.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  renderCart();
}

// Remove from cart
function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  renderCart();
}

// Render cart
function renderCart() {
  cartUl.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}</span>
      <button onclick="removeFromCart(${item.id})" style="background:#f44336;">Remove</button>
    `;
    cartUl.appendChild(li);
  });
  cartTotalDiv.textContent = `Total: $${total.toFixed(2)}`;
}

// Place order
placeOrderBtn.onclick = function() {
  if (cart.length === 0) {
    orderMessageDiv.textContent = "Your cart is empty!";
    orderMessageDiv.style.color = "red";
    return;
  }
  orderMessageDiv.textContent = "Order placed! Thank you!";
  orderMessageDiv.style.color = "green";
  cart = [];
  renderCart();
};

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;

// Initial render
renderMenu();
renderCart();