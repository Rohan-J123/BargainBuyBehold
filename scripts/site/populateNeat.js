var db = firebase.firestore();
var neatProducts1_doc = db.collection("prducts").doc('1');
var neatProducts2_doc = db.collection("prducts").doc('2');
var neatProducts3_doc = db.collection("prducts").doc('3');
var neatProducts4_doc = db.collection("prducts").doc('4');
var neatProducts5_doc = db.collection("prducts").doc('5');
var neatProducts6_doc = db.collection("prducts").doc('6');

document.getElementById('spinner-circle').style.display = "block";

neatProducts1_doc.get().then((doc) => {
    if (doc.exists) {
        var d = doc.data();
        document.getElementById('neat-products-1-thumbnail').src = d['imageURL'];
        document.getElementById('neat-products-1-title').innerText = d['title'];
        document.getElementById('neat-products-1-cost').innerText = d['price'];
    } else {
        alert("Invalid ID");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

neatProducts2_doc.get().then((doc) => {
    if (doc.exists) {
        var d = doc.data();
        document.getElementById('neat-products-2-thumbnail').src = d['imageURL'];
        document.getElementById('neat-products-2-title').innerText = d['title'];
        document.getElementById('neat-products-2-cost').innerText = d['price'];
    } else {
        alert("Invalid ID");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

neatProducts3_doc.get().then((doc) => {
    if (doc.exists) {
        var d = doc.data();
        document.getElementById('neat-products-3-thumbnail').src = d['imageURL'];
        document.getElementById('neat-products-3-title').innerText = d['title'];
        document.getElementById('neat-products-3-cost').innerText = d['price'];
    } else {
        alert("Invalid ID");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

neatProducts4_doc.get().then((doc) => {
    if (doc.exists) {
        var d = doc.data();
        document.getElementById('neat-products-4-thumbnail').src = d['imageURL'];
        document.getElementById('neat-products-4-title').innerText = d['title'];
        document.getElementById('neat-products-4-cost').innerText = d['price'];
    } else {
        alert("Invalid ID");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

neatProducts5_doc.get().then((doc) => {
    if (doc.exists) {
        var d = doc.data();
        document.getElementById('neat-products-5-thumbnail').src = d['imageURL'];
        document.getElementById('neat-products-5-title').innerText = d['title'];
        document.getElementById('neat-products-5-cost').innerText = d['price'];
    } else {
        alert("Invalid ID");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

neatProducts6_doc.get().then((doc) => {
    if (doc.exists) {
        var d = doc.data();
        document.getElementById('neat-products-6-thumbnail').src = d['imageURL'];
        document.getElementById('neat-products-6-title').innerText = d['title'];
        document.getElementById('neat-products-6-cost').innerText = d['price'];
    } else {
        alert("Invalid ID");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

document.getElementById('spinner-circle').style.display = "none";