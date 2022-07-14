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

    GetLinks(jsonObject, maxResults){
        const linkList = Array();
        linkList[0] = "<h1>Youtube Videos</h1>";
        let index = 1;
        let curItems = 1;

        jsonObject.items.forEach(item => {
            if (curItems > maxResults ){
                return linkList;
            }
            
            linkList[index] = "<a href=\"https://www.youtube.com/watch?v=" + item.id.videoId + "\">" + item.snippet.title + "</a>"
            index ++;
            linkList[index] = "<img src=\"" + item.snippet.thumbnails.default.url + "\" alt = \"Hewwo\" width=\"120\" height = \"90\">"
            index ++;
            linkList[index] = item.snippet.description + "<br/>";
            index ++;
            curItems ++;
        });
    
        return linkList;
    }    
}