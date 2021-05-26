package com.gsy.shop.Services;

import com.gsy.shop.DAO.IProductDAO;
import com.gsy.shop.Models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final IProductDAO productDAO;

    @Autowired
    public ProductService(IProductDAO productDAO) {

        this.productDAO = productDAO;
    }

    public void addProduct(Product product) {

        productDAO.save(product);
    }
}
