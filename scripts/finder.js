function findProducts() {
    var size = document.getElementById("size").value;
    var technology = document.getElementById("technology").value;
    var resolution = document.getElementById("resolution").value;
    var budget = document.getElementById("budget").value;
    var resultsContainer = document.getElementById("results");
    var productList = document.getElementById("productList");
    var products = [
        { name: "Samsung Crystal UHD", size: 55, technology: "led", resolution: "4k", price: 2500, image: "../assets/uhd.avif", buyLink: "#" },
        { name: "Samsung QLED", size: 65, technology: "qled", resolution: "4k", price: 4500, image: "../assets/qled.avif", buyLink: "#" },
        { name: "Samsung OLED", size: 75, technology: "oled", resolution: "8k", price: 6350, image: "../assets/oled.avif", buyLink: "#" },
        { name: "Samsung Full HD", size: 43, technology: "led", resolution: "fullhd", price: 1099, image: "../assets/fullhd.avif", buyLink: "#" },
        { name: "Samsung Neo QLED 8k", size: 55, technology: "qled", resolution: "8k", price: 12500, image: "../assets/neo8k.avif", buyLink: "#" },
        { name: "Samsung QLED", size: 75, technology: "qled", resolution: "4k", price: 4200, image: "../assets/dispozitive_tv.png", buyLink: "#" },
    ];

    var filteredProducts = products.filter(function(product) {
        return (
            (size ? product.size == size : true) &&
            (technology ? product.technology == technology : true) &&
            (resolution ? product.resolution == resolution : true) &&
            (budget ? product.price <= budget : true)
        );
    });

    productList.innerHTML = '';
    if (filteredProducts.length > 0) {
        filteredProducts.forEach(function(product) {
            var productDiv = document.createElement("div");
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
                <a class="buy-button">Cumpără</a>
            `;
            productList.appendChild(productDiv);
        });
    } else {
        productList.innerHTML = "<p>Nu au fost găsite televizoare care să corespundă criteriilor tale.</p>";
    }
    
    resultsContainer.style.display = "block";

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
            progressBar.style.width = '0%';
        }, 10);
    
        setTimeout(() => {
            popup.remove();
        }, 5000);
    }
    
    const buyButtons = document.querySelectorAll('.buy-button, .buy-now, .new_button');
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            createPopup("Produsul a fost adăugat în coș!");
        });
    });
}
