package com.example.be_electronic_components_website.repository;

import com.example.be_electronic_components_website.entity.product.ImageProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageProductRepository extends JpaRepository<ImageProduct, Long> {

}
