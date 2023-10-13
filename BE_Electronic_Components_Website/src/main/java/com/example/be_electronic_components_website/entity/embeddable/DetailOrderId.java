package com.example.be_electronic_components_website.entity.embeddable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class DetailOrderId implements Serializable {
    @Column(name = "orderId")
    private Long orderId;

    @Column(name = "productId")
    private Long productId;
}
