package com.example.movies;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Autowired;
public class PaymentCard{
    String expirationDate;
    String cardType;
    String cardNumber;
    String billingAddress;
    String userID;
    PaymentCard(String expirationDate,
    String cardType,
    String cardNumber,
    String billingAddress,
    String userID) {
        this.expirationDate = expirationDate;
        this.cardType = cardType;
        this.cardNumber = cardNumber;
        this.billingAddress = billingAddress;
        this.userID = userID;
    }
}
