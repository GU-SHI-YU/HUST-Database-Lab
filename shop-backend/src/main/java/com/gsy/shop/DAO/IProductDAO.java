package com.gsy.shop.DAO;

import com.gsy.shop.Models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IProductDAO extends JpaRepository<Product, Integer> {

    List<Product> findByOrderByPriceAsc();
    List<Product> findByOrderByNameAsc();
    List<Product> findByOrderByIdAsc();
}
