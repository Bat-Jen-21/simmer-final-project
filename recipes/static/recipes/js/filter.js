$(document).ready(function(){
    
const user_input = $("#search-bar")
const artists_div = $('#adaptive-content')
const path = '/iSearch/'
const delay_ms = 700
let scheduled_function = false


    let ajax_call = function (path, request_parameters) {
        $.getJSON(path, request_parameters)
            .done(response => {
                    artists_div.html(response['html_from_view'])
                })
            }
    


    user_input.on('keyup', function () {

        const request_parameters = {
            q: $(this).val() // value of user_input: the HTML element with ID "search-bar"
        }

        if (scheduled_function) {
            clearTimeout(scheduled_function)
        }

        // setTimeout returns the ID of the function to be executed
        scheduled_function = setTimeout(ajax_call, delay_ms, path, request_parameters)
    })
})
