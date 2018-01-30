// constants
const SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
//retrieves data from api using previously declared request
function getDataFromApi (searchTerm, callback) {
  const request = {
  part: "snippet",
  type: "video",
  key: "AIzaSyC8lrz2y7b2F6im1Y0Sx82YQYlERJdyick",
  q: searchTerm
}
  $.getJSON(SEARCH_URL, request, callback);
}
// renders result of search
function renderResults(result){
  return `
    <ul>
      <li>    
        <h3 class="js-video-title">${result.snippet.title}</h3>
        <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img class="js-result-img" src="${result.snippet.thumbnails.medium.url}" alt="${result.snippet.title}"></a>
        <a href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">More from this channel: ${result.snippet.channelTitle}</a>
      </li>
    </ul>  
  `;
}

function displayThumbnails(data) {
  const results = data.items.map((item,index) => renderResults(item));
    $(".js-search-results").html(results);
}
// handler function
function watchSubmit() {
  $(".js-search-form").submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find("#js-query");
    const query = queryTarget.val();
    queryTarget.val("");
    getDataFromApi(query,displayThumbnails);
  });

}

$(watchSubmit);