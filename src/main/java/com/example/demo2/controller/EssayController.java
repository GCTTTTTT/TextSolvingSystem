package com.example.demo2.controller;

import com.example.demo2.common.ServiceResultEnum;
import com.example.demo2.entity.AdminEssay;
import com.example.demo2.service.AdminEssayService;
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
 * Data：2023/5/14
 */
@Controller
@RequestMapping("/user")
public class EssayController {
    @Resource
    AdminEssayService adminEssayService;

    @GetMapping("/essay")
    public String essayPage(HttpServletRequest request) {
        System.out.println("正在调用0");
        request.setAttribute("path", "essay");
        return "user/essay";
    }

    /**
     * 列表
     */
    @RequestMapping(value = "/essay/list", method = RequestMethod.GET)
    @ResponseBody
    public AResult list(@RequestParam Map<String, Object> params) {
        System.out.println("正在调用1");
        if (ObjectUtils.isEmpty(params.get("page")) || ObjectUtils.isEmpty(params.get("limit"))) {
            return AResultGenerator.genFailResult("参数异常！");
        }
        PageQueryUtil pageUtil = new PageQueryUtil(params);
        return AResultGenerator.genSuccessResult(adminEssayService.getEssayPage(pageUtil));
    }

    /**
     * 详情
     */
    @GetMapping("/essay/info/{id}")
    @ResponseBody
    public AResult info(@PathVariable("id") Integer id) {
        System.out.println("正在调用2");
        AdminEssay adminEssay = adminEssayService.getEssayById(id);
        if (adminEssay == null) {
            return AResultGenerator.genFailResult(ServiceResultEnum.DATA_NOT_EXIST.getResult());
        }
        return AResultGenerator.genSuccessResult(adminEssay);
    }

}


