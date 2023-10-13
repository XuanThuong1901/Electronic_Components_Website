package com.example.be_electronic_components_website.entity;

import com.example.be_electronic_components_website.entity.Enum.CommonStatus;
import com.example.be_electronic_components_website.entity.importStock.ImportStock;
import com.example.be_electronic_components_website.entity.product.Product;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "supplier")
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    @NonNull
    private String name;

    @Column(name = "address")
    @NonNull
    private String address;

    @Column(name = "phoneNumber")
    @NonNull
    private String phoneNumber;

    @Column(name = "email")
    @NonNull
    private String email;

    @Column(name = "contactInformation")
    @NonNull
    private String contactInformation;

    @Column(name = "dateAdd")
    private Date dateAdd;

    @Column(name = "endDate")
    private Date endDate;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private CommonStatus status;

    @OneToMany(mappedBy = "supplier", fetch = FetchType.LAZY)
    private List<Product> productList;

    @OneToMany(mappedBy = "supplier", fetch = FetchType.LAZY)
    private List<ImportStock> importStocks;

    @PrePersist
    private void dateAdd(){
        this.dateAdd = new Date();
        this.status = CommonStatus.ACTIVE;
    }
}
