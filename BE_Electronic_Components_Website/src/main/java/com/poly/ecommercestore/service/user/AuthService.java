package com.poly.ecommercestore.service.user;

import com.poly.ecommercestore.entity.*;
import com.poly.ecommercestore.repository.*;
import com.poly.ecommercestore.DTO.client.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Random;

@Service
public class AuthService implements IAuthService{

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

    private static final int lengthID = 10;
    private static final int iDStatus = 1;
    private static final String UPLOAD_DIR = "D:\\NAM4-HK3\\THUCTAPTOTNGHIEP\\ecommercestore-web-customer\\src\\assets\\images\\avatar";


    @Override
    public boolean createCustomer(UserDTO user) {
        try {
            Accounts newAccount = new Accounts();
            Status status = statusRepository.getStatusById(iDStatus);
            Roles role = roleRepository.getRoleById(1);
//        String encoderPassword = passwordEncoder.encode(user.getPassword());

            newAccount.setEmail(user.getEmail());
            newAccount.setStatus(status);
            newAccount.setRole(role);
            String newID = "CUS" + generateRandomString();
            newAccount.setIDAccount(newID);
            newAccount.setPassword(user.getPassword());

            Customers newCustomer = new Customers(newID, newAccount, user.getName(), user.getAddress(), user.getTelephone());

            newAccount.setCustomers(newCustomer);
            this.accountRepository.save(newAccount);
            this.customerRepository.save(newCustomer);

            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean createEmployee(UserDTO user, MultipartFile avatar) {
        try {
            Accounts newAccount = new Accounts();
            Status status = statusRepository.getStatusById(iDStatus);
            Roles role = roleRepository.getRoleById(user.getRole());
//        String encoderPassword = passwordEncoder.encode(user.getPassword());

            newAccount.setEmail(user.getEmail());
            newAccount.setStatus(status);
            newAccount.setRole(role);

            String newID = "EMP" + generateRandomString();
            newAccount.setIDAccount(newID);
            Random random = new Random();
            int newPassword = random.nextInt(999999 - 100000 + 1) + 100000;
            newAccount.setPassword(Integer.toString(newPassword));
            String newAvatar = saveImage(avatar);
            Employers newEmployer = new Employers(newID, newAccount,user.getName(), user.getAddress(), user.getBirthday(), user.isGender(), user.getTelephone(), user.getIdentityCard(), "avatar3.jpg");


            newAccount.setEmployer(newEmployer);
            this.accountRepository.save(newAccount);
            this.employerRepository.save(newEmployer);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public Accounts getAccountByLogin(String email, String password) {
        //        String encoderPassword = passwordEncoder.encode(password);
        return accountRepository.findByLogin(email, password);
    }

    @Override
    public Boolean resetPassword(String email) {
        Accounts account = accountRepository.getByEmail(email);
        if(account == null)
            return false;
        Random random = new Random();
        int newPassword = random.nextInt(999999 - 100000 + 1) + 100000;
        account.setPassword(Integer.toString(newPassword));
        accountRepository.save(account);
        return true;
    }

    public static String generateRandomString() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < lengthID; i++) {
            int randomIndex = random.nextInt(characters.length());
            char randomChar = characters.charAt(randomIndex);
            sb.append(randomChar);
        }
        return sb.toString();
    }

    private String saveImage(MultipartFile image) {
        try {
            String fileName = image.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR, fileName);
            Files.write(filePath, image.getBytes());
            return fileName;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
