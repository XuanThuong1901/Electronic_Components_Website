package com.example.be_electronic_components_website.entity.product;

import com.example.be_electronic_components_website.entity.Enum.PriceProductStatus;
import com.example.be_electronic_components_website.entity.product.Product;
import com.example.be_electronic_components_website.entity.user.Employee;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "priceProduct")
public class PriceProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "dateAdd")
    private Date dateAdd;

    @Column(name = "applicableDate")
    private Date applicableDate;

    @Column(name = "endDate")
    private Date endDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "productId")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "employeeId")
    private Employee employee;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private PriceProductStatus status;

    @PrePersist
    private void Pre(){
        this.dateAdd = new Date();
        this.status = PriceProductStatus.NOTAPPLIED;
    }
}
