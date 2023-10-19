package com.poly.ecommercestore.service.supplier;

import com.poly.ecommercestore.entity.Suppliers;
import com.poly.ecommercestore.DTO.system.SupplierDTO;

import java.util.List;

public interface ISupplierService {

    Boolean addSupplier(String tokenHeader, SupplierDTO supplier);

    List<Suppliers> getAllSupplier();

    Boolean updateSupplier(String tokenHeader, SupplierDTO supplier, int iDSupplier);

    Boolean deleteSupplier(int iDSupplier);
}
