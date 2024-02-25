function openShoppingCart(){
    var cartDisplay = document.getElementById('shoppingCartItems');

    var db = firebase.firestore();
    const [key, value] = localStorage.getItem('key').split(';')[0].split('=');
    var user_doc = db.collection("users").doc(decodeURIComponent(value));

    cartDisplay.innerHTML = "";

    user_doc.get().then((doc) => {
        if (doc.exists) {
            var d = doc.data();

            var items = d['shoppingCart'];

            items.sort(function(a, b) {
                return a - b;
            });

            var l = items.length;
            var count = 0;
            var totalPrice = 0.0;
            items.forEach(function(item) {
                getDetails(item.toString()).then((details) => {
                    var detailsText = 
                    `<div style="display: flex; flex-wrap: wrap;">
                        <div class="media-object" style="flex: 3; padding-right: 10px;">
                            <div class="media-object-section">
                                <img class="thumbnail top-products" src="` + details['imageURL'] + `" onclick="getCard('` + item +`')">
                            </div>
                            <div class="media-object-section">
                                <h5 class="truncate-top" style="font-weight: bold;">` + details['title'] +`</h5>
                                <p class="truncate-top-des">` + details['description'] +`</p>
                            </div>
                        </div>
                        <div style="flex: 1; padding-left: 10px;">
                            <h4>Price: $` + details['price'] + `</h4>
                            <div style="display: flex; padding-bottom: 20px;">
                                <button type="button" class="btn btn-outline-success" style="flex: 1; margin-right: 10px;" onclick="onShiftToWishlist('` + item +`')">Wishlist</button>
                                <button type="button" class="btn btn-outline-danger" style="flex: 1; margin-left: 10px;" onclick="deleteShoppingCartItem('` + item +`')">Delete</button>
                            </div>
                        </div>
                    </div>`;
                    totalPrice += parseFloat(details['price']);
                    cartDisplay.innerHTML += detailsText;
                    if(count == l-1){
                        cartDisplay.innerHTML += `<div style="width: 100%; height: 1px; background-color: lightgrey;"></div>`;
                        cartDisplay.innerHTML += 
                        `<div style = "display: flex; flex-wrap: wrap;">
                            <button type="button" class="btn btn-danger" style="margin-left: 10px; height: 45px; margin-top: 20px; width: 120px; margin-right: 20px;" onclick="clearCart()">Clear Cart</button>
                            <button type="button" class="btn btn-success" style="margin-left: 10px; height: 45px; margin-top: 20px; width: 120px;" onclick="checkingOut()">Checkout</button>
                            <h3 style = "flex: 1; text-align: right; padding-right: 30px; padding-top: 20px;">Total Amount: $` + totalPrice +`</h3>
                        </div>`;
                    }
                    count += 1;
                }).catch((error) => {
                    console.log("Error getting details:", error);
                });
            });
            document.getElementById('shoppingCartOpenButton').click();
        } else {
            alert("Invalid ID");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

async function getDetails(id) {
    var db = firebase.firestore();
    var item_doc = db.collection("prducts").doc(id);

    try {
        var doc = await item_doc.get();
        if (doc.exists) {
            var d = doc.data();
            return d;
        } else {
            alert("Invalid ID");
        }
    } catch (error) {
        console.log("Error getting document:", error);
    }
}

function deleteShoppingCartItem(id){
    document.getElementById('spinner-circle').style.display = "block";
    var db = firebase.firestore();
    const [key, value] = localStorage.getItem('key').split(';')[0].split('=');
    const userDocRef = db.collection('users').doc(decodeURIComponent(value));

    userDocRef.get().then((doc) => {
        if (doc.exists) {
            const shoppingCart = doc.data().shoppingCart || [];
            for(var i = 0; i < shoppingCart.length; i++){
                if(shoppingCart[i] == id){
                    shoppingCart.splice(i, 1);
                    break;
                }
            }
            return userDocRef.update({ shoppingCart: shoppingCart });
        } else {
            console.error("No such document!");
        }
    }).then(() => {
        console.log("Item deleted in shopping cart successfully!");
        document.getElementById('spinner-circle').style.display = "none";
        document.getElementById('shoppingCartOpenButton').click();
        openShoppingCart();
        updateBadges();
    }).catch((error) => {
        console.error("Error updating shopping cart:", error);
        document.getElementById('spinner-circle').style.display = "none";
        alert("Error Deleting Product!");
    });
}

function clearCart(){
    document.getElementById('spinner-circle').style.display = "block";
    var db = firebase.firestore();
    const [key, value] = localStorage.getItem('key').split(';')[0].split('=');
    const userDocRef = db.collection('users').doc(decodeURIComponent(value));

    userDocRef.get().then((doc) => {
        if (doc.exists) {
            var temp = [];
            return userDocRef.update({ shoppingCart: temp});
        } else {
            console.error("No such document!");
        }
    }).then(() => {
        console.log("Item deleted to shopping cart successfully!");
        document.getElementById('spinner-circle').style.display = "none";
        document.getElementById('shoppingCartOpenButton').click();
        openShoppingCart();
        updateBadges();
    }).catch((error) => {
        console.error("Error updating shopping cart:", error);
        document.getElementById('spinner-circle').style.display = "none";
        alert("Error Clearing Cart!");
    });
}

function onShiftToWishlist(id){
    onAddToWishlist(id);
    deleteShoppingCartItem(id);
}

function checkingOut(){
    var cartDisplay = document.getElementById('shoppingCartCheckOutItems');

    var db = firebase.firestore();
    const [key, value] = localStorage.getItem('key').split(';')[0].split('=');
    var user_doc = db.collection("users").doc(decodeURIComponent(value));

    cartDisplay.innerHTML = "";

    user_doc.get().then((doc) => {
        if (doc.exists) {
            var d = doc.data();

            var items = d['shoppingCart'];

            items.sort(function(a, b) {
                return a - b;
            });

            var l = items.length;
            var count = 0;
            var totalPrice = 0.0;
            items.forEach(function(item) {
                getDetails(item.toString()).then((details) => {
                    var detailsText = 
                    `<div class="media-object" style="padding-right: 10px; padding-top: 30px;">
                            <div class="media-object-section">
                                <img class="thumbnail top-products" src="` + details['imageURL'] + `" onclick="getCard('` + item +`')">
                            </div>
                            <div class="media-object-section">
                                <h5 class="truncate-top" style="font-weight: bold; margin-top: 15px;">` + details['title'] +`</h5>
                                <p class="truncate-top-des">$` + details['price'] +`</p>
                            </div>
                    </div>`;
                    totalPrice += parseFloat(details['price']);
                    cartDisplay.innerHTML += detailsText;
                    if(count != l-1){
                        cartDisplay.innerHTML += `<div style="width: 100%; height: 1px; background-color: lightgrey;"></div>`;
                    }
                    count += 1;
                }).catch((error) => {
                    console.log("Error getting details:", error);
                });
            });
            document.getElementById('shopping-cart-checkout').click();
        } else {
            alert("Invalid ID");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}
