package com.poly.ecommercestore.service.cart;

import com.poly.ecommercestore.entity.Carts;
import com.poly.ecommercestore.DTO.client.CartDTO;

import java.util.List;

public interface ICartService {

    List<Carts> getCartByCustomer(String iDCustomer);

    Carts addCart(String iDCustomer, int iDProduct, CartDTO cart);

    Boolean deleteCart(String iDCustomer, int iDProduct);

    Boolean updateCart(String iDCustomer, int iDProduct, CartDTO cart);

    List<Carts> selectCart(String iDCustomer, List<CartDTO> cart);
}
