var buttonsArray = ["Ford", "Toyota", "Subaru", "Skoda"]

$(document).ready(function(){
    // Function to render buttons to DOM from buttonsArray
    var renderButtons = function(){
        // Empties buttons frame and input box
        $('.button-container').empty()
        $('#inputVehicle').val("")
        // Loops through the buttonsArray
        buttonsArray.map((button)=> {
            // Creates button element
            var appendButton = $('<button>').attr({type : 'button', class : "btn btn-primary search-button"}).text(button)

            // Appends Button to the button-container
            $('.button-container').append(appendButton)
        })

        // Logic for when a button is clicked
        $('.search-button').on("click", function(){
            searchGif( $(this).text())
        })
    }

    // Logic to search for gif based off the clicked button
    var searchGif = function(query){
        // Ajax request to Giphy API
        $.ajax({
            url : `https://api.giphy.com/v1/gifs/search?api_key=TOx6vyCRU3Ac9Kj6KDi5Pm7eawRPjPKn&q=${query}&limit=25&offset=0&lang=en`,
            method : "GET"
        })
        .then(function(resp){
            // Clears frame that holds all gifs
            $('.gif-frame').empty()
            // Collate all reponse images
            var images = resp.data

            // Append returned images to the DOM
            images.forEach((image) => {

                var appendImage = $('<img>').attr({class : "rounded-circle", 
                                                   id : "giphy",
                                                   src : image.images.fixed_height_still.url, 
                                                   "data-still" : image.images.fixed_height_still.url, 
                                                   "data-anim" : image.images.fixed_height_small.url,
                                                   animated : "false", 
                                                   width : 100, 
                                                   height : 100
                                                })


                var appendSpan = $('<span>').text(`Rating : ${image.rating}`)
                $('.gif-frame').append([appendImage, appendSpan])


            });


            $('img').on('click', function(){
                if($(this).attr('animated')=== "false"){
                    $(this).attr({src : $(this).attr("data-anim"), animated : "true"})
                }
                else{
                    $(this).attr({src : $(this).attr("data-still"), animated : "false"})
                }
        
            })
    
        }
        )
        
    }


    $('.new-button-form').on("submit", function(event){
        event.preventDefault();
        buttonsArray.push($('#inputVehicle').val())
        renderButtons()
    })



    renderButtons()


})