document.addEventListener('DOMContentLoaded', function(){
    var searchButton = document.getElementById("clickit");
    var randomButton = document.getElementById("random");
    var text  = document.getElementById("text");
    var left = document.getElementById("left");
    var right = document.getElementById("right");


    var slider = document.getElementById("numResults");
    var value = document.getElementById("sliderValue")
    value.innerHTML = slider.value;

    slider.oninput = function(){
        value.innerHTML = this.value;
    }

    searchButton.addEventListener('click', async function(){
        var userInput = document.getElementById("userInput").value;
        if (userInput.length === 0){
            text.innerHTML = "Field cannot be blank";
            return;
        }
        text.innerHTML = "Loading";

        var results = await SearchAPIs(userInput, slider.value);
        text.innerHTML = "Results";
        left.innerHTML = results[0];
        right.innerHTML = results[1];
    })

    randomButton.addEventListener('click', async function(){
        var userInput = document.getElementById("userInput").value;
        var userNum = parseInt(userInput);
        if (userInput.length === 0){
            text.innerHTML = "Field cannot be blank";
            return;
        }
        if (isNaN(userNum)){
            text.innerHTML = userInput + " is not a valid integer";
            return
        }
        let randomWordHandler = new RandomWordHandler();
        let randomWordURLString = randomWordHandler.BuildURLString(userNum);
        var words = await randomWordHandler.RetrieveJSON(randomWordURLString);
        words = words.join(" ");
        text.innerHTML = "Searching: " + words; 


        var results = await SearchAPIs(words, slider.value);
        text.innerHTML = "Results from: " + words;
        left.innerHTML = results[0];
        right.innerHTML = results[1];
    })


})


async function SearchAPIs(words, maxResults){
    console.log(maxResults);
    const wordArray = ProcessInput(words);
    let youtubeHandler = new YoutubeHandler();
    let googleHandler = new GoogleHandler();
    

    let youtubeURLString = youtubeHandler.BuildURLString(wordArray);
    let googleURLString = googleHandler.BuildURLString(wordArray);
    

    var youtubeJSON = await youtubeHandler.RetrieveJSON(youtubeURLString);
    var googleJSON = await googleHandler.RetrieveJSON(googleURLString);

    let youtubeLinks = youtubeHandler.GetLinks(youtubeJSON, maxResults);
    let googleLinks = googleHandler.GetLinks(googleJSON, maxResults);

    return [youtubeLinks.join("<br/>"),  googleLinks.join("<br/>")];
}


function ProcessInput(userInput){
    return userInput.split(" ");
}
