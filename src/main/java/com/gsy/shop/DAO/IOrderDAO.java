package com.gsy.shop.DAO;

import com.gsy.shop.Models.Order;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IOrderDAO extends JpaRepository<Order, Integer> {

}
