const image = document.getElementById('changeImage')
const input = document.getElementById('changePic')

input.addEventListener("change", () => {
    image.src = URL.createObjectURL(input.files[0])
})

// profile form submit event handler
$("#profile-form").submit(function (e) {
    e.preventDefault();

    var phone_pattern = /^(\(0\d{1,3}\)\d{7})|(0\d{9})$/;

    const firstNameInput = document.getElementById("first-name");
    const lastNameInput = document.getElementById("last-name");
    const genderInput = document.getElementsByName("gender");
    const birthdayInput = document.getElementById("birthday");
    const telephoneInput = document.getElementById("telephone");
    const addressInput = document.getElementById("address");
    const profileError = document.getElementById("profile-error");
    profileError.textContent = "";

    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    var gender
    for (var i = 0; i < genderInput.length; i++) {
        if (genderInput[i].checked) {
            gender = genderInput[i].value;
            break;
        }
    }
    const birthday = birthdayInput.value;
    const telephone = telephoneInput.value;
    const address = addressInput.value;

    // Validate input fields
    if (!firstName || !lastName || !birthday || !telephone || !address) {
        profileError.textContent = "Please fill in all fields.";
        return;
    }

    // Validate telephone
    if (phone_pattern.test(telephone) == false) {
        profileError.textContent = "Invalid telephone.";
        return;
    }

    // Validate birthday
    var today = new Date();
    var birthDate = new Date(birthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age < 12) {
        profileError.textContent = "You must be at least 12 years old.";
        return;
    }

    var formData = new FormData(this);
    $('body').append('<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>')
    $.ajax({
        url: '/user/edit/profile',
        type: 'PUT',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('.overlay').remove()
            Swal.fire(
                'Success',
                response.message,
                'success'
            ).then((result) => {
                window.location.href = '/user/profile';
            })
        },
        error: function (error) {
            $('.overlay').remove()
            if (error.status === 400) {
                Swal.fire(
                    'Warning',
                    error.responseJSON.error,
                    'warning'
                )
            }
            if (error.status === 500) {
                Swal.fire(
                    'Error',
                    error.responseJSON.error,
                    'error'
                )
            }
        }
    });
});

// Change password form submit event handler
$("#change-password-form").submit(function (e) {
    e.preventDefault();

    const currentPasswordInput = document.getElementById("currentPassword");
    const newPasswordInput = document.getElementById("newPassword");
    const reNewPasswordInput = document.getElementById("renewPassword");
    const changePasswordError = document.getElementById("change-password-error");
    changePasswordError.textContent = "";

    const currentPassword = currentPasswordInput.value;
    const newPassword = newPasswordInput.value;
    const reNewPassword = reNewPasswordInput.value;

    // Validate input fields
    if (!currentPassword || !newPassword || !reNewPassword) {
        changePasswordError.textContent = "Please fill in all fields.";
        return;
    }

    // Validate new password
    if (newPassword.length < 6) {
        changePasswordError.textContent = "Password must be at least 6 characters.";
        return;
    }

    // Validate re-new password
    if (newPassword != reNewPassword) {
        changePasswordError.textContent = "Re-entered password does not match.";
        return;
    }

    $('body').append('<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>')
    // Send request to server
    $.ajax({
        url: '/user/edit/password',
        type: 'PUT',
        data: {
            oldPassword: currentPassword,
            newPassword: newPassword
        },
        success: function (response) {
            $('.overlay').remove()
            Swal.fire(
                'Success',
                response.message,
                'success'
            ).then((result) => {
                window.location.href = '/user/profile';
            })
        },
        error: function (error) {
            $('.overlay').remove()
            if (error.status === 400) {
                Swal.fire(
                    'Warning',
                    error.responseJSON.error,
                    'warning'
                )
            }
            if (error.status === 500) {
                Swal.fire(
                    'Error',
                    error.responseJSON.error,
                    'error'
                )
            }
        }
    });
});