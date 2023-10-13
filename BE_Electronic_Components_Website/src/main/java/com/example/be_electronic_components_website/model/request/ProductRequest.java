package com.example.be_electronic_components_website.model.request;

import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {
    private Integer id;
    private String name;
    private int quantity;
    private String feature;
    private String describe;
    private String status;
    private List<ImageProductRequest> imageProducers;
    private List<SpecificationRequest> specifications;
    private List<PriceProductRequest> priceProducts;
    private Integer supplier;
    private Integer tax;
    private Integer category;
}
