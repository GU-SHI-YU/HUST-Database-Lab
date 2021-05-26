package com.gsy.shop.DAO;

import com.gsy.shop.Models.Type;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITypeDAO extends JpaRepository<Type, Integer> {
}
