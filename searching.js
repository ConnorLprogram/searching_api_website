document.addEventListener('DOMContentLoaded', function(){
    var userWordButton = document.getElementById("userSearch");
    var searchButton = document.getElementById("search");
    var randomButton = document.getElementById("random");
    var input = document.getElementById("userInput");
    var slider = document.getElementById("numResults");
    var value = document.getElementById("sliderValue")
    value.innerHTML = slider.value;

    slider.oninput = function(){
        value.innerHTML = this.value;
    }

    var randomSlider = document.getElementById("randomWords");
    var randomValue = document.getElementById("randomNumValue");
    var randomWords = document.getElementById("randomNumWords");
    randomValue.innerHTML = slider.value;

    randomSlider.oninput = function(){
        randomValue.innerHTML = this.value;
    }
    
    userWordButton.addEventListener("click", function(){
        input.style.display = "block";
        randomSlider.style.display = "none";
        randomValue.style.display = "none";
        randomWords.style.display = "none";
    });

    randomButton.addEventListener("click", function(){
        randomValue.innerHTML = randomSlider.value;
        input.style.display = "none";
        randomSlider.style.display = "block";
        randomWords.style.display = "block";
        randomValue.style.display = "inline-block";
    });


    input.addEventListener("keypress", async function(event){
        if (event.key === "Enter"){
            event.preventDefault();
            await GetUserResults(slider.value);
        }
    });


    searchButton.addEventListener('click', async function(){
        if (randomSlider.style.display === "none") {
            await GetUserResults(slider.value);
        }
        else{
            let randomWordHandler = new RandomWordHandler();
            let randomWordURLString = randomWordHandler.BuildURLString(randomSlider.value);
            var words = await randomWordHandler.RetrieveJSON(randomWordURLString);

            words = words.join(" ");
            
            await HandleResults(words, slider.value);            
        }
    })
})


async function SearchAPIs(words, maxResults){
    const wordArray = ProcessInput(words);

    let youtubeHandler = new YoutubeHandler();
    let googleHandler = new GoogleHandler();
    
    let youtubeURLString = youtubeHandler.BuildURLString(wordArray, maxResults);
    let googleURLString = googleHandler.BuildURLString(wordArray, maxResults);
    
    try{
        var youtubeJSON = await youtubeHandler.RetrieveJSON(youtubeURLString);
        var googleJSON = await googleHandler.RetrieveJSON(googleURLString);
    }
    catch (error){
        throw new Error("Error when trying to retrieve JSON information:<br/>" + error);
    }

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

    try{
        var results = await SearchAPIs(words, sliderValue);
        text.innerHTML = "Results from: " + words;

        left.innerHTML = results[0];
        right.innerHTML = results[1];
    }
    catch(error){
        text.innerHTML = "Something went wrong:<br/>" + error;
    }
}


function ProcessInput(userInput){
    return userInput.split(" ");
}
