package com.gsy.shop.Services;

import com.gsy.shop.DAO.IProductDAO;
import com.gsy.shop.DAO.IProductTypeDAO;
import com.gsy.shop.DAO.ITypeDAO;
import com.gsy.shop.Exception.ResourceNotFoundException;
import com.gsy.shop.Models.Product;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Transactional
@Service
public class ProductService {

    private final IProductDAO productDAO;
    private final ITypeDAO typeDAO;
    private final IProductTypeDAO productTypeDAO;

    @Autowired
    public ProductService(IProductDAO productDAO,
                          ITypeDAO typeDAO,
                          IProductTypeDAO productTypeDAO) {

        this.productDAO = productDAO;
        this.typeDAO = typeDAO;
        this.productTypeDAO = productTypeDAO;
    }

    public Product getProduct(@NonNull Integer id) {

        return productDAO.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
    }

    public void deleteProduct(@NonNull Integer id) {

        Product product = productDAO.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
        productDAO.delete(product);
    }

    public Product updateProduct(@NonNull Integer id, Product newProduct) {

        Product product = productDAO.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
        product.setName(newProduct.getName());
        product.setDescription(newProduct.getDescription());
        product.setPicture(newProduct.getPicture());
        product.setPrice(newProduct.getPrice());
        return productDAO.save(product);
    }

    public Product addProduct(@NonNull Product product) {

        return productDAO.save(product);
    }

    public List<Product> getProductByType(@NonNull String name) {

        Integer typeId = typeDAO.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("Type", "name", name))
                .getId();
        List<Integer> productIds = productTypeDAO.findAllByTypeId(typeId);
        List<Product> products = new ArrayList<>();
        productIds.forEach(productId -> products.add(productDAO
                .findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId))));
        return products;
    }

    public List<Product> getProductOrdered(@NonNull String columnName, @NonNull Boolean isAsc) {

        List<Product> products = productDAO.findByOrderByIdAsc();
        switch (columnName) {
            case "name":
                products = productDAO.findByOrderByNameAsc();
                break;
            case "price":
                products = productDAO.findByOrderByPriceAsc();
                break;
            case "id":
            default:
                break;
        }
        if (!isAsc) {

            Collections.reverse(products);
        }
        return products;
    }
}
