const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.toggle("right-panel-active");
});

// & function to switch between sign-in and sign-up

signInButton.addEventListener("click", () => {
  container.classList.toggle("right-panel-active");
});

// & ================================ Function for Form value fetching ============================================================================

function registerUser(e) {
  e.preventDefault();

  // & getting the input values
  let Full_name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let mob = document.getElementById("mobile").value;
  let confirm_pass = validatePasswords();

  // & Check if email already exists
  let existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  let emailExists = existingUsers.some((user) => user.email === email);
  let mobExists = existingUsers.some((user) => user.mob === mob);

  if (emailExists) {
    user_Found_pop_up()    
    return; // Exit the function if email exists
  } else if (mobExists) {
    user_Found_pop_up()
        return; // Exit the function if mobile exists
  } else if (confirm_pass === "Please enter matching passwords.") {
    // & Check if the passwords matched
    password_not_match(); // Show alert with the error message
    return; // Exit the function if passwords do not match
  }

  // & If everything is valid, create the user object
  let user = { Full_name, email, mob, password: confirm_pass };

  // & Store user in local storage
  storeUser(user);

  // & Clear the form after submission
  clearForm();
}

// & Ensure the event listener calls registerUser
document.getElementById("Register").addEventListener("click", registerUser);

// & Check Whether user is registered or not.......................................................
function storeUser(user) {
  let existingUsers = JSON.parse(localStorage.getItem("users")) || []; // Initialize existingUsers

  // ? Add the new user to the existing users array
  existingUsers.push(user);

  // ? Store the updated users array in local storage
  localStorage.setItem("users", JSON.stringify(existingUsers));
}

// & Password Validation Function .........................................................

function validatePasswords() {
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document
    .getElementById("confirm-password")
    .value.trim();

  if (password !== confirmPassword) {
    document.getElementById("password").style.border = "2px solid red";
    document.getElementById("confirm-password").style.border = "2px solid red";

    return "Please enter matching passwords.";
  }
  // & If the passwords match, you can return a success message or perform other actions.
  return confirmPassword;
}

function password_not_match() {
  popup.style.display = "flex";
  popup_heading.innerText = "Password not Matched!";
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

function user_Found_pop_up() {
  popup.style.display = "flex";
  popup_heading.innerText = "User Found";
  popup_para.innerText = "Please use another email/ Mobile Number";

  document.getElementById("cancel-pop-up-button").addEventListener("click", ()=>{
      popup.style.display = "none"
  })

  setTimeout(() => {
    popup.style.display = "none";
    popup_para.innerText = "";
    popup_heading.innerText = "";
  }, 5000);
}

function clearForm() {
  // Ensure this field is cleared

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("mobile").value = "";
  document.getElementById("password").value = "";
  document.getElementById("confirm-password").value = "";
}
