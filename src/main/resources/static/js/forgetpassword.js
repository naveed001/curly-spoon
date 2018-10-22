$(document).ready(function(){


    $("#getOTP").click(function(){
        verifyNumber();
    });
    $("#changePass").click(function(){
        changePass();
    });

    });

function changePass() {
    var phone = localStorage.getItem("phone");
 if(document.getElementById("pass1").value===document.getElementById("pass2").value)
 {var pswd = document.getElementById("pass1").value;
    $.ajax({
        type: 'POST',
        url: '/passwordChangeByPhone?phone='+phone+'&password='+pswd,
        success: function () {
            alert("Password updated !");
            localStorage.removeItem("phone");
            window.location="login.html";
        },
        error: function () {
            alert("Wrong phone Number or OTP, Try again");
            window.location="login.html";
        }
    });}
    else{alert("Passwords are not matching");
    window.location="ResetPassword.html";}
}
function verifyNumber() {
    var ph = document.getElementById("phoneNumber").value;
    $.ajax({
        type: 'POST',
        url: '/verifyByPhone',
        data: jQuery.param({
            'phone':  ph.value
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function () {
            alert('Sending OTP');
            localStorage.setItem("phone",ph);
            window.location="GetOTP.html";

        },
        error: function () {
            alert("No account exists with this phone number");

        }
        // success: function (user) {
        //     console.log(ph);
        //
        //     console.log(user.name);
        // //     if(x===1){
        //     alert("Sending OTP to your phone number");
        //     window.location="GetOTP.html";
        // }
        //     else{
        //         alert("No account exists with this user name");
        //         window.location="login.html";
        //     }},
        // error: function () {
        //
 // }
    });
}
// function  fetchUser() {
//     var phone = document.getElementById("phoneNumber").value;
//
// }