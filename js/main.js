var editor = null;

function sendMail(e) {
    e.preventDefault();
    e.stopPropagation();
    var form = e.target;
    var btn = document.querySelector('#send');
    var status = document.querySelector('#status');
    status.classList.add('success');
    status.classList.add('error');
    //console.log('sendMail', e.target.submit);
    document.querySelector('#subject').value = 'Enquiry: ' + document.querySelector('#email').value;
    btn.innerHTML = 'Sending...';
    btn.disabled = true;
    var XHR = new XMLHttpRequest();

    // Bind the FormData object and the form element
    var FD = new FormData(form);

    // Define what happens on successful data submission
    XHR.addEventListener("load", function(event) {
        try {
            var r = JSON.parse(event.target.responseText);
            if(r.success){
                form.reset();
                document.querySelector('#subject').value = '';
                document.querySelector('#message').value = '';
                editor.content.innerHTML = '';
                document.querySelector('#status').classList.add('success');
                status.innerHTML = 'Message sent successfully.';
                setTimeout(function(){
                    status.innerHTML = '';
                    status.classList.add('success');
                    status.classList.add('error');
                }, 2000);
                //console.log(r);
            } else {
                status.classList.add('error');
                status.innerHTML = 'Message could not be sent !';
                setTimeout(function(){
                    status.innerHTML = '';
                    status.classList.add('success');
                    status.classList.add('error');
                }, 2000);
            }
        } catch(e){
            //console.error(e);
        }
        btn.innerHTML = 'Send';
        btn.disabled = false;
        
      //alert(event.target.responseText);
    });

    // Define what happens in case of error
    XHR.addEventListener("error", function(event) {
      alert('Oups! Something goes wrong.');
      console.error(event);
    });

    // Set up our request
    XHR.open("POST", "https://api.elasticemail.com/v2/email/send");

    // The data sent is what the user provided in the form
    XHR.send(FD);
}
    

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
    editor = pell.init({
        element: document.getElementById('editor'),
        onChange: function (content) {
            document.querySelector('#message').value = content;
        },
        actions: []
    });
    document.querySelector('#contactme form').addEventListener('submit', sendMail);
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
