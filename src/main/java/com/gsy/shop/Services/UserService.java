package com.gsy.shop.Services;

import com.gsy.shop.DAO.IUserDAO;
import com.gsy.shop.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final IUserDAO userDAO;

    @Autowired
    public UserService(IUserDAO userDAO) {

        this.userDAO = userDAO;
    }

    public void addUser(User user) {

        userDAO.save(user);
    }
}
