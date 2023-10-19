package com.poly.ecommercestore.service.Evaluation;

import com.poly.ecommercestore.DTO.client.EvaluationDTO;
import com.poly.ecommercestore.entity.Accounts;
import com.poly.ecommercestore.entity.Evaluations;
import com.poly.ecommercestore.entity.Products;
import com.poly.ecommercestore.repository.EvaluationRepository;
import com.poly.ecommercestore.repository.ProductRepository;
import com.poly.ecommercestore.service.token.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class EvaluationService implements IEvaluationService{

    @Autowired
    private TokenService tokenService;

    @Autowired
    private EvaluationRepository evaluationRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    @Override
    public Boolean addEvaluation(String tokenHeader, int idProduct, EvaluationDTO evaluationDTO) {
       try{
           Accounts user = tokenService.getAccountByToken(tokenHeader);
           if(user == null)
               return false;
           System.out.printf("\n\nUser\n\n");
           Products product = productRepository.findById(idProduct).get();
           if(product == null)
               return false;
           System.out.printf("\n\nproduct\n\n");
           Date createDate = new Date();
           Evaluations evaluation = new Evaluations(evaluationDTO.getContents(), evaluationDTO.getEvaluate(), createDate, user.getCustomers(), product);
           evaluationRepository.save(evaluation);
           System.out.printf("\n\nadd\n\n");
           return true;
       }
       catch (Exception ex){
           System.out.printf(ex.toString());
           return false;
       }

    }

    @Override
    public List<Evaluations> getEvaluationByProduct(int idProduct) {
        return evaluationRepository.getEvaluationsByProduct(idProduct);
    }

    @Override
    public Evaluations getEvaluation(int id) {
        return evaluationRepository.findById(id).get();
    }
}
