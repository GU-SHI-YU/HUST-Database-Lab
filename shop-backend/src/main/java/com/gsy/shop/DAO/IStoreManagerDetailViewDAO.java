package com.gsy.shop.DAO;

import com.gsy.shop.Models.StoreManagerDetailView;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IStoreManagerDetailViewDAO extends JpaRepository<StoreManagerDetailView, Integer> {

    List<StoreManagerDetailView> findAllByUserId(@NonNull Integer id);
}
