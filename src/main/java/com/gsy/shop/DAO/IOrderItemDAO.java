package com.gsy.shop.DAO;

import com.gsy.shop.Models.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrderItemDAO extends JpaRepository<OrderItem, Integer> {
}
