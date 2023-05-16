package com.example.demo2.service.impl;

import com.example.demo2.common.ServiceResultEnum;
import com.example.demo2.dao.AdminEssayMapper;
import com.example.demo2.entity.AdminEssay;
import com.example.demo2.service.AdminEssayService;
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
public class AdminEssayServiceImpl implements AdminEssayService {
    @Autowired
    private AdminEssayMapper adminEssayMapper;

    @Override
    public APageResult getEssayPage(PageQueryUtil pageUtil) {
        List<AdminEssay> adminEssay = adminEssayMapper.findEssayList(pageUtil);
        int total = adminEssayMapper.getTotalEssay(pageUtil);
        APageResult aPageResult = new APageResult(adminEssay, total, pageUtil.getLimit(), pageUtil.getPage());
        return aPageResult;
    }

    @Override
    public String saveEssay(AdminEssay adminEssay) {
        if (adminEssayMapper.insertSelective(adminEssay) > 0) {
            return ServiceResultEnum.SUCCESS.getResult();
        }
        return ServiceResultEnum.DB_ERROR.getResult();
    }

    @Override
    public String updateEssay(AdminEssay adminEssay) {
        AdminEssay temp = adminEssayMapper.selectByPrimaryKey(adminEssay.getAdminEssayId());
        if (temp == null) {
            return ServiceResultEnum.DATA_NOT_EXIST.getResult();
        }
        temp.setAdminUserId(1);
        temp.setEssayTitle(adminEssay.getEssayTitle());
        temp.setEssayRequire(adminEssay.getEssayRequire());
        temp.setEssayExample(adminEssay.getEssayExample());
        if (adminEssayMapper.updateByPrimaryKeySelective(temp) > 0) {
            return ServiceResultEnum.SUCCESS.getResult();
        }
        return ServiceResultEnum.DB_ERROR.getResult();
    }

    @Override
    public AdminEssay getEssayById(Integer id) {
        return adminEssayMapper.selectByPrimaryKey(id);
    }

    @Override
    public Boolean deleteBatch(Integer[] ids) {
        if (ids.length < 1) {
            return false;
        }
        //删除数据
        return adminEssayMapper.deleteBatch(ids) > 0;
    }

}
