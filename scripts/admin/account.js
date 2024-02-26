var cartDisplay = document.getElementById('productView');

firestore.collection('prducts')
        .get()
        .then(snapshot => {
            var sortedDocs = snapshot.docs.sort((a, b) => {
                return parseInt(a.id, 10) - parseInt(b.id, 10);
            });

            sortedDocs.forEach(doc => {
                var details = doc.data();
                var detailsText = 
                    `<div class="media-object" style="padding-right: 10px;">
                            <div class="media-object-section">
                                <img class="thumbnail top-products" src="` + details['imageURL'] + `" onclick="getCard('` + details['id'] +`')">
                            </div>
                            <div class="media-object-section">
                                <h5 class="truncate-top" style="font-weight: bold;">` + details['id'] + `. ` + details['title'] +`</h5>
                                <p class="truncate-top-des">` + details['description'] +`</p>
                            </div>
                    </div>`;
                cartDisplay.innerHTML += detailsText;
            });
        })
        .catch(error => {
            console.error("Error getting collection size:", error);
            return 0; 
        });

function onLogout(){
    localStorage.setItem('key', '');
    window.location.href = "./index.html";
}