package com.example.movies;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Autowired;
public class UpdatePaymentCard{
    String expirationDate;
    String cardType;
    String cardNumber;
    String billingAddress;
    String prevCardNumber;
    UpdatePaymentCard(String expirationDate,
    String cardType,
    String cardNumber,
    String billingAddress,
    String prevCardNumber) {
        this.expirationDate = expirationDate;
        this.cardType = cardType;
        this.cardNumber = cardNumber;
        this.billingAddress = billingAddress;
        this.prevCardNumber = prevCardNumber;
    }
}
