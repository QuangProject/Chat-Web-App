document.addEventListener('DOMContentLoaded', function () {
    const conversationContainers = document.querySelectorAll('.message-container');

    conversationContainers.forEach(function (conversationContainer) {
        const dotsContainer = conversationContainer.querySelector('.dots-container');
        const popup = conversationContainer.querySelector('.popup');
        const conversationId = conversationContainer.dataset.conversationId;
        let isPopupVisible = false;

        dotsContainer.addEventListener('click', function () {
            if (isPopupVisible) {
                popup.style.display = 'none';
                isPopupVisible = false;
            } else {
                popup.style.display = 'block';
                isPopupVisible = true;
            }
        });

        popup.addEventListener('click', function (event) {
            const target = event.target;
            if (target.tagName === 'LI') {
                const option = target.textContent;
                if (option === 'Remove') {
                    // Handle "remove" option clicked for the conversationId
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
                            remove(conversationId)
                        }
                    })
                    // Perform desired action for "remove" option
                } else if (option === 'Mark as Unread') {
                    // Handle "mark as unread" option clicked
                    // Perform desired action for "mark as unread" option
                } else if (option === 'Block') {
                    // Handle "block" option clicked
                    // Perform desired action for "block" option
                } else if (option === 'Mute') {
                    // Handle "mute" option clicked
                    // Perform desired action for "mute" option
                }
                popup.style.display = 'none';
                isPopupVisible = false;
            }
        });

        document.addEventListener('click', function (event) {
            const target = event.target;
            if (!conversationContainer.contains(target)) {
                popup.style.display = 'none';
                isPopupVisible = false;
            }
        });
    });
});

function remove(conversationId) {
    console.log('Remove clicked for conversation ID:', conversationId);
    $('body').append('<div class="overlay"><div class="dot-spinner center"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div></div>')
    $.ajax({
        url: '/conversation/remove/' + conversationId,
        type: 'DELETE',
        success: function (result) {
            console.log(result);
            $('.overlay').remove()
            Swal.fire(
                'Success',
                result.message,
                'success'
            )
            var el = document.getElementById('conversation_' + conversationId)
            $(el).closest('#conversation_' + conversationId).css('background', '#f27474')
            $(el)
                .closest('#conversation_' + conversationId)
                .fadeOut(800, function () {
                    $('#conversation_' + conversationId).remove()
                })

            if (result.numberOfConversation == 0) {
                setTimeout(function () {
                    $("#row_conversation").append('<div class="col-12"><div class="alert alert-info" role="alert"><strong>Info!</strong> No conversations found.</div></div>')
                }, 850)
            }
        },
        error: function (error) {
            console.error(error);
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
}
