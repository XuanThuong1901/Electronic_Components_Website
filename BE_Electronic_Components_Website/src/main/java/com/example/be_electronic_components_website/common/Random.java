package com.example.be_electronic_components_website.common;


public class Random {

    public static int randomNumber(){
        java.util.Random random = new java.util.Random();
        int numberRandom = random.nextInt(99999999) + 10000000;
        return numberRandom;
    }
}
