var editor = null;

function sendMail(e) {
    e.preventDefault();
    e.stopPropagation();
    var btn = document.querySelector('#send');
    var status = document.querySelector('#status');
    status.classList.add('success');
    status.classList.add('error');
    document.querySelector('#subject').value = 'Enquiry: ' + document.querySelector('#email').value;
    btn.innerHTML = 'Sending...';
    btn.disabled = true;

    emailjs.send('service_cuuax6j', 'template_ie65r7q', {
        to_name: 'Kumar Abhishek',
        from_name: document.querySelector('#name').value,
        from_email: document.querySelector('#email').value,
        message: document.querySelector('#message').value
    })
    .then(function(response) {
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
    }, function(error) {
        status.classList.add('error');
        status.innerHTML = 'Message could not be sent !';
        setTimeout(function(){
            status.innerHTML = '';
            status.classList.add('success');
            status.classList.add('error');
        }, 2000);
    })
    .finally(() => {
        btn.innerHTML = 'Send';
        btn.disabled = false;
    });
}
    

function registerSW() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', { scope: '/' });
    }
}

function init() {
    registerSW();
    var footer = document.querySelector('#copyright');
    footer.innerHTML = '© ' + (new Date()).getFullYear() + ' Kumar Abhishek';
    try {
        editor = pell.init({
            element: document.getElementById('editor'),
            placeholder: 'aaa',
            onChange: function (content) {
                document.querySelector('#message').value = content;
            },
            actions: []
        });
        emailjs.init("user_8vD21eDobZGqNKfAGY7OK");
        document.querySelector('#contactme form').addEventListener('submit', sendMail);
    } catch(e){}
}


init();
