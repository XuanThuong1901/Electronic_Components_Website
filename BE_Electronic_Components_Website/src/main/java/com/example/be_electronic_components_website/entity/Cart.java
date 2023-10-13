package com.example.be_electronic_components_website.entity;

import com.example.be_electronic_components_website.entity.embeddable.CartId;
import com.example.be_electronic_components_website.entity.product.Product;
import com.example.be_electronic_components_website.entity.user.Customer;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cart")
public class Cart {
    @EmbeddedId
    private CartId cartId;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "updatedDate")
    private Date updatedDate;

    @Column(name = "quantity")
    private int quantity;

//    @JsonIgnoreProperties("cart")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name = "customerId", referencedColumnName = "id", insertable = false, updatable = false)
    private Customer customer;

//    @JsonIgnoreProperties("cart")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name = "productId", referencedColumnName = "id", insertable = false, updatable = false)
    private Product product;
}
