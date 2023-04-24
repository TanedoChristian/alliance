package ph.com.alliance.jpa.functions.role.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import ph.com.alliance.jpa.functions.role.model.RoleModel;

public interface IRoleDao extends JpaRepository<RoleModel, Integer> {
	
}
