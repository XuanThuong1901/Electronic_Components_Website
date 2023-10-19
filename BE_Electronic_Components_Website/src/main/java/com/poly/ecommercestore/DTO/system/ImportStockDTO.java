package com.poly.ecommercestore.DTO.system;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ImportStockDTO {
    private String importStockName;
    private String contents;
//    private String employer;
    private Integer supplier;
    private List<DetailImportDTO> detailImportStocks;

    public ImportStockDTO() {
    }

    public ImportStockDTO(String importStockName, String contents, Integer supplier, List<DetailImportDTO> detailImportStocks) {
        this.importStockName = importStockName;
        this.contents = (contents != null) ? contents : "N/A";
//        this.employer = employer;
        this.supplier = supplier;
        this.detailImportStocks = (detailImportStocks == null) ? null : new ArrayList<>();
    }
}
