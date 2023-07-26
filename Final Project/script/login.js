'use strict';

// Khai báo các thông số chung
let loginEmail = document.querySelector('#loginEmail');
let loginPass = document.querySelector('#loginPassword');
let loginBtn = document.querySelector('#loginBtn');
let registerUserName = document.querySelector('#username');
let registerEmail = document.querySelector('#signUpEmail');
let registerPass = document.querySelector('#signUpPassword');
let confirmPass = document.querySelector('#confirmPass');
let policyAgreement = document.querySelector('#policyAgreement');
let registerBtn = document.querySelector('#registerBtn');
let errorUsername = document.querySelector('.errorUserName');
let errorEmail = document.querySelector('.errorEmail');
let errorPassword = document.querySelector('.errorPassword');
let errorRepassword = document.querySelector('.errorRepassword');
let errorLoginEmail = document.querySelector('.errorLoginEmail');
let errorLoginPassword = document.querySelector('.errorLoginPassword');

// Kiểm tra thông tin tài khoản khi đăng nhập và chuyển về trang chủ nếu thông tin đăng nhập chính xác
let checkLogin = function () {
  let emailExisting = false;
  if (accountList.length > 0) {
    for (let i = 0; i < accountList.length; i++) {
      // Nếu tồn tại tài khoản trùng với email đã điền vào ô input email trong đăng nhập
      if (loginEmail.value === accountList[i].email) {
        emailExisting = true;
        // nếu mật khẩu trùng với mật khẩu đã nhập
        if (loginPass.value === accountList[i].password) {
          localStorage.setItem('Login Account', JSON.stringify(accountList[i]));
          localStorage.setItem('Login Status', true);
          window.location.href = 'index.html';
        } else {
          errorLoginPassword.innerText = 'Mật khẩu không chính xác';
          errorLoginPassword.style.color = 'red';
        }
      }
    }
    if (emailExisting) {
      errorLoginEmail.innerText = '';
    } else {
      errorLoginEmail.innerText = 'Email không tồn tại';
      errorLoginEmail.style.color = 'red';
      errorLoginPassword.innerText = '';
    }

    return;
  } else {
    errorLoginEmail.innerText = 'Email không tồn tại';
    errorLoginEmail.style.color = 'red';
    errorPassword.innerText = '';
    return;
  }
};

// Create new account function
let createNewAcc = function () {
  let isValid = true;

  let isUsernameValid = true;
  if (registerUserName.value.trim() === '') {
    errorUsername.innerText = 'Tên không được để trống';
    errorUsername.style.color = 'red';
    isUsernameValid = false;
  } else {
    errorUsername.innerText = '';
  }
  //Kiểm tra email không được để trống
  let isEmailValid = true;
  if (registerEmail.value.trim() === '') {
    console.log('in email');
    errorEmail.innerText = 'Email không được để trống';
    errorEmail.style.color = 'red';
    isEmailValid = false;
  } else {
    errorEmail.innerText = '';
  }

  let isValidPass = true;
  if (registerPass.value.trim() === '') {
    isValidPass = false;
    errorPassword.innerText = 'Mật khẩu không được để trống';
    errorPassword.style.color = 'red';
  } else errorPassword.innerText = '';

  let isValidConfirmPass = true;
  if (confirmPass.value.trim() === '') {
    isValidPass = false;
    errorRepassword.innerText = 'Mật khẩu nhập lại không được để trống';
    errorRepassword.style.color = 'red';
    isValidConfirmPass = false;
  } else {
    errorRepassword.innerText = '';
  }

  if (
    !isUsernameValid ||
    !isEmailValid ||
    !isValidPass ||
    !isValidConfirmPass
  ) {
    isValid = false;
  }
  if (!isValid) return;

  // Check if password and confirm password is match
  if (registerPass.value !== confirmPass.value) {
    isValid = false;

    errorRepassword.innerText = 'Mật khẩu nhập lại không trùng khớp';
    errorRepassword.style.color = 'red';
  } else {
    errorRepassword.innerText = '';
  }

  // Check if policy agreement is checked
  if (!policyAgreement.checked) {
    isValid = false;
  }
  if (!isValid) return;
  // Kiểm tra đã tồn tại tài khoản với email
  let isExistingEmail = false;
  if (accountList.length > 0) {
    for (let i = 0; i < accountList.length; i++) {
      if (registerEmail.value == accountList[i].email) {
        isExistingEmail = true;
        errorEmail.innerText = 'Đã tồn tại tài khoản với email này';
        errorEmail.styl.color = 'red';
      }
    }
  }

  if (!isExistingEmail) errorEmail.innerText = '';

  if (isValid) {
    let account = {
      username: registerUserName.value,
      email: registerEmail.value,
      password: registerPass.value,
      isAdmin: false,
      cart: [],
      favorite: [],
      buyHistory: [],
    };
    accountList.push(account);
    createToast('accountCreateSuccess');
    localStorage.setItem('Account', JSON.stringify(accountList));

    // Reset input field
    document.querySelectorAll('input').forEach(input => {
      input.type === 'checkbox'
        ? (policyAgreement.checked = false)
        : (input.value = '');
    });
  }
};

