package com.naveed.cart.Model;

import javax.persistence.*;
import java.util.List;

@Entity
public class PlacedOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int placedorderid;
    @OneToMany
    private List<CartItem> cartItems;

    @ManyToOne
    private User user;

    private double amount;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public int getPlacedorderid() {
        return placedorderid;
    }

    public void setPlacedorderid(int placedorderid) {
        this.placedorderid = placedorderid;
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItem> cartItems) {
        this.cartItems = cartItems;
    }

    public PlacedOrder() {
    }

    public PlacedOrder(List<CartItem> cartItems, User user, double amount) {
        this.cartItems = cartItems;
        this.user = user;
        this.amount = amount;
    }
}
