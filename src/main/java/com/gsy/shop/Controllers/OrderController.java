package com.gsy.shop.Controllers;

import com.gsy.shop.Models.Order;
import com.gsy.shop.Services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {

        this.orderService = orderService;
    }

    @RequestMapping("/test/order")
    public String saveOrder() {

        Order order = new Order();
        order.setAmount(1.0);

        orderService.addOrder(order);
        return "order add success";
    }
}
