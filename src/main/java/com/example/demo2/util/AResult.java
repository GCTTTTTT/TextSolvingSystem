package com.example.demo2.util;

import java.io.Serializable;

/**
 * Param：20201003013
 * Author：李镇荣
 * Data：2023/5/9
 */
public class AResult<T> implements Serializable {
    private static final long serialVersionUID = 1L;
    private int resultCode;
    private String message;
    private T data;

    public AResult() {
    }

    public AResult(int resultCode, String message) {
        this.resultCode = resultCode;
        this.message = message;
    }

    public int getResultCode() {
        return resultCode;
    }

    public void setResultCode(int resultCode) {
        this.resultCode = resultCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Result{" +
                "resultCode=" + resultCode +
                ", message='" + message + '\'' +
                ", data=" + data +
                '}';
    }
}

