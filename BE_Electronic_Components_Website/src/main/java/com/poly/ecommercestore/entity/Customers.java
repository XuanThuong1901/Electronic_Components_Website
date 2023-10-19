package com.poly.ecommercestore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "Customers")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Customers {

    @Id
    @Column(name = "IDCustomer")
    private String iDCustomer;

    @MapsId
    @JsonIgnoreProperties("customer")
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "IDCustomer")
    private Accounts account;

    @Column(name = "Name")
    private String name;

    @Column(name = "Address")
    private String address;

    @Column(name = "Telephone")
    private String telephone;

    @JsonIgnore()
    @OneToMany(mappedBy = "customer")
    private List<Carts> carts;

    @JsonIgnore()
    @OneToMany(mappedBy = "customer")
    private List<Orders> orders;

    @JsonIgnore()
    @OneToMany(mappedBy = "customer")
    private List<Evaluations> evaluations;

    public Customers() {
    }

    public Customers(String iDCustomer, Accounts account, String name, String address, String telephone) {
        this.iDCustomer = iDCustomer;
        this.account = account;
        this.name = name;
        this.address = address;
        this.telephone = telephone;
    }

    public Customers(String iDCustomer, Accounts account, String name, String address, String telephone, List<Carts> carts, List<Orders> orders) {
        this.iDCustomer = iDCustomer;
        this.account = account;
        this.name = name;
        this.address = address;
        this.telephone = telephone;
        this.carts = carts;
        this.orders = orders;
    }

}
