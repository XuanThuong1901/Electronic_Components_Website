package com.poly.ecommercestore.DTO.system;

import lombok.Data;

@Data
public class ImageProductDTO {

    private String url;

    public ImageProductDTO() {
    }

    public ImageProductDTO(String url) {
        this.url = url;
    }
}
