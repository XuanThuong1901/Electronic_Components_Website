package com.example.be_electronic_components_website.entity.importStock;

import com.example.be_electronic_components_website.entity.Enum.ImportStatus;
import com.example.be_electronic_components_website.entity.Supplier;
import com.example.be_electronic_components_website.entity.product.Product;
import com.example.be_electronic_components_website.entity.user.Employee;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "importStock")
public class ImportStock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ImportName")
    private String importName;

    @Column(name = "Contents")
    private String contents;

    @Column(name = "DateAdded")
    private Date dateAdded;

    @Column(name = "UpdatedDate")
    private Date updatedDate;

    @Column(name = "Amount")
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ImportStatus status;

//    @JsonIgnoreProperties("import")
//    @Fetch(FetchMode.JOIN)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IDEmployer")
    private Employee employee;

//    @JsonIgnoreProperties("import")
//    @Fetch(FetchMode.JOIN)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IDSupplier")
    private Supplier supplier;

//    @Fetch(FetchMode.JOIN)

//    @JsonIgnoreProperties("import")
    @OneToMany(mappedBy = "importStock", fetch = FetchType.LAZY)
    private List<DetailImport> detailImport;

    @PrePersist()
    private void pre(){
        this.dateAdded = new Date();
        this.status = ImportStatus.UNFINISHED;
    }


}
