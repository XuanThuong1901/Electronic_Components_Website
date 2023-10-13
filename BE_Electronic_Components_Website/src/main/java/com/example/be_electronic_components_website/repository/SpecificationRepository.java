package com.example.be_electronic_components_website.repository;

import com.example.be_electronic_components_website.entity.product.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecificationRepository extends JpaRepository<Specification, Long> {

}
