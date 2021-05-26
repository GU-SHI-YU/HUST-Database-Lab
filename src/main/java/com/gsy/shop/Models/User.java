package com.gsy.shop.Models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String email;
    private String telephone;
    private String password;
    private String profile;
    private String name;

}
