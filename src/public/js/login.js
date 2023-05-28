// Login form submit event handler
$("#login-form").submit(function (e) {
    e.preventDefault();

    const usernameInput = document.getElementById("login-username");
    const passwordInput = document.getElementById("login-password");
    const loginError = document.getElementById("login-error");

    const username = usernameInput.value;
    const password = passwordInput.value;

    // Validate input fields
    if (!username || !password) {
        loginError.textContent = "Please fill in all fields.";
        return;
    }

    const data = { username, password }
    $('body').append('<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>')
    $.ajax({
        url: "/login/auth",
        type: "post",
        data: data,

        success: function (result) {
            $('.overlay').remove()
            window.location.href = '/';
        },
        error: function (error) {
            $('.overlay').remove()
            console.error(error)
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