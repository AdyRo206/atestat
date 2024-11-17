function createPopup(message) {
    const popupContainer = document.getElementById('popupContainer');
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        ${message}
        <div class="progress-bar"></div>
    `;
    
    popupContainer.appendChild(popup);

    const progressBar = popup.querySelector('.progress-bar');
    setTimeout(() => {
        progressBar.style.width = '100%';
    }, 10);

    setTimeout(() => {
        popup.remove();
    }, 5000);
}

function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = { name: productName, price: productPrice };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartDisplay();

    createPopup("Produsul a fost adăugat în coș!");
}

function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('total-price');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <span>${item.name}</span>
            <span>${item.price} Lei</span>
        `;
        cartContainer.appendChild(itemElement);
        totalPrice += item.price;
    });

    totalContainer.textContent = `${totalPrice} Lei`;
}

function findProducts() {
    const size = document.getElementById("size").value;
    const technology = document.getElementById("technology").value;
    const resolution = document.getElementById("resolution").value;
    const budget = document.getElementById("budget").value;
    const resultsContainer = document.getElementById("results");
    const productList = document.getElementById("productList");

    const products = [
        { name: "Samsung Crystal UHD", size: 55, technology: "led", resolution: "4k", price: 2500, image: "../assets/uhd.avif" },
        { name: "Samsung QLED", size: 65, technology: "qled", resolution: "4k", price: 4500, image: "../assets/qled.avif" },
        { name: "Samsung OLED", size: 75, technology: "oled", resolution: "8k", price: 6350, image: "../assets/oled.avif" },
        { name: "Samsung Full HD", size: 43, technology: "led", resolution: "fullhd", price: 1099, image: "../assets/fullhd.avif" },
        { name: "Samsung Neo QLED 8k", size: 55, technology: "qled", resolution: "8k", price: 12500, image: "../assets/neo8k.avif" },
        { name: "Samsung QLED", size: 75, technology: "qled", resolution: "4k", price: 4200, image: "../assets/dispozitive_tv.png" }
    ];

    const filteredProducts = products.filter(product =>
        (size ? product.size == size : true) &&
        (technology ? product.technology == technology : true) &&
        (resolution ? product.resolution == resolution : true) &&
        (budget ? product.price <= budget : true)
    );

    productList.innerHTML = '';
    if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("result-item");
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <h3>${product.name}</h3>
                    <p>Dimensiune: ${product.size} inch</p>
                    <p>Tehnologie: ${product.technology}</p>
                    <p>Rezoluție: ${product.resolution}</p>
                    <p>Preț: ${product.price} Lei</p>
                </div>
                <button class="buy-button" onclick="addToCart('${product.name}', ${product.price})">Cumpără</button>
            `;
            productList.appendChild(productDiv);
        });
    } else {
        productList.innerHTML = "<p>Nu au fost găsite televizoare care să corespundă criteriilor tale.</p>";
    }
    
    resultsContainer.style.display = "block";
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();

    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.dataset.name;
            const productPrice = parseFloat(event.target.dataset.price);
            addToCart(productName, productPrice);
        });
    });
});

