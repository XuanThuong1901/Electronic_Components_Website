package com.poly.ecommercestore.service.category;

import com.poly.ecommercestore.entity.Categories;
import com.poly.ecommercestore.DTO.system.CategoryDTO;

import java.util.List;

public interface ICategoryService {

    Categories addCategory(List<CategoryDTO> category);

    List<Categories> getAll();

    List<Categories> getCategoryDetail();

    Boolean removeCategory(int iDCategory);
}
