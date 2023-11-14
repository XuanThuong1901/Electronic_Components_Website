package com.poly.ecommercestore.service.product;

import com.poly.ecommercestore.DTO.system.PriceListDTO;
import com.poly.ecommercestore.configuration.JWTUnit;
import com.poly.ecommercestore.entity.*;
import com.poly.ecommercestore.repository.*;
import com.poly.ecommercestore.DTO.system.ImageProductDTO;
import com.poly.ecommercestore.DTO.system.ProductDTO;
import com.poly.ecommercestore.DTO.system.SpecificationDTO;
import com.poly.ecommercestore.response.ProductResponse;
import com.poly.ecommercestore.service.token.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class ProductService implements IProductService{

//    @Autowired
//    private JWTUnit jwtUnit;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PriceListService priceListService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ImageProductService imageProductService;

    @Autowired
    private SpecificationService specificationService;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private TaxRepository taxRepository;

    private static final String UPLOAD_DIR = "D:\\NAM4-HK3\\THUCTAPTOTNGHIEP\\ecommercestore-web-customer\\src\\assets\\images\\product";

    @Transactional
    @Override
    public int addProduct(ProductDTO product, List<MultipartFile> imageProduct, String tokenHeader) {
        try {
            Accounts user = tokenService.getAccountByToken(tokenHeader);
            Categories category = categoryRepository.findById(product.getCategory()).get();

            Suppliers supplier = supplierRepository.findById(product.getSupplier()).get();

//            Products pd = productRepository.checkProduct(supplier, product.getProductName());
//            if(pd != null){
//                return 2;
//            }
            boolean checkProduct = productRepository.existsByProductName(product.getProductName());
            if (checkProduct == true){
                return 2;
            }

            Tax tax = taxRepository.findById(product.getTax()).get();

////            return 2;
//            int check = 1;
//            if(check == 1)
//                return 2;

            Products newProduct = new Products();
            newProduct.setProductName(product.getProductName());
            newProduct.setCategory(category);
            newProduct.setSupplier(supplier);
            newProduct.setTax(tax);
            newProduct.setQuantity(product.getQuantity());
            newProduct.setFeature(product.getFeature());
            newProduct.setContents(product.getContents());
            newProduct.setGuarantee(product.getGuarantee());

            newProduct = productRepository.save(newProduct);
            List<ImageProducts> imageProducts = new ArrayList<>();
            for (MultipartFile image : imageProduct){
                String imageUrl = saveImage(image);
                System.out.println(imageUrl);
                ImageProducts imageProductTemp = imageProductService.add(imageUrl, newProduct.getIDProduct());
                imageProducts.add(imageProductTemp);
            }

            List<Specifications> specifications = new ArrayList<>();
            for (SpecificationDTO specification : product.getSpecification()){
                System.out.println(specification);
                Specifications specificationTemp = specificationService.add(specification, newProduct.getIDProduct());
                specifications.add(specificationTemp);
            }

            List<PriceLists> priceLists = new ArrayList<>();
            for (PriceListDTO priceListDTO : product.getPriceList()){
                PriceLists priceListsTemp = priceListService.addPriceList(priceListDTO, user.getIDAccount(), newProduct.getIDProduct());
                priceLists.add(priceListsTemp);
            }

            newProduct.setPriceLists(priceLists);
            newProduct.setImageProducts(imageProducts);
            newProduct.setSpecifications(specifications);

            productRepository.save(newProduct);


            return 1;
        }catch (Exception e){
            return 0;
        }
    }

    @Override
    public boolean updateProduct(String tokenHeader, int iDProduct, ProductDTO productDTO, List<MultipartFile> imageProduct) {

        Accounts user = tokenService.getAccountByToken(tokenHeader);
        if(user == null)
        {
            System.out.printf("user null\n");
            return false;
        }

        System.out.printf("user\n");
        Products productUpdate = productRepository.findById(iDProduct).get();
        if(productUpdate == null)
        {
            System.out.printf("productUpdate null\n");
            return false;
        }

        System.out.printf("product\n");
        Categories category = categoryRepository.findById(productDTO.getCategory()).get();
        if(category == null){
            System.out.printf("category null\n");
            return false;
        }

        System.out.printf("category\n");
        Suppliers supplier = supplierRepository.findById(productDTO.getSupplier()).get();
        if(supplier == null){
            System.out.printf("supplier null\n");
            return false;
        }

        System.out.printf("tax\n");
        Tax tax = taxRepository.findById(productDTO.getTax()).get();
        if(tax == null){
            System.out.printf("tax null\n");
            return false;
        }


        productUpdate.setProductName(productDTO.getProductName());
        productUpdate.setCategory(category);
        productUpdate.setSupplier(supplier);
        productUpdate.setTax(tax);
        productUpdate.setQuantity(productDTO.getQuantity());
        productUpdate.setFeature(productDTO.getFeature());
        productUpdate.setContents(productDTO.getContents());
        productUpdate.setGuarantee(productDTO.getGuarantee());

        List<ImageProducts> imageProducts = new ArrayList<>();
        for (MultipartFile image : imageProduct){
            String imageUrl = saveImage(image);
            ImageProducts imageProductTemp = imageProductService.add(imageUrl, iDProduct);
            imageProducts.add(imageProductTemp);
        }
        System.out.printf("1111\n");
        List<Specifications> specifications = new ArrayList<>();
        for (SpecificationDTO specification : productDTO.getSpecification()){
            Specifications specificationTemp = specificationService.add(specification,iDProduct);
            specifications.add(specificationTemp);
        }
        System.out.printf("2222\n");
        List<PriceLists> priceLists = new ArrayList<>();
        for (PriceListDTO priceListDTO : productDTO.getPriceList()){
            PriceLists priceListsTemp = priceListService.addPriceList(priceListDTO, user.getIDAccount(),iDProduct);
            priceLists.add(priceListsTemp);
        }
        System.out.printf("3333\n");
        productUpdate.setPriceLists(priceLists);
        productUpdate.setImageProducts(imageProducts);
        productUpdate.setSpecifications(specifications);

        productRepository.save(productUpdate);

        return true;
    }

    @Override
    public boolean removeProduct(int iDProduct) {

        Products product = productRepository.getReferenceById(iDProduct);

        if(product == null)
            return false;

        productRepository.delete(product);
        return true;
    }

    @Override
    public Products getProductById(int iDProduct) {
        return productRepository.findById(iDProduct).get();
    }

    @Override
    public List<Products> getProduct() {
        return productRepository.findAll();
    }

    @Override
    public List<Products> getProductByPage(int page, int size) {
        int offset = (page-1) * size;
        Pageable pageable = PageRequest.of(page, size);
        List<Products> productList = productRepository.getProductsByPage(offset, size);

        for(Products product : productList){
            List<PriceLists> price = new ArrayList<>();
            for(PriceLists item : product.getPriceLists()){
                if(item.getStatus() == true && item.getType().equals("export"))
                {
                    price.add(item);
                    break;
                }
            }
            product.setPriceLists(price);
        }
        return productList;
    }

    @Override
    public List<Products> getProductByCategoryByPage(int iDCategory, int page, int size) {
        int offset = (page-1) * size;
        List<Products> productList = productRepository.getProductsByCategoryByPage(iDCategory, offset, size);

        for(Products product : productList){
            List<PriceLists> price = new ArrayList<>();
            for(PriceLists item : product.getPriceLists()){
                if(item.getStatus() == true && item.getType().equals("export"))
                {
                    price.add(item);
                    break;
                }
            }
            product.setPriceLists(price);
        }
        return productList;
    }

    private String saveImage(MultipartFile image) {
        try {
            String urlImage = imageProductService.save(image);
            System.out.println(urlImage);
//            String fileName = image.getOriginalFilename();
//            Path filePath = Paths.get(UPLOAD_DIR, fileName);
//            Files.write(filePath, image.getBytes());
            return urlImage;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

//    private MultipartFile convertPathToMultipartFile(String filePath) {
//        try {
//            Path path = Paths.get(filePath);
//            String fileName = path.getFileName().toString();
//            String contentType = Files.probeContentType(path);
//
//            byte[] content = Files.readAllBytes(path);
//
//            return new MockMultipartFile(fileName, fileName, contentType, content);
//        } catch (IOException e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
}
