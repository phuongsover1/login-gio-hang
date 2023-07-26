"use strict";

// General setup
let shoppingFavorite = document.querySelector("#favoriteDisplay");
let favorite = [];
if (logingAcc.length > 0) {
  favorite = logingAcc[0].favorite;
}

// Favorite page render

let favoriteRender = function () {
  let result = `
      <table class="table table-bordered ">
      <thead class="thead-light">
        <tr>
          <th>Image</th>
          <th>Product name</th>
          <th>Price</th>
          <th>Subtotal</th>
          <th>Remove</th>
        </tr>
        </thead>`;
  for (let i = 0; i < favorite.length; i++) {
    result += `
      <tr>
        <td>
          <img
            src=${favorite[i].img}
            alt=""
            class="productImg"
          />
        </td>
        <td>${favorite[i].name}</td>
        <td>$${favorite[i].price}</td>
        <td><button class="btn btn-success" onclick="moveToCart(${favorite[i].id})">Add to cart</button></td>
        <td onclick="deletProduct(${favorite[i].id})">
          <i class="fa-regular fa-trash-can" style="color: #000000"></i>
        </td>
      </tr>
    `;

    // Render NavBar
    navRender();
  }

  shoppingFavorite.innerHTML = result + "</table>";
};

// Add to cart function in favorite page
let moveToCart = function (itemId) {
  let index = favorite.findIndex((item) => item.id == itemId);
  let cart = logingAcc[0].cart;
  let isInCart = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === favorite[index].id) {
      isInCart = true;
      break;
    }
  }

  if (!isInCart) {
    cart.push(favorite[index]);
  } else {
    createToast("alreadyInCart");
  }

  favorite.splice(index, 1);
  favoriteRender();
  navRender();

  //   Save to local storage
  saveToStorage();
};

/* Delete product from favorite function */
let deletProduct = function (itemId) {
  let index = favorite.findIndex((item) => item.id == itemId);
  favorite.splice(index, 1);
  favoriteRender();

  //   Save to local storage
  saveToStorage();
};

// Save to storage function
let saveToStorage = function () {
  localStorage.setItem("Login Account", JSON.stringify(logingAcc));
  let accIndex = accountList.findIndex(
    (account) => account.email === logingAcc[0].email
  );
  accountList.splice(accIndex, 1, logingAcc[0]);
  localStorage.setItem("Account", JSON.stringify(accountList));
};

/* Favorite Page Event */
favoriteRender();
