package com.naveed.cart.Service;

import com.naveed.cart.DAO.OrderDAO;
import com.naveed.cart.Model.CartItem;
import com.naveed.cart.Model.PlacedOrder;
import com.naveed.cart.Model.Product;
import com.naveed.cart.DAO.CartDAO;
import com.naveed.cart.DAO.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartItemService {

    @Autowired
    private CartDAO cartDAO;
    @Autowired
    private OrderDAO orderDAO;
    @Autowired
    UserDAO userDAO;


    public void addToCart(CartItem cartItem) {
        this.cartDAO.save(cartItem);
    }


    public List findCartItemsByCartItemId(int i) {
        return cartDAO.findCartItemsByCartItemId(i);
    }

    public List<CartItem> cartItemsByUserId(int userid){
        List<CartItem> cl = new ArrayList<>();
        for(CartItem c: cartDAO.findCartItemsByUser_cart_id(userid)) {
            if(!(c.isOrdered())) {
                cl.add(c);
            }
        }
        return cl;
    }

    public void removefromcart(Product product, Integer user_cart_id , boolean f){
        cartDAO.delete(cartDAO.findByProductAndUserCartIdAndOrdered(product, user_cart_id,f));
    }

    public CartItem getCartItem(Product product,Integer user_cart_id,boolean f) {
       return cartDAO.findByProductAndUserCartIdAndOrdered(product, user_cart_id,f);
    }

    public void saveinorderhistory(PlacedOrder placedOrder){
        orderDAO.save(placedOrder);
    }

    public List<PlacedOrder> orderHistory(int userid){

        return orderDAO.findByUser(userDAO.findByUserId(userid));
    }

}

