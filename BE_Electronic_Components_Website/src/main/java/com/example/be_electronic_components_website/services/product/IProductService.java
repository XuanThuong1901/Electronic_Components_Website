package com.example.be_electronic_components_website.services.product;

import com.example.be_electronic_components_website.entity.product.Product;
import com.example.be_electronic_components_website.model.request.ProductRequest;

import java.util.List;

public interface IProductService {
    List<Product> findAll();
    Product findById(int id);
    boolean add(ProductRequest productRequest);
    boolean update(ProductRequest productRequest);
}
