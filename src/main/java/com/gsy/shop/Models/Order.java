package com.gsy.shop.Models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "\"order\"")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private Integer pid;
    private Integer sid;
    private String telephone;
    private Double amount;
    private Status status;

}
