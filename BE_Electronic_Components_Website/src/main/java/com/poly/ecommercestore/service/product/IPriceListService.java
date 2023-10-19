package com.poly.ecommercestore.service.product;

import com.poly.ecommercestore.entity.PriceLists;
import com.poly.ecommercestore.DTO.system.PriceListDTO;

import java.util.List;

public interface IPriceListService {

    List<PriceLists> getPriceListByProduct(int iDProduct);

    PriceLists addPriceList(PriceListDTO price, String iDEmployer, int iDProduct);

    Boolean updateStatusPriceList(int iDProduct);
}
