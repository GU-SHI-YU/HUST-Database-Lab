package com.gsy.shop.DAO;

import com.gsy.shop.Models.ProductType;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IProductTypeDAO extends JpaRepository<ProductType, Integer> {

    public List<Integer> findAllByTypeId(@NonNull Integer id);
}
