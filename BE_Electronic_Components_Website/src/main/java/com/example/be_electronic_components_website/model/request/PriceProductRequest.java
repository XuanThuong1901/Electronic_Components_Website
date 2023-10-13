package com.example.be_electronic_components_website.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PriceProductRequest {
    private Long id;
    private BigDecimal price;
    private Date applicableDate;
    private Date endDate;
}
