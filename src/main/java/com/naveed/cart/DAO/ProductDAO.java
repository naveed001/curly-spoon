package com.naveed.cart.DAO;

import com.naveed.cart.Model.Product;;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductDAO extends JpaRepository<Product, Integer> {
 Product findByProductid(int id);

 List<Product> findAllByPriceBetween(double a, double b);

}