package com.poly.ecommercestore.service.category;

import com.poly.ecommercestore.entity.Categories;
import com.poly.ecommercestore.repository.CategoryRepository;
import com.poly.ecommercestore.DTO.system.CategoryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Categories addCategory(List<CategoryDTO> category) {
        if(categoryRepository.getCategoriesByName(category.get(0).getCategoryName()) != null){
            return null;
        }

        Categories newCategory;
        if(category.get(0).getLevel() == 1){
            newCategory = new Categories(category.get(0).getCategoryName(), category.get(0).getLevel(), 0);
            newCategory = categoryRepository.save(newCategory);
            category.remove(0);
        }
        else {
            return null;
        }


        for (CategoryDTO item : category){
//            if(item.getCategoryName().equals(newCategory.getCategoryName()) && item.getLevel() == newCategory.getLevel()){
//
//            }
            Categories NewDetailCategory = new Categories(item.getCategoryName(), item.getLevel(), newCategory.getIDCategory());
            categoryRepository.save(NewDetailCategory);
        }

        return newCategory;
    }

    @Override
    public List<Categories> getAll() {
        return categoryRepository.findAll();
    }

    @Override
    public List<Categories> getCategoryDetail() {
        return categoryRepository.getCategoryDetail();
    }

    @Override
    public Boolean removeCategory(int iDCategory) {
        Categories category = categoryRepository.getCategoriesById(iDCategory);



//        categoryRepository.deleteById(iDCategory);
        return true;
    }
}
