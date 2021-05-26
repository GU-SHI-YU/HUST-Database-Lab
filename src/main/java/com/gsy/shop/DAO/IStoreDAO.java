package com.gsy.shop.DAO;

import com.gsy.shop.Models.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IStoreDAO extends JpaRepository<Store, Integer> {
}
