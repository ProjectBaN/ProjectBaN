package com.shopping.member.dao;

import javax.inject.Inject;


import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.shopping.member.A_Shop_MemberVO;

@Repository
public class A_Shop_MemberDAOImpl implements A_Shop_MemberDAO {

	@Inject
	private SqlSession sql;
	
	//매퍼
	private static String namespace ="com.shopping.a_shop_memberMapper.xml";
	
	//회원가입
	@Override
	public void signup(A_Shop_MemberVO vo) throws Exception {
		sql.insert(namespace + ".signup", vo);
		System.out.println("test");
	}

	//로그인
	@Override
	public A_Shop_MemberVO signin(A_Shop_MemberVO vo) throws Exception {
		return sql.selectOne(namespace + ".signin", vo);
	}
}
