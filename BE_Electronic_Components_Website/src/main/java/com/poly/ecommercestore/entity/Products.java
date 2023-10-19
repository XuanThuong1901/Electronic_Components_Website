package com.poly.ecommercestore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.math.BigDecimal;
import java.util.List;

@Data
@Entity
@Table(name = "Products")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDProduct")
    private int iDProduct;

    @Column(name = "ProductName")
    private String productName;

    @Column(name = "Quantity")
    private int quantity;

    @Column(name = "Feature")
    private String feature;

    @Column(name = "Contents")
    private String contents;

    @Column(name = "Guarantee")
    private String guarantee;

    @JsonIgnoreProperties("product")
    @Fetch(FetchMode.JOIN)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IDCategory")
    private Categories category;

    @JsonIgnoreProperties("product")
    @Fetch(FetchMode.JOIN)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IDSupplier")
    private Suppliers supplier;

    @JsonIgnoreProperties("product")
    @Fetch(FetchMode.JOIN)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IDTax")
    private Tax tax;

    @JsonIgnoreProperties("product")
    @Fetch(FetchMode.JOIN)
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<PriceLists> priceLists;

    @JsonIgnoreProperties("product")
    @Fetch(FetchMode.JOIN)
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<Specifications> specifications;

    @JsonIgnoreProperties("product")
    @Fetch(FetchMode.JOIN)
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<ImageProducts> imageProducts;

    @JsonIgnore()
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<DetailImportStocks> detailImportStocks;

    @JsonIgnore()
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<Carts> carts;

    @JsonIgnore()
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<DetailOrders> detailOrders;

    @JsonIgnoreProperties("product")
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<Evaluations> evaluations;

    public Products() {
    }

    public Products(String productName, int quantity, String feature, String contents, String guarantee, Categories category, Suppliers supplier) {
        this.productName = productName;
        this.quantity = quantity;
        this.feature = feature;
        this.contents = contents;
        this.guarantee = guarantee;
        this.category = category;
        this.supplier = supplier;
    }

    public Products(String productName, int quantity, String feature, String contents, String guarantee, Categories category, Suppliers supplier, List<PriceLists> priceLists, List<Specifications> specifications, List<ImageProducts> imageProducts, List<DetailImportStocks> detailImportStocks, List<Carts> carts, List<DetailOrders> detailOrders) {
        this.productName = productName;
        this.quantity = quantity;
        this.feature = feature;
        this.contents = contents;
        this.guarantee = guarantee;
        this.category = category;
        this.supplier = supplier;
        this.priceLists = priceLists;
        this.specifications = specifications;
        this.imageProducts = imageProducts;
        this.detailImportStocks = detailImportStocks;
        this.carts = carts;
        this.detailOrders = detailOrders;
    }
}
