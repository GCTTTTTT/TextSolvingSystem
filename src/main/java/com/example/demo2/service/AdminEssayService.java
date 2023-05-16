package com.example.demo2.service;

import com.example.demo2.entity.AdminEssay;
import com.example.demo2.util.APageResult;
import com.example.demo2.util.PageQueryUtil;

/**
 * Param：20201003013
 * Author：李镇荣
 * Data：2023/5/8
 */
public interface AdminEssayService {
    /**
     * 后台分页
     * @ param pageUtil
     * @ return
     */
    APageResult getEssayPage(PageQueryUtil pageUtil);

    String saveEssay(AdminEssay adminEssay);

    String updateEssay(AdminEssay adminEssay);

    AdminEssay getEssayById(Integer id);

    Boolean deleteBatch(Integer[] ids);


}
