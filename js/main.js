/*
function sendMail(e) {
    e.preventDefault();
    e.stopPropagation();
    var token = '6af30e30-4b21-40fa-b5b6-c5577e0d584b';
    var to = 'kr.abhishek@yahoo.com';
    var name = e.target[0].value;
    var email = e.target[1].value;
    var subject = 'Enquiry: ' + email;
    var msg = e.target[2].value.replace(/\n/g, '<br/>');
    
    
    Email.send(name + '<' + email + '>',
        to,
        subject,
        msg,
        {
            token: token,
            callback: function (message) {
                console.log(message);
            }
        });
}
*/
function init() {
    // document.querySelector('#contactme form').addEventListener('submit', sendMail);
    requestAnimationFrame(function () {
        document.body.classList.remove('opacity_0');
    });
    var footer = document.querySelector('#copyright');
    footer.innerHTML = '© ' + (new Date()).getFullYear() + ' Kumar Abhishek';
    var scrolled = false;
    document.addEventListener('scroll', function (e) {
        var i, node, st = document.documentElement.scrollTop;
        //console.log(document.documentElement.scrollTop);
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
