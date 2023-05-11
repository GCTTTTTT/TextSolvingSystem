package com.example.demo2;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

//@SpringBootApplication(exclude= {DataSourceAutoConfiguration.class})
@MapperScan("com.example.demo2.dao")
@SpringBootApplication
public class Demo2Application {

    public static void main(String[] args) {
        SpringApplication.run(Demo2Application.class, args);
    }

}
