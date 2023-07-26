"use strict";

const notifications = document.querySelector(".notifications"),
  buttons = document.querySelectorAll(".btn");

const toastDetails = {
  timer: 5000,
  addToCartNotify: {
    icon: "fa-cart-plus",
    text: "Item added to cart",
  },
  cantAddToCartError: {
    icon: "fa-circle-xmark",
    text: "Please Login to do this function",
  },
  addToFavoritetNotify: {
    icon: "fa-triangle-exclamation",
    text: "Item added to favorite",
  },
  addToFavoritetNotifyError: {
    icon: "fa-circle-xmark",
    text: "Item already in your favorite",
  },
  cantAddToFavoriteError: {
    icon: "fa-circle-xmark",
    text: "Please Login to do this function",
  },
  accountCreateSuccess: {
    icon: "fa-circle-check",
    text: "Account create success",
  },
  alreadyInCart: {
    icon: "fa-circle-info",
    text: "Item already in cart",
  },
};

const removeToast = (toast) => {
  toast.classList.add("hide");
  if (toast.timeoutId) clearTimeout(toast.timeoutId); // Clearing the timeout for the toast
  setTimeout(() => toast.remove(), 500); // Removing the toast after 500ms
};

const createToast = (classes) => {
  // Getting the icon and text for the toast based on the id passed
  const { icon, text } = toastDetails[classes];
  const toast = document.createElement("li"); // Creating a new 'li' element for the toast
  toast.className = `toastNotify ${classes}`; // Setting the classes for the toast
  // Setting the inner HTML for the toast
  toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${icon}"></i>
                         <span>${text}</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
  notifications.appendChild(toast); // Append the toast to the notification ul
  // Setting a timeout to remove the toast after the specified duration
  toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
};

// Finding suitable class name
let classFind = function (classArr) {
  for (let i = 0; i < classArr.length; i++) {
    if (classArr[i] === "addToCartNotify") {
      return "addToCartNotify";
    }
    if (classArr[i] === "addToFavoritetNotify") {
      return "addToFavoritetNotify";
    }
    if (classArr[i] === "addToFavoritetNotifyError") {
      return "addToFavoritetNotifyError";
    }
  }
};

// Adding a click event listener to each button to create a toast when clicked
buttons.forEach((btn) => {
  btn.addEventListener("click", () => createToast(classFind(btn.classList)));
});
