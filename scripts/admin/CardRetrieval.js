function getCard(id){
    var cardButton = document.getElementById('card-button');

    var product_doc = firestore.collection("prducts").doc(id);

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
            document.getElementById('spinner-circle').style.display = "none";
            cardButton.click();
        } else {
            alert("Invalid ID");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}