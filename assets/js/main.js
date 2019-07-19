var buttonsArray = ["Ford", "Toyota", "Subaru", "Holden"]

$(document).ready(function(){
    var renderButtons = function(){
        buttonsArray.map((button)=> {
            var appendButton = $('<button>').attr({type : 'button', class : "btn btn-primary"}).text(button)
            $('.button-container').append(appendButton)
        })
    }


    renderButtons()


})