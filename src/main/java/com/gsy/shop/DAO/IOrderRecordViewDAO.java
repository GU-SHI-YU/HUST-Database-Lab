package com.gsy.shop.DAO;

import com.gsy.shop.Models.OrderRecordView;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IOrderRecordViewDAO extends JpaRepository<OrderRecordView, Integer> {

    List<OrderRecordView> findAllByUserId(@NonNull Integer id);
}
