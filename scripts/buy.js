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
