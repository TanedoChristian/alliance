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
	
	@Override
	public void delete(Integer roleId, Role role) {
		// TODO Auto-generated method stub
		RoleModel roleModel = new RoleModel();
		  try {
	            BeanUtils.copyProperties(role, roleModel);
	            iRoleDao.deleteById(roleId);
	        }catch(IllegalAccessException e) {
	            e.getStackTrace();
	        }catch(Exception e) {
	            e.getStackTrace();
	        }
	}

	@Override
	public void updateRole(Integer roleId, Role role) {
		try {
			RoleModel roleModel = new RoleModel();
			BeanUtils.copyProperties(roleModel, role);
			iRoleDao.saveAndFlush(roleModel);

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}

	
}
