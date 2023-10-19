package com.poly.ecommercestore.repository;

import com.poly.ecommercestore.entity.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Categories, Integer> {

    @Query("SELECT category FROM Categories category WHERE category.categoryName = :categoryName")
    Categories getCategoriesByName(String categoryName);

    @Query("SELECT category FROM Categories category WHERE category.iDCategory = :iDCategory")
    Categories getCategoriesById(int iDCategory);

    @Query("SELECT category FROM Categories category WHERE category.level <> 1")
    List<Categories> getCategoryDetail();
}
