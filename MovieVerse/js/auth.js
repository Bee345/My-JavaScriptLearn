// Handles SignUp/ LogIn With LocalStorage.
// Auth.JS, This Is where i am setting everything concerning The LogIn and Sign Up Aspects Of thIs Website

document.addEventListener("DOMContentLoaded", () => { 
    const signupForm = document.getElementById("signupForm");

    signupForm?.addEventListener("submit", (e) => { 
        e.preventDefault();

        const fName = document.getElementById("fName").value.trim();
        const mName = document.getElementById("mName").value.trim();
        const lName = document.getElementById("lName").value.trim();
        const email = document.getElementById("email").value.trim();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if(!fName || !mName || !lName || !email || !username || !password){ 
         alert("Please Fill In The Required Fields!!");
         return;
        }
    })
})

// Get Existing Users OR Initialize Empty Array
const users = JSON.parse(localStorage.getItem("users")) || [];

// Check If User Already Exists
const userExists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
if(userExists){ 
   alert("user Already Exists. Please LogIn Instead!!");
   window.location.href = "login.html";
//    return;
}
// Create New User Object
const newUser = { 
    fName, mName, lName, email, username, password
};
users.push(newUser);
localStorage.setItem("users", JSON.stringify(users));

alert("SignUp Successful! Please LogIn Now!!");
window.localStorage.href = "login.html";