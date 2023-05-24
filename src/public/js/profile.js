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

    $.ajax({
        url: '/user/edit/save',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            Swal.fire(
                'Success',
                response.message,
                'success'
            ).then((result) => {
                window.location.href = '/user/profile';
            })
        },
        error: function (error) {
            Swal.fire(
                'Error',
                error.responseJSON.error,
                'error'
            )
        }
    });
});