const firestore = firebase.firestore();

const form = document.getElementById('addProductsForm');

addProductsForm.addEventListener('submit', (e) => {
    e.preventDefault();

    var id = 0;
    document.getElementById('spinner-circle').style.display = "block";

    firestore.collection('prducts')
        .get()
        .then(snapshot => {
            id = snapshot.size + 1;
            const title = addProductsForm['title'].value;
            const price = addProductsForm['price'].value;
            const description = addProductsForm['description'].value;
            const category = addProductsForm['category'].value;
            const imageURL = addProductsForm['imageURL'].value;
            const rating = addProductsForm['rating'].value;
            const count = addProductsForm['count'].value;

            firestore.collection('prducts').doc(id.toString()).set({
                id: id,
                title: title,
                price: price,
                description: description,
                category: category,
                imageURL: imageURL,
                rating: rating,
                count: count
            })
            .then(() => {
                console.log('Document successfully written!');
                alert("Product Successfully Added.");
                document.getElementById('spinner-circle').style.display = "none";
                form.reset();
                location.reload();
            })
            .catch((error) => {
                console.error('Error writing document: ', error);
                alert("Error Adding Product!");
            });
        })
        .catch(error => {
            console.error("Error getting collection size:", error);
            return 0; 
        });
});

editProductsForm.addEventListener('submit', (e) => {
    e.preventDefault();

    var id = editProductsForm['idProduct'].value;
    var title = editProductsForm['title'].value;
    var price = editProductsForm['price'].value;
    var description = editProductsForm['description'].value;
    var category = editProductsForm['category'].value;
    var imageURL = editProductsForm['imageURL'].value;
    var rating = editProductsForm['rating'].value;
    var count = editProductsForm['count'].value;

    document.getElementById('spinner-circle').style.display = "block";

    if(id <= 23){
        alert("Products identified by IDs ranging from 1 to 20 are currently displayed to users and therefore cannot be updated via the user interface. Any necessary modifications must be performed directly within the database.");
        document.getElementById('spinner-circle').style.display = "none";
        return;
    }

    var docRef = firestore.collection("prducts").doc(id.toString());

    docRef.get().then((doc) => {
        if (doc.exists) {
            var d = doc.data();
            
            if(title == ""){
                title = d['title'];
            }
            if(price == ""){
                price = d['price'];
            }
            if(description == ""){
                description = d['description'];
            }
            if(category == ""){
                category = d['category'];
            }
            if(imageURL == ""){
                imageURL = d['imageURL'];
            }
            if(rating == ""){
                rating = d['rating'];
            }
            if(count == ""){
                count = d['count'];
            }

            firestore.collection('prducts').doc(id.toString()).update({
                id: id,
                title: title,
                price: price,
                description: description,
                category: category,
                imageURL: imageURL,
                rating: rating,
                count: count
            })
            .then(() => {
                console.log('Document successfully written!');
                alert("Product Successfully Updated.");
                document.getElementById('spinner-circle').style.display = "none";
                form.reset();
                location.reload();
            })
            .catch((error) => {
                console.error('Error writing document: ', error);
                alert("Error Updated Product!");
            });
        } else {
            alert("Invalid ID");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
});