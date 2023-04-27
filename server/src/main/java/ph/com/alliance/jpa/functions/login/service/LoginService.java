package ph.com.alliance.jpa.functions.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Service;

import ph.com.alliance.jpa.entity.UserTest;
import ph.com.alliance.jpa.functions.employee.dao.IEmployeeDao;
import ph.com.alliance.jpa.functions.employee.model.Employee;
import ph.com.alliance.jpa.functions.employee.model.EmployeeModel;
import ph.com.alliance.jpa.functions.usertest.dao.UserTestDao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LoginService implements ILoginService, UserDetailsService, TokenEnhancer {

    @Autowired
    private UserTestDao userDao;
    
    @Autowired
    private IEmployeeDao employeeDao;
    
    @Override
    public UserDetails loadUserByUsername(String strLoginId) throws UsernameNotFoundException {

        EmployeeModel login = ((List<EmployeeModel>) employeeDao.findAll()).stream().filter(u -> u.getUsername().equals(strLoginId)).findFirst().orElse(null);
        
        if (null != login ) {
            return new User(strLoginId, login.getPassword(), getAuthorities(Arrays.asList("ROLE_ADMIN")));
        }
        throw new UsernameNotFoundException(strLoginId);
    }

    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        EmployeeModel employeeModel = ((List<EmployeeModel>) employeeDao.findAll()).stream().filter(u -> u.getUsername().equals(user.getUsername())).findFirst().orElse(null);
        final Map<String, Object> additionalInfo = new HashMap<>();
        additionalInfo.put("username", user.getUsername());
        additionalInfo.put("profile_img", employeeModel.getImg());
        additionalInfo.put("username", employeeModel.getUsername());
        additionalInfo.put("employee_id", employeeModel.getEmployeeId());
        additionalInfo.put("type", employeeModel.getType());
        additionalInfo.put("authorities", user.getAuthorities());    
        additionalInfo.put("test", employeeModel);
        
        

        ((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(additionalInfo);

        return accessToken;
        
    }

    private List<GrantedAuthority> getAuthorities(List<String> rolesList) {
        List<GrantedAuthority> authoritiesList = new ArrayList<>();
        
        if(!rolesList.isEmpty()){
            for (String role : rolesList) {
                authoritiesList.add(new SimpleGrantedAuthority(role));
            }
        }
        
        return authoritiesList;
    }
    
}
