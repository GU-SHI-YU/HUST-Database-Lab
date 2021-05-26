package com.gsy.shop.DAO;

import com.gsy.shop.Models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductDAO extends JpaRepository<Product, Integer> {
}
