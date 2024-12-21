package com.example.movies;

public class Promotion {
    public String title;
    public String startDate;
    public String endDate;
    public String discount;
    public String promoCode;

    // Constructor
    public Promotion(String title, String description, String promoCode, String startDate, String endDate, String discount) {
        this.title = title;
        this.promoCode = promoCode;
        this.startDate = startDate;
        this.endDate = endDate;
        this.discount = discount;
    }

    // Default constructor (required for JSON conversion)
    public Promotion() {}
}
