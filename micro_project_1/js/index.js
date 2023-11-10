function submitted() {
  console.log("Hello");

  const email = document.getElementById("email-input");
  const button = document.getElementById("register-btn");
  const showText = document.getElementById("showText");
  const parent = email.parentNode;

  const thankyou = document.createElement("h1");
  thankyou.innerText = "Thank you!";

  parent.replaceChild(thankyou, email);
  button.remove();
  showText.remove();
}
