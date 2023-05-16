package com.example.demo2.dao;

import com.example.demo2.entity.User;
import com.example.demo2.util.PageQueryUtil;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Param：20201003013
 * Author：李镇荣
 * Data：2023/5/11
 */
public interface AdminUserMapper {
    int deleteByPrimaryKey(Long userId);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Long userId);

    User selectByLoginName(String loginName);

    User selectByLoginNameAndPasswd(@Param("loginName") String loginName, @Param("password") String password);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    List<User> findUserList(PageQueryUtil pageUtil);

    int getTotalUser(PageQueryUtil pageUtil);

    int resetUserPassword(@Param("ids") Integer[] ids);
}
