const cartItems = document.querySelector(".cart-items");
const cartTotal = document.getElementById("total-amount");
const clearCartButton = document.getElementById("clear-cart");
let totalAmount = 0;

// Функція для оновлення ціни товару та загальної вартості корзини
function updateCartItemPrice(cartItem) {
    const quantityInput = cartItem.querySelector(".quantity");
    const itemPrice = parseFloat(cartItem.querySelector(".item-price").textContent);
    const itemTotal = itemPrice * parseInt(quantityInput.value);
    cartItem.querySelector(".item-total").textContent = itemTotal + " грн";

    totalAmount = Array.from(cartItems.children).reduce((total, item) => {
        const itemTotal = parseFloat(item.querySelector(".item-total").textContent);
        return total + itemTotal;
    }, 0);
    cartTotal.textContent = totalAmount + " грн";
}

// Функція для видалення товару з корзини
function removeCartItem() {
    const cartItem = this.parentElement;
    const itemTotal = parseFloat(cartItem.querySelector(".item-total").textContent);
    totalAmount -= itemTotal;
    cartTotal.textContent = totalAmount;
    cartItem.remove();

    updateCartCount();
}

// Функція для оновлення кількості елементів у корзині та в меню
function updateCartCount() {
    const itemCount = cartItems.children.length;
    document.getElementById("cart-count").textContent = itemCount;
}

// Функція для додавання товару до корзини
function addToCart(product) {
    const quantityInput = this.parentElement.querySelector(".quantity");
    const quantity = parseInt(quantityInput.value);

    const cartItem = document.createElement("li");
    const itemPrice = product.price;
    const itemTotal = itemPrice * quantity;
    cartItem.innerHTML = `
        <img src="${product.imgSrc}" alt="${product.name}">
        <span>${product.name}</span>
        <input type="number" value="${quantity}" min="1" class="quantity">
        <span class="item-price">${itemPrice} грн</span>
        <span class="item-total">${itemTotal} грн</span>
        <button class="remove-item">Видалити</button>
    `;

    // Обробник подій для кнопки видалення товару з корзини
    cartItem.querySelector(".remove-item").addEventListener("click", removeCartItem);

    // Обробник подій для зміни кількості товару
    cartItem.querySelector(".quantity").addEventListener("change", function () {
        updateCartItemPrice(cartItem);
    });


    cartItems.appendChild(cartItem);


    updateCartItemPrice(cartItem);


    updateCartCount();
}

// Обробник подій для кнопки "Очистити корзину"
clearCartButton.addEventListener("click", function () {
    while (cartItems.firstChild) {
        cartItems.removeChild(cartItems.firstChild);
    }
    totalAmount = 0;
    cartTotal.textContent = "0 грн";
    updateCartCount();
});


// Обробник подій для кнопок "Додати до корзини"
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(button => {
    button.addEventListener("click", function () {
        const product = {
            imgSrc: this.parentElement.querySelector("img").src,
            name: this.parentElement.querySelector("h3").textContent,
            price: parseFloat(this.parentElement.querySelector(".product-price").textContent),
        };
        addToCart.call(this, product); 
    });
});



const categorySelect = document.getElementById("category-select");
const sortSelect = document.getElementById("sort-select");
const productsContainer = document.querySelector(".products");
const products = Array.from(document.querySelectorAll(".product"));

// set event to buttons
categorySelect.addEventListener("change", filterProducts);
sortSelect.addEventListener("change", sortProducts);

// function to sort goods
function filterProducts() {
    const selectedCategory = categorySelect.value;

    products.forEach((product) => {
        const category = product.getAttribute("data-category");
        if (selectedCategory === "all" || category === selectedCategory) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

function sortProducts() {
    const selectedSort = sortSelect.value;
    
    products.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute("data-price"));
        const priceB = parseFloat(b.getAttribute("data-price"));

        if (selectedSort === "price-asc") {
            return priceA - priceB;
        } else {
            return priceB - priceA;
        }
    });
    productsContainer.innerHTML = "";

    products.forEach((product) => {
        productsContainer.appendChild(product);
    });
}

filterProducts();
sortProducts();
