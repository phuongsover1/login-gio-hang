"use strict";

// General set up
let inputId = document.querySelector("#input-id");
let inputName = document.querySelector("#input-name");
let inputPrice = document.querySelector("#input-price");
let inputImg = document.querySelector("#input-image");
let tableBody = document.querySelector("#tbody");
let submitBtn = document.querySelector("#submit-btn");

let isEditing = false;
let editID;

// Render product list
let productListRender = function () {
  let result = "";
  for (let i = 0; i < getProductList.length; i++) {
    result += `
    <tr>
        <td scope="col">${getProductList[i].id}</td>
        <td scope="col"><img src=".${getProductList[i].img}" alt="${getProductList[i].id}" style="width:120px;height =120px"></td>
        <td scope="col">${getProductList[i].name}</td>
        <td scope="col">${getProductList[i].price}</td>
        <td scope="col"><button class="btn btn-success" onclick = "editProduct('${getProductList[i].id}')">Edit</button></td>
        <td scope="col"><button class="btn btn-danger" onclick = "deleteProduct('${getProductList[i].id}')">Delete</button></td>
    </tr>`;
  }
  tableBody.innerHTML = result;
};

// Add new Product to product list
let submitForm = function () {
  let isUniqueID = inputValidation();
  //   console.log(isUniqueID);
  const imageList = inputImg.files;
  console.log(imageList);

  if (isUniqueID && !isEditing) {
    let product = {
      id: inputId.value,
      img: "./image/product/" + imageList[0].name,
      name: inputName.value,
      price: inputPrice.value,
      quantity: 1,
    };

    getProductList.push(product);
    // console.log(product);
    localStorage.setItem("Product List", JSON.stringify(getProductList));
    productListRender();
    resetField();
  } else if (isEditing) {
    // getProductList[editID].id = inputId.value;
    getProductList[editID].name = inputName.value;
    getProductList[editID].price = inputPrice.value;
    localStorage.setItem("Product List", JSON.stringify(getProductList));
    productListRender();
    resetField();
    inputId.disabled = false;
    isEditing = false;
  }
};

// Check if input product ID is already existing
let inputValidation = function () {
  let isValid = true;
  for (let i = 0; i < getProductList.length; i++) {
    if (inputId.value == getProductList[i].id) {
      isValid = false;
      break;
    }
  }

  if (!isValid) {
    console.log("ID must be unique");
    return false;
  } else {
    return true;
  }
};

// Delete Button
let deleteProduct = function (itemID) {
  let index = getProductList.findIndex((e) => e.id == itemID);
  getProductList.splice(index, 1);
  productListRender();
  localStorage.setItem("Product List", JSON.stringify(getProductList));
};

// Edit button
let editProduct = function (itemID) {
  isEditing = true;
  let index = getProductList.findIndex((e) => e.id == itemID);
  editID = index;
  inputId.value = getProductList[index].id;
  inputName.value = getProductList[index].name;
  inputPrice.value = parseFloat(getProductList[index].price);
  inputId.disabled = true;
};

// Reset field after submit
let resetField = function () {
  inputId.value = "";
  inputName.value = "";
  inputPrice.value = "";
  inputImg = "";
};

// let inputId = document.querySelector("#productId");
// let inputName = document.querySelector("#productName");
// let inputPrice = document.querySelector("#productPrice");
// let image = document.querySelector("#productImage");
// let createBtn = document.querySelector(".addNewProduct");
// let productList = JSON.parse(localStorage.getItem("Product List"));

// let result = document.querySelector("#result");
// let imageArr = [];
// console.log(inputId);

// // Check unique product ID from product list
// let checkUniqueId = function () {
//   for (let i = 0; i < productList.length; i++) {
//     if (productList[i].id == inputId.value) {
//       alert("Id existed");
//       return false;
//     }
//   }
//   return true;
// };

// // Add new Product to product List
// let addNewProduct = function () {
//   const imageList = image.files;
//   let isUniqueID = checkUniqueId();
//   if (isUniqueID) {
//     let product = {
//       id: inputId.value,
//       img: "./image/product/" + imageList[0].name,
//       name: inputName.value,
//       price: inputPrice.value,
//       quantity: 1,
//     };
//     // result.src = URL.createObjectURL(imageList[0]);
//     productList.push(product);
//     // console.log(productList);
//     localStorage.setItem("Product List", JSON.stringify(productList));
//   }
// };

// createBtn.addEventListener("click", addNewProduct);

// Page event
productListRender();
submitBtn.addEventListener("click", submitForm);
