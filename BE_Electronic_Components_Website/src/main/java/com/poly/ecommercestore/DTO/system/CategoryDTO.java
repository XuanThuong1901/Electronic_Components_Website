package com.poly.ecommercestore.DTO.system;

import lombok.Data;

@Data
public class CategoryDTO {

    private String categoryName;
    private Integer level;
    private Integer origin;

    public CategoryDTO(String categoryName, Integer level, Integer origin) {
        this.categoryName = categoryName;
        this.level = level;
        this.origin = (origin != null) ? origin : 0;
    }
}
