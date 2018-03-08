function registerSW() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function (reg) {
            if (reg.installing) {
                // console.log('Service worker installing');
            } else if (reg.waiting) {
                // console.log('Service worker installed');
            } else if (reg.active) {
                // console.log('Service worker active');
            }
        }).catch(function (error) {
            // registration failed
            // console.log('Registration failed with ' + error);
        });
    }
}

function init() {
    registerSW();
    setTimeout(function () {
        document.body.classList.remove('opacity_0');
    }, 300);
    var footer = document.querySelector('#copyright');
    footer.innerHTML = '© ' + (new Date()).getFullYear() + ' Kumar Abhishek';
    var scrolled = false;
    document.addEventListener('scroll', function (e) {
        var i, node, st = document.documentElement.scrollTop;
        if (st > 192) {
            document.querySelector('#landing').classList.add('scrolled');

            var a = document.querySelector('.scrolled .square');
            var h = a.clientHeight || a.scrollHeight;
            document.querySelector('.scrolled #padder').style.height = 'calc(12rem + ' + h + 'px)';
            !scrolled && window.scrollTo(0, 193);
            scrolled = true;
        } else {
            scrolled = false;
            document.querySelector('#landing').classList.remove('scrolled');
            document.querySelector('#padder').style.height = '1rem';
        }
    });
}


if (document.readyState === 'complete') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', init);
}
