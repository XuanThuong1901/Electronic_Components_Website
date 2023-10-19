package com.poly.ecommercestore.service.Tax;

import com.poly.ecommercestore.entity.Tax;
import com.poly.ecommercestore.repository.TaxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaxService implements ITaxService{

    @Autowired
    private TaxRepository taxRepository;

    @Override
    public List<Tax> getAllTax() {
        return taxRepository.findAll();
    }
}
