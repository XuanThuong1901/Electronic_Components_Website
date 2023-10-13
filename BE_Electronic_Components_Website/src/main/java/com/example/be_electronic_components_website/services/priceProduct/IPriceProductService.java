package com.example.be_electronic_components_website.services.priceProduct;

import com.example.be_electronic_components_website.entity.product.Product;
import com.example.be_electronic_components_website.model.request.PriceProductRequest;

import java.util.List;

public interface IPriceProductService {
    boolean update(Product product, List<PriceProductRequest> priceProductRequests);
}
