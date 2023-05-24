// Register form submit event handler
$("#register-form").submit(function (e) {
    e.preventDefault();

    var email_pattern = /^[a-zA-Z]\w*(\.\w+)*\@\w+(\.\w{2,3})+$/;
    var phone_pattern = /^(\(0\d{1,3}\)\d{7})|(0\d{9})$/;

    const usernameInput = document.getElementById("register-username");
    const passwordInput = document.getElementById("register-password");
    const confirmPasswordInput = document.getElementById("register-confirm-password");
    const firstNameInput = document.getElementById("register-first-name");
    const lastNameInput = document.getElementById("register-last-name");
    const genderInput = document.getElementsByName("gender");
    const birthdayInput = document.getElementById("register-birthday");
    const emailInput = document.getElementById("register-email");
    const telephoneInput = document.getElementById("register-telephone");
    const addressInput = document.getElementById("register-address");
    const registerError = document.getElementById("register-error");

    const username = usernameInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const birthday = birthdayInput.value;
    const email = emailInput.value;
    const telephone = telephoneInput.value;
    const address = addressInput.value;

    // Validate input fields
    if (!username || !password || !confirmPassword || !firstName || !lastName || !birthday || !email || !telephone || !address) {
        registerError.textContent = "Please fill in all fields.";
        return;
    }

    // Validate gender
    var gender
    var isChecked = false;

    for (var i = 0; i < genderInput.length; i++) {
        if (genderInput[i].checked) {
            isChecked = true;
            gender = genderInput[i].value;
            break;
        }
    }
    if (!isChecked) {
        registerError.textContent = "Please choose your gender.";
        return;
    }

    // Check if password and confirm do not match
    if (password != confirmPassword) {
        registerError.textContent = "Password and confirm do not match.";
        return;
    }

    // Validate email
    if (email_pattern.test(email) == false) {
        registerError.textContent = "Invalid email.";
        return;
    }

    // Validate telephone
    if (phone_pattern.test(telephone) == false) {
        registerError.textContent = "Invalid telephone.";
        return;
    }

    const data = { username, password, firstName, lastName, gender, birthday, email, telephone, address }

    $.ajax({
        url: "/register/save",
        type: "post",
        data: data,

        success: function (result, status, xhr) {
            if (result.status == 'fail') {
                registerError.textContent = result.msg;
            } else {
                Swal.fire(
                    'Success',
                    'You registered successfully!!!',
                    'success'
                ).then((result) => {
                    window.location.href = '/login';
                })
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr);
        }
    });
});