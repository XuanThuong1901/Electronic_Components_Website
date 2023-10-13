package com.example.be_electronic_components_website.services.product;

import com.example.be_electronic_components_website.entity.product.Product;
import com.example.be_electronic_components_website.model.request.ProductRequest;
import com.example.be_electronic_components_website.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {

    private final ProductRepository productRepository;

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Product findById(int id) {
        return productRepository.findById(id).get();
    }

    @Override
    public boolean add(ProductRequest productRequest) {
        return false;
    }

    @Override
    public boolean update(ProductRequest productRequest) {
        return false;
    }
}
