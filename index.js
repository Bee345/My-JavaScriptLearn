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
}

console.log("Well I Just Started Cooking the Eggs!!")
cookEgg(true, (checked) => { 
    console.log("Eggs are Cooked: " + checked.work + " And The Quantity is: " + checked.qty);
});
console.log("Doing Other Stuff While The Eggs are Cooking!!");