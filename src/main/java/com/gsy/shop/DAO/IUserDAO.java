package com.gsy.shop.DAO;

import com.gsy.shop.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserDAO extends JpaRepository<User, Integer> {
}
