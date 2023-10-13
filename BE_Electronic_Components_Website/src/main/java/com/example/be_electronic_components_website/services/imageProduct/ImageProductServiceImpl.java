package com.example.be_electronic_components_website.services.imageProduct;

import com.example.be_electronic_components_website.entity.product.Product;
import com.example.be_electronic_components_website.model.request.ImageProductRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageProductServiceImpl implements IImageProductService{

    @Override
    public boolean update(Product product, List<ImageProductRequest> imageProductRequests) {
        return true;
    }
}
