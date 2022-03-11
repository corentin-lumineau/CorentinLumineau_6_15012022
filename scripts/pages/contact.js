import { closeModaleContact } from "../pages/photographer.js";

// Generic dom element
const main = document.querySelector("main");
const overlay = document.querySelector(".overlay");
const modaleContact = document.getElementById("contact_modal");

//Validation on change
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const mail = document.getElementById("mail");
const message = document.getElementById("your-message");

firstName.addEventListener("change", (event) => {
  checkFirstName(event.currentTarget.value);
});

lastName.addEventListener("change", (event) => {
  checkLastName(event.currentTarget.value);
});

mail.addEventListener("change", (event) => {
  checkPresenceMail(event.currentTarget.value);
});

message.addEventListener("change", (event) => {
  checkMessage(event.currentTarget.value);
});

//Validation on submit

const handleSubmit = (event) => {
  const formData = new FormData(event.currentTarget);
  const formProps = Object.fromEntries(formData);

  if (!checkInputs(formProps)) {
    event.preventDefault();
  } else {
    event.preventDefault();
    closeModaleContact(overlay, modaleContact, main);
    Object.entries(formProps).forEach((item) => {
      console.log(item);
    });
  }
};

const checkInputs = (data) => {
  const res = [
    checkFirstName(data["Prénom"]),
    checkLastName(data["Nom"]),
    checkPresenceMail(data["Mail"]),
    checkMessage(data["Message"]),
  ];

  if (res.includes(false)) {
    return false;
  } else {
    return true;
  }
};

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);

//Validation function

const checkFirstName = (value) => {
  const element = document.getElementById("first");
  if (value.trim() === "" || value.trim().length < 2) {
    showError(element);
    return false;
  } else {
    hideError(element);
    return true;
  }
};

const checkLastName = (value) => {
  const element = document.getElementById("last");
  if (value.trim() === "" || value.trim().length < 2) {
    showError(element);
    return false;
  } else {
    hideError(element);
    return true;
  }
};

const checkPresenceMail = (value) => {
  const emailReg = new RegExp(/^[^@]+@[^@]+\.[^@]+$/);
  const valid = emailReg.test(value);
  const element = document.getElementById("mail");

  if (value === "" || !valid) {
    showError(element);
    return false;
  } else {
    hideError(element);
    return true;
  }
};

const checkMessage = (message) => {
  const element = document.getElementById("your-message");
  if (message.trim() == "") {
    showError(element);
    return false;
  } else {
    hideError(element);
  }
};

//Display error method

function showError(data) {
  if (data) {
    data.closest(".wrapper-form-element").dataset.errorVisible = "true";
  }
}

function hideError(data) {
  data.closest(".wrapper-form-element").dataset.errorVisible = "false";
}
