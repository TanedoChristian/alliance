package ph.com.alliance.jpa.functions.category.service;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ph.com.alliance.jpa.functions.category.dao.ICategoryDao;
import ph.com.alliance.jpa.functions.category.model.Category;
import ph.com.alliance.jpa.functions.category.model.CategoryModel;

@Service
public class CategoryService implements ICategoryService {
	
	@Autowired
	ICategoryDao categoryDao;
	
	@Override
	public Object getAllCategory() {
		return categoryDao.findAll();
	}

	@Override
	public void deleteCategory(Integer id) {
		// TODO Auto-generated method stub

		 categoryDao.deleteById(id);
		
	}

	@Override
	public void updateCategory(Integer id, CategoryModel categoryModel) {
		// TODO Auto-generated method stub
		
		try {
			
			Category category = new Category();
			BeanUtils.copyProperties(category, categoryModel);
			category.setCategoryId(id);
			categoryDao.saveAndFlush(category);
		}catch(Exception e) {
			e.printStackTrace();
		}
		
	}

	@Override
	public void insert(CategoryModel categoryModel) {
		try {
			Category category = new Category();
			category.setCategoryId(null);
			BeanUtils.copyProperties(category, categoryModel);
			categoryDao.saveAndFlush(category);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
	}
	
	
	
	
	
	
}