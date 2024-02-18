import { Link } from "react-router-dom";
import ProductsList from "../../components/ProductsList/ProductsList";
import classes from "./AllProductsPage.module.css";
import { FilterBar } from "../../components/FilterBar/FilterBar";
// import { useEffect } from "react";
 
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
//  import { addProductsList, addProductsListWithSale  } from '../../store/filterSlice';

const AllProductsPage = () => {

  
  
  return (
    <div>
      <div className="container">
        <div className={classes.button_box}>
          <Link to="/">
            <button>Main page</button>
          </Link>
          <div className={classes.line}></div>
          <button>All products</button>
        </div>
        <p className={classes.title}>All products</p>

        <FilterBar />
        <div>
          <ProductsList />
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;
