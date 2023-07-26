"use strict";

// General setup
let favoriteCount = document.querySelector(".favorite-icon .count");
let cartCount = document.querySelector(".cart-icon .count");
let noLogin = document.querySelector(".noLogin");
let loggingIn = document.querySelectorAll(".logingIn");
let logOut = document.querySelectorAll(".logOut");

// Navbar render function
let navRender = function () {
  countDisplay("cart");
  countDisplay("favorite");

  // Loging icon change when login status change
  if (isLogginIn) {
    noLogin.classList.add("hidden");
    loggingIn.forEach((e) => e.classList.remove("hidden"));
  } else {
    loggingIn.forEach((e) => e.classList.add("hidden"));
    noLogin.classList.remove("hidden");
  }

  // console.log(isAdmin);
  // When an admin, login status change
  if (isAdmin) {
    document.querySelector(".user").classList.add("hidden");
    document.querySelector(".admin").classList.remove("hidden");
  } else {
    document.querySelector(".user").classList.remove("hidden");
    document.querySelector(".admin").classList.add("hidden");
  }
};

// Cart and favorite count display
let countDisplay = function (icon) {
  if (logingAcc.length > 0) {
    let cart = logingAcc[0].cart;
    if (cart.length < 1) {
      cart = [];
    }
    let favorite = logingAcc[0].favorite;
    let count = 0;
    console.log(cart);
    if (cart.length > 0) {
      if (icon === "cart") {
        cart.forEach((item) => {
          count += parseInt(item.quantity);
        });
        console.log(count);
        cartCount.innerHTML = count;
      }
      if (icon === "favorite") {
        if (favorite === null) {
          favorite = [];
        }
        favorite.forEach((item) => {
          count += parseInt(item.quantity);
        });
        console.log(count);
        favoriteCount.innerHTML = count;
      }
    }
  }
};

// log out function
let signOut = function () {
  console.log("log out");
  localStorage.setItem("Login Status", JSON.stringify(false));
  localStorage.setItem("Is admin", JSON.stringify(false));

  // Update proxiate acc in account arr
  let accIndex = accountList.findIndex(
    (account) => account.email === logingAcc[0].email
  );
  accountList.splice(accIndex, 1, logingAcc[0]);
  localStorage.setItem("Account", JSON.stringify(accountList));

  localStorage.removeItem("Login Account");
};

logOut.forEach((e) => e.addEventListener("click", signOut));
