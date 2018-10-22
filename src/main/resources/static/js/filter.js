
$( document ).ready(function() {
    getCategoryList();
});


function getCategoryList() {
    $.ajax({
        type: 'POST',
        url: '/categories',
        success: function (cats) {
            console.log(cats);
            for(var cat in cats){
                $('#categoryList').append("<button class='btn btn-primary' onclick='fetchProductsbycategory(\""+cats[cat]+"\")'>"+cats[cat]+"</button><br>")
            }
        }
    });
}
$( document ).ready(function() {
    $("#priceSearch").click(function(){

        var x = document.getElementById("minprice").value;
        var y = document.getElementById("maxprice").value;
        if(x==="" ){x = 0;}
        if(y===""){y=10000000;}
console.log(y);
        fetchProductsbyPrice(x,y);
    });
});
$( document ).ready(function() {
    $("#search").click(function(){
        $('#orders').empty();
        var name = document.getElementById("name").value;
        fetchProductsbynamelike(name);
    });
});

$( document ).ready(function() {
    $("#sortByPrice").click(function(){
        $('#orders').empty();
        sortByPrice();
    });
});
$( document ).ready(function() {
    $("#sortByProductName").click(function(){
        $('#orders').empty();
        sortByProductName();
    });
});
$( document ).ready(function() {
    $("#sortByCategoryName").click(function(){
        $('#orders').empty();
        sortByCategoryName();
    });
});
$( document ).ready(function() {
    $("#sortBySubcategoryName").click(function(){
        $('#orders').empty();
        sortBySubcategoryName();
    });
});
function fetchProductsbyPrice(x,y) {

    $.ajax({
        type: 'GET',
        url: '/product/byPriceRange?min='+x+'&max='+y,
        success: function (orders) {

            if(orders==null||orders==""){
                alert("No product available in this range");
            }
            else {

                $('#orders').empty();

                if(localStorage.getItem("Role")=== 'USER' || localStorage.getItem("Role")=== 'none' ) {
                    for (var order in orders) {
                        $('#orders').append('<div id="product' + orders[order].productid + '" class="col-sm-4 ' + orders[order].category + '" xmlns="http://www.w3.org/1999/html">' +
                            '<p>Name: ' + orders[order].productname + '</p>' +
                            '<p>Category: ' + orders[order].category + '</p>' +
                            '<p>Subcategory: ' + orders[order].subcategory + '</p>' +
                            '<p>Description: ' + orders[order].details + '</p>' +
                            '<p>Price: ' + orders[order].price + '</p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Add to Cart</button></p><br><br>' +
                            '</div>');
                    }
                }
                if(localStorage.getItem("Role")=== 'ADMIN'){
                    for (var order in orders) {
                        $('#orders').append('<div id="product' + orders[order].productid + '" class="col-sm-4 ' + orders[order].category + '" xmlns="http://www.w3.org/1999/html">' +
                            '<p>Name: ' + orders[order].productname + '</p>' +
                            '<p>Category: ' + orders[order].category + '</p>' +
                            '<p>Subcategory: ' + orders[order].subcategory + '</p>' +
                            '<p>Description: ' + orders[order].details + '</p>' +
                            '<p>Price: ' + orders[order].price + '</p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Add to Cart</button></p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Edit Product</button></p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Delete Product</button></p><br><br>' +
                            '</div>');
                    }
                }
            }
        },
        error: function (err) {
            console.log(err);
        }
    });

}


function fetchProductsbycategory(category){
    $.ajax({
        type: 'GET',
        url: '/product/bycategory?category='+category,
        success: function (orders) {

            if(orders==null||orders==""){
                alert("No product available in this range ! .");
            }
            else {

                $('#orders').empty();
                if(localStorage.getItem("Role")=== 'USER' || localStorage.getItem("Role")=== 'none' ) {
                    for (var order in orders) {
                        $('#orders').append('<div id="product' + orders[order].productid + '" class="col-sm-4 ' + orders[order].category + '" xmlns="http://www.w3.org/1999/html">' +
                            '<p>Name: ' + orders[order].productname + '</p>' +
                            '<p>Category: ' + orders[order].category + '</p>' +
                            '<p>Subcategory: ' + orders[order].subcategory + '</p>' +
                            '<p>Description: ' + orders[order].details + '</p>' +
                            '<p>Price: ' + orders[order].price + '</p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Add to Cart</button></p><br><br>' +
                            '</div>');
                    }
                }
                if(localStorage.getItem("Role")=== 'ADMIN'){
                    for (var order in orders) {
                        $('#orders').append('<div id="product' + orders[order].productid + '" class="col-sm-4 ' + orders[order].category + '" xmlns="http://www.w3.org/1999/html">' +
                            '<p>Name: ' + orders[order].productname + '</p>' +
                            '<p>Category: ' + orders[order].category + '</p>' +
                            '<p>Subcategory: ' + orders[order].subcategory + '</p>' +
                            '<p>Description: ' + orders[order].details + '</p>' +
                            '<p>Price: ' + orders[order].price + '</p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Add to Cart</button></p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Edit Product</button></p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Delete Product</button></p><br><br>' +
                            '</div>');
                    }
                }
            }
        }
    });
}



