$(document).ready(function(){
    fetchProducts();
});
function fetchProducts(){
    $.ajax({
        type: 'GET',
        url: '/orderHistory',
        success: function (orders) {

            for (var order in orders) {
                $('#orderstable #orders').append("<tr><td class='text-center' style='margin-top: 100px' ><b><u>"+(Number(order)+1)+"<td class='text-center'><b><u>"+orders[order].amount+"</td><td class='text-center'><b><u>"+orders[order].user.address+"</u></b></td>" +
                    "<td><table class=\"table table-bordered\" id=\"producttable\" border=\"0\">\n" +
                    "    <thead>\n" +
                    "    <tr >\n" +
                    "        <th class='text-center' width=\"150\">Product Name</th>\n" +
                    "        <th class='text-center' width=\"150\">Product Price</th>\n" +
                    "        <th class='text-center' width=\"150\">Product Quantity</th>\n" +
                    "        <th class='text-center' width=\"150\">Product Total </th>\n" +
                    "    </tr>\n" +
                    "    </thead>\n" +
                    "    <tbody id=\"products\">\n" +
                    "    </tbody>\n" +
                    "</table>\n</td>"+
                    "</tr>");
                for (var cart in orders[order].cartItems) {
                    $('#producttable #products').append('<tr><td class=\'text-center\'>'+orders[order].cartItems[cart].product.productname+'</td><td class=\'text-center\'>'+orders[order].cartItems[cart].product.price+'</td><td class=\'text-center\'>'+orders[order].cartItems[cart].quantity+'</td><td class=\'text-center\'>'+(orders[order].cartItems[cart].quantity * orders[order].cartItems[cart].product.price)+'</td></tr>');
                }

            }
        }
    });
}