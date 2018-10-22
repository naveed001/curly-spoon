$(document).ready(function(){
    $("#add").click(function(){
        var name = document.getElementById("productname");
        var cat = document.getElementById("category");
        var subcat = document.getElementById("subcategory");
        var detail = document.getElementById("details");
        var price = document.getElementById("price");
        saveproduct(name,cat,subcat,detail,price);
    });
});

function saveproduct(name,cat,subcat,detail,price) {
    $.ajax({
        type: 'POST',
        url: '/product/add',
        data: jQuery.param({
            'productname': name.value,
            'category': cat.value,
            'subcategory': subcat.value,
            'price':    price.value,
            'details':  detail.value
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',

        success: function () {
            alert('Product added Successfully');
            window.location="index.html";
        },
        error: function () {
            alert( "Error adding product");
        }
    });
}