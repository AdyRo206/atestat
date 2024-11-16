let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productName, productPrice) {
    const product = {
        name: productName,
        price: productPrice
    };
    cart.push(product);
    saveCart();
    updateCartCount();
    showCartMessage(productName);
    displayCartItems();
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

function showCartMessage(productName) {
    const message = document.createElement('div');
    message.className = 'cart-message';
    message.innerHTML = `<p>${productName} a fost adăugat în coș!</p>`;
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 3000);
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('total-price');
    const proceedButton = document.getElementById('proceed-button');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Coșul este gol!</p>';
        totalContainer.textContent = '0 lei';
        proceedButton.classList.add('disabled');
        proceedButton.href = '#';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="left_cart">
                <p>${item.name}</p>
                <p>${item.price} lei</p>
            </div>
            <div class="right_cart">
                <button class="delete_button" onclick="removeFromCart(${index})">x</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += parseFloat(item.price);
    });

    totalContainer.textContent = `${total.toFixed(2)} lei`;
    proceedButton.classList.remove('disabled');
    proceedButton.href = 'payment.html';
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    displayCartItems();
    updateCartCount();
}

function checkCartBeforeProceed() {
    if (cart.length === 0) {
        alert('Coșul este gol!');
        return false;
    }
    window.location.href = 'payment.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cartPopup = document.getElementById('cart-popup');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    function loadCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const div = document.createElement('div');
            div.textContent = `${item.name} - ${item.price} lei`;
            cartItemsContainer.appendChild(div);
            total += parseFloat(item.price);
        });

        cartTotal.textContent = total.toFixed(2) + ' lei';
        cartCount.textContent = cart.length;
    }

    loadCart();

    cartIcon.addEventListener('click', () => {
        window.location.href = 'cart.html';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    document.getElementById('total-price').textContent = total.toFixed(2) + ' lei';
    document.getElementById('tva').textContent = (total * 0.19).toFixed(2) + ' lei';
    document.getElementById('transport').textContent = 'Gratuit';
});

function goToPayment() {
    document.getElementById('delivery-section').style.display = 'none';
    document.getElementById('payment-section').style.display = 'block';
}

function finalizeOrder() {
    alert('Comanda a fost plasată cu succes!');
    localStorage.removeItem('cart'); 
    window.location.href = '../index.html'; 
}


function validateCardNumber(number) {
    return /^[0-9]{13,19}$/.test(number);
}

function detectCardType(number) {
    const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const masterCardRegex = /^5[1-5][0-9]{14}$/;
    const amexRegex = /^3[47][0-9]{13}$/;

    if (visaRegex.test(number)) return "visa";
    if (masterCardRegex.test(number)) return "mastercard";
    if (amexRegex.test(number)) return "amex";
    return "";
}

function detectCardTypeAndUpdateLogo() {
    const cardNumber = document.getElementById('card-number').value;
    const cardLogo = document.getElementById('card-logo');
    const cardError = document.getElementById('card-error');
    const cardType = detectCardType(cardNumber);

    let logoSrc = "";
    switch (cardType) {
        case "visa":
            logoSrc = "../assets/visa.png";
            break;
        case "mastercard":
            logoSrc = "../assets/mastercard.png";
            break;
        case "amex":
            logoSrc = "assets/amex.png";
            break;
        default:
            logoSrc = "";
    }

    cardLogo.src = logoSrc;
    cardLogo.style.display = logoSrc ? "block" : "none";
    cardError.textContent = cardNumber && !validateCardNumber(cardNumber) ? "Numărul cardului este invalid!" : "";
}

function processPayment() {
    const cardNumber = document.getElementById('card-number').value;
    const cardError = document.getElementById('card-error');

    if (!validateCardNumber(cardNumber)) {
        cardError.textContent = "Numărul cardului este invalid!";
        return;
    }

    document.getElementById('loading-spinner').style.display = 'flex';

    setTimeout(() => {

        document.getElementById('loading-spinner').style.display = 'none';
        document.getElementById('success-message').style.display = 'flex';

        setTimeout(() => {
            localStorage.removeItem('cart');
            window.location.href = '../index.html';
        }, 5000);
    }, 3000);
}


function goToPayment() {
    document.getElementById('delivery-section').style.display = 'none';
    document.getElementById('payment-section').style.display = 'block';
}

function backToDelivery() {
    document.getElementById('delivery-section').style.display = 'block';
    document.getElementById('payment-section').style.display = 'none';
}

function validateDeliveryForm() {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const errorElement = document.getElementById("delivery-error");

    errorElement.style.display = 'none';

    if (!name || !address || !phone) {
        errorElement.textContent = "Te rugăm să completezi toate câmpurile.";
        errorElement.style.display = 'block'; 
        return false;
    }

    document.getElementById("delivery-section").style.display = "none";
    document.getElementById("payment-section").style.display = "block";
    return false;  
}
function validatePaymentForm() {
    const cardNumber = document.getElementById("card-number").value;
    const cardName = document.getElementById("card-name").value;
    const cardExpiry = document.getElementById("card-expiry").value;
    const cardCvc = document.getElementById("card-cvc").value;
    const errorElement = document.getElementById("payment-error");

    errorElement.style.display = 'none'; 

    if (!cardNumber || !cardName || !cardExpiry || !cardCvc) {
        errorElement.textContent = "Te rugăm să completezi toate câmpurile de plată.";
        errorElement.style.display = 'block'; 
        return false;
    }

    processPayment();
    return false; 
}

document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }
});
