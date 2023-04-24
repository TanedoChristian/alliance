package ph.com.alliance.jpa.functions.role.service;

import ph.com.alliance.jpa.functions.role.model.Role;

public interface IRoleService {
	
	Object get();
	void insert(Role role);
	void delete(Integer roleId, Role role);
	void updateRole(Integer roleId, Role role);
}