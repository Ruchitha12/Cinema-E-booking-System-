package com.example.movies;

import java.sql.Date;

public class Show {

    public int showID;
    public int movieID;
    public int screenID;
    public int periodID;
    public Date date;

    public Show(int showID, int movieID, int screenID, int periodID, Date date) {
        this.showID = showID;
        this.movieID = movieID;
        this.screenID = screenID;
        this.periodID = periodID;
        this.date = date;
    }
}
