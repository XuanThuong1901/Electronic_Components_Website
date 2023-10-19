package com.poly.ecommercestore.controller.system;

import com.poly.ecommercestore.DTO.system.SupplierDTO;
import com.poly.ecommercestore.common.Message;
import com.poly.ecommercestore.service.shared.ECommerceMessage;
import com.poly.ecommercestore.service.supplier.SupplierService;
import com.poly.ecommercestore.util.ValidateInput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/supplier")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @GetMapping("")
    public ResponseEntity<?> getAllSupplier(){
        return ResponseEntity.ok(supplierService.getAllSupplier());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addSupplier(@RequestHeader("access_token") String tokenHeader, @RequestBody SupplierDTO supplier){
        if(supplier.getSupplierName().isEmpty()){
            return ResponseEntity.badRequest().body(Message.VALIDATION_NAME_SUPPLIER_ERROR001);
        }
        if(supplier.getEmail().isEmpty()){
            return ResponseEntity.badRequest().body(Message.VALIDATION_EMAIL_SUPPLIER_ERROR001);
        }
        if(supplier.getTelephone().isEmpty()){
            return ResponseEntity.badRequest().body(Message.VALIDATION_TELEPHONE_SUPPLIER_ERROR001);
        }
        if(supplier.getAddress().isEmpty()){
            return ResponseEntity.badRequest().body(Message.VALIDATION_ADDRESS_SUPPLIER_ERROR001);
        }
        if(!ValidateInput.isPhoneNumber(supplier.getTelephone())){
            return ResponseEntity.badRequest().body(Message.VALIDATION_TELEPHONE_SUPPLIER_ERROR002);
        }


        if(supplierService.addSupplier(tokenHeader, supplier))
            return ResponseEntity.ok(Message.ADD_SUPPLIER_SUCCESS);
        return ResponseEntity.badRequest().body(Message.ADD_SUPPLIER_ERROR001);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> updateSupplier(@RequestHeader("access_token") String tokenHeader, @RequestBody SupplierDTO supplier, @PathVariable(value = "id") int id){

        if(supplier.getSupplierName().isEmpty()){
            return ResponseEntity.badRequest().body(Message.VALIDATION_NAME_SUPPLIER_ERROR001);
        }
        if(supplier.getEmail().isEmpty()){
            return ResponseEntity.badRequest().body(Message.VALIDATION_EMAIL_SUPPLIER_ERROR001);
        }
        if(supplier.getTelephone().isEmpty()){
            return ResponseEntity.badRequest().body(Message.VALIDATION_TELEPHONE_SUPPLIER_ERROR001);
        }
        if(supplier.getAddress().isEmpty()){
            return ResponseEntity.badRequest().body(Message.VALIDATION_ADDRESS_SUPPLIER_ERROR001);
        }
        if(!ValidateInput.isPhoneNumber(supplier.getTelephone())){
            return ResponseEntity.badRequest().body(Message.VALIDATION_TELEPHONE_SUPPLIER_ERROR002);
        }

        if(supplierService.updateSupplier(tokenHeader,supplier, id)){
            return ResponseEntity.ok(Message.UPDATE_SUPPLIER_SUCCESS);
        }
        return ResponseEntity.badRequest().body(Message.UPDATE_SUPPLIER_ERROR001);


    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSupplier(@PathVariable(value = "id") int id){
        if(supplierService.deleteSupplier(id) == false)
            return ResponseEntity.badRequest().body(Message.DELETE_SUPPLIER_ERROR001);

        return ResponseEntity.ok(Message.DELETE_SUPPLIER_SUCCESS);
    }
}
