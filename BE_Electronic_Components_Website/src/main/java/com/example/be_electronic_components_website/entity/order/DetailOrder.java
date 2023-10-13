package com.example.be_electronic_components_website.entity.order;

import com.example.be_electronic_components_website.entity.embeddable.DetailOrderId;
import com.example.be_electronic_components_website.entity.product.Product;
import com.example.be_electronic_components_website.entity.product.Tax;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "detailOrder")
public class DetailOrder {
    @EmbeddedId
    private DetailOrderId detailOrderId;

    @Column(name = "Quantity")
    private int quantity;

    @Column(name = "Price")
    private BigDecimal price;

    @Column(name = "LineAmount")
    private BigDecimal lineAmount;

//    @JsonIgnoreProperties("detailOrder")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "orderId", referencedColumnName = "id", insertable = false, updatable = false)
    private Order order;

//    @JsonIgnoreProperties("detailOrder")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "productId", referencedColumnName = "id", insertable = false, updatable = false)
    private Product product;

//    @JsonIgnoreProperties("detailOrder")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "taxId")
    private Tax tax;
}
