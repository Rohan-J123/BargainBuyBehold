function accountOpen(){
    var button = document.getElementById('AccountButton');
    document.getElementById('accountGotoAccount').click();
    button.click();
}

function accountOpenAgain(){
    var cancelButton = document.getElementById('cancelPassword');
    cancelButton.click();

    var button = document.getElementById('AccountButton');
    button.click();
}

function onUpdateAddress(){
    document.getElementById("accountGotoAddressSave").click();
}

function onUpdatePhoneNumber(){
    document.getElementById("accountGotoPhoneNumberSave").click();
}

function onUpdateAddressCheckout(){
    document.getElementById("shopping-cart-close").click();
    accountOpen();
    onUpdateAddress();
}

function onUpdatePhoneNumberCheckout(){
    document.getElementById("shopping-cart-close").click();
    accountOpen();
    onUpdatePhoneNumber();
}


function onBackAddress(){
    document.getElementById('AddressTextArea').value = "";
    document.getElementById('PhoneNumberTextArea').value = "";
    document.getElementById("accountGotoAccount").click();
}

function onSaveAddress(){
    document.getElementById('spinner-circle').style.display = "block";
    var db = firebase.firestore();
    const [key, value] = localStorage.getItem('key').split(';')[0].split('=');
    var newAddress = document.getElementById('AddressTextArea').value;

    db.collection('users').doc(decodeURIComponent(value)).update({
        homeAddress: newAddress
    })
    .then(() => {
        console.log('Document successfully written!');
        address();
        alert("Address Successfully Updated.");
        document.getElementById('spinner-circle').style.display = "none";
        onBackAddress();
        document.getElementById('accountClose').click();
    })
    .catch((error) => {
        console.error('Error writing document: ', error);
        alert("Error Updating Address!");
    });
}

function onSavePhoneNumber(){
    document.getElementById('spinner-circle').style.display = "block";
    var db = firebase.firestore();
    const [key, value] = localStorage.getItem('key').split(';')[0].split('=');
    var phoneNumber = document.getElementById('PhoneNumberTextArea').value;

    db.collection('users').doc(decodeURIComponent(value)).update({
        phoneNumber: phoneNumber
    })
    .then(() => {
        console.log('Document successfully written!');
        address();
        alert("Phone Number Successfully Updated.");
        document.getElementById('spinner-circle').style.display = "none";
        onBackAddress();
        document.getElementById('accountClose').click();
    })
    .catch((error) => {
        console.error('Error writing document: ', error);
        alert("Error Updating Phone Number!");
    });
}

const cookies = localStorage.getItem('key').split(';');
var loginInfo = {};

cookies.forEach(cookie => {
    const [key, value] = cookie.split('=').map(part => part.trim());
    if (key && value) {
        loginInfo[key] = decodeURIComponent(value);
    }
});

document.getElementById('emailAccount').innerText = "Email: " + loginInfo['email']; 
document.getElementById('emailAccountPassword').innerText = "Email: " + loginInfo['email'];
document.getElementById('emailCheckout').innerText = "Email: " + loginInfo['email'];

function address(){
    var db = firebase.firestore();
    const [key, value] = localStorage.getItem('key').split(';')[0].split('=');
    var user_doc = db.collection("users").doc(decodeURIComponent(value));

    user_doc.get().then((doc) => {
        if (doc.exists) {
            var d = doc.data();

            document.getElementById('homeAddressAccount').innerText = "Address: " + d['homeAddress'];
            document.getElementById('phoneNumberAccount').innerText = "Phone Number: " + d['phoneNumber'];
            document.getElementById('homeAddressCheckout').innerText = "Address: " + d['homeAddress'];
            document.getElementById('phoneNumberCheckout').innerText = "Phone Number: " + d['phoneNumber'];
        } else {
            alert("Invalid ID");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

address();
