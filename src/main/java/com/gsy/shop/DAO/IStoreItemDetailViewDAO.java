package com.gsy.shop.DAO;

import com.gsy.shop.Models.StoreItemDetailView;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IStoreItemDetailViewDAO extends JpaRepository<StoreItemDetailView, Integer> {

    List<StoreItemDetailView> findAllByStoreId(@NonNull Integer id);
}
