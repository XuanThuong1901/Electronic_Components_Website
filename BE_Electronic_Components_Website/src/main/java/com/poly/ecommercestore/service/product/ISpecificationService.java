package com.poly.ecommercestore.service.product;

import com.poly.ecommercestore.DTO.system.SpecificationDTO;
import com.poly.ecommercestore.entity.Specifications;

import java.util.List;

public interface ISpecificationService {
    List<Specifications> getByProduct(int iDProduct);

    Specifications add(SpecificationDTO specificationDTO, int iDProduct);

    Boolean update(SpecificationDTO specificationDTO, int idSpec);

    Boolean delete(int idSpec);
}
