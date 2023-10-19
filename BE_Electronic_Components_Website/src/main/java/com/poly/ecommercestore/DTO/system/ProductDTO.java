package com.poly.ecommercestore.DTO.system;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
public class ProductDTO {

    private String productName;
    private Integer category;
    private Integer supplier;
    private Integer tax;
    private Integer quantity;
    private String feature;
    private String contents;
    private String guarantee;
    private List<PriceListDTO> priceList;
    private List<MultipartFile> imageProduct;
    private List<SpecificationDTO> specification;

    public ProductDTO() {
    }

    public ProductDTO(Integer category, Integer supplier, Integer tax, String productName, Integer quantity, String feature, String contents, List<PriceListDTO> priceList, List<MultipartFile> imageProduct, List<SpecificationDTO> specification) {
        this.productName = productName;
        this.category = (category == null) ? category : 0;
        this.supplier = (supplier == null) ? supplier : 0;
        this.tax = (tax == null) ? tax : 0;
        this.quantity = (quantity == null) ? quantity : 0;
        this.feature = (feature != null) ? feature : "N/A";
        this.contents = (contents != null) ? contents : "N/A";
        this.guarantee = (guarantee != null) ? guarantee : "N/A";
        this.priceList = (priceList != null) ? priceList : new ArrayList<>();
        this.imageProduct = (imageProduct != null) ? imageProduct : new ArrayList<>();
        this.specification = (specification != null) ? specification : new ArrayList<>();
    }


}

