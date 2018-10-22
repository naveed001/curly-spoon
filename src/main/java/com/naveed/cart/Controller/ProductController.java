package com.naveed.cart.Controller;

import com.naveed.cart.Model.Product;
import com.naveed.cart.Model.User;
import com.naveed.cart.Service.CartItemService;
import com.naveed.cart.Service.ProductService;
import com.naveed.cart.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Set;

@RestController
public class ProductController {

    @Autowired
    ProductService productService;
    @Autowired
    CartItemService cartItemService;
    @Autowired
    UserService userService;
    User user;


    @RequestMapping(value = "/product/productlist", method = RequestMethod.GET)
    public List<Product> displayProductList(HttpServletRequest request) {//        String username = (String) ((SecurityContext)request.getSession().getAttribute("SPRING_SECURITY_CONTEXT")).getAuthentication().getPrincipal();
//        System.out.println(username);
        return productService.getProductList();
    }

    @RequestMapping(value = "/product/byid", method = RequestMethod.GET)
    public Product displayProductListById(@RequestParam("productid") Integer productid) {
        return productService.findById(productid);
    }


    @RequestMapping(value = "/product/byname", method = RequestMethod.GET)
    public Product displayProductListByName(@RequestParam("productname") String productname) {
        return productService.findByName(productname);
    }

    @RequestMapping(value = "/product/bynamelike", method = RequestMethod.GET)
    public List<Product> findProductsByNameLike(@RequestParam("namelike") String namelike )
    {
        List<Product> list = productService.search(namelike);
        return list;
    }

    @RequestMapping(value = "/product/bycategory", method = RequestMethod.GET)
    public List<Product> displayProductsByCategory(@RequestParam("category") String category)
    {
        List<Product> list = productService.findProductsByCategory(category);
        return list;
    }

    @RequestMapping(value = "/product/byPriceAndCategory", method = RequestMethod.GET)
    public List<Product> displayProductListByCategory(@RequestParam("min") Double minprice, @RequestParam("max") Double maxprice, @RequestParam("category") String category)
    {
            List<Product> list = productService.priceFilterWithCategory(minprice, maxprice, category);
            return list;
    }
    @RequestMapping(value = "/product/byPriceRange", method = RequestMethod.GET)
    public List<Product> displayProductByPriceRange(@RequestParam("min") Double minprice, @RequestParam("max") Double maxprice)
    {
        List<Product> list = productService.priceRange(minprice, maxprice);
        return list;
    }
    @RequestMapping(value = "/product/sortByPrice", method = RequestMethod.GET)
    public List<Product> sortByPrice()
    {
        List<Product> list = productService.sortByPrice();
        return list;
    }
    @RequestMapping(value = "/product/sortByName", method = RequestMethod.GET)
    public List<Product> sortByName()
    {
        List<Product> list = productService.sortByProductname();
        return list;
    }
    @RequestMapping(value = "/product/sortByCategory", method = RequestMethod.GET)
    public List<Product> sortByCategory()
    {
        List<Product> list = productService.sortByCategoryname();
        return list;
    }
    @RequestMapping(value = "/product/sortBySubcategory", method = RequestMethod.GET)
    public List<Product> sortBySubcategory()
    {
        List<Product> list = productService.sortBySubcategoryname();
        return list;
    }

    @PostMapping("/product/add")
    @ResponseBody
    public Product addProduct(@RequestParam("productname") String productname,@RequestParam("price") Double price,@RequestParam("category") String category,@RequestParam("details") String details,@RequestParam("subcategory") String subcategory)  {
        Product product = new Product(productname,price,category,details,subcategory);
        productService.addProduct( product);
        return productService.findById(product.getProductid());
 }
    @PostMapping("/product/remove")
    public void removeProduct(@RequestParam("productid")Integer pid){
        productService.removeProduct(pid);
    }

    @PostMapping("/product/update")
    public Product updateProduct(@RequestParam("productid") Integer productid,@RequestParam("price") Double price, @RequestParam("subcategory") String subcategory, @RequestParam("details") String details)  {
       Product product =  productService.findById(productid);
       product.setPrice(price);
       product.setDetails(details);
       product.setSubcategory(subcategory);
       productService.addProduct( product);
       return productService.findById(productid);
    }
    @PostMapping("/categories")
    public List<String> distinctCategories(){
        return productService.categories();
    }


}