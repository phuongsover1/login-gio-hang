'use strict';

// Cài đặt các thông số chung
let products = document.querySelector('#productList');
let notification = '';

// Lấy dữ liệu từ local storage

// localStorage.setItem("Product List", JSON.stringify(getProductList));

// Set các thông số khi có giá trị null

// Hàm render ra màn hình từ dữ liệu có sẵn và hiển thị trạng thái đăng nhập của người dùng
let renderDisplay = function () {
  let result = '';
  for (let i = 0; i < getProductList.length; i++) {
    result += `
        <div class="product col-lg-3 col-md-4 col-12 col-sm-6">
        <div class="product-wrap">
          <div class="product-img">
            <img
              src=${getProductList[i].img}
              alt=""
              class="productImg"
            />
          </div>
          <div class="product-info">
            <h4 class="productName">${getProductList[i].name}</h4>
            <!-- <p class="productBrand">Brand</p> -->
            <p class="productPrice">$${getProductList[i].price}</p>

            <button class="btn add-to-cart"  onclick="addToCart(${getProductList[i].id})">
              <i class="fa-solid fa-cart-plus" style="color: #608783"></i>
            </button>
            <button class="btn add-to-favorite " onclick="addToFavorite(${getProductList[i].id})">
              <i
                class="fa-solid fa-heart-circle-plus"
                style="color: #608783"
              ></i>
            </button>
          </div>
        </div>
      </div>`;
  }

  products.innerHTML = result;

  // Render NavBar
  navRender();
};

// Hám sự kiện khi click vào nút add to cart
let addToCart = function (itemId) {
  let index = getProductList.findIndex(e => e.id == itemId); // Vị trí của sản phẩm trong dữ liệu
  console.log(index);
  if (!isLogginIn) {
    alert('Xin hãy đăng nhập trước!');
    window.location.href = 'http://127.0.0.1:5500/login.html';
  } else {
    if (logingAcc) {
      if (logingAcc.cart === null) {
        logingAcc.cart = [];
        logingAcc.cart.push({ product: getProductList[index], quantity: 1 });
      } else {
        // console.log(1);
        let isAdded = false;
        for (let i = 0; i < logingAcc.cart.length; i++) {
          if (logingAcc.cart[i].product.id == itemId) {
            isAdded = true;
            break;
          }
        }

        if (isAdded) {
          let cartIndex = logingAcc.cart.findIndex(e => e.product.id == itemId);
          logingAcc.cart[cartIndex].quantity++;
        } else {
          const product = getProductList[index];
          logingAcc.cart.push({ product, quantity: 1 });
        }
      }
      localStorage.setItem('Login Account', JSON.stringify(logingAcc));
      // Update proxiate acc in account arr
      let accIndex = accountList.findIndex(
        account => account.email === logingAcc.email
      );
      accountList.splice(accIndex, 1, logingAcc);
      localStorage.setItem('Account', JSON.stringify(accountList));
    }
  }
};

// Các event của trang web
renderDisplay();
