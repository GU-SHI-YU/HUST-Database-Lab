package com.gsy.shop.Controllers;

import com.gsy.shop.Models.Product;
import com.gsy.shop.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {

        this.productService = productService;
    }

    @GetMapping("/products/type/{type}")
    public List<Product> getProductByType(@PathVariable("type") String type) {

        return productService.getProductByType(type);
    }

    @GetMapping("/products/mode/{mode}/order/{order}")
    public List<Product> getProductOrdered(@PathVariable("mode") String mode, @PathVariable("order") String order) {

        Boolean isAsc = Boolean.TRUE;
        if (order.equals("Desc")) {
            isAsc = Boolean.FALSE;
        }
        return productService.getProductOrdered(mode, isAsc);
    }

    @PutMapping("/product/add")
    public Product addProduct(@RequestBody Product product) {

        return productService.addProduct(product);
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable("id") Integer id) {

        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/product/{id}")
    public Product getProduct(@PathVariable("id") Integer id) {

        return productService.getProduct(id);
    }

    @PutMapping("/product/{id}")
    public Product updateProduct(@PathVariable("id") Integer id, @RequestBody Product newProduct) {

        return productService.updateProduct(id, newProduct);
    }
    
    @RequestMapping("/test/product")
    public String saveProduct() {

        Product product = new Product();
        product.setName("test");

        productService.addProduct(product);
        return "product add success";
    }
}
