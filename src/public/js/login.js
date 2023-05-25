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

    $.ajax({
        url: "/login/auth",
        type: "post",
        data: data,

        success: function (result) {
            Swal.fire(
                'Success',
                result.message,
                'success'
            ).then((result) => {
                window.location.href = '/';
            })
        },
        error: function (error) {
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