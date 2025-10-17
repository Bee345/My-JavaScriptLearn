function fetchUser(userId, callback) {
  // Simulate async delay (e.g., API call)
  setTimeout(() => {
    const user = { id: userId, name: "Alice" };  // Fake data
    callback(user);  // Call back with the result
  }, 1000);  // 1-second "wait"
}

console.log("Fetching user...");
// Pass a callback function
fetchUser(1, (user) => {
  console.log("User fetched:", user.name);  // Runs after 1 second
});
console.log("Doing other stuff...");  // Runs immediately

// Well Below I will try to build a little bit Egg Cooker with the Async setTimeOut() async in-built function might Add A little HTML & CSS to it though'
function cookEgg(cookEgg, callback){ 
    setTimeout(() => { 
        const checked = {work: cookEgg, qty:5};
        callback(checked);
    }, 5000)
};

console.log("Well I Just Started Cooking the Eggs!!")
cookEgg(true, (checked) => { 
    console.log("Eggs are Cooked: " + checked.work + " And The Quantity is: " + checked.qty);
});
console.log("Doing Other Stuff While The Eggs are Cooking!!");

// This is the First Code I wrote for the Addition Of 2 numbers 
// const randomNum = 15;
// document.querySelector(".form").addEventListener("submit", (e) => { 
//   e.preventDefault();
//   let userNum = document.getElementById("amount").value;
//   userNum = parseInt(userNum);
//   console.log("This Is The Output");
//   console.log(userNum);
//   console.log("See what The Addition will Look like");
//   console.log(randomNum + userNum);
// });

// This is the second Code i wrote for this, and it saves my Results to the localStorage, just that i don't want the results disappearing on page re-load.
// const random = 50;
// document.querySelector(".form").addEventListener("submit", (e) => { 
//   e.preventDefault();
//   let value = document.getElementById("amount").value;
//   value = parseInt(value);
//   const store = document.querySelector(".display");
//   const output = document.querySelector(".show");
//   if(typeof(value) === "number" && typeof(random) === "number"){
//     const total = value + random; 
//     const result = output.innerHTML += `The Addition of ${value} and ${random} is: ${value} + ${random} which will give us ${total}, And This Can Be Wrong IF You Miss The Logic. <br>`;
//     if(!isNaN(result)){ 
//     let stay = localStorage.setItem("result", JSON.stringify(result));
//     stay = store.appendChild(output);
//   }
//   }
//   // store.appendChild(output);
  
// });

// Here Is where i did it right although with AI's Help, although i hate it that it helped me am working towards being my own AI
// const random = 60;
// const form = document.querySelector(".form");
// const output = document.querySelector(".show");
// const store = document.querySelector(".display");

// form.addEventListener("submit", (e) => { 
//   e.preventDefault();

//   let value = parseInt(document.getElementById("amount").value)

//   // Check that both are valid numbers
//   if(typeof value === "number" && !isNaN(value) && typeof random === "number" && !isNaN(random)){ 
//     const total = value + random;

//     // Create the Text To Be Displayed
//     const resultText = `The Addition of ${value} and ${random} is: ${value} + ${random} which will give us ${total}.<br>`;

//     // Show the result on the Page
//     output.innerHTML += resultText;

//     // Retrive old Results Or Start A new One
//     let results = JSON.parse(localStorage.getItem("results") || []);

//     // add New Result
//     results.push(resultText);

//     // Save Back To LocalStorage
//     localStorage.setItem("results", JSON.stringify(results));

//     // Render All Results/ Update The Display Section
//     store.innerHTML = "";
//     results.forEach((item) => { 
//       const p = document.createElement("p");
//       p.innerHTML = item;
//       store.appendChild(p);
//     });
//   } else{ 
//     output.textContent = "Please Enter A Valid Number";
//   }
// })

// This Below Is the one that shows both the results and don't remove everything on page re-load
const randomm = 70;
const formm = document.querySelector(".form");
const outputt = document.querySelector(".show");
const storee = document.querySelector(".display");

// Function To Render All Saved Results
function renderResults(){ 
  const results = localStorage.getItem("results") ? JSON.parse(localStorage.getItem("results")) : [];
  // storee.innerHTML = "";
  storee.innerHTML = results.map( item => `<p class="obi">${item}</p>`).join("");
  // results.forEach((item) => { 
  //   const p = document.createElement("p");
  //   p.textContent = item;
  //   storee.appendChild(p);
  // })
}


// Loads Results On page Load Or Re-Load
window.addEventListener("DOMContentLoaded", renderResults);

formm.addEventListener("submit", (e) => { 
  e.preventDefault();

  let value = parseInt(document.getElementById("amount").value);
  // Check that both are valid numbers

  if(typeof value === "number" && !isNaN(value) && typeof randomm === "number" && !isNaN(randomm)){ 
    const total = value + randomm;

    // Create the Text To Be Displayed
    const resultText = `The Addition of ${value} and ${randomm} is: ${value} + ${randomm} which will give us ${total}. But Can Be Difficult When U don't Get the logic well though<br>`;

    // Show the result on the Page
    outputt.innerHTML += resultText;

    // Retrive old Results Or Start A new One
    let results = localStorage.getItem("results") ? JSON.parse(localStorage.getItem("results")) : [];

    // add New Result
    results.push(resultText);

    // Save Back To LocalStorage
    localStorage.setItem("results", JSON.stringify(results));
 
  } else{ 
    outputt.textContent = "Please Enter A Valid Number";
  }
  formm.reset();
});


let see = document.getElementById("check");
function hello(name, age, school){ 
  return ` Hello ${name} You Are ${age} Years Old And You Attend ${school}, Well Nice To Meet u!`;
};

see.innerHTML += hello("John", 20, "University of Lagos");