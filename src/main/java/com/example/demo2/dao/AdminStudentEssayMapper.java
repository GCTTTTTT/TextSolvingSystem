package com.example.demo2.dao;

import com.example.demo2.entity.AdminStudentEssay;
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
public interface AdminStudentEssayMapper {
    int deleteByPrimaryKey(Integer studentEssayId);

    int insert(AdminStudentEssay record);

    int insertSelective(AdminStudentEssay record);

    AdminStudentEssay selectByPrimaryKey(Integer studentEssayId);

    int updateByPrimaryKeySelective(AdminStudentEssay record);

    int updateByPrimaryKey(AdminStudentEssay record);

    List<AdminStudentEssay> findStudentEssayList(PageQueryUtil pageUtil);

    int getTotalStudentEssay(PageQueryUtil pageUtil);

    int deleteBatch(Integer[] ids);

    List<AdminStudentEssay> findStudentEssayByNum(@Param("number") int number);
}