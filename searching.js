document.addEventListener('DOMContentLoaded', function(){
    var searchButton = document.getElementById("clickit");
    var randomButton = document.getElementById("random");
    var input = document.getElementById("userInput");

    var slider = document.getElementById("numResults");
    var value = document.getElementById("sliderValue")
    value.innerHTML = slider.value;

    slider.oninput = function(){
        value.innerHTML = this.value;
    }

    input.addEventListener("keypress", async function(event){
        if (event.key === "Enter"){
            event.preventDefault();
            await GetUserResults(slider.value);
        }
    });


    searchButton.addEventListener('click', async function(){
        await GetUserResults(slider.value);
    })


    randomButton.addEventListener('click', async function(){
        var userInput = GetUserInput();
        if (userInput === undefined){
            return;
        }

        var userNum = parseInt(userInput);

        if (isNaN(userNum)){
            text.innerHTML = userInput + " is not a valid integer";
            return;
        }

        let randomWordHandler = new RandomWordHandler();
        let randomWordURLString = randomWordHandler.BuildURLString(userNum);
        var words = await randomWordHandler.RetrieveJSON(randomWordURLString);

        words = words.join(" ");
        
        await HandleResults(words, slider.value);
    })
})


async function SearchAPIs(words, maxResults){
    const wordArray = ProcessInput(words);

    let youtubeHandler = new YoutubeHandler();
    let googleHandler = new GoogleHandler();
    
    let youtubeURLString = youtubeHandler.BuildURLString(wordArray, maxResults);
    let googleURLString = googleHandler.BuildURLString(wordArray, maxResults);
    
    var youtubeJSON = await youtubeHandler.RetrieveJSON(youtubeURLString);
    var googleJSON = await googleHandler.RetrieveJSON(googleURLString);

    let youtubeLinks = youtubeHandler.GetLinks(youtubeJSON);
    let googleLinks = googleHandler.GetLinks(googleJSON);

    return [youtubeLinks.join("<br/>"),  googleLinks.join("<br/>")];
}


function GetUserInput(){
    var userInput = document.getElementById("userInput").value;

    if (userInput.length === 0){
        document.getElementById("text").innerHTML = "Field cannot be blank";
        return undefined;
    }
    
    return userInput
}


async function GetUserResults(sliderValue){
    var userWords = GetUserInput();

    if (userWords === undefined){
        return;
    }

    return await HandleResults(userWords, sliderValue);
}


async function HandleResults(words, sliderValue){
    var text  = document.getElementById("text");
    var left = document.getElementById("left");
    var right = document.getElementById("right");

    text.innerHTML = "Searching for: " + words; 

    var results = await SearchAPIs(words, sliderValue);
    text.innerHTML = "Results from: " + words;

    left.innerHTML = results[0];
    right.innerHTML = results[1];
}


function ProcessInput(userInput){
    return userInput.split(" ");
}
