package com.example.be_electronic_components_website.entity.embeddable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Data
@Embeddable
public class CartId implements Serializable {
    @Column(name = "customerId")
    private String customerId;

    @Column(name = "productId")
    private Long productId;
}
