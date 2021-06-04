package com.gsy.shop.Controllers;

import com.gsy.shop.Models.Order;
import com.gsy.shop.Models.User;
import com.gsy.shop.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {

        this.userService = userService;
    }

    @GetMapping("/user/orders/{id}")
    public List<Order> getUserOrder(@PathVariable("id") Integer id) {

        return userService.getUserOrder(id);
    }

    @PostMapping("/user/add")
    public User addUser(@RequestBody User user) {

        return userService.addUser(user);
    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable("id") Integer id) {

        return userService.getUser(id);
    }

    @PutMapping("/user/{id}")
    public User updateUser(@PathVariable("id") Integer id, @RequestBody User newUser) {

        return userService.updateUser(id, newUser);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Integer id) {

        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @RequestMapping("/test/user")
    public String saveUser() {

        User user = new User();
        user.setName("test");

        userService.addUser(user);
        return "user add success";
    }
}
