package com.example.demo2.service.impl;

import com.example.demo2.common.ServiceResultEnum;
import com.example.demo2.dao.AdminStudentEssayMapper;
import com.example.demo2.entity.AdminStudentEssay;
import com.example.demo2.service.AdminStudentEssayService;
import com.example.demo2.util.APageResult;
import com.example.demo2.util.PageQueryUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Param：20201003013
 * Author：李镇荣
 * Data：2023/5/8
 */
@Service
public class AdminStudentEssayServiceImpl implements AdminStudentEssayService {
    @Autowired
    private AdminStudentEssayMapper adminStudentEssayMapper;

    @Override
    public APageResult getStudentEssayPage(PageQueryUtil pageUtil) {
        List<AdminStudentEssay> adminStudentEssay = adminStudentEssayMapper.findStudentEssayList(pageUtil);
        int total = adminStudentEssayMapper.getTotalStudentEssay(pageUtil);
        APageResult aPageResult = new APageResult(adminStudentEssay, total, pageUtil.getLimit(), pageUtil.getPage());
        return aPageResult;
    }

    @Override
    public String saveStudentEssay(AdminStudentEssay adminStudentEssay) {
        if (adminStudentEssayMapper.insertSelective(adminStudentEssay) > 0) {
            return ServiceResultEnum.SUCCESS.getResult();
        }
        return ServiceResultEnum.DB_ERROR.getResult();
    }


    @Override
    public AdminStudentEssay getStudentEssayById(Integer id) {
        return adminStudentEssayMapper.selectByPrimaryKey(id);
    }

    @Override
    public Boolean deleteBatch(Integer[] ids) {
        if (ids.length < 1) {
            return false;
        }
        //删除数据
        return adminStudentEssayMapper.deleteBatch(ids) > 0;
    }

}
