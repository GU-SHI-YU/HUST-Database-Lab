package com.gsy.shop.Services;

import com.gsy.shop.DAO.*;
import com.gsy.shop.Exception.ResourceNotFoundException;
import com.gsy.shop.Models.*;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
public class OrderService {

    private final IOrderDAO orderDAO;
    private final IStoreItemDAO storeItemDAO;
    private final IProductDAO productDAO;
    private final IOrderItemDAO orderItemDAO;
    private final IOrderRecordDAO orderRecordDAO;

    @Autowired
    public OrderService(IOrderDAO orderDAO,
                        IStoreItemDAO storeItemDAO,
                        IProductDAO productDAO,
                        IOrderItemDAO orderItemDAO,
                        IOrderRecordDAO orderRecordDAO) {

        this.orderDAO = orderDAO;
        this.productDAO = productDAO;
        this.orderItemDAO = orderItemDAO;
        this.storeItemDAO = storeItemDAO;
        this.orderRecordDAO = orderRecordDAO;
    }

    public Order getOrder(@NonNull Integer id) {

        return orderDAO.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));
    }

    @Transactional
    public Order updateOrder(@NonNull Integer id, @NonNull Order newOrder) {

        Order order = orderDAO.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));
        order.setConfirmedTime(newOrder.getConfirmedTime());
        order.setFinishedTime(newOrder.getFinishedTime());
        order.setCreatedTime(newOrder.getCreatedTime());
        order.setPurchasedTime(newOrder.getPurchasedTime());
        order.setStatus(newOrder.getStatus());
        return orderDAO.save(order);
    }

    @Transactional
    public OrderRecord addOrder(@NonNull Integer userId,
                                @NonNull Integer storeId,
                                @NonNull Map<Integer, Integer> products) {

        Order order = new Order();
        orderDAO.save(order);
        Integer orderId = order.getId();
        products.forEach((productId, count) -> {

            Product product = productDAO.findById(productId)
                    .orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));
            StoreItem storeItem = storeItemDAO.findStoreItemByProductId(productId)
                    .orElseThrow(() -> new ResourceNotFoundException("Store item", "product id", productId));
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(orderId);
            orderItem.setProductId(productId);
            orderItem.setAmount(product.getPrice() * count * storeItem.getDiscount());
            orderItem.setCount(count);
            orderItemDAO.save(orderItem);
        });
        OrderRecord orderRecord = new OrderRecord();
        orderRecord.setOrderId(orderId);
        orderRecord.setUserId(userId);
        orderRecord.setStoreId(storeId);
        return orderRecordDAO.save(orderRecord);
    }
}
