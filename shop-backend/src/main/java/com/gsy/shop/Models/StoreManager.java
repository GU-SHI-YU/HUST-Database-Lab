package com.gsy.shop.Models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "store_manager")
public class StoreManager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "store_id")
    private Integer storeId;
    @Column(name = "user_id")
    private Integer userId;
    @Column(name = "is_owner")
    private Boolean isOwner;

}