// Check if field is empty
// let checkEmpty = function () {
//   if (registerUserName.value == "") {
//     errorUsername.innerHTML = "*This field cannot be empty";
//     registerUserName.classList.add("error");
//   } else {
//     errorUsername.innerHTML = "";
//     registerUserName.classList.remove("error");
//   }

//   if (registerEmail.value == "") {
//     errorEmail.innerHTML = "*This field cannot be empty";
//     registerUserName.classList.add("error");
//   } else {
//     errorEmail.innerHTML = "";
//     registerUserName.classList.remove("error");
//   }

//   if (registerPass.value == "") {
//     errorPassword.innerHTML = "*This field cannot be empty";
//     registerPass.classList.add("error");
//     errorPassword.classList.remove("hint-display");
//     errorPassword.classList.add("error-display");
//   } else {
//     errorPassword.innerHTML =
//       "Password need at least 1 UpperCase, number and 6-20 characters";
//     registerPass.classList.remove("error");
//     errorPassword.classList.add("hint-display");
//     errorPassword.classList.remove("error-display");
//   }

//   if (confirmPass.value == "") {
//     errorRepassword.innerHTML = "*This field cannot be empty";
//     confirmPass.classList.add("error");
//   } else {
//     errorRepassword.innerHTML = "";
//     confirmPass.classList.remove("error");
//   }
// };

// Check if login account is admin account
let adminAccountCheck = function () {
  for (let i = 0; i < accountList.length; i++) {
    if (loginEmail.value === accountList[i].email && accountList[i].isAdmin) {
      isAdmin = true;
      localStorage.setItem('Is admin', isAdmin);
    }
  }
};

// Check input password if contain at least one UpperCase character, lowercase Character, number and between 6-20 character
let validateRegisterPass = function () {
  let passCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if (registerPass.value.search(passCheck) < 0) {
    registerPass.classList.add('error');
    errorPassword.classList.remove('hint-display');
    errorPassword.classList.add('error-display');
    return false;
  } else {
    registerPass.classList.remove('error');
    errorPassword.classList.add('hint-display');
    errorPassword.classList.remove('error-display');
    return true;
  }
};

// Check if username already existed
let checkExistingUsername = function (accountArr) {
  if (accountArr.length > 0) {
    for (let i = 0; i < accountArr.length; i++) {
      if (registerUserName.value == accountArr[i].username) {
        errorUsername.innerHTML = '*Username already existing';
        registerUserName.classList.add('error');
        return true;
      }
    }
  }
  errorUsername.innerHTML = '';
  registerUserName.classList.remove('error');
  return false;
};

// Check if email password already existed
let checkExistingEmail = function (accountArr) {
  if (accountArr.length > 0) {
    for (let i = 0; i < accountArr.length; i++) {
      if (registerEmail.value == accountArr[i].email) {
        errorEmail.innerHTML = '*Email already Existing';
        registerEmail.classList.add('error');
        return true;
      }
    }
  }
  errorEmail.innerHTML = '';
  registerEmail.classList.remove('error');
  return false;
};

// Add event
registerBtn.addEventListener('click', createNewAcc);
loginBtn.addEventListener('click', checkLogin);
navRender();
window.addEventListener('keypress', e => {
  if (e.key == 'enter') {
    checkLogin();
  }
});
