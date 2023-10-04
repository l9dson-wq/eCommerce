const loginErrorMessage = document.getElementById('login_error_alert_message');
const loginEmailErrorMessage = document.getElementById('login_email_error_message');

if(window.location.search.includes('userFound=false')){
    userFound();
}

if(window.location.search.includes('userEmailConfirmed=false')){
    userEmailConfirmed();
}

function userEmailConfirmed(){
    loginEmailErrorMessage.style.display = 'block';
}

function userFound(){
    loginErrorMessage.style.display = 'block';
}