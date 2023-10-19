package com.poly.ecommercestore.service.status;

import com.poly.ecommercestore.entity.Status;
import com.poly.ecommercestore.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatusService implements IStatusService{

    @Autowired
    private StatusRepository statusRepository;

    @Override
    public List<Status> getStatus(String type) {
        return statusRepository.getStatusByType(type);
    }
}
