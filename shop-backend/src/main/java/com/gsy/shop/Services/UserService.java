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

@Transactional
@Service
public class UserService {

    private final IUserDAO userDAO;
    private final IOrderRecordViewDAO orderRecordViewDAO;
    private final IOrderDAO orderDAO;
    private final IStoreManagerDetailViewDAO storeManagerDetailViewDAO;


    @Autowired
    public UserService(IUserDAO userDAO,
                       IOrderRecordViewDAO orderRecordViewDAO,
                       IOrderDAO orderDAO,
                       IStoreManagerDetailViewDAO storeManagerDetailViewDAO) {

        this.userDAO = userDAO;
        this.orderRecordViewDAO = orderRecordViewDAO;
        this.orderDAO = orderDAO;
        this.storeManagerDetailViewDAO = storeManagerDetailViewDAO;
    }

    public void deleteUser(@NonNull Integer id) {

        User user = userDAO.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        userDAO.delete(user);
    }

    public User getUser(@NonNull Integer id) {

        return userDAO.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }

    public User updateUser(@NonNull Integer id, @NonNull User newUser) {

        User user = userDAO.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "new user", newUser));
        user.setName(newUser.getName());
        user.setEmail(newUser.getEmail());
        user.setTelephone(newUser.getTelephone());
        user.setProfile(newUser.getProfile());

        return userDAO.save(user);
    }

    public User addUser(User user) {

        return userDAO.save(user);
    }

    public List<Order> getUserOrder(@NonNull Integer id) {

        List<OrderRecordView> orderRecordViews = orderRecordViewDAO.findAllByUserId(id);
        List<Order> orders = new ArrayList<>();
        orderRecordViews.forEach(orderRecordView -> orders.add(orderDAO.findById(orderRecordView.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Order", "id", id))));
        return orders;
    }

    public User login(@NonNull String email, @NonNull String password) {

        return userDAO.findUserByEmailAndPassword(email, password)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "email, password", email + "," + password));
    }

    public List<StoreManagerDetailView> getManaged(@NonNull Integer id) {

        return storeManagerDetailViewDAO.findAllByUserId(id);
    }
}
