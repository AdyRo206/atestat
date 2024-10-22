function detectBrowser() {
    const isFirefox = typeof InstallTrigger !== 'undefined';
    if (isFirefox) {
        document.body.innerHTML = '<h1 style="color: red; font-size: 120px; top: 50%; position: relative; text-align: center;">Browser Incompatibil</h1>'; 
        setTimeout(() => {
        alert("Atenție: Acest site nu funcționează în Firefox!");  }, 1000);
    }
}
window.onload = detectBrowser;