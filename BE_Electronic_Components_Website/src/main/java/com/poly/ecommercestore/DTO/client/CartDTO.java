package com.poly.ecommercestore.DTO.client;

import lombok.Data;

@Data
public class CartDTO {

    private Integer quantity;

    public CartDTO() {
    }

    public CartDTO(Integer quantity) {
        this.quantity = quantity;
    }
}
