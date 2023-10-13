package com.example.be_electronic_components_website.entity.product;

import com.example.be_electronic_components_website.entity.*;
import com.example.be_electronic_components_website.entity.Enum.ProductStatus;
import com.example.be_electronic_components_website.entity.importStock.DetailImport;
import com.example.be_electronic_components_website.entity.order.DetailOrder;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product")
public class  Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    @NonNull
    private String name;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "feature")
    @NonNull
    private String feature;

    @Column(name = "describe")
    @NonNull
    private String describe;

    @Column(name = "dateCreated")
    private Date dateCreated;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<ImageProduct> imageProducers;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<Specification> specifications;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<PriceProduct> priceProducts;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<Evaluation> evaluations;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<DetailImport> detailImports;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<DetailOrder> detailOrders;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<Cart> carts;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "supplierId")
    private Supplier supplier;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "taxId")
    private Tax tax;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "categoryId")
    private Category category;

    @PrePersist()
    private void pre(){
        this.dateCreated = new Date();
        this.status = ProductStatus.OUTOFSTOCK;
    }
}
