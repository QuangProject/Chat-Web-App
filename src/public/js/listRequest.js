// accept friend request
function accept(requestId) {
    $('body').append('<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>')
    // send request to server
    $.ajax({
        url: '/list-request/accept',
        type: 'POST',
        data: { requestId },
        success: function (response) {
            $('.overlay').remove()
            Swal.fire(
                'Success',
                response.message,
                'success'
            )
            var el = document.getElementById('cart_' + requestId)
            $(el).closest('#cart_' + requestId).css('background', '#a5dc86')
            $(el)
                .closest('#cart_' + requestId)
                .fadeOut(800, function () {
                    $('#cart_' + requestId).remove()
                })

            if (response.numberOfRequest == 0) {
                setTimeout(function () {
                    $("#row_request").append('<div class="col-12"><div class="alert alert-info" role="alert"><strong>Info!</strong> You do not have any friend request.</div></div>')
                }, 850)
            }
        },
        error: function (error) {
            $('.overlay').remove()
            console.error(error)
            Swal.fire(
                'Warning',
                error.responseJSON.error,
                'warning'
            )
        }
    })
}

// reject friend request
function reject(requestId) {
    //send request to server
    $.ajax({
        url: '/list-request/reject',
        type: 'POST',
        data: { requestId },
        success: function (response) {
            Swal.fire(
                'Success',
                response.message,
                'success'
            )
            var el = document.getElementById('cart_' + requestId)
            $(el).closest('#cart_' + requestId).css('background', '#f27474')
            $(el)
                .closest('#cart_' + requestId)
                .fadeOut(800, function () {
                    $('#cart_' + requestId).remove()
                })

            if (response.numberOfRequest == 0) {
                setTimeout(function () {
                    $("#row_request").append('<div class="col-12"><div class="alert alert-info" role="alert"><strong>Info!</strong> You do not have any friend request.</div></div>')
                }, 850)
            }
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