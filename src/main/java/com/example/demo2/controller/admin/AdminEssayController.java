package com.example.demo2.controller.admin;

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
import java.util.Objects;

/**
 * Param：20201003013
 * Author：李镇荣
 * Data：2023/5/8
 */
@Controller
@RequestMapping("/admin")
public class AdminEssayController {
    @Resource
    AdminEssayService adminEssayService;

    @GetMapping("/essay")
    public String essayPage(HttpServletRequest request) {
        request.setAttribute("path", "essay");
        return "admin/essay";
    }

    /**
     * 列表
     */
    @RequestMapping(value = "/essay/list", method = RequestMethod.GET)
    @ResponseBody
    public AResult list(@RequestParam Map<String, Object> params) {
        if (ObjectUtils.isEmpty(params.get("page")) || ObjectUtils.isEmpty(params.get("limit"))) {
            return AResultGenerator.genFailResult("参数异常！");
        }
        PageQueryUtil pageUtil = new PageQueryUtil(params);
        return AResultGenerator.genSuccessResult(adminEssayService.getEssayPage(pageUtil));
    }

    /**
     * 添加
     */
    @RequestMapping(value = "/essay/save", method = RequestMethod.POST)
    @ResponseBody
    public AResult save(@RequestBody AdminEssay adminEssay) {
        String result = adminEssayService.saveEssay(adminEssay);
        if (ServiceResultEnum.SUCCESS.getResult().equals(result)) {
            return AResultGenerator.genSuccessResult();
        } else {
            return AResultGenerator.genFailResult(result);
        }
    }


    /**
     * 修改
     */
    @RequestMapping(value = "/essay/update", method = RequestMethod.POST)
    @ResponseBody
    public AResult update(@RequestBody AdminEssay adminEssay) {
        if (Objects.isNull(adminEssay.getAdminEssayId())) {
            return AResultGenerator.genFailResult("参数异常！");
        }
        String result = adminEssayService.updateEssay(adminEssay);
        if (ServiceResultEnum.SUCCESS.getResult().equals(result)) {
            return AResultGenerator.genSuccessResult();
        } else {
            return AResultGenerator.genFailResult(result);
        }
    }

    /**
     * 详情
     */
    @GetMapping("/essay/info/{id}")
    @ResponseBody
    public AResult info(@PathVariable("id") Integer id) {
        AdminEssay adminEssay = adminEssayService.getEssayById(id);
        if (adminEssay == null) {
            return AResultGenerator.genFailResult(ServiceResultEnum.DATA_NOT_EXIST.getResult());
        }
        return AResultGenerator.genSuccessResult(adminEssay);
    }

    /**
     * 删除
     */
    @RequestMapping(value = "/essay/delete", method = RequestMethod.POST)
    @ResponseBody
    public AResult delete(@RequestBody Integer[] ids) {
        if (ids.length < 1) {
            return AResultGenerator.genFailResult("参数异常！");
        }
        if (adminEssayService.deleteBatch(ids)) {
            return AResultGenerator.genSuccessResult();
        } else {
            return AResultGenerator.genFailResult("删除失败");
        }
    }

}

