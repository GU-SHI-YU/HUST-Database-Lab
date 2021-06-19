package com.gsy.shop.DAO;

import com.gsy.shop.Models.User;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUserDAO extends JpaRepository<User, Integer> {

    Optional<User> findUserByEmailAndPassword(@NonNull String email, @NonNull String password);
}
