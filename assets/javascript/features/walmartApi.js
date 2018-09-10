$(document).ready(function() {

    var mainNav = $('.mainNav');
    var smCard = $('.smCard');
    var lgCard = $('.lgCard');
    var mainContent = $('#mainContent');
    var product;
    var productInfo = $('#walmartInfo');

    startPage();

    $('.oneReviewHome').on('click', function(){
        startPage();
    });
    
    $('.navSearchButton').on('click', function(event) {
        product = $('.navSearch').val().trim();
        updateLinks();
        showResults(event);
    });


    $('.smCardButton').on('click', function(event) {
        product = $('.smCardSearch').val().trim();
        updateLinks();
        showResults(event);
    });

    $('.lgCardButton').on('click', function(event) {
        product = $('.lgCardSearch').val().trim();
        updateLinks();
        showResults(event);
    });

    function startPage() {
        mainNav.hide();
        mainContent.hide();
        smCard.show();
        lgCard.show();
    }

    function updateLinks() {
        $('.youtubeLink').attr('href', 'https://www.youtube.com/results?search_query=' + product + '+review&page=&utm_source=opensearch');
        $('.walmartLink').attr('href', 'https://www.walmart.com/search/?query=' + product + '&cat_id=0');
    }

    function showResults() {
        mainNav.show();
        smCard.hide();
        lgCard.hide();
        mainContent.show();
        walmartSearch(event);
    }


    function walmartSearch() {
        event.preventDefault();

        var queryUrl = 'https://api.walmartlabs.com/v1/search?apiKey=9rprpndxuzwhxra99y2er8qc&query=' + product;
        $.ajax({
            dataType: 'jsonp',
            url: queryUrl,
            method: 'GET'
        }).then(function(response) {
            var responseArray = response.items;
            var results = responseArray[0]
            productInfo.empty();

            var productDiv = $('<div>');
            var name = results.name;
            var msrp = results.msrp;
            var salePrice = results.salePrice;
            var shortDescription = results.shortDescription;
            var customerRating = results.customerRating;
            var stock = results.stock;
            var buyNow = results.addToCartUrl;

            var a = $('<a href="#" target="_blank">');
            a.attr('href', buyNow);
            a.text('Buy Now!');

            //Append all of our information to our div (productDiv) on screen
            productDiv.append("<br>" + name);
            productDiv.append("<br>" + "<br>" + "MSRP : $" + msrp);
            productDiv.append("<br>" + "Sale Price: $" + salePrice);
            productDiv.append("<br>" + "<br>" + shortDescription);
            productDiv.append("<br>" + "<br>" + "Rating: " + customerRating + " Out of 5");
            productDiv.append("<br>" + "<br>" + "Stock: " + stock);
            productDiv.append("<br>" + "<br>").append(a);

            productInfo.append(productDiv);
        })

    }
})
