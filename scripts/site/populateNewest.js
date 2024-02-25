var db = firebase.firestore();
var newestProducts1_doc = db.collection("prducts").doc('9');
var newestProducts2_doc = db.collection("prducts").doc('10');
var newestProducts3_doc = db.collection("prducts").doc('11');
var newestProducts4_doc = db.collection("prducts").doc('12');

document.getElementById('spinner-circle').style.display = "block";

newestProducts1_doc.get().then((doc) => {
    if (doc.exists) {
        var d = doc.data();
        document.getElementById('newest-products-1-thumbnail').src = d['imageURL'];
        document.getElementById('newest-products-1-title').innerText = d['title'];
        document.getElementById('newest-products-1-cost').innerText = d['price'];
    } else {
        alert("Invalid ID");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

newestProducts2_doc.get().then((doc) => {
    if (doc.exists) {
        var d = doc.data();
        document.getElementById('newest-products-2-thumbnail').src = d['imageURL'];
        document.getElementById('newest-products-2-title').innerText = d['title'];
        document.getElementById('newest-products-2-cost').innerText = d['price'];
    } else {
        alert("Invalid ID");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

newestProducts3_doc.get().then((doc) => {
    if (doc.exists) {
        var d = doc.data();
        document.getElementById('newest-products-3-thumbnail').src = d['imageURL'];
        document.getElementById('newest-products-3-title').innerText = d['title'];
        document.getElementById('newest-products-3-cost').innerText = d['price'];
    } else {
        alert("Invalid ID");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

newestProducts4_doc.get().then((doc) => {
    if (doc.exists) {
        var d = doc.data();
        document.getElementById('newest-products-4-thumbnail').src = d['imageURL'];
        document.getElementById('newest-products-4-title').innerText = d['title'];
        document.getElementById('newest-products-4-cost').innerText = d['price'];
    } else {
        alert("Invalid ID");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

document.getElementById('spinner-circle').style.display = "none";