package com.example.demo2.controller.admin;

import com.example.demo2.common.ServiceResultEnum;
import com.example.demo2.entity.AdminStudentEssay;
import com.example.demo2.service.AdminStudentEssayService;
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
 * Data：2023/5/8
 */

@Controller
@RequestMapping("/admin/student")
public class AdminStudentEssayController {
    @Resource
    AdminStudentEssayService adminStudentEssayService;

    @GetMapping("/essay")
    public String essayPage(HttpServletRequest request) {
        request.setAttribute("path", "admin_student_essay");
        return "admin/admin_student_essay";
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
        return AResultGenerator.genSuccessResult(adminStudentEssayService.getStudentEssayPage(pageUtil));
    }

    /**
     * 添加
     */
    @RequestMapping(value = "/essay/save", method = RequestMethod.POST)
    @ResponseBody
    public AResult save(@RequestBody AdminStudentEssay adminStudentEssay) {
        String result = adminStudentEssayService.saveStudentEssay(adminStudentEssay);
        if (ServiceResultEnum.SUCCESS.getResult().equals(result)) {
            return AResultGenerator.genSuccessResult();
        } else {
            return AResultGenerator.genFailResult(result);
        }
    }


//    /**
//     * 修改
//     */
//    @RequestMapping(value = "/essay/update", method = RequestMethod.POST)
//    @ResponseBody
//    public AResult update(@RequestBody AdminStudentEssay adminStudentEssay) {
//        if (Objects.isNull(adminStudentEssay.getAdminEssayId())) {
//            return AResultGenerator.genFailResult("参数异常！");
//        }
//        String result = adminStudentEssayService.updateStudentEssay(adminEssay);
//        if (ServiceResultEnum.SUCCESS.getResult().equals(result)) {
//            return AResultGenerator.genSuccessResult();
//        } else {
//            return AResultGenerator.genFailResult(result);
//        }
//    }

    /**
     * 详情
     */
    @GetMapping("/essay/info/{id}")
    @ResponseBody
    public AResult info(@PathVariable("id") Integer id) {
        AdminStudentEssay adminStudentEssay = adminStudentEssayService.getStudentEssayById(id);
        if (adminStudentEssay == null) {
            return AResultGenerator.genFailResult(ServiceResultEnum.DATA_NOT_EXIST.getResult());
        }
        return AResultGenerator.genSuccessResult(adminStudentEssay);
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
        if (adminStudentEssayService.deleteBatch(ids)) {
            return AResultGenerator.genSuccessResult();
        } else {
            return AResultGenerator.genFailResult("删除失败");
        }
    }

}

