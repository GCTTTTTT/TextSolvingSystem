package com.example.demo2.dao;

import com.example.demo2.entity.AdminEssay;
import com.example.demo2.util.PageQueryUtil;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Param：20201003013
 * Author：李镇荣
 * Data：2023/5/8
 */
@Mapper
@Component
public interface AdminEssayMapper {
    int deleteByPrimaryKey(Integer essayId);

    int insert(AdminEssay record);

    int insertSelective(AdminEssay record);

    AdminEssay selectByPrimaryKey(Integer essayId);

    int updateByPrimaryKeySelective(AdminEssay record);

    int updateByPrimaryKey(AdminEssay record);

    List<AdminEssay> findEssayList(PageQueryUtil pageUtil);

    int getTotalEssay(PageQueryUtil pageUtil);

    int deleteBatch(Integer[] ids);

    List<AdminEssay> findEssayByNum(@Param("number") int number);
}