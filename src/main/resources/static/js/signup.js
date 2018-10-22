$(document).ready(function(){
    $("button").click(function(){
        var usrnm = document.getElementById("username");
        var passwd = document.getElementById("password");
        var adrs = document.getElementById("address");
        var phone = document.getElementById("phone");
        var email = document.getElementById("email");
       saveuser(usrnm,passwd,adrs,phone,email);
    });
});


function saveuser(usrnm,passwd,adrs,phone,email) {
    $.ajax({
        type: 'GET',
        url: '/saveuserdetails',
        data: jQuery.param({
            'username': usrnm.value,
            'password': passwd.value,
            'email':    email.value,
            'phone':    phone.value,
            'address':  adrs.value
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',

        success: function () {
            alert('Sign up successful');
            window.location="index.html";
        },
        error: function () {
            alert( "Try different User-Name!");
        }
    });
}