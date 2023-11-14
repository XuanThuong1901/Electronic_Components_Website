package com.poly.ecommercestore.DTO.system;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReportDTO {
    private Date startDay;
    private Date endDay;
    private String type;
}
