document.addEventListener('DOMContentLoaded', function(){
    var button = document.getElementById("clickit");
    var text  = document.getElementById("text");
    var left = document.getElementById("left");
    var right = document.getElementById("right");

    button.addEventListener('click', async function(){
        var userInput = document.getElementById("userInput").value;
        if (userInput.length === 0){
            text.innerHTML = "Field cannot be blank";
            return;
        }
        text.innerHTML = "Loading";

        var results = await SearchAPIs(userInput);
        text.innerHTML = "Results";
        left.innerHTML = results[0];
        right.innerHTML = results[1];
    })
})

async function SearchAPIs(words){
    const wordArray = ProcessInput(words);
    let youtubeHandler = new YoutubeHandler();
    let googleHandler = new GoogleHandler();
    

    let youtubeURLString = youtubeHandler.BuildURLString(wordArray);
    let googleURLString = googleHandler.BuildURLString(wordArray);
    

    var youtubeJSON = await youtubeHandler.RetrieveJSON(youtubeURLString);
    var googleJSON = await googleHandler.RetrieveJSON(googleURLString);

    let youtubeLinks = youtubeHandler.GetLinks(youtubeJSON);
    let googleLinks = googleHandler.GetLinks(googleJSON);

    return [youtubeLinks.join("<br/>"),  googleLinks.join("<br/>")];
}

function ProcessInput(userInput){
    return userInput.split(" ");
}
