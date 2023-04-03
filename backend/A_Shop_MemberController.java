package com.shopping.controller;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.shopping.member.A_Shop_MemberVO;
import com.shopping.member.impl.A_Shop_MemberService;


@Controller
@RequestMapping("/a_shop_member/*")
public class A_Shop_MemberController {
	
	private static final Logger logger = LoggerFactory.getLogger(A_Shop_MemberController.class);
	
	@Inject
	A_Shop_MemberService service;

	//비밀번호 암호화
	@Autowired
	BCryptPasswordEncoder passEncoder;
	  
	// 회원가입 get
	@RequestMapping(value = "/signup", method = RequestMethod.GET)
	public void getSignup() throws Exception {
		System.out.println("test");
	 logger.info("get signup");
	
	}

	// 회원가입 post
	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	public String postSignup(A_Shop_MemberVO vo) throws Exception {
		System.out.println("test");
	 logger.info("post signup");
	  
	 String inputPass = vo.getPW();
	 String pass = passEncoder.encode(inputPass);
	 vo.setId("test");
	 vo.setPW(pass);

	 service.signup(vo);

	 return "redirect:/";
	}
	
	
	//---------------------------------------------------------------------------
	//수정전
	// 로그인 get
	@RequestMapping(value = "/signin", method = RequestMethod.GET)
	public void getSignin() throws Exception {
	 logger.info("get signin");
	}
	
	//수정후
//	@RequestMapping(value = "/signin", method = RequestMethod.GET)
//	public String getSignin(A_Shop_MemberVO vo) throws Exception {
//	 logger.info("get 로그인화면으로 이동");
//	return "signin.jsp";
//	}
	
	

	// 로그인 post
	@RequestMapping(value = "/signin", method = RequestMethod.POST)
	public String postSignin(A_Shop_MemberVO vo, HttpServletRequest req, RedirectAttributes rttr) throws Exception {
	 logger.info("post signin");
	 
	 System.out.println("vo : " + vo);
	 
	 A_Shop_MemberVO login = service.signin(vo);  // MemverVO형 변수 login에 로그인 정보를 저장
	 HttpSession session = req.getSession();      // 현재 세션 정보를 가져옴
	 
	 boolean passMatch = passEncoder.matches(vo.getPW(), login.getPW()); //디비 비밀번호값 비교
	 System.out.println("passMatch : " + passMatch);
	 
	 if(login != null && passMatch) {
	    session.setAttribute("a_shop_member", login);
	    
	 } else {
	    session.setAttribute("a_shop_member", null);
	  rttr.addFlashAttribute("msg", false);
	  return "redirect:/member/signin";
	 }  
	 System.out.println("왜 계속 안되!!!");
	 return "redirect:/";
	}
	  
	// 로그아웃
	@RequestMapping(value = "/signout", method = RequestMethod.GET)
	public String signout(HttpSession session) throws Exception {
	 logger.info("get logout");
	 
	 service.signout(session);
	   
	 //return "redirect:/";
	 return "home.jsp";
	}
	
	

}
