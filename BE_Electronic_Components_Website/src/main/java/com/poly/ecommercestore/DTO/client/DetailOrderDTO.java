package com.poly.ecommercestore.DTO.client;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class DetailOrderDTO {

    private int product;
    private int quantity;
    private BigDecimal price;
    private BigDecimal lineAmount;
    private Integer tax;

    public DetailOrderDTO() {
    }

    public DetailOrderDTO(int product, int quantity, BigDecimal price, BigDecimal lineAmount, Integer tax) {
        this.product = product;
        this.quantity = quantity;
        this.price = price;
        this.lineAmount = lineAmount;
        this.tax = tax;
    }
}
