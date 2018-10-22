
$(document).ready(function(){

        fetchProductDetails();
});
x=localStorage.getItem("pid");

function fetchProductDetails() {
    $.ajax({
        type: 'GET',
        url: '/product/byid?productid='+x,
        success: function (p) {

            console.log(3);
            $('#productname1').append('<input type="text" id="productname" value='+p.productname+' disabled >');
            $('#category1').append('<input type="text" id="category" value='+p.category+' disabled >');
            $('#subcategory1').append('<input type="text" id="subcategory" value='+p.subcategory+' >');
            $('#price1').append('<input type="number" id="price" value='+p.price+' >');
            $('#details1').append('<input type="text" id="details" value='+p.details+' >');
            $('#update').click(function(){
                updateProductDetails(x);
                console.log(3);
            })

        }
    });
}


function updateProductDetails(x) {

    var price = document.getElementById("price").value;
    var details = document.getElementById("details").value;
    var subcategory = document.getElementById("subcategory").value;
    $.ajax({
        type: 'POST',
        url: '/product/update?productid='+x+'&price='+price+'&details='+details+'&subcategory='+subcategory,
        success: function () {
            alert("Details updated !");
            window.location="index.html";
        }
    });


}
