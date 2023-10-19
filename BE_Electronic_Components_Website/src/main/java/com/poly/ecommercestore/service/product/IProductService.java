package com.poly.ecommercestore.service.product;

import com.poly.ecommercestore.entity.Products;
import com.poly.ecommercestore.DTO.system.ProductDTO;
import com.poly.ecommercestore.response.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IProductService {

    boolean addProduct(ProductDTO product, List<MultipartFile> imageProduct, String iDEmployer);

    boolean updateProduct(String tokenHeader , int iDProduct, ProductDTO productDTO, List<MultipartFile> imageProduct);

    boolean removeProduct(int iDProduct);

    Products getProductById(int iDProduct) throws IOException;

    List<Products> getProduct();

    List<Products> getProductByPage(int page, int size);

    List<Products> getProductByCategoryByPage(int iDDetailCategory, int page, int size);

}
