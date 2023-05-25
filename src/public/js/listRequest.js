// accept friend request
function accept(friendId) {
    // send request to server
    $.ajax({
        url: '/list-request/accept',
        type: 'POST',
        data: { friendId },
        success: function (response) {
            Swal.fire(
                'Success',
                response.message,
                'success'
            )
            var el = document.getElementById('cart_' + friendId)
            $(el).closest('#cart_' + friendId).css('background', '#a5dc86')
            $(el)
                .closest('#cart_' + friendId)
                .fadeOut(800, function () {
                    $('#cart_' + friendId).remove()
                })
        },
        error: function (error) {
            Swal.fire(
                'Warning',
                error.responseJSON.error,
                'warning'
            )
        }
    })
}

// reject friend request
function reject(friendId) {
    //send request to server
    $.ajax({
        url: '/list-request/reject',
        type: 'POST',
        data: { friendId },
        success: function (response) {
            Swal.fire(
                'Success',
                response.message,
                'success'
            )
            var el = document.getElementById('cart_' + friendId)
            $(el).closest('#cart_' + friendId).css('background', '#f27474')
            $(el)
                .closest('#cart_' + friendId)
                .fadeOut(800, function () {
                    $('#cart_' + friendId).remove()
                })
        },
        error: function (error) {
            Swal.fire(
                'Warning',
                error.responseJSON.error,
                'warning'
            )
        }
    })
}