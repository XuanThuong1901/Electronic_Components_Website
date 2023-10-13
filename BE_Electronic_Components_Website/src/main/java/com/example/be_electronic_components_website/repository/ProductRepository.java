package com.example.be_electronic_components_website.repository;

import com.example.be_electronic_components_website.entity.product.Category;
import com.example.be_electronic_components_website.entity.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    public Optional<Product> findByCategory(Category category);

}
