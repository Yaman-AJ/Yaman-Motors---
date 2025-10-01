// عناصر DOM
const links1 = document.getElementById("links-1");
const links2 = document.getElementById("links-2");
const userName = document.getElementById("user-name");
const logoutBtn = document.getElementById("logout");
const productsContainer = document.getElementById("products-container");
const cartIcon = document.getElementById("cart-icon");
const cartDropdown = document.getElementById("cart-dropdown");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");

// بيانات السيارات
const products = [
  {
    id: 1,
    title: "Lamborghini Urus 2024",
    text: "سيارة دفع رباعي فائقة الأداء بتصميم عدواني ومحرك قوي يجمع بين الفخامة والأداء الرياضي",
    image: "lamborghini-urus-2024.jpg",
    price: 240000,
  },
  {
    id: 2,
    title: "BMW X7 2024",
    text: "دفع رباعي فاخر بمقاعد جلدية فاخرة ونظام ترفيهي متكامل مع أداء قوي وتصميم رياضي",
    image: "bmw-x7-2024.jpg",
    price: 98000,
  },
  {
    id: 3,
    title: "Audi A8 2024",
    text: "سيارة سيدان فاخرة بشاشات لمس متعددة ونظام صوتي متميز وتقنيات أمان متطورة",
    image: "audi-a8-2024.jpg",
    price: 89000,
  },
  {
    id: 4,
    title: "Jaguar F-PACE 2024",
    text: "دفع رباعي بريطاني فاخر بتصميم رياضي أنيق ومقاعد جلدية فاخرة وأداء متميز",
    image: "jaguar-f-pace-2024.jpg",
    price: 65000,
  },
  {
    id: 5,
    title: "Range Rover Sport 2024",
    text: "دفع رباعي فاخر بتصميم أنيق وقدرات طرق وعرة متميزة مع راحة فائقة للمقاعد",
    image: "range-rover-sport-2024.jpg",
    price: 95000,
  },
  {
    id: 6,
    title: "Lexus LX 2024",
    text: "سيارة دفع رباعي فاخرة بمقاعد جلدية طبيعية ونظام تعليق هوائي وتصميم داخلي فاخر",
    image: "lexus-lx-2024.jpg",
    price: 92000,
  },
  {
    id: 7,
    title: "Tesla Model S 2024",
    text: "سيارة كهربائية فاخرة بتسارع مذهل وتقنيات متطورة وشاشة مركزية كبيرة وتصميم مستقبلي",
    image: "tesla-model-s-2024.jpg",
    price: 89999,
  },
  {
    id: 8,
    title: "Porsche Cayenne 2024",
    text: "سيارة دفع رباعي رياضية تجمع بين الأناقة والأداء العالي مع محركات قوية وتصميم ديناميكي",
    image: "porsche-cayenne-2024.jpg",
    price: 85000,
  },
  {
    id: 9,
    title: "Mercedes-Benz S-Class 2024",
    text: "سيارة فاخرة بتصميم أنيق وتقنيات متطورة تجمع بين الراحة والأداء المتميز في تجربة قيادة لا تُنسى",
    image: "mercedes-s-class-2024.jpg",
    price: 125000,
  },
  {
    id: 10,
    title: "Ferrari Purosangue 2024",
    text: "أول سيارة دفع رباعي من فيراري بتصميم أنيق وأداء خارق يجمع بين راحة SUV وأداء السوبر كار",
    image: "ferrari-purosangue-2024.jpg",
    price: 350000,
  },
  {
    id: 11,
    title: "Bentley Bentayga 2024",
    text: "سيارة دفع رباعي فاخرة بتصميم بريطاني راقي ومقاعد فاخرة وتقنيات متطورة",
    image: "bentley-bentayga-2024.jpg",
    price: 180000,
  },
  {
    id: 12,
    title: "Rolls-Royce Cullinan 2024",
    text: "أفخم سيارة دفع رباعي في العالم بتصميم فاخر ومقاعد ملكية وتجربة قيادة لا مثيل لها",
    image: "rolls-royce-cullinan-2024.jpg",
    price: 450000,
  },
];

// تهيئة حالة المستخدم
function initUserState() {
  if (localStorage.getItem("FirstName")) {
    links1.style.display = "none";
    links2.style.display = "flex";
    userName.textContent = localStorage.getItem("FirstName");
  } else {
    links1.style.display = "flex";
    links2.style.display = "none";
  }
}

// تسجيل الخروج
logoutBtn.addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.clear();
  setTimeout(() => {
    window.location.href = "pages/signup.html";
  }, 1000);
});

// عرض السيارات
function renderProducts() {
  const isLoggedIn = localStorage.getItem("FirstName");
  const productsHTML = products
    .map((product) => {
      return `
      <div class="product-card">
        <div class="product-image">
          <img src="Images/${product.image}" alt="${product.title}">
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-description">${product.text}</p>
          <div class="product-price">$${product.price.toLocaleString()}</div>
          <button class="add-to-cart-btn" onclick="addToCart(${product.id})" ${
        !isLoggedIn ? "disabled" : ""
      }>
            <i class="fas ${!isLoggedIn ? "fa-lock" : "fa-cart-plus"}"></i> 
            ${!isLoggedIn ? "سجل الدخول للإضافة" : "أضف إلى السلة"}
          </button>
          ${
            !isLoggedIn
              ? '<p class="login-required">يجب تسجيل الدخول لإضافة المنتجات إلى السلة</p>'
              : ""
          }
        </div>
      </div>
    `;
    })
    .join("");

  productsContainer.innerHTML = productsHTML;
}

// إدارة السلة - محدث لدعم الكميات
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartDisplay() {
  // تحديث عدد العناصر في السلة (مجموع الكميات)
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
  cartCount.style.display = totalItems > 0 ? "block" : "none";

  // تحديث محتويات السلة في القائمة المنسدلة
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

  // حفظ السلة في localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

// إضافة سيارة إلى السلة - محدث لدعم الكميات
function addToCart(productId) {
  const isLoggedIn = localStorage.getItem("FirstName");

  if (!isLoggedIn) {
    alert("يجب تسجيل الدخول أولاً لإضافة المنتجات إلى السلة");
    window.location.href = "pages/login.html";
    return;
  }

  const product = products.find((p) => p.id === productId);
  if (product) {
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    updateCartDisplay();

    const addBtn = event.target.closest(".add-to-cart-btn");
    const originalHTML = addBtn.innerHTML;

    addBtn.innerHTML = '<i class="fas fa-check"></i> تم الإضافة';
    addBtn.classList.add("added");

    setTimeout(() => {
      addBtn.innerHTML = originalHTML;
      addBtn.classList.remove("added");
    }, 1500);
  }
}

// فتح/إغلاق قائمة السلة
cartIcon.addEventListener("click", function () {
  const isLoggedIn = localStorage.getItem("FirstName");
  if (!isLoggedIn) {
    alert("يجب تسجيل الدخول أولاً لعرض السلة");
    window.location.href = "pages/login.html";
    return;
  }
  cartDropdown.classList.toggle("show");
});

// إغلاق قائمة السلة عند النقر خارجها
document.addEventListener("click", function (event) {
  if (!event.target.closest(".cart-container")) {
    cartDropdown.classList.remove("show");
  }
});

// تهيئة التطبيق
initUserState();
renderProducts();
updateCartDisplay();
