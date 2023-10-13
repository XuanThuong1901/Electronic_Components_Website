import { Link } from "react-router-dom";
import './CategoryList.css';
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from '../../apiRequest/axios';
import Menu from "../../pages/Menu";

const Category = ({ category , onClick}) => {
  const handleDetailCategoryClick = () => {
    onClick();
  };
  return (
    <div className= "category">
      <p>{category.categoryName}</p>
      {category.detailCategory.map((prod) => (
        <div key={prod.idcategory} className="category-detail">
          <Link   to={"/category/" + prod.idcategory}  onClick={handleDetailCategoryClick} >
          {prod.categoryName} </Link>
        </div>
      ))}
    </div>
  );
};

const CategoryList = ({listCategory, onClick }) => {

  const handleDetailCategoryClick = () => {
    onClick();
  };

  return (
      <div>
        <div className="block">
          {listCategory.map((nav) => (
            <Category
              key={nav.iDCategory}
              category={nav}
              onClick={handleDetailCategoryClick}
            />
          ))}
        </div>
      </div>
  );
};

export default CategoryList;
