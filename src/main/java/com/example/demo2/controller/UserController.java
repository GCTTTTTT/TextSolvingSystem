package com.example.demo2.controller;

import com.example.demo2.dao.UserMapper;
import com.example.demo2.entity.User;
import com.example.demo2.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * @projectName: demo2
 * @package: com.example.demo2.controller
 * @className: UserController
 * @author: GCT
 * @description: TODO
 * @date: 2023/3/29 12:27
 * @version: 1.0
 */
@RestController //!!!
@RequestMapping("user")
public class UserController {
    @Autowired
    UserMapper userMapper;

    @PostMapping("login")
    public Result<User> login(@RequestParam("username") String username,
                              @RequestParam("password") String password,
                              Model model, HttpSession session){
        System.out.println("loginController");
        //用从前端获取的username、password进行查询
//        System.out.println(username);
//        System.out.println(password);
        User user1 = userMapper.queryUserByUp(username,password);
//        List<User> user1 = userMapper.queryUserByUp(username);
//        User user2 = userMapper.queryUserByUp("qqq","qqq");
//        List<User> user2 = userMapper.queryUserByUp("qqq");
//        System.out.println("user2 "+user2);

        System.out.println(user1);
        if (!(user1==null)){
            session.setAttribute("loginUser",username);
//            return "redirect:/main.html";
//            return "demo1";
            return Result.success(user1,"登录成功！");
        }
        else {
            model.addAttribute("msg","用户名或者密码错误");
//            return "login";
            return Result.error("123","账号或密码错误！");
        }

    }

    @PostMapping("register")
    public Result<User> register(@RequestParam("username") String username,
                        @RequestParam("password") String password,
                        Model model,HttpSession session){

        User user = new User();

        List<User> user1 = userMapper.queryUserByUserName(username);

//        System.out.println(user1);

        if (!user1.isEmpty()){
            model.addAttribute("msg","用户名存在");
//            return "register";
            return Result.error("456","用户名已存在！");
        } else {
            //保存输入的用户名和密码
//            user.setUsername(username);
            user.setStudentId("");
            user.setStudentName(username);
            user.setPassword(password);
//            System.out.println(user);
            userMapper.addUser(user);
//            session.setAttribute("loginUser",username);
            model.addAttribute("msg","注册成功");
//            return "login";
            return Result.success(user,"注册成功！");
        }
    }


}
