$(document).ready(function(){
    fetchUsers();
});
function fetchUsers(){
    $.ajax({
        type: 'POST',
        url: '/fetchUsersList',
        success: function (users) {

            for (var user in users) {
                $('#userstable #users').append("<tr><td>"+(Number(user)+1)+"</td>" +
                    "<td>"+users[user].username+"</td>" +
                    "<td>"+users[user].role+"</td>" +
                    "<td>"+users[user].email+"</td>" +
                    "<td>"+users[user].phone+"</td>" +
                    "<td>"+users[user].address+"</td>"+
                    "<td>"+users[user].password+"</td>" +
                    "</tr>");
            }
        }
    });
}