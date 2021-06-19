package com.gsy.shop.Models;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Data
@Table(name = "store_item")
public class StoreItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "product_id")
    private Integer productId;
    @Column
    private Integer stack;
    @ColumnDefault("1.0")
    private Double discount;
    @Column(name = "store_id")
    private Integer storeId;

}
