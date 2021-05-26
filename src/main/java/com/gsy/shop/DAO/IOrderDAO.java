package com.gsy.shop.DAO;

import com.gsy.shop.Models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrderDAO extends JpaRepository<Order, Integer> {
}
