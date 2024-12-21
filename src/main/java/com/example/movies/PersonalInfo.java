package com.example.movies;

public class PersonalInfo {
    String firstName;
    String lastName;
    String email;
    String password;
    String confirmPassword;
    String cardType;
    String paymentInfo;
    String expirationDate;
    int promotion;
    int status;
    int userType;
    String address;
    String phoneNumber;
    String paymentMethod;

    PersonalInfo(String firstName,
            String lastName,
            String email,
            String password,
            String confirmPassword,
            String phoneNumber,
            String cardType,
            String paymentInfo,
            String expirationDate,
            int promotion,
            int status,
            int userType,
            String address,
            String paymentMethod) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.paymentInfo = paymentInfo;
        this.cardType = cardType;
        this.confirmPassword = confirmPassword;
        this.expirationDate = expirationDate;
        this.promotion = promotion;
        this.address = address;
        this.paymentMethod = paymentMethod;
        this.phoneNumber = phoneNumber;
        this.status = status;
        this.userType = userType;
    }
}
