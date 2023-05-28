// Unfriend
function unfriend(friendId) {
    Swal.fire({
        title: 'Are you sure to unfriend?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $('body').append('<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>')
            // Ajax unfriend
            $.ajax({
                url: '/list-friend/unfriend',
                type: 'POST',
                data: {
                    friendId
                },
                success: function (response) {
                    $('.overlay').remove()
                    Swal.fire(
                        'Success',
                        "Unfriend successfully.",
                        'success'
                    )
                    var el = document.getElementById('cart_' + friendId)
                    $(el).closest('#cart_' + friendId).css('background', '#f27474')
                    $(el)
                        .closest('#cart_' + friendId)
                        .fadeOut(800, function () {
                            $('#cart_' + friendId).remove()
                        })

                    if (response.numberOfFriend == 0) {
                        setTimeout(function () {
                            $("#row_friend").append('<div class="col-12"><div class="alert alert-info" role="alert"><strong>Info!</strong> You do not have any friend.</div></div>')
                        }, 850)
                    }
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
            })
        }
    })
}

// Message
function message(friendId) {
    $('body').append('<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>')
    // send request to server
    $.ajax({
        url: '/conversation/create',
        type: 'POST',
        data: {
            friendId
        },
        success: function (response) {
            $('.overlay').remove()
            window.location.href = '/message/' + response.conversationId
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
    })

}