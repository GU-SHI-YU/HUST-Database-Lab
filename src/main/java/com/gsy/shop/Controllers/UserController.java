package com.gsy.shop.Controllers;

import com.gsy.shop.Models.User;
import com.gsy.shop.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {

        this.userService = userService;
    }

    @RequestMapping("/test/user")
    public String saveUser() {

        User user = new User();
        user.setName("test");

        userService.addUser(user);
        return "user add success";
    }
}
