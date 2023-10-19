package com.poly.ecommercestore.controller.system;

import com.poly.ecommercestore.DTO.system.ImportStockDTO;
import com.poly.ecommercestore.common.Message;
import com.poly.ecommercestore.service.importstock.ImportStockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/import")
public class ImportStockController {

    @Autowired
    private ImportStockService importStockService;

    @GetMapping("")
    public ResponseEntity<?> getAllImport(){
        return ResponseEntity.ok(importStockService.getAllImportStock());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getImport(@PathVariable(value = "id") int id){
        return ResponseEntity.ok(importStockService.getOneImportStock(id));
    }


    @PostMapping("/add")
    public ResponseEntity<?> addImport(@RequestHeader("access_token") String tokenHeader, @RequestBody ImportStockDTO importStock){
        if(importStock.getImportStockName() == null){
            return ResponseEntity.badRequest().body(Message.VALIDATION_NAME_IMPORT_ERROR001);
        }
//        if(importStock.getEmployer() == null){
//            return ResponseEntity.badRequest().body("Import not employer");
//        }
        if(importStock.getSupplier() == null){
            return ResponseEntity.badRequest().body(Message.VALIDATION_SUPPLIER_IMPORT_ERROR001);
        }
        if(importStock.getDetailImportStocks() == null){
            return ResponseEntity.badRequest().body(Message.VALIDATION_DETAIL_IMPORT_ERROR001);
        }

        if(importStockService.addImportStock(importStock, tokenHeader) == null){
            return ResponseEntity.badRequest().body(Message.VALIDATION_IMPORT_ERROR001);
        }

        return ResponseEntity.ok(Message.IMPORT_SUCCESS);
    }

    @GetMapping("/complete/{id}")
    public ResponseEntity<?> completeImport(@RequestHeader("access_token") String tokenHeader, @PathVariable(value = "id") int id){
        if(importStockService.completeImport(tokenHeader, id))
            return ResponseEntity.ok(Message.COMPLETE_IMPORT_SUCCESS);
        return ResponseEntity.badRequest().body(Message.VALIDATION_COMPLETE_IMPORT_ERROR001);
    }
}
