package com.naveed.cart.DAO;

import com.naveed.cart.Model.PlacedOrder;
import com.naveed.cart.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDAO extends JpaRepository <PlacedOrder,Integer > {

    List<PlacedOrder> findByUser(User user);
}
