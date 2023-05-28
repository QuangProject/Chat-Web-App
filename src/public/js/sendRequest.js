// Login form submit event handler
$("#send-request-form").submit(function (e) {
    e.preventDefault();

    const usernameInput = document.getElementById("username");
    const messageInput = document.getElementById("message");
    const sendRequestError = document.getElementById("send-request-error");

    const username = usernameInput.value;
    const message = messageInput.value;

    // Validate input fields
    if (!username || !message) {
        sendRequestError.textContent = "Please fill in all fields.";
        return;
    }

    const data = { friendUsername: username, message };
    $('body').append('<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>')
    $.ajax({
        url: "/send-request/send",
        type: "post",
        data: data,

        success: function (result) {
            $('.overlay').remove()
            Swal.fire(
                'Success',
                result.message,
                'success'
            )
            // empty input fields
            usernameInput.value = "";
            messageInput.value = "";
        },
        error: function (error) {
            $('.overlay').remove()
            console.error(error);
            Swal.fire(
                'Warning',
                error.responseJSON.error,
                'warning'
            )
        }
    });
});