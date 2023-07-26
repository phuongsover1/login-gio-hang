'use strict';

/* Các thông số chung */
let shoppingCart = document.querySelector('#cartDisplay');
let cart;
if (logingAcc) {
  cart = logingAcc.cart;
} else {
  cart = [];
}

/*
    Hàm hiển thị thông tin giỏ hàng
*/

let cartRender = function () {
  let result = `
      <table class="table table-bordered ">
      <thead class="thead-light">
        <tr>
          <th>Image</th>
          <th>Product name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
          <th>Remove</th>
        </tr>
        </thead>`;
  for (let i = 0; i < cart.length; i++) {
    result += `
    

      <tr>
        <td>
          <img
            src=${cart[i].product.img}
            alt=""
            class="productImg"
          />
        </td>
        <td>${cart[i].product.name}</td>
        <td>$${cart[i].product.price}</td>
        <td>
        <input type="number" name="quantity" class="productQuantity" value ="${
          cart[i].quantity
        }" onchange="editQuantity(${cart[i].id})" min="1"/>


        </td>
        <td>$${cart[i].quantity * cart[i].product.price}</td>
        <td onclick="deletProduct(${cart[i].product.id})">
          <i class="fa-regular fa-trash-can" style="color: #000000"></i>
        </td>
      </tr>
      `;

    // Render NavBar
    navRender();
  }

  shoppingCart.innerHTML = result + '</table>';
};

/* 
  Hàm thực hiện chỉnh sửa số lượng sản phẩm trong giỏ hàng 
  - itemId: vị trí của item đang click trên màn hình
*/
let editQuantity = function (itemId) {
  let quantityEdit = document.querySelectorAll('.productQuantity');
  let index = cart.findIndex(item => item.id == itemId);
  if (quantityEdit[index].value > 0) {
    cart[index].quantity = quantityEdit[index].value;
    localStorage.setItem('Login Account', JSON.stringify(logingAcc));
    let accIndex = accountList.findIndex(
      account => account.email === logingAcc[0].email
    );
    accountList.splice(accIndex, 1, logingAcc[0]);
    localStorage.setItem('Account', JSON.stringify(accountList));
  } else {
    cart[index].quantity = 1;
  }

  cartRender();
};

/* Hàm xóa sản phẩm ra khỏi giỏ */
let deletProduct = function (itemId) {
  let index = cart.findIndex(item => item.product.id == itemId);
  cart.splice(index, 1);
  cartRender();
  localStorage.setItem('Login Account', JSON.stringify(logingAcc));
  let accIndex = accountList.findIndex(
    account => account.email === logingAcc.email
  );
  accountList.splice(accIndex, 1, logingAcc);
  localStorage.setItem('Account', JSON.stringify(accountList));
};

/* Các sự kiện của cart */
cartRender();
