package com.gsy.shop.Models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "order_item")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "order_id")
    private Integer orderId;
    @Column(name = "product_id")
    private Integer productId;
    @Column
    private Integer count;
    private Double amount;

}
