$( document ).ready(function() {
    fetchitems();
    fetchDetails();
    $("#placeOrder").click(function(){
        placeOrder();

    });
    $("#updateDetails").click(function(){
        updateDetails();

    });
});
var sum=0;
function fetchitems(){
    $.ajax({
        type: 'GET',
        url: '/cart/getcartforauser',
        success: function (carts) {
            sum = 0;
            for (var cart in carts) {

                $('#orderstable #orders').append("<tr><td>"+(Number(cart)+1)+"</td>" +
                    "<td>"+carts[cart].product.productname+"</td>" +
                    "<td>"+carts[cart].product.price+"</td>" +
                    "<td>"+carts[cart].quantity+"</td>" +
                    "<td>"+(carts[cart].product.price)*carts[cart].quantity+"</td>" +
                    "</tr>");

                sum = sum + (carts[cart].product.price)*carts[cart].quantity;
            }
            $('#sumtotal').append('<b id="sum">Amount :' + sum +'</b>');
        }
    });
}
function placeOrder(){
    $.ajax({
        type: 'POST',
        url: '/placeOrder',
        success: function () {
            alert("order placd successfully");
            window.location = "mycart.html";
        }
    });
}
function fetchDetails() {

    $.ajax({
        type: 'POST',
        url: '/getprofile',
        success: function ( user) {
            $('#phone2').append('<input type="text" id="phone" value='+user.phone+' >');
            $('#email2').append('<input type="text" id="email" value='+user.email+' >');
            $('#address2').append('<input type="text" id="address" value='+user.address+' >');
            $('#update').click(function(){
                updateUserDetails();
                console.log(3);
            })

        }
    });
}


function updateDetails() {
    var adrs = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    $.ajax({
        type: 'POST',
        url: '/editUserDetails?phone='+phone+'&address='+adrs+'&email='+email,
        success: function () {
            alert("Details updated!You can place Order now");
        }
    });


}