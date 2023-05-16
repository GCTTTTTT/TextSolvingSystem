package com.example.demo2.entity;

import lombok.Data;


/**
 * Param：20201003013
 * Author：李镇荣
 * Data：2023/5/7
 */

@Data
public class AdminUser {
    Integer adminId;
    String loginUserName;
    String loginPassword;
    String nickName;

    public Integer getAdminId() {
        return adminId;
    }

    public void setAdminId(Integer adminId) {
        this.adminId = adminId;
    }

    public String getLoginUserName() {
        return loginUserName;
    }

    public void setLoginUserName(String loginUserName) {
        this.loginUserName = loginUserName;
    }

    public String getLoginPassword() {
        return loginPassword;
    }

    public void setLoginPassword(String loginPassword) {
        this.loginPassword = loginPassword;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }




}
