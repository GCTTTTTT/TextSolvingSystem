package com.example.demo2.util;

import org.springframework.util.StringUtils;

/**
 * Param：20201003013
 * Author：李镇荣
 * Data：2023/5/9
 */
public class AResultGenerator {
    private static final String DEFAULT_SUCCESS_MESSAGE = "SUCCESS";
    private static final String DEFAULT_FAIL_MESSAGE = "FAIL";
    private static final int RESULT_CODE_SUCCESS = 200;
    private static final int RESULT_CODE_SERVER_ERROR = 500;

    public static AResult genSuccessResult() {
        AResult result = new AResult();
        result.setResultCode(RESULT_CODE_SUCCESS);
        result.setMessage(DEFAULT_SUCCESS_MESSAGE);
        return result;
    }

    public static AResult genSuccessResult(String message) {
        AResult result = new AResult();
        result.setResultCode(RESULT_CODE_SUCCESS);
        result.setMessage(message);
        return result;
    }

    public static AResult genSuccessResult(Object data) {
        AResult result = new AResult();
        result.setResultCode(RESULT_CODE_SUCCESS);
        result.setMessage(DEFAULT_SUCCESS_MESSAGE);
        result.setData(data);
        return result;
    }

    public static AResult genFailResult(String message) {
        AResult result = new AResult();
        result.setResultCode(RESULT_CODE_SERVER_ERROR);
        if (!StringUtils.hasText(message)) {
            result.setMessage(DEFAULT_FAIL_MESSAGE);
        } else {
            result.setMessage(message);
        }
        return result;
    }

    public static AResult genErrorResult(int code, String message) {
        AResult result = new AResult();
        result.setResultCode(code);
        result.setMessage(message);
        return result;
    }
}
