var dropdownMenu = document.getElementById('filter-drop-menu');
var categories = [];

var db = firebase.firestore();
const collectionRef = db.collection('prducts');

collectionRef.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        var d = doc.data(); 
        if (!categories.includes(d['category'].toLowerCase())) {
            categories.push(d['category'].toLowerCase());
        }
    });
    while (categories.length != 0) {
        var ele = categories.pop();
        var eleMod = ele.replace("'", "");
        var htmlContent = `<li><button onclick="onFilterOptionClick('${eleMod}')"><a class="dropdown-item" href="#" style="text-transform: capitalize;">${ele}</a></button></li>`;
        dropdownMenu.innerHTML += htmlContent;
    } 
}).catch(error => {
    console.error("Error getting documents:", error);
});
