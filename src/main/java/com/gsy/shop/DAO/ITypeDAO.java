package com.gsy.shop.DAO;

import com.gsy.shop.Models.Type;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ITypeDAO extends JpaRepository<Type, Integer> {

    public Optional<Type> findByName(@NonNull String name);
}
