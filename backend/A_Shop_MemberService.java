package com.shopping.member.impl;

import javax.servlet.http.HttpSession;

import com.shopping.member.A_Shop_MemberVO;

public interface A_Shop_MemberService {
	
	//회원가입
	public void signup(A_Shop_MemberVO vo) throws Exception;
	
	//로그인
	public A_Shop_MemberVO signin(A_Shop_MemberVO vo) throws Exception;
	
	//로그아웃
	public void signout(HttpSession session) throws Exception;
	

}
