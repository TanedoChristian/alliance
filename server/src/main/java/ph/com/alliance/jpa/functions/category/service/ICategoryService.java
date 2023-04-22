package ph.com.alliance.jpa.functions.category.service;

import ph.com.alliance.jpa.functions.category.model.CategoryModel;

public interface ICategoryService {
	Object getAllCategory();
	void deleteCategory(Integer id);
	void updateCategory(Integer id, CategoryModel categoryModel);
}