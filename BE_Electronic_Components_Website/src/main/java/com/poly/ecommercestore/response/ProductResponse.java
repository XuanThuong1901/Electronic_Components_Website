package com.poly.ecommercestore.response;

import com.poly.ecommercestore.entity.Products;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class ProductResponse {
    private Products product;
    private List<String> imageProduct;
    private String message;

    public ProductResponse() {
    }

    public ProductResponse(Products product, List<String> imageProduct) {
        this.product = product;
//        this.imageProduct = (imageProduct != null) ? new ArrayList<>() : null;
        this.imageProduct = imageProduct;
    }


    public ProductResponse(Products product) {
        this.product = product;
    }
}
