let apiKey = "AIzaSyAWopeKfjAyUSPhGuLJeKnTGkUurG6fS_0"; 
let urlString = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=relevance&type=video&key=" + apiKey + "&q=";

function BuildURLStringYoutube(queryArray){
    queryString = EncodeQueries(queryArray);
    return urlString + queryString;
}

function GetLinks(jsonObject){
    linkList = Array();
    let index = 0;

    jsonObject.items.array.forEach(ids => {
        linkList[index] = "https://www.youtube.com/watch?v=" + ids.videoId;
        index ++;
    });

    return linkList;
}

class YoutubeHandler{
    constructor (){
        this.apiKey = "AIzaSyAWopeKfjAyUSPhGuLJeKnTGkUurG6fS_0"; 
        this.urlString = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=relevance&type=video&key=" + this.apiKey + "&q=";
    }

    BuildURLString(queryArray){
        let queryString = EncodeQueries(queryArray);
        return this.urlString + queryString;
    }

    async RetrieveJSON(urlString){
        return await GetJson(urlString);
    }

    GetLinks(jsonObject){
        const linkList = Array();
        linkList[0] = "<h1>Youtube Videos</h1>";
        let index = 1;

        jsonObject.items.forEach(item => {
            linkList[index] = item.snippet.title;
            index ++;
            linkList[index] = "<img src=\"" + item.snippet.thumbnails.default.url + "\" alt = \"Hewwo\" width=\"120\" height = \"90\">"
            index ++;
            linkList[index] = item.snippet.description;
            index ++;
            linkList[index] = "https://www.youtube.com/watch?v=" + item.id.videoId + "<br/>";
            index ++;
        });
    
        return linkList;
    }    
}