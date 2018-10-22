package com.naveed.cart.Controller;

import com.naveed.cart.Model.CartItem;
import com.naveed.cart.Model.PlacedOrder;
import com.naveed.cart.Model.Product;
import com.naveed.cart.Model.User;
import com.naveed.cart.Service.CartItemService;
import com.naveed.cart.Service.ProductService;
import com.naveed.cart.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
public class CartController {

    @Autowired
    CartItemService cartItemService;

    @Autowired
    ProductService productService;

    @Autowired
    UserService userService;

    @RequestMapping(value = "/cart/showcartbycartid",method = RequestMethod.GET)
    public List showCart(@RequestParam("cartid") Integer cartid){
        return cartItemService.findCartItemsByCartItemId(cartid);
    }

    @RequestMapping(value = "/cart/addtocart",method = RequestMethod.GET)
    public ModelAndView addToCart(@RequestParam("productid") Integer productid, @RequestParam("quantity") Integer quantity){

        int userid = userService.CurrentUser();
        User user= userService.getUserProfiles(userid);
        ((User) user).setAddress(user.getAddress());
        Product product = productService.findById(productid);
        CartItem cartItem = cartItemService.getCartItem(product, userid,false);
        if(cartItem==null) {
            cartItem = new CartItem(product, quantity, userid);
            cartItemService.addToCart(cartItem);
        }
        else {
            cartItem.setQuantity(cartItem.getQuantity()+quantity);
            cartItemService.addToCart(cartItem);
        }
        ModelAndView modelAndView= new ModelAndView();
        modelAndView.setViewName("/mycart.html");
        return  modelAndView;
    }

    @RequestMapping(value = "/cart/getcartforauser",method = RequestMethod.GET)
    public List getcartitemsforusers(){
       int userid = userService.CurrentUser();
       return cartItemService.cartItemsByUserId(userid);
    }


    @RequestMapping(value = "/cart/removefromcart",method = RequestMethod.POST)
    public void removefromcart(@RequestParam("productid") Integer productid){
        int userid = userService.CurrentUser();
        Product product = productService.findById(productid);
        cartItemService.removefromcart(product, userid,false);
    }


    @RequestMapping(value = "/cart/changequantity",method = RequestMethod.POST)
    public CartItem changequantity(@RequestParam("productid") Integer productid,@RequestParam("quantity") Integer quantity){
        int userid = userService.CurrentUser();
        Product product = productService.findById(productid);
        CartItem cartItem = cartItemService.getCartItem(product,userid,false);
        cartItem.setQuantity(quantity);
        cartItemService.addToCart(cartItem);
        return cartItem;
    }

    @RequestMapping(value = "/placeOrder",method = RequestMethod.POST)
    @ResponseBody
    public String placeOrder(){
        int userid = userService.CurrentUser();

        List<CartItem> cartItems = cartItemService.cartItemsByUserId(userid);

        if(cartItems.isEmpty()){
            return "No item in cart to place your order";
        }
        else {
            double sum = 0;
            for (CartItem c : cartItems) {
                sum = sum + (c.getQuantity() * (c.getProduct().getPrice()));
            }
            PlacedOrder placedOrder = new PlacedOrder(cartItems, userService.getUserProfiles(userid), sum);
            cartItemService.saveinorderhistory(placedOrder);
            for(CartItem c:cartItems) {
                c.setOrdered(true);
                cartItemService.addToCart(c);
            }
//            cartItemService.deleteCartAfterOrder(userid);

            return "Order Placed Successfully.";
        }

    }

    @RequestMapping("/orderHistory")
    public List<PlacedOrder> orderHistory(){
        int userid = userService.CurrentUser();
        return cartItemService.orderHistory(userid);
    }

}