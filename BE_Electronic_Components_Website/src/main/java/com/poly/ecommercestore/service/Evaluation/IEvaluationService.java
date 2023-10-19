package com.poly.ecommercestore.service.Evaluation;

import com.poly.ecommercestore.DTO.client.EvaluationDTO;
import com.poly.ecommercestore.entity.Evaluations;

import java.util.List;

public interface IEvaluationService {

    Boolean addEvaluation(String tokenHeader, int idProduct, EvaluationDTO evaluationDTO);

    List<Evaluations> getEvaluationByProduct(int idProduct);

    Evaluations getEvaluation(int id);
}
