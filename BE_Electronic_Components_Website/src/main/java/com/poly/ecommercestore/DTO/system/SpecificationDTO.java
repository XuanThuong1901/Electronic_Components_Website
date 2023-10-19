package com.poly.ecommercestore.DTO.system;

import lombok.Data;

@Data
public class SpecificationDTO {
    private int idspecification;
    private String specificationName;
    private String parameter;

    public SpecificationDTO() {
    }

    public SpecificationDTO(Integer idspecification, String specificationName, String parameter) {
        this.idspecification = (idspecification != null) ? idspecification : 0;
        this.specificationName = specificationName;
        this.parameter = parameter;
    }
}
