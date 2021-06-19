package com.gsy.shop.Models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "order_record")
public class OrderRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "order_id")
    private Integer orderId;
    @Column(name = "store_id")
    private Integer storeId;
    @Column(name = "user_id")
    private Integer userId;
    @Column
    private Double amount;

}
