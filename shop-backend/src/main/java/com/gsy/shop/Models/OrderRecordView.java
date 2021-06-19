package com.gsy.shop.Models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "order_record_view")
@Entity
@Data
public class OrderRecordView {

    @Id
    private Integer id;
    @Column(name = "s_id")
    private Integer storeId;
    @Column(name = "u_id")
    private Integer userId;
    @Column
    private Double amount;
    @Column(name = "s_name")
    private String storeName;
}
