package com.example.be_electronic_components_website.entity.user;

import com.example.be_electronic_components_website.entity.importStock.ImportStock;
import com.example.be_electronic_components_website.entity.order.Order;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @Column(name = "id")
    private String id;
    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id")
    private Account account;

    @Column(name = "fullName")
    private String fullName;

    @Column(name = "dateOfBirth")
    private Date dateOfBirth;

    @Column(name = "gender")
    private Boolean gender;

    @Column(name = "address")
    private String address;

    @Column(name = "phoneNumber")
    private String phoneNumber;

    @Column(name = "position")
    private String position;

    @Column(name = "salary")
    private BigDecimal salary;

    @Column(name = "startDate")
    private Date startDate;

    @Column(name = "endDate")
    private Date endDate;

   @Column(name = "employeePhoto")
   private String employeePhoto;

    @OneToMany(mappedBy = "employee", fetch = FetchType.LAZY)
    private List<ImportStock> importStocks;

    @OneToMany(mappedBy = "employee", fetch = FetchType.LAZY)
    private List<Order> orders;
}
