package com.example.demo2.util;

/**
 * @projectName: demo2
 * @package: com.example.demo2.util
 * @className: Result
 * @author: GCT
 * @description: TODO
 * @date: 2023/3/29 16:11
 * @version: 1.0
 */
public class Result<T> {
    private String code;
    private String msg;


    private T data;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public Result() {
    }

    public Result(T data) {
        this.data = data;
    }

    public static Result success() {
        Result result = new Result<>();
        result.setCode("200");
        result.setMsg("成功");
        return result;
    }

    public static <T> Result<T> success(T data) {
        Result<T> result = new Result<>(data);
        result.setCode("200");
        result.setMsg("成功");
        return result;
    }

    public static <T> Result<T> success(T data, String msg) {
        Result<T> result = new Result<>(data);
        result.setCode("200");
        result.setMsg(msg);
        return result;
    }

    public static Result error(String code, String msg) {
        Result result = new Result();
        result.setCode(code);
        result.setMsg(msg);
        return result;
    }
}
