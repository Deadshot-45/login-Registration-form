function login_User(e) {
  e.preventDefault();

  let confirm_pass = document.getElementById("login-password").value;
  let login_id = document.getElementById("login-id").value;

  if (login_id === "" || confirm_pass === "") {
    alert("Please fill in both fields.");
    return;
  }

  if (isValidPassword(login_id, confirm_pass)) {
    // Redirect to the desired page
    window.location.href = "./download.png"; // Replace with your actual next page
    clearform();
  } else {
    pop_up();
  }

  document.getElementById("login-form").action = "./download.png";

  clearform();
}

function clearform() {
  document.getElementById("login-id").value = "";
  document.getElementById("login-password").value = "";
}

function isValidPassword(login_id, confirm_pass) {
  let mob, email;

  if (isNaN(login_id)) {
    email = login_id;
  } else {
    mob = login_id;
  }

  let existingUsers = JSON.parse(localStorage.getItem("users"));
  let emailExists = existingUsers.some((user) => user.email === email);
  let mobExists = existingUsers.some((user) => user.mob === mob);

  if (!emailExists || !mobExists) {
    email_pop_up();
    return;
  }

  let passwordMatches = existingUsers.some(
    (user) =>
      (user.email === email || user.mob === mob) &&
      user.password === confirm_pass
  );

  return passwordMatches;
}

let popup = document.getElementById("pop-up");
let popup_heading = document.getElementById("pop-up-heading");
let popup_para = document.getElementById("pop-up-para");

function pop_up() {
  popup.style.display = "flex";
  popup_heading.innerText = "Incorrect Password!";
  popup_para.innerText = "please enter correct password";

  document.getElementById("cancel-pop-up-button").addEventListener("click", ()=>{
    popup.style.display = "none";
})

  setTimeout(() => {
    popup.style.display = "none";
    popup_para.innerText = "";
    popup_heading.innerText = "";
  }, 5000);
}

function email_pop_up() {
    popup.style.display = "flex";
    popup_heading.innerText = "User Not Found";
    popup_para.innerText = "Please Register first";

    document.getElementById("cancel-pop-up-button").addEventListener("click", ()=>{
        popup.style.display = "none"
    })
  
    setTimeout(() => {
      popup.style.display = "none";
      popup_para.innerText = "";
      popup_heading.innerText = "";
    }, 5000);
  }
  