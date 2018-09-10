$(document).ready(function () {
  var videoID;
  var searchItem;

  function youtubeSearch() {
    event.preventDefault();

    var queryUrl = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyB3VAXfp1ybffipvJ2xvW496fJMrBEt7Ik&q=" + searchItem + "+review&part=snippet";

    console.log(searchItem)
    $.ajax({
      url: queryUrl,
      method: 'GET'
    }).then(function (response) {
      videoID = response.items[0].id.videoId;
      createPlayer(videoID);
    });
  }

  $('.navSearchButton').on('click', function () {
    searchItem = $('.navSearch').val().trim();
    youtubeSearch();
  });


  $('.smCardButton').on('click', function () {
    searchItem = $('.smCardSearch').val().trim();
    youtubeSearch();
  });

  $('.lgCardButton').on('click', function () {
    searchItem = $('.lgCardSearch').val().trim();
    youtubeSearch();
  });
});











var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';

var firstScriptTag = document.getElementsByTagName('script')[0];

firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function createPlayer(videoID) {
  if (typeof player === 'undefined') {
    player = new YT.Player('testplayer', {
      videoId: videoID
    });
  } else {
    player.cueVideoById({
      videoId: videoID
    });
  };
};
