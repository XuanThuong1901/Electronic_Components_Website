package com.poly.ecommercestore.service.supplier;

import com.poly.ecommercestore.configuration.JWTUnit;
import com.poly.ecommercestore.entity.Accounts;
import com.poly.ecommercestore.entity.Suppliers;
import com.poly.ecommercestore.repository.AccountRepository;
import com.poly.ecommercestore.repository.SupplierRepository;
import com.poly.ecommercestore.DTO.system.SupplierDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService implements ISupplierService{

    @Autowired
    private JWTUnit jwtUnit;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Boolean addSupplier(String tokenHeader, SupplierDTO supplier) {
        Accounts user = getUserByToken(tokenHeader);
        if(user == null || user.getRole().getIDRole() != 2)
            return false;

        if(supplierRepository.getSuppliers(supplier.getSupplierName(), supplier.getEmail(), supplier.getTelephone()).size() != 0)
            return false;

        Suppliers newSupplier = new Suppliers(supplier.getSupplierName(), supplier.getEmail(), supplier.getTelephone(), supplier.getAddress());

        supplierRepository.save(newSupplier);

        return true;
    }

    @Override
    public List<Suppliers> getAllSupplier() {
        return supplierRepository.findAll();
    }

    @Override
    public Boolean updateSupplier(String tokenHeader, SupplierDTO supplier, int iDSupplier) {

        Accounts user = getUserByToken(tokenHeader);
        if(user == null || user.getRole().getIDRole() != 2)
            return false;
        Suppliers updateSupplier = supplierRepository.getReferenceById(iDSupplier);
        if(updateSupplier == null)
            return false;

//        updateSupplier.setSupplierName(supplier.getSupplierName());
//        updateSupplier.setEmail(supplier.getEmail());
//        updateSupplier.setTelephone(supplier.getTelephone());
        updateSupplier.setAddress(supplier.getAddress());

        supplierRepository.save(updateSupplier);

        return true;
    }

    @Override
    public Boolean deleteSupplier(int iDSupplier) {

        Suppliers supplier = supplierRepository.findById(iDSupplier).get();
        if(supplier == null || supplier.getProducts().size() != 0)
            return false;

        supplierRepository.delete(supplier);
        return true;
    }

    private Accounts getUserByToken(String tokenHeader){
        String token = tokenHeader.replace("Bearer", "");
        String email = jwtUnit.extractEmail(token);
        Accounts account = accountRepository.getByEmail(email);
        return account;
    }
}
