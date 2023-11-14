package com.poly.ecommercestore.controller.system;

import com.poly.ecommercestore.DTO.system.ReportDTO;
import com.poly.ecommercestore.response.report.ReportSaleResponse;
import com.poly.ecommercestore.service.report.IReportService;
import com.poly.ecommercestore.service.report.ReportServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("admin/report")
public class ReportController {

    private final ReportServiceImpl iReportService;

    @PostMapping("")
    public ResponseEntity<ReportSaleResponse> getSale(@RequestBody ReportDTO request){
        try {
            System.out.println(request.getStartDay());
            ReportSaleResponse response = iReportService.reportSale(request);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            ReportSaleResponse response = ReportSaleResponse.builder()
                    .message(e.toString())
                    .build();
            return ResponseEntity.badRequest().body(response);
        }

    }
}