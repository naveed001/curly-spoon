package com.naveed.cart.Model;

import javax.persistence.*;

@Entity
@Table(name="Product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productid;
    @Column(unique = true)
    private String productname;
    private double price;
    private String category;
    private String details;
    private String subcategory;

    public Product(String productName, double price, String category, String details, String subcategory) {
        this.productname = productName;
        this.price = price;
        this.category = category;
        this.details = details;
        this.subcategory = subcategory;
    }

    public int getProductid() {
        return productid;
    }

    public void setProductid(int productid) {
        this.productid = productid;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(String subcategory) {
        this.subcategory = subcategory;
    }

    public Product(String productname, Double price, Integer category) {
    }

    public Product(Integer productid, String productname, Double price, String category, String details, String subcategory) {
        this.productid=productid;
        this.productname=productname;
        this.price=price;
        this.category=category;
        this.details=details;
        this.subcategory=subcategory;
    }

    public Product() {
    }
}
