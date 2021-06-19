package com.gsy.shop.Controllers;

import com.gsy.shop.Models.Order;
import com.gsy.shop.Models.OrderItemDetailView;
import com.gsy.shop.Models.OrderRecord;
import com.gsy.shop.Services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {

        this.orderService = orderService;
    }

    @PutMapping("/order/add/{userId}/{storeId}")
    public OrderRecord addOrder(@PathVariable("userId") Integer userId,
                                @PathVariable("storeId") Integer storeId,
                                @RequestBody Map<String, String> productsParam) {

        Map<Integer, Integer> products = new HashMap<>();
        productsParam.forEach((id, count) ->
            products.put(Integer.parseInt(id), Integer.parseInt(count))
        );
        return orderService.addOrder(userId, storeId, products);
    }

    @PutMapping("/order/{id}")
    public Order updateOrder(@PathVariable("id") Integer id, @RequestBody Order newOrder) {

        return orderService.updateOrder(id, newOrder);
    }

    @GetMapping("/order/{id}")
    public Order getOrder(@PathVariable("id") Integer id) {

        return orderService.getOrder(id);
    }

    @RequestMapping("/test/order")
    public String saveOrder() {

        return "order add success";
    }

    @GetMapping("/order/items/{id}")
    public List<OrderItemDetailView> getItems(@PathVariable("id") Integer id) {

        return orderService.getItems(id);
    }
}
