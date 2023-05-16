package com.example.demo2.entity;

import lombok.Data;

/**
 * @projectName: demo2
 * @package: com.example.demo2.entity
 * @className: User
 * @author: GCT
 * @description: TODO
 * @date: 2023/3/29 12:27
 * @version: 1.0
 */
@Data
public class User {
//    int id;
//    String username;
//    String password;
    Integer userId;
    String studentId;
    String password;
    String studentName;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }


}
