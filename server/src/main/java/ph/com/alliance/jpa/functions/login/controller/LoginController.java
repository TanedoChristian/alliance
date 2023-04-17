
package ph.com.alliance.jpa.functions.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

//import javax.annotation.Resource;

//import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.itextpdf.text.pdf.PdfStructTreeController.returnType;

import ph.com.alliance.jpa.common.ApiResult;
import ph.com.alliance.jpa.functions.login.service.LoginService;


@RestController
public class LoginController {
	
	  @Autowired
	  LoginService loginService = new LoginService();
	  
	  @PostMapping("/login")
	  public Object login(@RequestBody Object test) {
		  return test;
	  }
        
//    @Resource(name="tokenServices")
//    ConsumerTokenServices tokenServices;
//
//    @RequestMapping(value = "/logout/{tokenId}", method = RequestMethod.DELETE)
//    public void logout(@PathVariable String tokenId)  {
//        tokenServices.revokeToken(tokenId);    
//    }
}
