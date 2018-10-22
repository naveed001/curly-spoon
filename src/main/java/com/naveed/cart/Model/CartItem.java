package com.naveed.cart.Model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class CartItem implements Serializable {

    @Id
    @GeneratedValue
    int cartItemId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", referencedColumnName = "productid")
    private Product product;

    @Column
    private int quantity;


    private int userCartId;

    private boolean ordered =false;

    public boolean isOrdered() {
        return ordered;
    }

    public void setOrdered(boolean ordered) {
        this.ordered = ordered;
    }

    public CartItem(Product product, Integer userid) {
        this.product=product;
        this.userCartId =userid;
    }

    public int getUserCartId() {
        return userCartId;
    }

    public void setUserCartId(int userCartId) {
        this.userCartId = userCartId;
    }

//    public Cart getCart() {
//        return cart;
//    }
//
//    public void setCart(Cart cart) {
//        this.cart = cart;
//    }

    public int getCartItemId() {
        return cartItemId;
    }
    public void setCartItemId(int cartItemId) {
        this.cartItemId = cartItemId;
    }
//    public Cart getCart() {
//        return cart;
//    }
//    public void setCart(Cart cart) {
//        this.cart = cart;
//    }
    public Product getProduct() {
        return product;
    }
    public void setProduct(Product product) {
        this.product = product;
    }
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public CartItem(Product product, int quantity, int userCartId) {
        this.product = product;
        this.quantity = quantity;
        this.userCartId = userCartId;
    }

    public CartItem() {
    }
}