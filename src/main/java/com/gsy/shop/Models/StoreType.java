package com.gsy.shop.Models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "store_type")
public class StoreType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "store_id")
    private Integer storeId;
    @Column(name = "type_id")
    private Integer typeId;
}
