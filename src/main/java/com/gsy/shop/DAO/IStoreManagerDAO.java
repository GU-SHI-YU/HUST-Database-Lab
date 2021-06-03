package com.gsy.shop.DAO;

import com.gsy.shop.Models.StoreManager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IStoreManagerDAO extends JpaRepository<StoreManager, Integer> {
}
