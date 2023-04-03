package com.shopping.member.impl;

import javax.inject.Inject;

import javax.servlet.http.HttpSession;
import org.springframework.stereotype.Service;
import com.shopping.member.A_Shop_MemberVO;
import com.shopping.member.dao.A_Shop_MemberDAO;

@Service
public class A_Shop_MemberServiceImpl implements A_Shop_MemberService {
	
	@Inject
	private A_Shop_MemberDAO dao;

	//회원가입
	@Override
	public void signup(A_Shop_MemberVO vo) throws Exception {
		dao.signup(vo);
		
	}
    //로그인
	@Override
	public A_Shop_MemberVO signin(A_Shop_MemberVO vo) throws Exception {
		// TODO Auto-generated method stub
		System.out.println("콘솔테스트");
		return dao.signin(vo);
		
	}

	//로그아웃
	@Override
	public void signout(HttpSession session) throws Exception {
		session.invalidate();  // 세션 정보를 제거
		
	}

}
