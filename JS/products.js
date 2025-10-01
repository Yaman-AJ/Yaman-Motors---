const links1 = document.getElementById("links-1");
const links2 = document.getElementById("links-2");
const userName = document.getElementById("user-name");
const logoutBtn = document.getElementById("logout");
const productsContainer = document.getElementById("products-container");
const cartIcon = document.getElementById("cart-icon");
const cartDropdown = document.getElementById("cart-dropdown");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");

// تهيئة حالة المستخدم
if (localStorage.getItem("FirstName")) {
  links1.style.display = "none";
  links2.style.display = "flex";
  userName.textContent = localStorage.getItem("FirstName");
} else {
  // إذا لم يكن المستخدم مسجل الدخول، نعيده إلى صفحة التسجيل
  window.location.href = "signup.html";
}

// تسجيل الخروج
logoutBtn.addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.clear();
  setTimeout(() => {
    window.location.href = "signup.html";
  }, 1000);
});

// إدارة السلة
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartDisplay() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  cartCount.textContent = totalItems;
  cartCount.style.display = totalItems > 0 ? "block" : "none";

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart-msg">السلة فارغة</p>';
  } else {
    const cartItemsHTML = cart
      .map(
        (item) => `
        <div class="cart-item">
          <span class="cart-item-name">${item.title} (${item.quantity})</span>
          <span class="cart-item-price">$${(
            item.price * item.quantity
          ).toLocaleString()}</span>
        </div>
      `
      )
      .join("");
    cartItems.innerHTML = cartItemsHTML;
  }
}

// فتح/إغلاق قائمة السلة
cartIcon.addEventListener("click", function () {
  cartDropdown.classList.toggle("show");
});

// إغلاق قائمة السلة عند النقر خارجها
document.addEventListener("click", function (event) {
  if (!event.target.closest(".cart-container")) {
    cartDropdown.classList.remove("show");
  }
});

// عرض السيارات في السلة - محدث لدعم الكميات
function renderCartProducts() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    productsContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <h2>سلة التسوق فارغة</h2>
        <p>لم تقم بإضافة أي سيارات إلى السلة بعد</p>
        <a href="../index.html" class="back-to-shop">العودة للتسوق</a>
      </div>
    `;
    return;
  }

  // حساب المجموع الكلي
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const productsHTML = cart
    .map((item) => {
      const itemTotal = item.price * item.quantity;
      return `
      <div class="product-card">
        <div class="product-image">
          <img src="../Images/${item.image}" alt="${item.title}">
        </div>
        <div class="product-info">
          <h3 class="product-title">${item.title}</h3>
          <p class="product-description">${item.text}</p>
          <div class="product-price">$${item.price.toLocaleString()}</div>
          
          <div class="quantity-controls">
            <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">
              <i class="fas fa-minus"></i>
            </button>
            <span class="quantity-display">${item.quantity}</span>
            <button class="quantity-btn" onclick="increaseQuantity(${item.id})">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          
          <div class="item-total">المجموع: $${itemTotal.toLocaleString()}</div>
          
          <button class="remove-from-cart-btn" onclick="removeAllFromCart(${
            item.id
          })">
            <i class="fas fa-trash"></i> حذف الكل
          </button>
        </div>
      </div>
    `;
    })
    .join("");

  productsContainer.innerHTML =
    productsHTML +
    `
    <div class="cart-summary">
      <div class="cart-total">
        <h3>المجموع الكلي: $${total.toLocaleString()}</h3>
        <button class="checkout-btn" onclick="proceedToCheckout()">
          <i class="fas fa-credit-card"></i> إتمام الشراء
        </button>
      </div>
    </div>
  `;
}

// زيادة كمية المنتج
function increaseQuantity(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((item) => item.id === productId);

  if (item) {
    item.quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
    renderCartProducts();
  }
}

// تقليل كمية المنتج
function decreaseQuantity(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemIndex = cart.findIndex((item) => item.id === productId);

  if (itemIndex !== -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity -= 1;
    } else {
      cart.splice(itemIndex, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
    renderCartProducts();
  }
}

// حذف كل كميات المنتج
function removeAllFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
  renderCartProducts();
}

// إتمام عملية الشراء
function proceedToCheckout() {
  if (confirm("هل تريد إتمام عملية الشراء؟")) {
    localStorage.removeItem("cart");
    alert("تمت عملية الشراء بنجاح! شكراً لشرائك من متجرنا.");
    renderCartProducts();
    updateCartDisplay();
  }
}

// تهيئة الصفحة
updateCartDisplay();
renderCartProducts();
