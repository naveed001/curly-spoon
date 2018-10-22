package com.naveed.cart.DAO;

import com.naveed.cart.Model.CartItem;
import com.naveed.cart.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartDAO extends JpaRepository<CartItem, Integer> {

    List<CartItem> findCartItemsByCartItemId(int i);
    @Query(value = "select * from cart_item where user_cart_id=?1" ,  nativeQuery = true)
    List<CartItem> findCartItemsByUser_cart_id(int i);

    CartItem findByProductAndUserCartIdAndOrdered(Product product, int id, boolean f);
}
