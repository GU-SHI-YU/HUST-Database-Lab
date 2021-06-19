package com.gsy.shop.Models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "order_item_detail_view")
@Entity
@Data
public class OrderItemDetailView {

    @Id
    private Integer id;

    @Column
    private Integer num;
    @Column(name = "order_id")
    private Integer orderId;
    @Column(name = "product_id")
    private Integer productId;
    @Column(name = "product_name")
    private String productName;
    @Column
    private String description;
    @Column
    private String picture;
    @Column
    private String type;
}
