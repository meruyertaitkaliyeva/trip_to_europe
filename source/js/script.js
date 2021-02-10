const navMain = document.querySelector(".page-header__nav");
const navToggle = document.querySelector(".page-header__toggle");
const purchaseLinks = document.querySelectorAll(".purchase-button");
const purchaseModal = document.querySelector(".page-modal");
const modalClose = purchaseModal.querySelector(".page-modal__close");
const purchaseForm = purchaseModal.querySelector(".page-modal__form");
const purchasePhone = purchaseModal.querySelector(".page-modal__input--tel");
const purchaseEmail = purchaseModal.querySelector(".page-modal__input--email");
const successModal = document.querySelector(".page-success");
const isStorageSupport = true;
let storagePhone = "";
let storageEmail = "";

navMain.classList.remove("page-header__nav-nojs");

navToggle.addEventListener("click", function() {
  if (navMain.classList.contains("page-header__nav--closed")) {
    navMain.classList.remove("page-header__nav--closed");
    navMain.classList.add("page-header__nav--opened");
  } else {
    navMain.classList.add('page-header__nav--closed');
    navMain.classList.remove("page-header__nav--opened");
  }
});

try {
    storagePhone = localStorage.getItem("phone");
    storageEmail = localStorage.getItem("email");
} catch (err) {
    isStorageSupport = false;
}

const showModal = (arr) => {
    arr.forEach((el) => {
        el.addEventListener("click", function (evt) {
            evt.preventDefault();
            purchaseModal.classList.add("page__modal--show");
            if (storagePhone) {
                purchasePhone.value = storagePhone;
                purchaseEmail.focus();
            }
            if (storageEmail) {
                purchaseEmail.value = storageEmail;
            } else {
                purchasePhone.focus();
            }
        });         
    });
}

showModal(purchaseLinks);

purchaseForm.addEventListener("submit", function (evt) {
    if (!purchasePhone.value || !purchaseEmail.value) {
        evt.preventDefault();
    } else {
        if (isStorageSupport) {
            localStorage.setItem("phone", purchasePhone.value);
            localStorage.setItem("email", purchaseEmail.value);
        }
    }
});

modalClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    purchaseModal.classList.remove("page__modal--show");
});

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
        if (purchaseModal.classList.contains("page__modal--show")) {
            evt.preventDefault();
            purchaseModal.classList.remove("page__modal--show");
        }
    }
});

window.addEventListener("click", function (evt) {
    if (evt.target.className != "page-modal") {
        if (purchaseModal.classList.contains("page__modal--show")) {
            evt.preventDefault();
            purchaseModal.classList.remove("page__modal--show");
        }
    }
});