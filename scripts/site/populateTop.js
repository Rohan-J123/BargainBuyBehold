var db = firebase.firestore();
var topProducts1_doc = db.collection("prducts").doc('7');
var topProducts2_doc = db.collection("prducts").doc('8');
var topProducts3_doc = db.collection("prducts").doc('13');
var topProducts4_doc = db.collection("prducts").doc('14');
var topProducts5_doc = db.collection("prducts").doc('15');
var topProducts6_doc = db.collection("prducts").doc('16');
var topProducts7_doc = db.collection("prducts").doc('17');
var topProducts8_doc = db.collection("prducts").doc('18');
var topProducts9_doc = db.collection("prducts").doc('19');

document.getElementById('spinner-circle').style.display = "block";

topProducts1_doc.get().then((doc) => {
    if (doc.exists) {
        var d = doc.data();
        document.getElementById('top-products-1-thumbnail').src = d['imageURL'];
        document.getElementById('top-products-1-title').innerText = d['title'];
        document.getElementById('top-products-1-description').innerText = d['description'];
    } else {
        alert("Invalid ID");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

topProducts2_doc.get().then((doc) => {
    if (doc.exists) {
        var d = doc.data();
        document.getElementById('top-products-2-thumbnail').src = d['imageURL'];
        document.getElementById('top-products-2-title').innerText = d['title'];
        document.getElementById('top-products-2-description').innerText = d['description'];
    } else {
        alert("Invalid ID");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

topProducts3_doc.get().then((doc) => {
    if (doc.exists) {
        var d = doc.data();
        document.getElementById('top-products-3-thumbnail').src = d['imageURL'];
        document.getElementById('top-products-3-title').innerText = d['title'];
        document.getElementById('top-products-3-description').innerText = d['description'];
    } else {
        alert("Invalid ID");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

topProducts4_doc.get().then((doc) => {
    if (doc.exists) {
        var d = doc.data();
        document.getElementById('top-products-4-thumbnail').src = d['imageURL'];
        document.getElementById('top-products-4-title').innerText = d['title'];
        document.getElementById('top-products-4-description').innerText = d['description'];
    } else {
        alert("Invalid ID");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

topProducts5_doc.get().then((doc) => {
    if (doc.exists) {
        var d = doc.data();
        document.getElementById('top-products-5-thumbnail').src = d['imageURL'];
        document.getElementById('top-products-5-title').innerText = d['title'];
        document.getElementById('top-products-5-description').innerText = d['description'];
    } else {
        alert("Invalid ID");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

topProducts6_doc.get().then((doc) => {
    if (doc.exists) {
        var d = doc.data();
        document.getElementById('top-products-6-thumbnail').src = d['imageURL'];
        document.getElementById('top-products-6-title').innerText = d['title'];
        document.getElementById('top-products-6-description').innerText = d['description'];
    } else {
        alert("Invalid ID");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

topProducts7_doc.get().then((doc) => {
    if (doc.exists) {
        var d = doc.data();
        document.getElementById('top-products-7-thumbnail').src = d['imageURL'];
        document.getElementById('top-products-7-title').innerText = d['title'];
        document.getElementById('top-products-7-description').innerText = d['description'];
    } else {
        alert("Invalid ID");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

topProducts8_doc.get().then((doc) => {
    if (doc.exists) {
        var d = doc.data();
        document.getElementById('top-products-8-thumbnail').src = d['imageURL'];
        document.getElementById('top-products-8-title').innerText = d['title'];
        document.getElementById('top-products-8-description').innerText = d['description'];
    } else {
        alert("Invalid ID");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

topProducts9_doc.get().then((doc) => {
    if (doc.exists) {
        var d = doc.data();
        document.getElementById('top-products-9-thumbnail').src = d['imageURL'];
        document.getElementById('top-products-9-title').innerText = d['title'];
        document.getElementById('top-products-9-description').innerText = d['description'];
    } else {
        alert("Invalid ID");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

document.getElementById('spinner-circle').style.display = "none";