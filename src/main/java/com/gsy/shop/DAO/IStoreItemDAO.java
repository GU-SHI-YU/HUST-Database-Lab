package com.gsy.shop.DAO;

import com.gsy.shop.Models.Store;
import com.gsy.shop.Models.StoreItem;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IStoreItemDAO extends JpaRepository<StoreItem, Integer> {

    public Optional<StoreItem> findStoreItemByProductId(@NonNull Integer productId);
}
