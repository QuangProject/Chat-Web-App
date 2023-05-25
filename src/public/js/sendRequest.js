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
    console.log(data);

    $.ajax({
        url: "/send-request/send",
        type: "post",
        data: data,

        success: function (result) {
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
            console.error(error);
            Swal.fire(
                'Warning',
                error.responseJSON.error,
                'warning'
            )
        }
    });
});