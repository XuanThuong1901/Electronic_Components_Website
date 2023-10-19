//package com.poly.ecommercestore.configuration;
//
//import org.springframework.stereotype.Component;
//
//import javax.mail.*;
//import javax.mail.internet.InternetAddress;
//import javax.mail.internet.MimeMessage;
//import java.util.Properties;
//
//@Component
//public class EmailSender {
//
//        // Thông tin tài khoản email của bạn
//        String fromEmail = "nxthuong1901@gmail.com";
//        String password = "nxthuong007236";
//
//        // Thông tin người nhận
//        String toEmail = "recipient@example.com";
//
//        public boolean sendEmail(String toEmail, String content){
//            Properties properties = new Properties();
//            properties.put("mail.smtp.auth", "true");
//            properties.put("mail.smtp.starttls.enable", "true");
//            properties.put("mail.smtp.host", "smtp.example.com");
//            properties.put("mail.smtp.port", "587");
//        }
//        // Cấu hình thông tin máy chủ email
//
//
//        // Tạo một phiên gửi email
//        Session session = Session.getInstance(properties, new Authenticator() {
//            @Override
//            protected PasswordAuthentication getPasswordAuthentication() {
//                return new PasswordAuthentication(fromEmail, password);
//            }
//        });
//
////        try {
////            // Tạo đối tượng MimeMessage
////            Message message = new MimeMessage(session);
////
////            // Đặt thông tin người gửi
////            message.setFrom(new InternetAddress(fromEmail));
////
////            // Đặt thông tin người nhận
////            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
////
////            // Đặt tiêu đề email
////            message.setSubject("Subject of the Email");
////
////            // Đặt nội dung email
////            String emailContent = "This is the content of the email.";
////            message.setText(emailContent);
////
////            // Gửi email
////            Transport.send(message);
////
////            System.out.println("Email sent successfully!");
////
////        } catch (Exception e) {
////            e.printStackTrace();
////        }
//}
