const firestore = firebase.firestore();

const form = document.getElementById('addProductsForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = form['id'].value;
    const title = form['title'].value;
    const price = form['price'].value;
    const description = form['description'].value;
    const category = form['category'].value;
    const imageURL = form['imageURL'].value;
    const rating = form['rating'].value;
    const count = form['count'].value;

    firestore.collection('prducts').doc(id).update({
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
        form.reset();
    })
    .catch((error) => {
        console.error('Error writing document: ', error);
        alert("Error Adding Product!");
    });
});