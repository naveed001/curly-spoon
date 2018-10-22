package com.naveed.cart.DAO;

import com.naveed.cart.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDAO extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    User findByUserId(int id);
    User findByPhone(String phone);
}
