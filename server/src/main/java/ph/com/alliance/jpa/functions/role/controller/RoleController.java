package ph.com.alliance.jpa.functions.role.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ph.com.alliance.jpa.common.ApiResult;
import ph.com.alliance.jpa.functions.role.model.Role;
import ph.com.alliance.jpa.functions.role.service.IRoleService;

@RestController
@RequestMapping("role")
public class RoleController {
	
	@Autowired
	IRoleService iRoleService;
	
	@GetMapping("/get")
	public ApiResult get() {
		return ApiResult.CreateSuccess(iRoleService.get());
	}
	
	@PostMapping("/insert")
	public ApiResult insert(@RequestBody Role role) {
		
		iRoleService.insert(role);
		return ApiResult.CreateSuccess(role);
	}
	
	@DeleteMapping("/delete{roleId}")
	public ApiResult delete(@PathVariable Integer roleId, Role role)
	{
		iRoleService.delete(roleId, role);
		return ApiResult.CreateSuccess("Deleted Successfully!");
	}
	
	@PutMapping("/update{roleId}")
	public ApiResult updateRole(@PathVariable Integer roleId, Role role) {
		iRoleService.updateRole(roleId, role);
		return ApiResult.CreateSuccess("Updated Successfully!");
	}
	
}