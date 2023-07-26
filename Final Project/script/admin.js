const sideBar = document.querySelector("#sidebar");
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
