package com.poly.ecommercestore.controller.client;

import com.poly.ecommercestore.DTO.client.CartDTO;
import com.poly.ecommercestore.common.Message;
import com.poly.ecommercestore.configuration.JWTUnit;
import com.poly.ecommercestore.service.cart.CartService;
import com.poly.ecommercestore.service.shared.ECommerceMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("")
    public ResponseEntity<?> getCart(@RequestHeader("access_token") String tokenHeader){
        return ResponseEntity.ok(cartService.getCartByCustomer(tokenHeader));
    }

    @PostMapping("/add/{idProduct}")
    public ResponseEntity<?> addCart(@RequestHeader("access_token") String tokenHeader, @RequestBody CartDTO cart, @PathVariable(value = "idProduct") int idProduct){
        if(cart.getQuantity() == null || cart.getQuantity() == 0)
            return ResponseEntity.badRequest().body(Message.VALIDATION_QUANTITY_CART_ERROR001);

        if(cartService.addCart(tokenHeader, idProduct, cart) == null)
            return ResponseEntity.badRequest().body(Message.VALIDATION_ADD_CART_ERROR001);

        return ResponseEntity.ok(Message.ADD_CART_SUCCESS);
    }

    @PostMapping("/update/{idProduct}")
    public ResponseEntity<?> updateCart(@RequestHeader("access_token") String tokenHeader, @RequestBody CartDTO cart, @PathVariable(value = "idProduct") int idProduct){
        if(cart.getQuantity() == null || cart.getQuantity() == 0)
            return ResponseEntity.badRequest().body(Message.VALIDATION_QUANTITY_CART_ERROR001);

        if(cartService.updateCart(tokenHeader, idProduct, cart) == false)
            return ResponseEntity.badRequest().body(Message.VALIDATION_UPDATE_CART_ERROR001);

        return ResponseEntity.ok(Message.UPDATE_CART_SUCCESS);
    }

    @DeleteMapping("/delete/{idProduct}")
    public ResponseEntity<?> deleteCart(@RequestHeader("access_token") String tokenHeader, @PathVariable(value = "idProduct") int idProduct){

        if(cartService.deleteCart(tokenHeader, idProduct) == false)
            return ResponseEntity.badRequest().body(Message.VALIDATION_DELETE_CART_ERROR001);

        return ResponseEntity.ok(Message.DELETE_CART_SUCCESS);
    }
}
