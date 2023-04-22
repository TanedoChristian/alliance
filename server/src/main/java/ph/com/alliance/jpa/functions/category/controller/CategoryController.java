package ph.com.alliance.jpa.functions.category.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ph.com.alliance.jpa.common.ApiResult;
import ph.com.alliance.jpa.functions.category.model.CategoryModel;
import ph.com.alliance.jpa.functions.category.service.ICategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {
	
	@Autowired
	ICategoryService categoryService;
	
	@GetMapping("/getall")
	public Object  get() {
		return categoryService.getAllCategory();
	}
	
	
	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable Integer id) {
		categoryService.deleteCategory(id);
	}
	
	@PutMapping("/update/{id}")
	public ApiResult update(@PathVariable Integer id, @RequestBody CategoryModel category) {
		categoryService.updateCategory(id, category);
		return ApiResult.CreateSuccess(category);

		
	}
	
	
}