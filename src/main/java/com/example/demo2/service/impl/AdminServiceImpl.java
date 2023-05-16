package com.example.demo2.service.impl;

import com.example.demo2.dao.AdminMapper;
import com.example.demo2.entity.AdminUser;
import com.example.demo2.service.AdminService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Param：20201003013
 * Author：李镇荣
 * Data：2023/5/7
 */
@Service
public class AdminServiceImpl implements AdminService {

    @Resource
    private AdminMapper adminMapper;

    @Override
    public AdminUser login(String userName, String password) {
        return adminMapper.login(userName, password);
    }

    @Override
    public AdminUser getUserDetailById(Integer loginUserId) {
        return adminMapper.selectByPrimaryKey(loginUserId);
    }

    @Override
    public Boolean updatePassword(Integer loginUserId, String originalPassword, String newPassword) {
        AdminUser adminUser = adminMapper.selectByPrimaryKey(loginUserId);
        //当前用户非空才可以进行更改
        if (adminUser != null) {
            //比较原密码是否正确
            if (originalPassword.equals(adminUser.getLoginPassword())) {
                //设置新密码并修改
                adminUser.setLoginPassword(newPassword);
                if (adminMapper.updateByPrimaryKeySelective(adminUser) > 0) {
                    //修改成功则返回true
                    return true;
                }
            }
        }
        return false;
    }

    @Override
    public Boolean updateName(Integer loginUserId, String loginUserName, String nickName) {
        AdminUser adminUser = adminMapper.selectByPrimaryKey(loginUserId);
        //当前用户非空才可以进行更改
        if (adminUser != null) {
            //设置新名称并修改
            adminUser.setLoginUserName(loginUserName);
            adminUser.setNickName(nickName);
            if (adminMapper.updateByPrimaryKeySelective(adminUser) > 0) {
                //修改成功则返回true
                return true;
            }
        }
        return false;
    }
}
