package ph.com.alliance.jpa.functions.role.service;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ph.com.alliance.jpa.functions.role.dao.IRoleDao;
import ph.com.alliance.jpa.functions.role.model.Role;
import ph.com.alliance.jpa.functions.role.model.RoleModel;

@Service
public class RoleService implements IRoleService {
	
	@Autowired
	IRoleDao iRoleDao;

	@Override
	public Object get() {
		return iRoleDao.findAll();
	}

	@Override
	public void insert(Role role) {
		// TODO Auto-generated method stub
		try {
			RoleModel roleModel = new RoleModel();
			role.setRoleId(null);
			BeanUtils.copyProperties(roleModel, role);
			iRoleDao.saveAndFlush(roleModel);
			
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		
		
		
	}

	
}
