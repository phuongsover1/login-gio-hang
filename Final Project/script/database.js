// Danh sách sản phẩm được lưu trong local
let productList = [
  {
    id: 0,
    img: './image/product/product-1.jpg',
    name: 'Henley Shirt',
    price: '24',
    quantity: 100,
  },

  {
    id: 3,
    img: './image/product/product-2.jpg',
    name: 'Daisy Floral Print Straps Jumpsuit',
    price: '238.85',
    quantity: 100,
  },
];
// localStorage.setItem('Product List', JSON.stringify(productList));

// Get data from local storage
let getProductList = JSON.parse(localStorage.getItem('Product List'));
let logingAcc = JSON.parse(localStorage.getItem('Login Account'));
let isLogginIn = JSON.parse(localStorage.getItem('Login Status'));
let isAdmin = JSON.parse(localStorage.getItem('Is admin'));
let accountList = JSON.parse(localStorage.getItem('Account'));
let logingAccount = JSON.parse(localStorage.getItem('Login Account'));

// Set data for database when get null
if (logingAcc === null) {
  logingAcc = [];
}

if (getProductList === null) {
  getProductList = []; // Danh sách sản phẩm
  localStorage.setItem('Product List', JSON.stringify(productList));
}

if (isLogginIn === null) {
  isLogginIn = false; // Tình trạng login
  localStorage.setItem('Login Status', JSON.stringify(isLogginIn));
}

if (isAdmin === null) {
  isAdmin = false;
  localStorage.setItem('Is admin', JSON.stringify(isAdmin));
}

if (accountList === null) {
  accountList = [];
}

if (logingAccount === null) {
  logingAccount = [];
}

// // Admin account
// let adminAcc = {
//   username: "admin",
//   email: "admin@gmail.com",
//   password: "Admin233",
//   isAdmin: true,
//   cart: [],
//   favorite: [],
//   buyHistory: [],
// };

// // Add admin account to account list

// accountList.push(adminAcc);
// localStorage.setItem("Account", JSON.stringify(accountList));
