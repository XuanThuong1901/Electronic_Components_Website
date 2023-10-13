package com.example.be_electronic_components_website.entity.importStock;

import com.example.be_electronic_components_website.entity.embeddable.DetailImportId;
import com.example.be_electronic_components_website.entity.product.Product;
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
@Table(name = "detailImport")
public class DetailImport {

    @EmbeddedId
    private DetailImportId id;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "price")
    private BigDecimal price;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "importId", referencedColumnName = "id", insertable = false, updatable = false)
    private ImportStock importStock;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "productId", referencedColumnName = "id", insertable = false, updatable = false)
    private Product product;
}
