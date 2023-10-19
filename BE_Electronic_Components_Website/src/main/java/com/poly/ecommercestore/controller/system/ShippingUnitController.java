package com.poly.ecommercestore.controller.system;

import com.poly.ecommercestore.DTO.system.ShippingUnitDTO;
import com.poly.ecommercestore.common.Message;
import com.poly.ecommercestore.configuration.JWTUnit;
import com.poly.ecommercestore.entity.Accounts;
import com.poly.ecommercestore.service.shared.ECommerceMessage;
import com.poly.ecommercestore.service.shippingunit.ShippingUnitService;
import com.poly.ecommercestore.service.token.TokenService;
import com.poly.ecommercestore.util.ValidateInput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/shipping_unit")
public class ShippingUnitController {

    @Autowired
    private ShippingUnitService shippingUnitService;

    @GetMapping("")
    public ResponseEntity<?> getAllShippingUnit(){
        return ResponseEntity.ok(shippingUnitService.getAllShippingUnit());
    }

    @PostMapping("/add")
    private ResponseEntity<?> addShippingUnit(@RequestHeader("access_token")String tokenHeader, @RequestBody ShippingUnitDTO shippingUnit){
        if(shippingUnit.getShippingUnitName().isEmpty()){
            return ResponseEntity.badRequest().body(Message.VALIDATION_NAME_SHIPPING_UNIT_ERROR001);
        }
        if(shippingUnit.getEmail().isEmpty()){
            return ResponseEntity.badRequest().body(Message.VALIDATION_EMAIL_SHIPPING_UNIT_ERROR001);
        }
        if(shippingUnit.getTelephone().isEmpty()){
            return ResponseEntity.badRequest().body(Message.VALIDATION_TELEPHONE_SHIPPING_UNIT_ERROR001);
        }
        if(shippingUnit.getAddress().isEmpty()){
            return ResponseEntity.badRequest().body(Message.VALIDATION_ADDRESS_SHIPPING_UNIT_ERROR001);
        }
        if(!ValidateInput.isPhoneNumber(shippingUnit.getTelephone())){
            return ResponseEntity.badRequest().body(Message.VALIDATION_TELEPHONE_SHIPPING_UNIT_ERROR002);
        }

        if(shippingUnitService.addShippingUnit(tokenHeader, shippingUnit) == null)
            return ResponseEntity.badRequest().body(Message.ADD_SHIPPING_UNIT_ERROR001);

        return ResponseEntity.ok(Message.ADD_SHIPPING_UNIT_SUCCESS);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> updateShippingUnit(@RequestHeader("access_token") String tokenHeader, @RequestBody ShippingUnitDTO shippingUnit, @PathVariable(value = "id") int id){
        if(shippingUnit.getShippingUnitName().isEmpty()){
            return ResponseEntity.badRequest().body(Message.VALIDATION_NAME_SHIPPING_UNIT_ERROR001);
        }
        if(shippingUnit.getEmail().isEmpty()){
            return ResponseEntity.badRequest().body(Message.VALIDATION_EMAIL_SHIPPING_UNIT_ERROR001);
        }
        if(shippingUnit.getTelephone().isEmpty()){
            return ResponseEntity.badRequest().body(Message.VALIDATION_TELEPHONE_SHIPPING_UNIT_ERROR001);
        }
        if(shippingUnit.getAddress().isEmpty()){
            return ResponseEntity.badRequest().body(Message.VALIDATION_ADDRESS_SHIPPING_UNIT_ERROR001);
        }
        if(shippingUnitService.updateShippingUnit(tokenHeader, shippingUnit, id) == null){
            return ResponseEntity.badRequest().body(Message.UPDATE_SHIPPING_UNIT_ERROR001);
        }

        return ResponseEntity.ok(Message.UPDATE_SHIPPING_UNIT_SUCCESS);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteShippingUnit(@PathVariable(value = "id") int id){
        if(shippingUnitService.deleteShippingUnit(id) == false)
            return ResponseEntity.badRequest().body(Message.DELETE_SHIPPING_UNIT_ERROR001);

        return ResponseEntity.ok(Message.DELETE_SHIPPING_UNIT_SUCCESS);
    }

}
