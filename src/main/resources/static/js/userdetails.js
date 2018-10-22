
$(document).ready(function(){
    fetchuserDetails();
});


function fetchuserDetails() {

    $.ajax({
        type: 'POST',
        url: '/getprofile',
        success: function ( user) {

console.log(3);
            $('#username1').append('<input type="text" id="username" value='+user.username+' >');
            $('#email1').append('<input type="email" id="email" value='+user.email+' >');
            $('#phone1').append('<input type="text" id="phone" value='+user.phone+' >');
            $('#address1').append('<input type="text" id="address" value='+user.address+' >');
            $('#update').click(function(){
                updateUserDetails();
                console.log(3);
            })

        }
    });
}


function updateUserDetails() {
    var adrs = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    $.ajax({
        type: 'POST',
        url: '/editUserDetails?phone='+phone+'&address='+adrs+'&email='+email,
        success: function () {
            alert("Details updated !");
            window.location="Details.html";
        }
    });


}
//     $('#updateprofile').append( '<div style="margin: auto"><div style="color: #ff1629; width: 400px">Username : <b><input type="text" id="username" value='+user.username+' ></b></div>' +
//         '<div style="color: #2dff2e; width: 400px">Address : <input type="text" id="address" value='+user.address+' ></div>' +
//         '<div style="color: #1b2fff; width: 400px">Email Id : <input type="text" id="email" value='+user.email+' ></div>' +
//         '<div style="color: #ff4eda; width: 400px">Email Id : <input type="text" id="phone" value='+user.phone+' ></div>' +
//         '<div style="color: #ff279a; width: 400px"><input type="button" value="Update" onclick="updateUserDetails()"></div></div>');
//