package com.gsy.shop.Services;

import com.gsy.shop.DAO.*;
import com.gsy.shop.Exception.ResourceNotFoundException;
import com.gsy.shop.Models.*;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

@Transactional
@Service
public class OrderService {

    private final IOrderDAO orderDAO;
    private final IProductDAO productDAO;
    private final IOrderItemDAO orderItemDAO;
    private final IOrderRecordDAO orderRecordDAO;
    private final IOrderItemDetailViewDAO orderItemDetailViewDAO;

    @Autowired
    public OrderService(IOrderDAO orderDAO,
                        IProductDAO productDAO,
                        IOrderItemDAO orderItemDAO,
                        IOrderRecordDAO orderRecordDAO,
                        IOrderItemDetailViewDAO orderItemDetailViewDAO) {

        this.orderDAO = orderDAO;
        this.productDAO = productDAO;
        this.orderItemDAO = orderItemDAO;
        this.orderRecordDAO = orderRecordDAO;
        this.orderItemDetailViewDAO = orderItemDetailViewDAO;
    }

    public Order getOrder(@NonNull Integer id) {

        return orderDAO.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));
    }

    public Order updateOrder(@NonNull Integer id, @NonNull Order newOrder) {

        Order order = orderDAO.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));
        order.setCreatedTime(newOrder.getCreatedTime());
        order.setStatus(newOrder.getStatus());
        return orderDAO.save(order);
    }

    public OrderRecord addOrder(@NonNull Integer userId,
                                @NonNull Integer storeId,
                                @NonNull Map<Integer, Integer> products) {

        AtomicReference<Double> orderAmount = new AtomicReference<>(0.0);
        Order order = new Order();
        order.setStatus(Status.CREATED);
        orderDAO.save(order);
        Integer orderId = order.getId();
        products.forEach((productId, count) -> {

            Product product = productDAO.findById(productId)
                    .orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));
            if (product.getStack() == 0) {
                throw new ResourceNotFoundException("Product", "stack", 0);
            }
            product.setStack(product.getStack() - 1);
            productDAO.save(product);
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(orderId);
            orderItem.setProductId(productId);
            double amount = product.getPrice() * count * product.getDiscount();
            orderItem.setAmount(amount);
            orderAmount.updateAndGet(v -> v + amount);
            orderItem.setCount(count);
            orderItemDAO.save(orderItem);
        });
        OrderRecord orderRecord = new OrderRecord();
        orderRecord.setOrderId(orderId);
        orderRecord.setUserId(userId);
        orderRecord.setStoreId(storeId);
        orderRecord.setAmount(orderAmount.get());
        return orderRecordDAO.save(orderRecord);
    }

    public List<OrderItemDetailView> getItems(@NonNull Integer id) {

        return orderItemDetailViewDAO.findAllByOrderId(id);
    }
}
