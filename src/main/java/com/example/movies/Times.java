package com.example.movies;
import java.util.ArrayList;
public class Times {
    public String date;
    public ArrayList <String>times;
    Times(String date) {
        this.date = date;
        times = new ArrayList<>();
    }
    void addTime(String time) {
        times.add(time);
    }
    ArrayList<String> getTimes() {
        return times;
    }
}
