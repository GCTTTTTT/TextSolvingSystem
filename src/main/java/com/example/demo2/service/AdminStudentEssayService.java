package com.example.demo2.service;

import com.example.demo2.entity.AdminStudentEssay;
import com.example.demo2.util.APageResult;
import com.example.demo2.util.PageQueryUtil;

/**
 * Param：20201003013
 * Author：李镇荣
 * Data：2023/5/8
 */
public interface AdminStudentEssayService {
    /**
     * 后台分页
     * @ param pageUtil
     * @ return
     */
    APageResult getStudentEssayPage(PageQueryUtil pageUtil);

    String saveStudentEssay(AdminStudentEssay adminStudentEssay);

    AdminStudentEssay getStudentEssayById(Integer id);

    Boolean deleteBatch(Integer[] ids);


}
