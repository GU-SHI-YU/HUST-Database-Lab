package com.gsy.shop.DAO;

import com.gsy.shop.Models.OrderRecord;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IOrderRecordDAO extends JpaRepository<OrderRecord, Integer> {

    List<OrderRecord> findAllByUserId(@NonNull Integer id);
}
