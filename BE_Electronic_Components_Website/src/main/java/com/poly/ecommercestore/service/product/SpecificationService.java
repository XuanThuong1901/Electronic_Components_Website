package com.poly.ecommercestore.service.product;

import com.poly.ecommercestore.DTO.system.SpecificationDTO;
import com.poly.ecommercestore.entity.Products;
import com.poly.ecommercestore.entity.Specifications;
import com.poly.ecommercestore.repository.ProductRepository;
import com.poly.ecommercestore.repository.SpecificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecificationService implements ISpecificationService{

    @Autowired
    private SpecificationRepository specificationRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Specifications> getByProduct(int iDProduct) {
        return specificationRepository.getSpecificationsByProduct(iDProduct);
    }

    @Override
    public Specifications add(SpecificationDTO specificationDTO, int iDProduct) {

        if(specificationDTO.getSpecificationName().equals("")){
            return null;
        }
        if(specificationDTO.getParameter().equals("")){
            return null;
        }

        Specifications specifications = specificationRepository.checkSpecification(specificationDTO.getIdspecification());
        if(specifications != null)
            return null;
        try {
            Products products = productRepository.findById(iDProduct).get();
            Specifications newSpecifications = new Specifications(specificationDTO.getSpecificationName(), specificationDTO.getParameter(), products);

            return specificationRepository.save(newSpecifications);
        }catch (Exception e){

            System.out.printf(e.toString());
            return null;
        }
    }

    @Override
    public Boolean update(SpecificationDTO specificationDTO, int idSpec) {
        if(specificationDTO.getSpecificationName().equals("")){
            return false;
        }
        if(specificationDTO.getParameter().equals("")){
            return false;
        }

        try {

            Specifications specifications = specificationRepository.findById(idSpec).get();
            specifications.setSpecificationName(specificationDTO.getSpecificationName());
            specifications.setParameter(specificationDTO.getParameter());
            specificationRepository.save(specifications);
            return true;
        }catch (Exception e){
            System.out.printf(e.toString());
            return false;
        }
    }

    @Override
    public Boolean delete(int idSpec) {
        try {
            specificationRepository.deleteById(idSpec);
            return true;
        }
        catch (Exception e){
            System.out.printf(e.toString());
            return false;
        }
    }
}
