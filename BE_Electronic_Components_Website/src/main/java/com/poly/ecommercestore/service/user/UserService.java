package com.poly.ecommercestore.service.user;

import com.poly.ecommercestore.configuration.JWTUnit;
import com.poly.ecommercestore.entity.*;
import com.poly.ecommercestore.repository.*;
import com.poly.ecommercestore.DTO.client.AccountDTO;
import com.poly.ecommercestore.DTO.client.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements  IUserService{

    @Autowired
    private JWTUnit jwtUnit;
    @Autowired
    private AccountRepository accountRepository;

//    @Autowired
//    private PasswordEncoder passwordEncoder;

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EmployerRepository employerRepository;

    @Override
    public Accounts getUser(String tokenHeader) {
        Accounts account = getUserByToken(tokenHeader);
//        if(account.getCustomers() != null)
//            return account.getCustomers();

        return account;
    }

    @Override
    public Boolean updateUser(String tokenHeader, String idAccount, UserDTO userDTO) {

        Accounts user = getUserByToken(tokenHeader);

        try {
            if(user.getCustomers() != null){
                Customers updateCus = user.getCustomers();
                updateCus.setName(userDTO.getName());
                updateCus.setAddress(userDTO.getAddress());
                updateCus.setTelephone(userDTO.getTelephone());

                customerRepository.save(updateCus);

                return true;
            }
            else{
                Accounts updateAccount = accountRepository.findById(idAccount).get();
                Employers updateEmp = updateAccount.getEmployer();
                updateEmp.setName(userDTO.getName());
                updateEmp.setAddress(userDTO.getAddress());
                updateEmp.setTelephone(userDTO.getTelephone());
                updateEmp.setBirthday(userDTO.getBirthday());
                updateEmp.setGender(userDTO.isGender());
                updateEmp.setIdentityCard(userDTO.getIdentityCard());
                employerRepository.save(updateEmp);

                return true;
            }
        }
        catch (Exception e){
            System.out.printf(e.toString());
            return false;
        }
    }

    @Override
    public Boolean updatePassword(String tokenHeader, AccountDTO accountDTO) {
        try {
            Accounts updateAccount = getUserByToken(tokenHeader);
            if(updateAccount != null && updateAccount.getPassword().equals(accountDTO.getPassword())){
                updateAccount.setPassword(accountDTO.getNewPassword());
                accountRepository.save(updateAccount);
                return true;
            }
            return false;
        }
        catch (Exception ex){
            System.out.println(ex.toString());
            return false;
        }
    }

    @Override
    public Boolean setStatusUser(String tokenHeader, String idAccount, int idStatus) {
        Accounts accountAdmin = getUserByToken(tokenHeader);
        Accounts user = accountRepository.getById(idAccount);
        if(accountAdmin == null || user == null || accountAdmin.getIDAccount() == user.getIDAccount()){
            return false;
        }
        Status status = statusRepository.findById(idStatus).get();
        user.setStatus(status);
        accountRepository.save(user);
        return true;
    }

    private Accounts getUserByToken(String tokenHeader){
        String token = tokenHeader.replace("Bearer ", "");
        String email = jwtUnit.extractEmail(token);
        Accounts account = accountRepository.getByEmail(email);
        return  account;
    }
}
