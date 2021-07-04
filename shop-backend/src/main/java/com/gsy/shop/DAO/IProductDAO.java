package com.gsy.shop.DAO;

import com.gsy.shop.Models.Product;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IProductDAO extends JpaRepository<Product, Integer> {

    List<Product> findByOrderByPriceAsc();
    List<Product> findByOrderByNameAsc();
    List<Product> findByOrderByIdAsc();
}
