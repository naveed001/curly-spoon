var sum = 0;

$( document ).ready(function() {
    fetchcartitems();
    $("#checkOut").click(function(){
        if( sum === 0 ){
            alert('Cart empty!');
        }
        else {
            window.location="checkOut.html";
    }
});

});


function fetchcartitems(){
    $.ajax({
        type: 'GET',
        url: '/cart/getcartforauser',
        success: function (carts) {
             sum = 0;
            for (var cart in carts) {

                $('#table tbody').append("<tr><td>"+(Number(cart)+1)+"</td>" +
                    "<td>"+carts[cart].product.productname+"</td>" +
                    "<td>"+carts[cart].product.price+"</td>" +
                    "<td>"+carts[cart].quantity+"</td>" +
                    "<td>"+(carts[cart].product.price)*carts[cart].quantity+"</td>" +
                    "<td><button onclick='REMOVEITEM("+carts[cart].product.productid+")'>Remove</button></td>" +
                    "<td><button  onclick=' reduceQuantity("+carts[cart].product.productid+")'>-</button><input style='width:20%' id="+carts[cart].product.productid+" type='number' value="+carts[cart].quantity+" disabled><button  onclick=' increaseQuantity("+carts[cart].product.productid+")'>+</button></td>" +
                    "</tr>");

                sum = sum + (carts[cart].product.price)*carts[cart].quantity;
            }
            $('#sumtotal').append('<b id="sum">Amount :' + sum +'</b>');
        }
    });
}


function REMOVEITEM(x) {
    $.ajax({
        type: 'POST',
        url: '/cart/removefromcart?productid='+x,
       success: function () {
          window.location="mycart.html";
}
    });
}


function increaseQuantity(x) {
    var y = document.getElementById(x).value;
    y = Number(y)+1;
    $.ajax({
        type: 'POST',
        url: '/cart/changequantity?productid='+x+'&quantity='+y,
        success: function () {
            window.location="mycart.html";
        }
    });
}

function reduceQuantity(x) {
    var y = document.getElementById(x).value;
    y = Number(y)-1;
    if(y<=0){REMOVEITEM(x);}
    else{
    $.ajax({
        type: 'POST',
        url: '/cart/changequantity?productid='+x+'&quantity='+y,
        success: function () {
            window.location="mycart.html";
        }
    });}
}