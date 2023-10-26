package com.poly.ecommercestore.controller.system;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.poly.ecommercestore.common.Message;
import com.poly.ecommercestore.repository.ProductRepository;
import com.poly.ecommercestore.DTO.system.ProductDTO;
import com.poly.ecommercestore.service.product.ProductService;
import com.poly.ecommercestore.service.shared.ECommerceMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    private final int SIZE = 14;

    @GetMapping("/page={page}")
    public ResponseEntity<?> getProductByPage(@PathVariable(value = "page") int page){
        return ResponseEntity.ok(productService.getProductByPage(page, SIZE));
    }
    @GetMapping("")
    public ResponseEntity<?> getProductByPage(){
        return ResponseEntity.ok(productService.getProduct());
    }

    @GetMapping("/detailCategory={id}/{page}")
    public ResponseEntity<?> getProductByDetailCategoryByPage(@PathVariable(value = "id") int id, @PathVariable(value = "page") int page){
        System.out.printf("id:" +id + "page: " + page);

        return ResponseEntity.ok(productService.getProductByCategoryByPage(id, page, 6));
    }

    @GetMapping("/product={id}")
    public ResponseEntity<?> getOneProduct(@PathVariable(value = "id") int id){
        return ResponseEntity.ok(productService.getProductById(id));
    }

//    @PostMapping("/add")
//    public ResponseEntity<?> addProduct(@RequestHeader("access_token") String tokenHeader, @RequestParam("productDTO") String productDTO, @RequestParam("imageProduct") List<MultipartFile> imageProduct) throws JsonProcessingException {
//        ProductDTO product = new ObjectMapper().readValue(productDTO, ProductDTO.class);
//        System.out.println(product);
//
//        if(product.getProductName() == null){
//            return ResponseEntity.badRequest().body("Product not name");
//        }
//        if(product.getQuantity() == null){
//            return ResponseEntity.badRequest().body("Product not quantity");
//        }
//        if(product.getPriceList().size() == 0){
//            return ResponseEntity.badRequest().body("Product not price");
//        }
//        if(imageProduct.size() == 0){
//            return ResponseEntity.badRequest().body("Product not image");
//        }
//        if(product.getSpecification().size() == 0){
//            return ResponseEntity.badRequest().body("Product not specification");
//        }
//
//        productService.addProduct(product, imageProduct, tokenHeader);
//        return ResponseEntity.ok("Product created");
//    }

    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestHeader("access_token") String tokenHeader, @RequestParam("productDTO") String productDTO, @RequestParam("imageProduct") List<MultipartFile> imageProduct) throws JsonProcessingException {
        ProductDTO product = new ObjectMapper().readValue(productDTO, ProductDTO.class);

        if(product.getProductName().isEmpty()){
            return ResponseEntity.badRequest().body(Message.VALIDATION_NAME_PRODUCT_ERROR001);
        }
        if(product.getCategory() == 0){
            return ResponseEntity.badRequest().body(Message.VALIDATION_CATEGORY_PRODUCT_ERROR001);
        }
        if(product.getSupplier() == 0){
            return ResponseEntity.badRequest().body(Message.VALIDATION_SUPPLIER_PRODUCT_ERROR001);
        }
        if(product.getTax() == 0){
            return ResponseEntity.badRequest().body(Message.VALIDATION_TAX_PRODUCT_ERROR001);
        }
        if(product.getContents().isEmpty()){
            return ResponseEntity.badRequest().body(Message.VALIDATION_CONTENTS_PRODUCT_ERROR001);
        }
        if(product.getFeature().isEmpty()){
            return ResponseEntity.badRequest().body(Message.VALIDATION_FEATURE_PRODUCT_ERROR001);
        }

        if(product.getPriceList().size() == 0){
            return ResponseEntity.badRequest().body(Message.VALIDATION_PRICE_PRODUCT_ERROR001);
        }
        if(imageProduct.size() == 0){
            return ResponseEntity.badRequest().body(Message.VALIDATION_IMAGE_PRODUCT_ERROR001);
        }
        if(product.getSpecification().size() == 0){
            return ResponseEntity.badRequest().body(Message.VALIDATION_SPECIFICATION_PRODUCT_ERROR001);
        }

        int isCheck = productService.addProduct(product, imageProduct, tokenHeader);
        if(isCheck == 0)
            return ResponseEntity.badRequest().body(Message.ADD_PRODUCT_ERROR001);
//        if(isCheck == 1)
//            return ResponseEntity.badRequest().body(Message.VALIDATION_PRODUCT_ALREADY_EXIST_ERROR001);

        return ResponseEntity.ok(Message.ADD_PRODUCT_SUCCESS);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> updateProduct(@RequestHeader("access_token") String tokenHeader , @PathVariable(value = "id") int id, @RequestParam("productDTO") String productDTO, @RequestParam("imageProduct") List<MultipartFile> imageProduct) throws JsonProcessingException {

        ProductDTO product = new ObjectMapper().readValue(productDTO, ProductDTO.class);

        if(product.getProductName().isEmpty()){
            return ResponseEntity.badRequest().body(Message.VALIDATION_NAME_PRODUCT_ERROR001);
        }
        if(product.getCategory() == 0){
            return ResponseEntity.badRequest().body(Message.VALIDATION_CATEGORY_PRODUCT_ERROR001);
        }
        if(product.getSupplier() == 0){
            return ResponseEntity.badRequest().body(Message.VALIDATION_SUPPLIER_PRODUCT_ERROR001);
        }
        if(product.getTax() == 0){
            return ResponseEntity.badRequest().body(Message.VALIDATION_TAX_PRODUCT_ERROR001);
        }
        if(product.getContents().isEmpty()){
            return ResponseEntity.badRequest().body(Message.VALIDATION_CONTENTS_PRODUCT_ERROR001);
        }
        if(product.getFeature().isEmpty()){
            return ResponseEntity.badRequest().body(Message.VALIDATION_FEATURE_PRODUCT_ERROR001);
        }

        if(product.getPriceList().size() == 0){
            return ResponseEntity.badRequest().body(Message.VALIDATION_PRICE_PRODUCT_ERROR001);
        }
        if(imageProduct.size() == 0){
            return ResponseEntity.badRequest().body(Message.VALIDATION_IMAGE_PRODUCT_ERROR001);
        }
        if(product.getSpecification().size() == 0){
            return ResponseEntity.badRequest().body(Message.VALIDATION_SPECIFICATION_PRODUCT_ERROR001);
        }

        if(productService.updateProduct(tokenHeader ,id, product, imageProduct))
            return ResponseEntity.ok(Message.UPDATE_PRODUCT_SUCCESS);

        return ResponseEntity.badRequest().body(Message.UPDATE_PRODUCT_ERROR001);
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable(value = "id") int id){
        if(productRepository.getReferenceById(id) == null)
            return ResponseEntity.badRequest().body(Message.DELETE_PRODUCT_ERROR001);

        productService.removeProduct(id);
        return ResponseEntity.ok(Message.DELETE_PRODUCT_SUCCESS);
    }

}
