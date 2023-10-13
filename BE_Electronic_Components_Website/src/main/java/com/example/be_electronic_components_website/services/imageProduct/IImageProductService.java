package com.example.be_electronic_components_website.services.imageProduct;

import com.example.be_electronic_components_website.entity.product.Product;
import com.example.be_electronic_components_website.model.request.ImageProductRequest;

import java.util.List;

public interface IImageProductService {
    boolean update(Product product, List<ImageProductRequest> imageProductRequests);
}
