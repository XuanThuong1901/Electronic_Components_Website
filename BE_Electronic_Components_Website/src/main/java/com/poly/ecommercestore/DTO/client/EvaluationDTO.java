package com.poly.ecommercestore.DTO.client;

import lombok.Data;

@Data
public class EvaluationDTO {
    private int evaluate;
    private String contents;

    public EvaluationDTO(int evaluate, String contents) {
        this.evaluate = evaluate;
        this.contents = contents;
    }

    public EvaluationDTO() {
    }
}
