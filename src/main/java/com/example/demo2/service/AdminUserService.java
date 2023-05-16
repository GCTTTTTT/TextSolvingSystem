package com.example.demo2.service;

import com.example.demo2.util.APageResult;
import com.example.demo2.util.PageQueryUtil;

/**
 * Param：20201003013
 * Author：李镇荣
 * Data：2023/5/11
 */
public interface AdminUserService {
    /**
     * 后台分页
     *
     * @param pageUtil
     * @return
     */
    APageResult getUsersPage(PageQueryUtil pageUtil);



    /**
     * 重置用户密码用户
     */
    Boolean resetUserPassword(Integer[] ids);



}
