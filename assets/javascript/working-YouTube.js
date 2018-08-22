$(document).ready(function () {

  $("#searchButton").on("click", function (event) {

    var videoID;
    event.preventDefault();
    productInput = $("#productInput").val().trim();

    var queryURL = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyDuCdnEyI0A6xs88LrDZriGPP2GSY7MOus&q=" + productInput + "+review&part=snippet";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);

      for (var i = 0; i < 1; i++) {
        videoID = response.items[i].id.videoId;
        console.log("Product Video ID: " + videoID);
        createPlayer(videoID);
      }

    });
  });

});



var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var player;



function createPlayer(videoID) {
  if (typeof player === "undefined") {
    player = new YT.Player('testplayer', {
      // Set Player height and width
      height: '507',
      width: '832',
      // Set the id of the video to be played
      videoId: videoID,
      // Setup event listeners
    });
  } else {
    player.cueVideoById({
      videoId: videoID,
    });
  }

}