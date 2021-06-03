package com.gsy.shop.Services;

import com.gsy.shop.DAO.*;
import com.gsy.shop.Exception.ResourceNotFoundException;
import com.gsy.shop.Models.*;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    private final IUserDAO userDAO;
    private final IOrderRecordDAO orderRecordDAO;
    private final IOrderDAO orderDAO;


    @Autowired
    public UserService(IUserDAO userDAO,
                       IOrderRecordDAO orderRecordDAO,
                       IOrderItemDAO orderItemDAO,
                       IOrderDAO orderDAO,
                       IStoreItemDAO storeItemDao,
                       IProductDAO productDAO) {

        this.userDAO = userDAO;
        this.orderRecordDAO = orderRecordDAO;
        this.orderDAO = orderDAO;
    }

    @Transactional
    public void deleteUser(@NonNull Integer id) {

        User user = userDAO.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        userDAO.delete(user);
    }

    @Transactional
    public User getUser(@NonNull Integer id) {

        return userDAO.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }

    @Transactional
    public User updateUser(@NonNull Integer id, @NonNull User newUser) {

        User user = userDAO.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "new user", newUser));
        user.setName(newUser.getName());
        user.setEmail(newUser.getEmail());
        user.setTelephone(newUser.getTelephone());
        user.setProfile(newUser.getProfile());

        return userDAO.save(user);
    }

    @Transactional
    public User addUser(User user) {

        return userDAO.save(user);
    }

    @Transactional
    public List<Order> getUserOrder(@NonNull Integer id) {

        List<OrderRecord> orderRecords = orderRecordDAO.findAllByUserId(id);
        List<Order> orders = new ArrayList<>();
        orderRecords.forEach(orderRecord -> orders.add(orderDAO.findById(orderRecord.getOrderId())
            .orElseThrow(() -> new ResourceNotFoundException("Order", "id", id))));
        return orders;
    }
}
