package com.example.demo2.entity;

import lombok.Data;

/**
 * Param：20201003013
 * Author：李镇荣
 * Data：2023/5/7
 */
@Data
public class AdminStudentEssay {

    Integer studentEssayId;
    Integer adminEssayId;
    String studentId;
    String studentName;
    String studentEssay;
    Float studentScore;

    public Integer getStudentEssayId() {
        return studentEssayId;
    }

    public void setStudentEssayId(Integer studentEssayId) {
        this.studentEssayId = studentEssayId;
    }

    public Integer getAdminEssayId() {
        return adminEssayId;
    }

    public void setAdminEssayId(Integer adminEssayId) {
        this.adminEssayId = adminEssayId;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentEssay() {
        return studentEssay;
    }

    public void setStudentEssay(String studentEssay) {
        this.studentEssay = studentEssay;
    }

    public Float getStudentScore() {
        return studentScore;
    }

    public void setStudentScore(Float studentScore) {
        this.studentScore = studentScore;
    }
}
