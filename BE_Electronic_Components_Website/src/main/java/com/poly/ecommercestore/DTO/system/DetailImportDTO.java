package com.poly.ecommercestore.DTO.system;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class DetailImportDTO {
    private String product;
    private int quantity;
    private BigDecimal price;

    public DetailImportDTO() {
    }

    public DetailImportDTO(String product, int quantity, BigDecimal price) {
        this.product = product;
        this.quantity = quantity;
        this.price = price;
    }
}