function fetchProductsbynamelike(name){
    $.ajax({
        type: 'GET',
        url: '/product/bynamelike?namelike='+name,
        success: function (orders) {

            if(orders==null||orders==""){
                alert("No product with specified name");
            }
            else {

                if(localStorage.getItem("Role")=== 'USER' || localStorage.getItem("Role")=== 'none' ) {
                    for (var order in orders) {
                        $('#orders').append('<div id="product' + orders[order].productid + '" class="col-sm-4 ' + orders[order].category + '" xmlns="http://www.w3.org/1999/html">' +
                            '<p>Name: ' + orders[order].productname + '</p>' +
                            '<p>Category: ' + orders[order].category + '</p>' +
                            '<p>Subcategory: ' + orders[order].subcategory + '</p>' +
                            '<p>Description: ' + orders[order].details + '</p>' +
                            '<p>Price: ' + orders[order].price + '</p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Add to Cart</button></p><br><br>' +
                            '</div>');
                    }
                }
                if(localStorage.getItem("Role")=== 'ADMIN'){
                    for (var order in orders) {
                        $('#orders').append('<div id="product' + orders[order].productid + '" class="col-sm-4 ' + orders[order].category + '" xmlns="http://www.w3.org/1999/html">' +
                            '<p>Name: ' + orders[order].productname + '</p>' +
                            '<p>Category: ' + orders[order].category + '</p>' +
                            '<p>Subcategory: ' + orders[order].subcategory + '</p>' +
                            '<p>Description: ' + orders[order].details + '</p>' +
                            '<p>Price: ' + orders[order].price + '</p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Add to Cart</button></p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Edit Product</button></p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Delete Product</button></p><br><br>' +
                            '</div>');
                    }
                }
            }


        }

    });
}
function sortByPrice(){
    $.ajax({
        type: 'GET',
        url: '/product/sortByPrice',
        success: function (orders) {

            if((orders==null)||(orders=="")){
                alert("No product with specified name");
            }
            else {

                if(localStorage.getItem("Role")=== 'USER' || localStorage.getItem("Role")=== "none" ) {
                    for (var order in orders) {
                        $('#orders').append('<div id="product' + orders[order].productid + '" class="col-sm-4 ' + orders[order].category + '" xmlns="http://www.w3.org/1999/html">' +
                            '<p>Name: ' + orders[order].productname + '</p>' +
                            '<p>Category: ' + orders[order].category + '</p>' +
                            '<p>Subcategory: ' + orders[order].subcategory + '</p>' +
                            '<p>Description: ' + orders[order].details + '</p>' +
                            '<p>Price: ' + orders[order].price + '</p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Add to Cart</button></p><br><br>' +
                            '</div>');
                    }
                }
                if(localStorage.getItem("Role")=== 'ADMIN'){
                    for (var order in orders) {
                        $('#orders').append('<div id="product' + orders[order].productid + '" class="col-sm-4 ' + orders[order].category + '" xmlns="http://www.w3.org/1999/html">' +
                            '<p>Name: ' + orders[order].productname + '</p>' +
                            '<p>Category: ' + orders[order].category + '</p>' +
                            '<p>Subcategory: ' + orders[order].subcategory + '</p>' +
                            '<p>Description: ' + orders[order].details + '</p>' +
                            '<p>Price: ' + orders[order].price + '</p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Add to Cart</button></p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Edit Product</button></p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Delete Product</button></p><br><br>' +
                            '</div>');
                    }
                }
            }


        }

    });
}
function sortByProductName(){
    $.ajax({
        type: 'GET',
        url: '/product/sortByName',
        success: function (orders) {

            if((orders==null)||(orders=="")){
                alert("No product with specified name");
            }
            else {

                if(localStorage.getItem("Role")=== 'USER' || localStorage.getItem("Role")=== "none" ) {
                    for (var order in orders) {
                        $('#orders').append('<div id="product' + orders[order].productid + '" class="col-sm-4 ' + orders[order].category + '" xmlns="http://www.w3.org/1999/html">' +
                            '<p>Name: ' + orders[order].productname + '</p>' +
                            '<p>Category: ' + orders[order].category + '</p>' +
                            '<p>Subcategory: ' + orders[order].subcategory + '</p>' +
                            '<p>Description: ' + orders[order].details + '</p>' +
                            '<p>Price: ' + orders[order].price + '</p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Add to Cart</button></p><br><br>' +
                            '</div>');
                    }
                }
                if(localStorage.getItem("Role")=== 'ADMIN'){
                    for (var order in orders) {
                        $('#orders').append('<div id="product' + orders[order].productid + '" class="col-sm-4 ' + orders[order].category + '" xmlns="http://www.w3.org/1999/html">' +
                            '<p>Name: ' + orders[order].productname + '</p>' +
                            '<p>Category: ' + orders[order].category + '</p>' +
                            '<p>Subcategory: ' + orders[order].subcategory + '</p>' +
                            '<p>Description: ' + orders[order].details + '</p>' +
                            '<p>Price: ' + orders[order].price + '</p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Add to Cart</button></p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Edit Product</button></p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Delete Product</button></p><br><br>' +
                            '</div>');
                    }
                }
            }


        }

    });
}
function sortByCategoryName(){
    $.ajax({
        type: 'GET',
        url: '/product/sortByCategory',
        success: function (orders) {

            if((orders==null)||(orders=="")){
                alert("No product with specified name");
            }
            else {

                if(localStorage.getItem("Role")=== 'USER' || localStorage.getItem("Role")=== "none" ) {
                    for (var order in orders) {
                        $('#orders').append('<div id="product' + orders[order].productid + '" class="col-sm-4 ' + orders[order].category + '" xmlns="http://www.w3.org/1999/html">' +
                            '<p>Name: ' + orders[order].productname + '</p>' +
                            '<p>Category: ' + orders[order].category + '</p>' +
                            '<p>Subcategory: ' + orders[order].subcategory + '</p>' +
                            '<p>Description: ' + orders[order].details + '</p>' +
                            '<p>Price: ' + orders[order].price + '</p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Add to Cart</button></p><br><br>' +
                            '</div>');
                    }
                }
                if(localStorage.getItem("Role")=== 'ADMIN'){
                    for (var order in orders) {
                        $('#orders').append('<div id="product' + orders[order].productid + '" class="col-sm-4 ' + orders[order].category + '" xmlns="http://www.w3.org/1999/html">' +
                            '<p>Name: ' + orders[order].productname + '</p>' +
                            '<p>Category: ' + orders[order].category + '</p>' +
                            '<p>Subcategory: ' + orders[order].subcategory + '</p>' +
                            '<p>Description: ' + orders[order].details + '</p>' +
                            '<p>Price: ' + orders[order].price + '</p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Add to Cart</button></p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Edit Product</button></p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Delete Product</button></p><br><br>' +
                            '</div>');
                    }
                }
            }


        }

    });
}
function sortBySubcategoryName(){
    $.ajax({
        type: 'GET',
        url: '/product/sortBySubcategory',
        success: function (orders) {

            if((orders==null)||(orders=="")){
                alert("No product with specified name");
            }
            else {

                if(localStorage.getItem("Role")=== 'USER' || localStorage.getItem("Role")=== "none" ) {
                    for (var order in orders) {
                        $('#orders').append('<div id="product' + orders[order].productid + '" class="col-sm-4 ' + orders[order].category + '" xmlns="http://www.w3.org/1999/html">' +
                            '<p>Name: ' + orders[order].productname + '</p>' +
                            '<p>Category: ' + orders[order].category + '</p>' +
                            '<p>Subcategory: ' + orders[order].subcategory + '</p>' +
                            '<p>Description: ' + orders[order].details + '</p>' +
                            '<p>Price: ' + orders[order].price + '</p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Add to Cart</button></p><br><br>' +
                            '</div>');
                    }
                }
                if(localStorage.getItem("Role")=== 'ADMIN'){
                    for (var order in orders) {
                        $('#orders').append('<div id="product' + orders[order].productid + '" class="col-sm-4 ' + orders[order].category + '" xmlns="http://www.w3.org/1999/html">' +
                            '<p>Name: ' + orders[order].productname + '</p>' +
                            '<p>Category: ' + orders[order].category + '</p>' +
                            '<p>Subcategory: ' + orders[order].subcategory + '</p>' +
                            '<p>Description: ' + orders[order].details + '</p>' +
                            '<p>Price: ' + orders[order].price + '</p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Add to Cart</button></p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Edit Product</button></p>' +
                            '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Delete Product</button></p><br><br>' +
                            '</div>');
                    }
                }
            }


        }

    });
}
