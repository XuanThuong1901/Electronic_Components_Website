package com.poly.ecommercestore.controller.client;

import com.poly.ecommercestore.DTO.client.EvaluationDTO;
import com.poly.ecommercestore.common.Message;
import com.poly.ecommercestore.service.Evaluation.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/evaluation")
public class EvaluationController {

    @Autowired
    private EvaluationService evaluationService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getEvaluation(@PathVariable(value = "id") int id)
    {
        return ResponseEntity.ok(evaluationService.getEvaluationByProduct(id));
    }

    @PostMapping("/create/{id}")
    public ResponseEntity<?> createEvaluation(@RequestHeader("access_token") String tokenHeader, @PathVariable(value = "id") int id, @RequestBody EvaluationDTO evaluationDTO)
    {
        if(evaluationDTO.getEvaluate() == 0){
            return ResponseEntity.badRequest().body(Message.VALIDATION_EVALUATE_ERROR001);
        }
        if(evaluationService.addEvaluation(tokenHeader, id, evaluationDTO))
            return ResponseEntity.ok(Message.EVALUATION_SUCCESS);
        return ResponseEntity.badRequest().body(Message.EVALUATION_ERROR001);
    }
}
