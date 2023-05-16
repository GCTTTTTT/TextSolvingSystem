package com.example.demo2.service.impl;

import com.example.demo2.dao.AdminUserMapper;
import com.example.demo2.entity.User;
import com.example.demo2.service.AdminUserService;
import com.example.demo2.util.APageResult;
import com.example.demo2.util.PageQueryUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Param：20201003013
 * Author：李镇荣
 * Data：2023/5/11
 */
@Service
public class AdminUserServiceImpl implements AdminUserService {

    @Autowired
    private AdminUserMapper adminUserMapper;

    @Override
    public APageResult getUsersPage(PageQueryUtil pageUtil) {
        List<User> users = adminUserMapper.findUserList(pageUtil);
        int total = adminUserMapper.getTotalUser(pageUtil);
        APageResult pageResult = new APageResult(users, total, pageUtil.getLimit(), pageUtil.getPage());
        return pageResult;
    }

    @Override
    public Boolean resetUserPassword(Integer[] ids) {
        if (ids.length < 1) {
            return false;
        }
        return adminUserMapper.resetUserPassword(ids) > 0;
    }


}
