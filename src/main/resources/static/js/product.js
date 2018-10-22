$( document ).ready(function() {
    checkUsers();
    fetchProducts();

    $("#addProduct").click(function () {
        window.location="AddProduct.html";
    });


});


// function getCategoryList() {
//     $.ajax({
//         type: 'POST',
//         url: '/categories',
//         success: function (cats) {
//             console.log(cats);
//             for(var cat in cats){
//             $('#categoryList').append("<button class='btn btn-secondary' onclick='fetchProductsbycategory(\""+cats[cat]+"\")'>"+cats[cat]+"</button><br>")
//             }
//         }
//         });
// }
// function fetchProductsbycategory(category){
//     $.ajax({
//         type: 'GET',
//         url: '/product/bycategory?category='+category,
//         success: function (orders) {
//
//             if(orders==null||orders==""){
//                 alert("No product available in this range ! .");
//             }
//             else {
//
//                 if(localStorage.getItem("Role")=== 'USER' || localStorage.getItem("Role")=== "none" ) {
//                     for (var order in orders) {
//                         $('#orders').append('<div id="product' + orders[order].productid + '" class="col-sm-4 ' + orders[order].category + '" xmlns="http://www.w3.org/1999/html">' +
//                             '<p >Product Id: <b id="productid">' + orders[order].productid + '</b></p>' +
//                             '<p>Name: ' + orders[order].productname + '</p>' +
//                             '<p>Subcategory: ' + orders[order].subcategory + '</p>' +
//                             '<p>Description: ' + orders[order].details + '</p>' +
//                             '<p>Price: ' + orders[order].price + '</p>' +
//                             '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Add to Cart</button></p><br><br>' +
//                             '</div>');
//                     }
//                 }
//                 if(localStorage.getItem("Role")=== 'ADMIN'){
//                     for (var order in orders) {
//                         $('#orders').append('<div id="product' + orders[order].productid + '" class="col-sm-4 ' + orders[order].category + '" xmlns="http://www.w3.org/1999/html">' +
//                             '<p >Product Id: <b id="productid">' + orders[order].productid + '</b></p>' +
//                             '<p>Name: ' + orders[order].productname + '</p>' +
//                             '<p>Subcategory: ' + orders[order].subcategory + '</p>' +
//                             '<p>Description: ' + orders[order].details + '</p>' +
//                             '<p>Price: ' + orders[order].price + '</p>' +
//                             '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Add to Cart</button></p>' +
//                             '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Edit Product</button></p>' +
//                             '<p><button onclick="addtocart(' + orders[order].productid + ',1)">Delete Product</button></p><br><br>' +
//                             '</div>');
//                     }
//                 }
//             }
//         }
//     });
// }



function fetchProducts(){

$.ajax({
    type: 'GET',
    url: '/product/productlist',
    success: function (orders) {
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
            '<p><button id="editProduct"onclick="edit(' + orders[order].productid + ')">Edit Product</button></p>' +
            '<p><button onclick="deleteProduct(' + orders[order].productid + ')">Delete Product</button></p><br><br>' +
            '</div>');
    }
}
    }
});
}
function edit(x) {
    localStorage.setItem("pid",x);
    window.location="EditProduct.html";
}



function deleteProduct(x) {

    $.ajax({
        type: 'POST',
        url: '/product/remove?productid='+x ,
        success: function () {
            alert("Deleted Successsfully");
            window.location="index.html";
            window.location="index.html";

        },
        error: function () {
            alert("Problem in deleting");
            window.location="index.html";
        }
    });
}


function addtocart(x,y) {

    $.ajax({
        type: 'GET',
        url: '/cart/addtocart?productid='+x+'&quantity=1',
        success: function () {
            alert("Added to Cart");
        },
        error: function () {
            alert("Please signin to Proceed !");
            window.location="login.html";
        }
    });
}



function checkUsers() {

    $.ajax({
        type: 'POST',
        url: '/checkUser',
        success: function (role) {
            localStorage.removeItem("pid");
            localStorage.setItem("Role",role);
            if(!role)
            {$('#addProduct').hide();
                $('#logout').hide();
                $('#userdetails').hide();
                $('#usersList').hide();
                $('#mycart').hide();
                $('#myorders').hide();
                localStorage.setItem("Role",'none');   }

            else if(role === 'USER'){
                $('#addProduct').hide();
                $('#signup').hide();
                $('#login').hide();
                $('#usersList').hide();
            }
            else if(role === 'ADMIN') {$('#signup').hide();
                $('#login').hide();
                }




        },
        error: function () {


        }
    });
}

