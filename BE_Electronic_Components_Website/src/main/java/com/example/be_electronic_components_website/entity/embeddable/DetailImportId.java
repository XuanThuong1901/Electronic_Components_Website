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
public class DetailImportId implements Serializable {
    @Column(name = "importId")
    private Long importId;

    @Column(name = "productId")
    private Long productId;
}
