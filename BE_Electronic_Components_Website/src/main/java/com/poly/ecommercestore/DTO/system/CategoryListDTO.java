package com.poly.ecommercestore.DTO.system;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class CategoryListDTO {

    private List<CategoryDTO> categoryDTOList;

    public CategoryListDTO() {
    }

    public CategoryListDTO(List<CategoryDTO> categoryDTOList) {
        this.categoryDTOList = (categoryDTOList != null) ? new ArrayList<>() : null;
    }
}
