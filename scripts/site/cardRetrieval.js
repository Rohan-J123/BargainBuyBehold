function getCard(id){
    var cardButton = document.getElementById('card-button');
    var product_doc = db.collection("prducts").doc(id);

    document.getElementById('spinner-circle').style.display = "block";

    product_doc.get().then((doc) => {
        if (doc.exists) {
            var d = doc.data();
            document.getElementById('card-title').innerText = d['title'];
            document.getElementById('card-description').innerText = d['description'];
            document.getElementById('card-price').innerText = d['price'];
            document.getElementById('card-category').innerText = d['category'];
            document.getElementById('card-count').innerText = d['count'];
            document.getElementById('card-rating-text').innerText = d['rating'];
            document.getElementById('card-image').src = d['imageURL'];
            var ratingProgress = (d['rating'] * 20);
            document.getElementById('card-rating-progress').style.width = ratingProgress +'%';

            onMoreLikeThis(d['category'].toLowerCase().replace("'", ""));

            document.getElementById('spinner-circle').style.display = "none";
            cardButton.click();

            document.getElementById("card-add-to-cart").onclick = function() {
                onAddToCart(id);
            };

            document.getElementById("card-add-to-wishlist").onclick = function() {
                onAddToWishlist(id);
            };
        } else {
            alert("Invalid ID");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function onAddToCart(id){
    document.getElementById('spinner-circle').style.display = "block";
    var db = firebase.firestore();
    const [key, value] = localStorage.getItem('key').split(';')[0].split('=');
    const userDocRef = db.collection('users').doc(decodeURIComponent(value));

    userDocRef.get().then((doc) => {
        if (doc.exists) {
            const shoppingCart = doc.data().shoppingCart || [];
            shoppingCart.push(id);
            return userDocRef.update({ shoppingCart: shoppingCart });
        } else {
            console.error("No such document!");
        }
    }).then(() => {
        console.log("Item added to shopping cart successfully!");
        document.getElementById('spinner-circle').style.display = "none";
        document.getElementById('card-close').click();
        updateBadges();
    }).catch((error) => {
        console.error("Error updating shopping cart:", error);
        document.getElementById('spinner-circle').style.display = "none";
        alert("Error Adding Product!");
    });
}

function onAddToWishlist(id){
    document.getElementById('spinner-circle').style.display = "block";
    var db = firebase.firestore();
    const [key, value] = localStorage.getItem('key').split(';')[0].split('=');
    const userDocRef = db.collection('users').doc(decodeURIComponent(value));

    userDocRef.get().then((doc) => {
        if (doc.exists) {
            const wishlist = doc.data().wishlist || [];
            wishlist.push(id);
            return userDocRef.update({ wishlist: wishlist });
        } else {
            console.error("No such document!");
        }
    }).then(() => {
        console.log("Item added to wishlist successfully!");
        document.getElementById('spinner-circle').style.display = "none";
        document.getElementById('card-close').click();
        updateBadges();
    }).catch((error) => {
        console.error("Error updating wishlist:", error);
        document.getElementById('spinner-circle').style.display = "none";
        alert("Error Adding Product!");
    });
}

function updateBadges(){
    var db = firebase.firestore();
    const [key, value] = localStorage.getItem('key').split(';')[0].split('=');
    const userDocRef = db.collection('users').doc(decodeURIComponent(value));

    userDocRef.get().then((doc) => {
        if (doc.exists) {
            const shoppingCart = doc.data().shoppingCart || [];
            document.getElementById('shoppingCartBadge').innerText = shoppingCart.length;

            const wishlist = doc.data().wishlist || [];
            document.getElementById('wishlistBadge').innerText = wishlist.length;
        } else {
            console.error("No such document!");
        }});
}

function onMoreLikeThis(searchText){ 

    var cartDisplay = document.getElementById('card-more-like-this');
    cartDisplay.innerHTML = "";
    
    let outputs = new Set();

    db.collection("prducts")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                const category = doc.data().category.replace("'", "");

                if (category.includes(searchText)) {
                    outputs.add(doc.data());
                }
            });
            var count = 0;
            outputs.forEach(output => {
                if(count < 6){
                    var outputText = 
                        `<img class="thumbnail more-products" src="` + output['imageURL'] + `" onclick="getMoreItemsCard('` + output['id'] +`')">`;
                        cartDisplay.innerHTML += outputText;
                }
                count+=1;
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
}

function getMoreItemsCard(id){
    document.getElementById('card-close').click();
    var cardButton = document.getElementById('card-button');
    var product_doc = db.collection("prducts").doc(id);

    document.getElementById('spinner-circle').style.display = "block";

    product_doc.get().then((doc) => {
        if (doc.exists) {
            var d = doc.data();
            document.getElementById('card-title').innerText = d['title'];
            document.getElementById('card-description').innerText = d['description'];
            document.getElementById('card-price').innerText = d['price'];
            document.getElementById('card-category').innerText = d['category'];
            document.getElementById('card-count').innerText = d['count'];
            document.getElementById('card-rating-text').innerText = d['rating'];
            document.getElementById('card-image').src = d['imageURL'];
            var ratingProgress = (d['rating'] * 20);
            document.getElementById('card-rating-progress').style.width = ratingProgress +'%';

            onMoreLikeThis(d['category']);

            document.getElementById('spinner-circle').style.display = "none";
            cardButton.click();

            document.getElementById("card-add-to-cart").onclick = function() {
                onAddToCart(id);
            };

            document.getElementById("card-add-to-wishlist").onclick = function() {
                onAddToWishlist(id);
            };
        } else {
            alert("Invalid ID");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

updateBadges();