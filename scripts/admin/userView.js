var userDisplay = document.getElementById('userView');

firestore.collection('users')
        .get()
        .then(snapshot => {

            snapshot.forEach(doc => {
                var details = doc.data();
                var detailsText = 
                    `<div style="padding: 20px; border-color: black; border-style: solid; border-width: 2px; border-radius: 20px; margin-bottom: 20px;" class="userContent"  onclick="onCheckingPreviousOrders('` + details['email'] +`')">
                        <div style="font-size: large;"><b>Email:</b> ` + details['email'] + `</div>
                        <div style="font-size: large;"><b>Phone Number:</b> ` + details['phoneNumber'] + `</div>
                        <div style="font-size: large;"><b>Address:</b> ` + details['homeAddress'] + `</div>
                    </div>`;
                    userDisplay.innerHTML += detailsText;
            });
        })
        .catch(error => {
            console.error("Error getting collection size:", error);
            return 0; 
        });