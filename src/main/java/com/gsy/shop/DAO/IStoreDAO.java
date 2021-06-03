package com.gsy.shop.DAO;

import com.gsy.shop.Models.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IStoreDAO extends JpaRepository<Store, Integer> {

    public List<Store> findByOrderByIdAsc();
    public List<Store> findByOrderByNameAsc();
}
