package com.gsy.shop.Models;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "\"order\"")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @ColumnDefault("\"CREATED\"")
    private Status status;
    @Column(name = "created_time")
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createdTime;

}
