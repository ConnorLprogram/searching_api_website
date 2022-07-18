class YoutubeHandler{
    constructor (){
        this.apiKey = "AIzaSyAWopeKfjAyUSPhGuLJeKnTGkUurG6fS_0"; 
        this.urlString = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=relevance&type=video&key=" + this.apiKey + "&q=";
    }


    BuildURLString(queryArray, maxResults){
        let queryString = EncodeQueries(queryArray);
        return this.urlString + queryString + "&maxResults=" + maxResults;
    }


    async RetrieveJSON(urlString){
        try{
            return await GetJson(urlString);
        }
        catch(error){
            throw new Error("Error occured when retrieving Youtube JSON:<br/>" + error);
        }
    }


    GetLinks(jsonObject){
        const linkList = Array();
        linkList[0] = "<h1>Youtube Videos</h1>";
        let index = 1;

        if (jsonObject === undefined){
            linkList[index] = "No results";
            return linkList;
        }

        jsonObject.items.forEach(item => {
            
            linkList[index] = "<a href=\"https://www.youtube.com/watch?v=" + item.id.videoId + "\">" + item.snippet.title + "</a>"
            index ++;

            linkList[index] = "<img src=\"" + item.snippet.thumbnails.default.url + "\" alt = \"Hewwo\" width=\"120\" height = \"90\">"
            index ++;

            linkList[index] = item.snippet.description + "<br/>";
            index ++;
        });
    
        return linkList;
    }    
}