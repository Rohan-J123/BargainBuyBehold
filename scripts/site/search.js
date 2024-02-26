var db = firebase.firestore();

// Handle search form submission
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const searchText = document.getElementById('searchInput').value.toLowerCase();

    var cartDisplay = document.getElementById('searchModalItems');
    cartDisplay.innerHTML = "";
    
    let outputs = new Set();

    db.collection("prducts")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                const title = doc.data().title.toLowerCase();
                const description = doc.data().description.toLowerCase();
                const category = doc.data().category.toLowerCase();

                if (title.includes(searchText) || description.includes(searchText) || category.includes(searchText)) {
                    outputs.add(doc.data());
                }
            });
            outputs.forEach(output => {
                var outputText = 
                    `<div style="display: flex; flex-wrap: wrap;">
                        <div class="media-object" style="width: 750px; padding-right: 10px;">
                            <div class="media-object-section">
                                <img class="thumbnail top-products" src="` + output['imageURL'] + `" onclick="getCard('` + output['id'] +`')">
                            </div>
                            <div class="media-object-section">
                                <h5 class="truncate-top" style="font-weight: bold;">` + output['title'] +`</h5>
                                <p class="truncate-top-des">` + output['description'] +`</p>
                            </div>
                        </div>
                        <div style="flex: 1; padding-left: 10px;">
                            <h4>Price: $` + output['price'] + `</h4>
                            <div style="display: flex; padding-bottom: 20px;">
                                <button type="button" class="btn btn-outline-warning" style="flex: 1; margin-right: 10px;" onclick="onAddToCart('` + output['id'] +`')">Cart</button>
                                <button type="button" class="btn btn-outline-success" style="flex: 1; margin-left: 10px;" onclick="onAddToWishlist('` + output['id'] +`')">Wishlist</button>
                            </div>
                        </div>
                    </div>`;
                    cartDisplay.innerHTML += outputText;
            });
            document.getElementById('searchModalOpenButton').click();
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
});
