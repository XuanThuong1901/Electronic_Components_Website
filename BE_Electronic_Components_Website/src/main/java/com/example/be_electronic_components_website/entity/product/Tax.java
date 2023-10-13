package com.example.be_electronic_components_website.entity.product;

import com.example.be_electronic_components_website.entity.order.DetailOrder;
import com.example.be_electronic_components_website.entity.product.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Tax")
public class Tax {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String taxName;

    private Integer taxRate;

    private String taxType;

    private Date dateCreated;

    @OneToMany(mappedBy = "tax", fetch = FetchType.LAZY)
    private List<Product> products;

    @OneToMany(mappedBy = "tax", fetch = FetchType.LAZY)
    private List<DetailOrder> detailOrders;

    @PrePersist()
    private void dateCreated(){
        this.dateCreated = new Date();
    }
}
