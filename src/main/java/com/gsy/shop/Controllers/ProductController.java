package com.gsy.shop.Controllers;

import com.gsy.shop.Models.Product;
import com.gsy.shop.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {

        this.productService = productService;
    }

    @RequestMapping("/test/product")
    public String saveProduct() {

        Product product = new Product();
        product.setName("test");

        productService.addProduct(product);
        return "product add success";
    }
}
