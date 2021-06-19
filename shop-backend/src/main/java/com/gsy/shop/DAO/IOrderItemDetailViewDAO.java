package com.gsy.shop.DAO;

import com.gsy.shop.Models.OrderItemDetailView;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IOrderItemDetailViewDAO extends JpaRepository<OrderItemDetailView, Integer> {

    List<OrderItemDetailView> findAllByOrderId(@NonNull Integer id);
}
