package com.poly.ecommercestore.service.importstock;

import com.poly.ecommercestore.entity.ImportStocks;
import com.poly.ecommercestore.DTO.system.ImportStockDTO;

import java.util.List;

public interface IImportStockService {

    boolean addImportStock(ImportStockDTO importStock, String tokenHeader);

    List<ImportStocks> getAllImportStock();

    ImportStocks updateImportStock(ImportStockDTO importStock);

    ImportStocks getOneImportStock(int iDImportStock);

    Boolean completeImport(String tokenHeader, int idImport);
}
