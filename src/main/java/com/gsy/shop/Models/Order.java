package com.gsy.shop.Models;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
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
    @Generated(GenerationTime.INSERT)
    private Date createdTime;
    @Column(name = "purchase_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date purchasedTime;
    @Column(name = "confirmed_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date confirmedTime;
    @Column(name = "finished_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date finishedTime;


}
