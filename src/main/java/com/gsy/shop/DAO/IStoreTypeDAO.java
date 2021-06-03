package com.gsy.shop.DAO;

import com.gsy.shop.Models.StoreType;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IStoreTypeDAO extends JpaRepository<StoreType, Integer> {

    public List<Integer> findAllByTypeId(@NonNull Integer id);
}
