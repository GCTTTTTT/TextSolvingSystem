package com.example.demo2.dao;

import com.example.demo2.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Mapper
@Component
public interface UserMapper {
    //通过账号密码来查询信息
    User queryUserByUp(@RequestParam("username") String username, @RequestParam("password") String password);
    //查询所有用户
    List<User> queryUserList();
    //增加用户
    int addUser(@RequestParam("user") User user);
    //通过用户名来进行查询
    List<User> queryUserByUserName(@RequestParam("username") String username);

}
