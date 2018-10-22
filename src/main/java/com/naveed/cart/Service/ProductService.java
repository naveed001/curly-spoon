package com.naveed.cart.Service;

import com.naveed.cart.DAO.ProductDAO;
import com.naveed.cart.Model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductService {

    @Autowired
    private ProductDAO productDAO;

    public List getProductList()
    {
        return productDAO.findAll();
    }

    public Product findByName(String productname) {
        Product pr = new Product();
        List<Product> all = productDAO.findAll();
        for(Product p:all){
            if(p.getProductname().equals(productname))
            {pr = p;}
        }
        return pr;
    }

    public void addProduct(Product product)
    {
        productDAO.save(product);
    }

    public Product findById(int productId) {
        Optional<Product> product = productDAO.findById(productId);
       return product.get();
    }
    public List<Product> search(String name)
    {
        List<Product> all = productDAO.findAll();
        List<Product> list = new ArrayList<Product>();
        for(Product p:all) {
            if(p.getProductname().contains(name.toLowerCase()))
            {list.add(p);continue;}
            if(p.getCategory().contains(name.toLowerCase()))
            {list.add(p);continue; }
            if(p.getDetails().contains(name.toLowerCase()))
            {list.add(p);continue; }
            if(p.getSubcategory().contains(name.toLowerCase()))
            {list.add(p);}
        }

        return list;
    }
    public class SortbyPrice implements Comparator<Product>
    {

        public int compare(Product a, Product b)
        {
            int s = (int)(a.getPrice() - b.getPrice());
            return s;
        }
    }
    class SortbyName implements Comparator<Product>
    {
        public int compare(Product a, Product b)
        {
            return a.getProductname().compareTo(b.getProductname());
        }
    }
    class SortbyCategory implements Comparator<Product>
    {
        public int compare(Product a, Product b)
        {
            return a.getCategory().compareTo(b.getCategory());
        }
    }
    class SortbySubcategory implements Comparator<Product>
    {
        public int compare(Product a, Product b)
        {
            return a.getSubcategory().compareTo(b.getSubcategory());
        }
    }


    public List<Product> sortByPrice()
    {
        List<Product> list = productDAO.findAll();
        Collections.sort(list, new SortbyPrice());
        return list;
    }
    public List<Product> sortByProductname()
    {
        List<Product> list = productDAO.findAll();
        Collections.sort(list, new SortbyName());
        return list;
    }
    public List<Product> sortByCategoryname()
    {
        List<Product> list = productDAO.findAll();
        Collections.sort(list, new SortbyCategory());
        return list;
    }
    public List<Product> sortBySubcategoryname()
    {
        List<Product> list = productDAO.findAll();
        Collections.sort(list, new SortbyCategory());
        return list;
    }

    public List<Product> priceFilterWithCategory(double l,double h,String category){
        List<Product> all = productDAO.findAll();
        List<Product> list = new ArrayList<Product>();
        for(Product p: all){
            if(p.getPrice()>=l && p.getPrice()<=h )
            {list.add(p);}
        }
        return list;
    }
    public List<Product> priceRange(double l,double h){
        List<Product> list = productDAO.findAllByPriceBetween(l,h);
        return list;
    }

    public List<Product> findProductsByCategory(String category){
        List<Product> all = productDAO.findAll();
        List<Product> list = new ArrayList<Product>();
        for(Product p: all){
            if(p.getCategory().equals(category) )
            {list.add(p);}
        }
        return list;
    }
    public void removeProduct(int id){
        productDAO.delete((productDAO.findByProductid(id)));
    }
    public List<String> categories(){
        List<Product> cat= productDAO.findAll();
        Set<String> categories = new HashSet<String>();
        for(Product p : cat ){
            categories.add(p.getCategory());
        }
        List list = new ArrayList(categories);

        return list;
    }

}