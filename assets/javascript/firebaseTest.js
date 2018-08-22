//When page is done loading...
$(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAL7BbZrnNciQGyHQmQYiJn215RSkwt5hY",
    authDomain: "rayray-36a52.firebaseapp.com",
    databaseURL: "https://rayray-36a52.firebaseio.com",
    projectId: "rayray-36a52",
    storageBucket: "rayray-36a52.appspot.com",
    messagingSenderId: "456344785187"
  };
  firebase.initializeApp(config);

  //Variable to hold our testimonials
  var testimonials = $("#testimonials")

  //Variable to access database
  var database = firebase.database();

  //Initial Values
  var userRatings = "";
  var userTestimonials = "";

  //Every time our submit button is clicked...
  $("#submitButton").on("click", function (event) {
    event.preventDefault();
    
    //If table has more than 5 rows, remove one
    if ($("tr").length > 5) {
      $("tr:last").remove();
    }
    //Capture User Rating and Testimonial and put them inside td tags
    userRatings = $("#userRating").val().trim();
    userTestimonials = $("#userComment").val().trim();

    //Pushes user info into firebase
    database.ref().push({
      userRatings: userRatings,
      userTestimonials: userTestimonials
    });

    //Empties form after click
    $("#form")[0].reset();
  });

  //Creates a snapshot and pulls the last 6 items
    database.ref().limitToLast(6).on("child_added", function (snapshot) {
    var sv = snapshot.val();

    //If table has more than 5 rows, remove one
    if ($("tr").length > 5) {
      $("tr:last").remove();
    }

    //Add testimonials into website
    testimonials.prepend("<tr class='uk-card-hover'><td> " + sv.userRatings + " out of 5" +
      " </td><td> " + sv.userTestimonials +
      " </td><tr> ")

  })


});