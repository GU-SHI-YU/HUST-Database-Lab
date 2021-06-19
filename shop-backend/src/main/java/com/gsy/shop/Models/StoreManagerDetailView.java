package com.gsy.shop.Models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "store_manager_detail_view")
@Entity
@Data
public class StoreManagerDetailView {

    @Id
    private Integer id;

    @Column(name = "store_id")
    private Integer storeId;
    @Column
    private String description;
    @Column
    private String name;
    @Column(name = "owner_name")
    private String ownerName;
    @Column(name = "user_id")
    private Integer userId;
    @Column
    private String type;
}
