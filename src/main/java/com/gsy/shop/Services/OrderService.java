package com.gsy.shop.Services;

import com.gsy.shop.DAO.IOrderDAO;
import com.gsy.shop.Models.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final IOrderDAO orderDAO;

    @Autowired
    public OrderService(IOrderDAO orderDAO) {

        this.orderDAO = orderDAO;
    }

    public void addOrder(Order order) {

        orderDAO.save(order);
    }
}
