var db = firebase.firestore();

// Handle sign up form submission
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = document.getElementById('signupPasswordConfirm').value;

    document.getElementById('spinner-circle').style.display = "block";

    if(password != passwordConfirm){
        alert("The passwords don't match!");
        document.getElementById('spinner-circle').style.display = "none";
    } else {
        // Sign up with email and password
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed up:", user);
            document.getElementById('spinner-circle').style.display = "none";

            const initialData = {
                email: email,
                shoppingCart: [],
                wishlist: [],
                previousOrders: [],
                homeAddress: '-',
                phoneNumber: '-'
            };

            db.collection('users').doc(email).set(initialData)
            .then(() => {
                console.log("User's initial data added to Firestore successfully!");
                setLoginCookie(email, password, 30);
                window.location.href = "./site.html";
            })
            .catch((error) => {
                console.error("Error adding user's initial data to Firestore:", error);
                alert("Error signing up. Please try again later.");
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Sign-up error:", errorMessage);
            document.getElementById('spinner-circle').style.display = "none";
            alert(errorMessage);
        });
    }
});

// Handle sign in form submission
document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;

    document.getElementById('spinner-circle').style.display = "block";

    // Sign in with email and password
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            document.getElementById('spinner-circle').style.display = "none";

            const user = userCredential.user;
            console.log("User signed in:", user);
            setLoginCookie(email, password, 30);
            window.location.href = "./site.html";
        })
        .catch((error) => {
            document.getElementById('spinner-circle').style.display = "none";

            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Sign-in error:", errorMessage);
            alert(errorMessage);
        });
    
});

document.getElementById('signInAsAdminForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('signInEmailAdmin').value;
    const password = document.getElementById('signInPasswordAdmin').value;

    var docRef = db.collection("Admins").doc(email);

    document.getElementById('spinner-circle').style.display = "block";

    docRef.get().then((doc) => {
        if (doc.exists) {
            var d = doc.data();
            document.getElementById('spinner-circle').style.display = "none";
            
            if(d['password'] != password){
                alert("Invalid Credentials");
            } else {
                window.location.href = "./admin.html";
            }
        } else {
            alert("Invalid Credentials");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
});