package com.poly.ecommercestore.service.report;

import com.poly.ecommercestore.DTO.system.ReportDTO;
import com.poly.ecommercestore.response.report.ReportSaleProductResponse;
import com.poly.ecommercestore.response.report.ReportSaleResponse;

public interface IReportService {
    ReportSaleResponse reportSale(ReportDTO request);

    ReportSaleProductResponse reportSaleProduct(ReportDTO request);
}
