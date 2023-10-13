package com.example.be_electronic_components_website.services.specification;

import com.example.be_electronic_components_website.entity.product.Product;
import com.example.be_electronic_components_website.model.request.SpecificationRequest;

import java.util.List;

public interface ISpecificationService {
    boolean update(Product product, List<SpecificationRequest> specificationRequests);
}
