package com.poly.ecommercestore.service.shippingunit;

import com.poly.ecommercestore.configuration.JWTUnit;
import com.poly.ecommercestore.entity.Accounts;
import com.poly.ecommercestore.entity.ShippingUnits;
import com.poly.ecommercestore.repository.ShippingUnitRepository;
import com.poly.ecommercestore.DTO.system.ShippingUnitDTO;
import com.poly.ecommercestore.service.token.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShippingUnitService implements IShippingUnitService{

    @Autowired
    private JWTUnit jwtUnit;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private ShippingUnitRepository shippingUnitRepository;

    @Override
    public List<ShippingUnits> getAllShippingUnit() {
        return shippingUnitRepository.findAll();
    }

    @Override
    public Boolean addShippingUnit(String tokenHeader, ShippingUnitDTO shippingUnit) {
        Accounts user = tokenService.getAccountByToken(tokenHeader);
        if(user == null || user.getRole().getIDRole() != 2)
            return false;

        if(shippingUnitRepository.getShippingUnits(shippingUnit.getShippingUnitName(), shippingUnit.getEmail(), shippingUnit.getTelephone()).size() != 0)
            return false;
        System.out.println("11");

        ShippingUnits newShippingUnit = new ShippingUnits(shippingUnit.getShippingUnitName(), shippingUnit.getEmail(), shippingUnit.getTelephone(), shippingUnit.getAddress());
        shippingUnitRepository.save(newShippingUnit);

        return true;
    }

    @Override
    public Boolean updateShippingUnit(String tokenHeader, ShippingUnitDTO shippingUnit, int iDShippingUnit) {

        Accounts account = tokenService.getAccountByToken(tokenHeader);
        if(account == null || account.getRole().getIDRole() != 2)
            return false;

        ShippingUnits updateShippingUnit = shippingUnitRepository.getReferenceById(iDShippingUnit);

        if(updateShippingUnit == null)
            return false;


        updateShippingUnit.setAddress(shippingUnit.getAddress());

        if (shippingUnitRepository.save(updateShippingUnit) == null)
            return false;

        return true;
    }

    @Override
    public Boolean deleteShippingUnit(int iDShippingUnit) {

        ShippingUnits shippingUnit = shippingUnitRepository.getReferenceById(iDShippingUnit);

        if(shippingUnit == null || shippingUnit.getOrders().size() != 0)
            return false;

        shippingUnitRepository.delete(shippingUnit);
        return true;
    }
}
