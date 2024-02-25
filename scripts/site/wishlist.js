function openWishlist(){
    var cartDisplay = document.getElementById('wishlistModalItems');

    var db = firebase.firestore();
    const [key, value] = localStorage.getItem('key').split(';')[0].split('=');
    var user_doc = db.collection("users").doc(decodeURIComponent(value));

    document.getElementById('spinner-circle').style.display = "block";

    cartDisplay.innerHTML = "";

    user_doc.get().then((doc) => {
        if (doc.exists) {
            var d = doc.data();

            var items = d['wishlist'];

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
                        <div class="media-object" style="width: 750px; padding-right: 10px;">
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
                                <button type="button" class="btn btn-outline-warning" style="flex: 1; margin-right: 10px;" onclick="onShiftToCart('` + item +`')">Cart</button>
                                <button type="button" class="btn btn-outline-danger" style="flex: 1; margin-left: 10px;" onclick="deleteWishlistItem('` + item +`')">Delete</button>
                            </div>
                        </div>
                    </div>`;
                    totalPrice += parseFloat(details['price']);
                    cartDisplay.innerHTML += detailsText;
                    if(count == l-1){
                        cartDisplay.innerHTML += `<div style="width: 100%; height: 1px; background-color: lightgrey;"></div>`;
                        cartDisplay.innerHTML += 
                        `<div style = "display: flex; flex-wrap: wrap;">
                            <button type="button" class="btn btn-danger" style="margin-left: 10px; height: 45px; margin-top: 20px; width: 150px; margin-right: 20px;" onclick="clearWishlist()">Clear Wishlist</button>
                            <button type="button" class="btn btn-warning" style="margin-left: 10px; height: 45px; margin-top: 20px; width: 150px;" onclick="addAllToCart()">Add All To Cart</button>
                            <h2 style = "flex: 1; text-align: right; padding-top: 20px;">Subtotal: $` + totalPrice.toFixed(2) +`</h2>
                        </div>`;
                    }
                    count += 1;
                }).catch((error) => {
                    console.log("Error getting details:", error);
                });
            });
            document.getElementById('spinner-circle').style.display = "none";
            document.getElementById('wishlistModalOpenButton').click();
        } else {
            alert("Invalid ID");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function deleteWishlistItem(id){
    document.getElementById('spinner-circle').style.display = "block";
    var db = firebase.firestore();
    const [key, value] = localStorage.getItem('key').split(';')[0].split('=');
    const userDocRef = db.collection('users').doc(decodeURIComponent(value));

    userDocRef.get().then((doc) => {
        if (doc.exists) {
            const wishlist = doc.data().wishlist || [];
            for(var i = 0; i < wishlist.length; i++){
                if(wishlist[i] == id){
                    wishlist.splice(i, 1);
                    break;
                }
            }
            return userDocRef.update({ wishlist: wishlist });
        } else {
            console.error("No such document!");
        }
    }).then(() => {
        console.log("Item deleted in wishlist successfully!");
        document.getElementById('spinner-circle').style.display = "none";
        document.getElementById('wishlistModalOpenButton').click();
        openWishlist();
        updateBadges();
    }).catch((error) => {
        console.error("Error updating wishlist:", error);
        document.getElementById('spinner-circle').style.display = "none";
        alert("Error Deleting Product!");
    });
}

function clearWishlist(){
    document.getElementById('spinner-circle').style.display = "block";
    var db = firebase.firestore();
    const [key, value] = localStorage.getItem('key').split(';')[0].split('=');
    const userDocRef = db.collection('users').doc(decodeURIComponent(value));

    userDocRef.get().then((doc) => {
        if (doc.exists) {
            var temp = [];
            return userDocRef.update({ wishlist: temp});
        } else {
            console.error("No such document!");
        }
    }).then(() => {
        console.log("Item deleted in wishlist successfully!");
        document.getElementById('spinner-circle').style.display = "none";
        document.getElementById('wishlistModalOpenButton').click();
        openWishlist();
        updateBadges();
    }).catch((error) => {
        console.error("Error updating wishlist:", error);
        document.getElementById('spinner-circle').style.display = "none";
        alert("Error Clearing Wishlist!");
    });
}

function onShiftToCart(id){
    onAddToCart(id);
    deleteWishlistItem(id);
}

function addAllToCart() {
    var db = firebase.firestore();
    const [key, value] = localStorage.getItem('key').split(';')[0].split('=');
    var user_doc = db.collection("users").doc(decodeURIComponent(value));

    user_doc.get().then((doc) => {
        if (doc.exists) {
            var d = doc.data();

            var items = d['wishlist'];
            var shoppingCart = d['shoppingCart'];

            shoppingCart.push(...items);
            items = [];

            // Update Firestore document
            user_doc.update({ shoppingCart: shoppingCart, wishlist: items }).then(() => {
                updateBadges();
                openShoppingCart();
            }).catch(error => {
                console.error('Error updating user document:', error);
            });

        } else {
            console.error('User document does not exist');
        }
    }).catch(error => {
        console.error('Error getting user document:', error);
    });
}
