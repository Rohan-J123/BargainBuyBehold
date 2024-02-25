function onLogout(){
    localStorage.setItem('key', '');
    window.location.href = "./index.html";
}

function onPasswordChange(){
    var button = document.getElementById('accountClose');
    button.click();

    var passwordButton = document.getElementById('passwordButton');
    passwordButton.click();
}

function changingPasswordFirebase(){
    var currentPassword = document.getElementById('currentPassword').value;
    var newPassword = document.getElementById('choosePassword').value;
    var newPasswordConfirm = document.getElementById('confirmPassword').value;

    const cookies = localStorage.getItem('key').split(';');
    var loginInfo = {};

    cookies.forEach(cookie => {
        const [key, value] = cookie.split('=').map(part => part.trim());
        if (key && value) {
            loginInfo[key] = decodeURIComponent(value);
        }
    });

    if(newPassword != newPasswordConfirm){
        alert("The passwords don't match!");
    } else {
        firebase.auth().signInWithEmailAndPassword(loginInfo['email'], currentPassword)
            .then((userCredential) => {
                var user = userCredential.user;
                return user.updatePassword(newPassword);
            })
            .then(() => {
                console.log("Password updated successfully");
                alert("Password updated successfully");
                var cancelButton = document.getElementById('cancelPassword');
                cancelButton.click();
            })
            .catch((error) => {
                var errorMessage = error.message;
                console.error("Error changing password:", errorMessage);
                alert(errorMessage);
            });
    }
}