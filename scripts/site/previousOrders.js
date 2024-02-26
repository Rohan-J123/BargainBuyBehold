async function onCheckingPreviousOrders() {
    var cartDisplay = document.getElementById('previousOrdersModalItems');

    var db = firebase.firestore();
    const [key, value] = localStorage.getItem('key').split(';')[0].split('=');
    var user_doc = db.collection("users").doc(decodeURIComponent(value));

    cartDisplay.innerHTML = "";

    document.getElementById('spinner-circle').style.display = "block";

    try {
        const doc = await user_doc.get();
        if (doc.exists) {
            var d = doc.data();
            var previousOrders = d['previousOrders'];

            for (let i = previousOrders.length - 1; i >= 0; i--) {
                await processPreviousOrder(previousOrders[i], cartDisplay);
            }

            document.getElementById('spinner-circle').style.display = "none";
            document.getElementById('previousOrdersModalOpenButton').click();
        } else {
            alert("Invalid ID");
        }
    } catch (error) {
        console.log("Error getting document:", error);
    }
}

async function processPreviousOrder(previousOrder, cartDisplay) {
    let items = previousOrder.split(" ");

    const orderHeader = document.createElement('h3');
    orderHeader.style.textAlign = "center";
    orderHeader.style.color = "blue";
    orderHeader.style.marginBottom = "0%";
    orderHeader.innerHTML = items[items.length - 3];

    const orderSubHeader = document.createElement('h5');
    orderSubHeader.style.textAlign = "center";
    orderSubHeader.style.color = "green";
    orderSubHeader.textContent = items[items.length - 2];

    cartDisplay.appendChild(orderHeader);
    cartDisplay.appendChild(orderSubHeader);

    for (let i = 0; i < items.length - 3; i += 1) {
        let item = items[i];
        try {
            let details = await getDetails(item);
            var detailsText = `
                <div class="media-object" style="padding-right: 10px;">
                    <div class="media-object-section">
                        <img class="thumbnail top-products" src="${details['imageURL']}" onclick="getCard('${item}')">
                    </div>
                    <div class="media-object-section">
                        <h5 class="truncate-top" style="font-weight: bold;">${details['title']}</h5>
                        <p class="truncate-top-des">${details['description']}</p>
                    </div>
                </div>`;
            cartDisplay.insertAdjacentHTML('beforeend', detailsText);
        } catch (error) {
            console.log("Error getting details:", error);
        }
    }
    cartDisplay.innerHTML += `<h3 style="text-align: center; color: red;">$` + items[items.length - 1] + `</h3`;
    cartDisplay.innerHTML += `<div style="width: 100%; height: 1px; background-color: lightgrey; margin-top: 10px; margin-bottom: 30px;"></div>`;
}
