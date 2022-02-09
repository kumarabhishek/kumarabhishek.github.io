function registerSW() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', { scope: '/' });
    }
}

function init() {
    registerSW();
    const footer = document.querySelector('#copyright');
    footer.innerHTML = '© ' + (new Date()).getFullYear() + ' Kumar Abhishek';
}

init();
