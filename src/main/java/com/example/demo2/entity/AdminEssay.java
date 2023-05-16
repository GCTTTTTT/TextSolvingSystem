package com.example.demo2.entity;

import lombok.Data;

/**
 * Param：20201003013
 * Author：李镇荣
 * Data：2023/5/7
 */
@Data
public class AdminEssay {
    Integer adminEssayId;
    Integer adminUserId;
    String essayTitle;
    String essayRequire;
    String essayExample;

    public Integer getAdminEssayId() {
        return adminEssayId;
    }

    public void setAdminEssayId(Integer adminEssayId) {
        this.adminEssayId = adminEssayId;
    }

    public Integer getAdminUserId() {
        return adminUserId;
    }

    public void setAdminUserId(Integer adminUserId) {
        this.adminUserId = adminUserId;
    }

    public String getEssayTitle() {
        return essayTitle;
    }

    public void setEssayTitle(String essayTitle) {
        this.essayTitle = essayTitle;
    }

    public String getEssayRequire() {
        return essayRequire;
    }

    public void setEssayRequire(String essayRequire) {
        this.essayRequire = essayRequire;
    }

    public String getEssayExample() {
        return essayExample;
    }

    public void setEssayExample(String essayExample) {
        this.essayExample = essayExample;
    }
}
