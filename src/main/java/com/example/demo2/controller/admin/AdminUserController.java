package com.example.demo2.controller.admin;

import com.example.demo2.service.AdminUserService;
import com.example.demo2.util.AResult;
import com.example.demo2.util.AResultGenerator;
import com.example.demo2.util.PageQueryUtil;
import org.springframework.stereotype.Controller;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * Param：20201003013
 * Author：李镇荣
 * Data：2023/5/11
 */
@Controller
@RequestMapping("/admin")
public class AdminUserController {

    @Resource
    private AdminUserService adminUserService;

    @GetMapping("/users")
    public String usersPage(HttpServletRequest request) {
        request.setAttribute("path", "users");
        return "admin/user";
    }

    /**
     * 列表
     */
    @RequestMapping(value = "/users/list", method = RequestMethod.GET)
    @ResponseBody
    public AResult list(@RequestParam Map<String, Object> params) {
        if (ObjectUtils.isEmpty(params.get("page")) || ObjectUtils.isEmpty(params.get("limit"))) {
            return AResultGenerator.genFailResult("参数异常！");
        }
        PageQueryUtil pageUtil = new PageQueryUtil(params);
        return AResultGenerator.genSuccessResult(adminUserService.getUsersPage(pageUtil));
    }

    /**
     * 重置用户密码
     */
    @RequestMapping(value = "/users/reset", method = RequestMethod.POST)
    @ResponseBody
    public AResult reset(@RequestBody Integer[] ids) {
        if (ids.length < 1) {
            return AResultGenerator.genFailResult("参数异常！");
        }
        if (adminUserService.resetUserPassword(ids)) {
            return AResultGenerator.genSuccessResult();
        } else {
            return AResultGenerator.genFailResult("重置失败");
        }
    }
}