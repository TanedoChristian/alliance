 package ph.com.alliance.jpa.functions.category.dao;

 
 import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ph.com.alliance.jpa.functions.category.model.Category;

 @Repository
 public interface ICategoryDao extends JpaRepository<Category, Integer>{}