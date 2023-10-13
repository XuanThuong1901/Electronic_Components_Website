package com.example.be_electronic_components_website.entity;

import com.example.be_electronic_components_website.entity.product.Product;
import com.example.be_electronic_components_website.entity.user.Customer;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "evaluation")
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "comment")
    private String comment;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "date")
    private Date date;

    @Column(name = "isApproved")
    private Boolean isApproved;

    @Column(name = "isDeleted")
    private Boolean isDeleted;

//    @JsonIgnoreProperties("evaluations")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customerId")
    private Customer customer;

//    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "productId")
    private Product product;

    @PrePersist
    private void pre(){
        this.date = new Date();
        this.isApproved = false;
        this.isDeleted = false;
    }
}
