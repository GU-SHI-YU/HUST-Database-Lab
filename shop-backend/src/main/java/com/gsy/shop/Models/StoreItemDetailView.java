package com.gsy.shop.Models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@Table(name = "store_item_detail_view")
public class StoreItemDetailView {

    @Id
    private Integer id;

    @Column
    private Double discount;
    private Integer stack;
    @Column(name = "store_id")
    private Integer storeId;
    @Column(name = "product_id")
    private Integer productId;
    @Column
    private String description;
    @Column(name = "product_name")
    private String name;
    @Column
    private String picture;
    @Column
    private Double price;
    @Column
    private String type;
}
