package com.poly.ecommercestore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import jakarta.persistence.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Data
@Entity
@Table(name = "Accounts")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Accounts {
    @Id
    @Column(name = "IDAccount", nullable = false)
    private String iDAccount;

    @Column(name = "Email", nullable = false, unique = true)
    private String email;

    @Column(name = "Password", nullable = false)
    private String password;

    @JsonIgnoreProperties("account")
    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL)
    private Employers employer;

    @JsonIgnoreProperties("account")
    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL)
    private Customers customers;

    @JsonIgnoreProperties("account")
    @ManyToOne(optional = false)
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name = "IDStatus")
    private Status status;

    @JsonIgnoreProperties("account")
    @ManyToOne(optional = false)
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name = "IDRole")
    private Roles role;

    public Accounts() {
    }

    public Accounts(String iDAccount, String email, String password, Employers employer, Customers customers, Status status, Roles role) {
        this.iDAccount = iDAccount;
        this.email = email;
        this.password = password;
        this.employer = employer;
        this.customers = customers;
        this.status = status;
        this.role = role;
    }
}
