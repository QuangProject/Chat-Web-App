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

        success: function (result, status, xhr) {
            if (result.status == 'fail') {
                loginError.textContent = result.msg;
            } else {
                window.location.href = '/'
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr);
        }
    });
});