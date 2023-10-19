package com.poly.ecommercestore.service.importstock;

import com.poly.ecommercestore.configuration.JWTUnit;
import com.poly.ecommercestore.entity.*;
import com.poly.ecommercestore.entity.embeddable.DetailImportStockId;
import com.poly.ecommercestore.repository.*;
import com.poly.ecommercestore.DTO.system.DetailImportDTO;
import com.poly.ecommercestore.DTO.system.ImportStockDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ImportStockService implements IImportStockService{

    @Autowired
    private JWTUnit jwtUnit;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ImportStockRepository importStockRepository;

    @Autowired
    private DetailImportStockRepository detailImportStockRepository;
//
//    @Autowired
//    private EmployerRepository employerRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private StatusRepository statusRepository;

    private final int PROCESSING = 8;
    private final int COMPLETED = 9;

    @Override
    public ImportStocks addImportStock(ImportStockDTO importStock, String tokenHeader) {

        if(importStock.getDetailImportStocks() == null)
            return null;

        Accounts account = getUserByToken(tokenHeader);
//        Employers employer = employerRepository.getEmployersById(importStock.getEmployer());
        if(account.getEmployer() == null)
            return null;

        Suppliers supplier = supplierRepository.getReferenceById(importStock.getSupplier());
        if(supplier == null)
            return null;

        Status status = statusRepository.getReferenceById(PROCESSING);
        if(supplier == null)
            return null;

        ImportStocks newImportStock = new ImportStocks();
        newImportStock.setEmployer(account.getEmployer());
        newImportStock.setSupplier(supplier);
        newImportStock.setStatus(status);
        newImportStock.setImportStockName(importStock.getImportStockName());
        newImportStock.setContents(importStock.getContents());
        newImportStock.setDateAdded(new Date());
        newImportStock.setUpdatedDate(new Date());

        newImportStock = importStockRepository.save(newImportStock);

        List<DetailImportStocks> newDetailImportStocks = new ArrayList<>();
        BigDecimal amount = new BigDecimal(0);
        for (DetailImportDTO detailImport : importStock.getDetailImportStocks()){

            Products product = productRepository.getProductByName(detailImport.getProduct());

            if(product == null)
                return null;

            DetailImportStockId detailImportStockId = new DetailImportStockId(newImportStock.getIDImportStock(), product.getIDProduct());

            DetailImportStocks detailImportStockTemp = new DetailImportStocks(detailImportStockId, detailImport.getQuantity(), detailImport.getPrice(), newImportStock, product);
            newDetailImportStocks.add(detailImportStockTemp);
            amount = amount.add(detailImport.getPrice().multiply(BigDecimal.valueOf(detailImport.getQuantity())));
            product.setQuantity(product.getQuantity() + detailImport.getQuantity());
            productRepository.save(product);
        }
        newImportStock.setAmount(amount);
        importStockRepository.save(newImportStock);
        detailImportStockRepository.saveAll(newDetailImportStocks);

        return newImportStock;
    }

    @Override
    public List<ImportStocks> getAllImportStock() {
        return importStockRepository.findAll();
    }

    @Override
    public ImportStocks updateImportStock(ImportStockDTO importStock) {
        return null;
    }

    @Override
    public ImportStocks getOneImportStock(int iDImportStock) {
        return importStockRepository.findById(iDImportStock).get();
    }

    @Override
    public Boolean completeImport(String tokenHeader, int idImport) {
        Accounts account = getUserByToken(tokenHeader);
        ImportStocks importStock = importStockRepository.findById(idImport).get();
        if(account == null || importStock == null)
            return false;
        Status status = statusRepository.findById(COMPLETED).get();
        importStock.setStatus(status);
        importStockRepository.save(importStock);
        return true;
    }

    private Accounts getUserByToken(String tokenHeader){
        String token = tokenHeader.replace("Bearer ", "");
        String email = jwtUnit.extractEmail(token);
        Accounts account = accountRepository.getByEmail(email);
        return  account;
    }
}
