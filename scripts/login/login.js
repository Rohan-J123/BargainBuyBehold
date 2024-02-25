function setLoginCookie(email, password, expiryDays) {
    var cookieValue = "email=" + encodeURIComponent(email) + ";";
    cookieValue += "password=" + encodeURIComponent(password);

    localStorage.setItem('key', cookieValue);
}

function getLoginCookie() {
    const cookies = localStorage.getItem('key').split(';');
    var loginInfo = {};

    cookies.forEach(cookie => {
        const [key, value] = cookie.split('=').map(part => part.trim());
        if (key && value) {
            loginInfo[key] = decodeURIComponent(value);
        }
    });
    return loginInfo;
}

var storedLoginInfo = getLoginCookie();
if (storedLoginInfo.email && storedLoginInfo.password) {
    document.getElementById("signInEmail").value = storedLoginInfo.email;
    document.getElementById("signInPassword").value = storedLoginInfo.password;
    var submitButton = document.getElementById('signInSubmit');
    submitButton.click();
}