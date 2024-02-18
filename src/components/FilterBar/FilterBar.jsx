import { useDispatch } from "react-redux";
import {
  filter_by_discont,
  sort_by_default,
  sort_by_price_desc,
  sort_by_price_asc,
  sort_by_name_az,
  sort_by_name_za,
  filter_by_range,
} from "../../store/productsListSlice";
import classes from "../../components/FilterBar/FilterBar.module.css";
import { useState, useEffect, useRef } from "react";

export const FilterBar = ({content}) => {
  const refFrom = useRef();
	const refTo = useRef();
	const refDiscont = useRef();
	const refSelect = useRef();

  useEffect(() => {
		refFrom.current.value = '';
		refTo.current.value = '';
		refSelect.current.value = 'default';
		if (content !== 'sale') refDiscont.current.checked = false;
	}, [content])

  const dispatch = useDispatch();

   const [fromValue, setFromValue] = useState("");
   const [toValue, setToValue] = useState("");

  // useEffect(() => {
  //   setFromValue("");
  //   setToValue("");
  // }, []);

  // const handleChange = (e) => {
  //   const range = {
  //     from: fromValue,
  //     to: toValue
  //   }
  //   const { value } = e.target;
  //   if (e.target.name === 'from') {
  //     range.from = +value
  //     setFromValue(value)
  //   } else {
  //     range.to = +value
  //     setToValue(value)
  //   }
  //   dispatch(filter_by_range(range))
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const range = {
      from: name === "from" ? +value : fromValue,
      to: name === "to" ? +value : toValue,
    };
    setFromValue(range.from);
    setToValue(range.to);
    dispatch(filter_by_range(range));
  };


  
  const handleDiscontToggle = (e) => {
    dispatch(filter_by_discont(e.target.checked));
  };


  const sortFunctions = {
    default: sort_by_default,
    priceAsc: sort_by_price_asc,
    priceDesc: sort_by_price_desc,
    name_az: sort_by_name_az,
    name_za: sort_by_name_za,
  };

  const handleSortOption = (e) => {
    e.preventDefault();
    const selectedSort = e.target.value;
    const sortFunction = sortFunctions[selectedSort];
    if (sortFunction) {
      dispatch(sortFunction());
    }
  };

  // const handleSortOption = (e) => {
  //   e.preventDefault();

  //   switch (e.target.value) {
  //     case "default":
  //       dispatch(sort_by_default());
  //       break;

  //     case "priceDesc":
  //       dispatch(sort_by_price_desc());
  //       break;

  //     case "priceAsc":
  //       dispatch(sort_by_price_asc());
  //       break;

  //     case "name_az":
  //       dispatch(sort_by_name_az());
  //       break;

  //     case "name_za":
  //       dispatch(sort_by_name_za());
  //       break;

  //     default:
  //       break;
  //   }
  // };
  return (
    <form>
      <div className={classes.filters}>
        <div className={classes.filter_price}>
          <label htmlFor="price" className={classes.price}>
            Price
            <input
              className={classes.filter_inputs}
              type="number"
              id="price"
              step=".1"
              min="0"
              placeholder="from"
              name="from"
              ref={refFrom}
              value={fromValue}
              content="filter"
              onChange={(e) => handleChange(e)}
            />
            <input
              className={classes.filter_inputs}
              type="number"
              placeholder="to"
              name="to"
              ref={refTo}
              step=".1"
              min="0"
              content="filter"
              value={toValue}
              onChange={(e) => handleChange(e)}
            />
          </label>
        </div>

        <div className={classes.checkbox}>
          <p>Discounted items</p>
          <label className={classes.labelForCheckbox}>
            <input
              className={classes.inputForCheckbox}
              type="checkbox"
              ref={refDiscont}
              content="discont"
              onClick={handleDiscontToggle}
            />
            <span></span>
          </label>
        </div>

        <div className={classes.sorted}>
          <label htmlFor="sort" className={classes.sort_label}>
            Sorted
          </label>
          <select
            className={classes.sort_select}
            id="sort"
            ref={refSelect}
            onChange={handleSortOption}
          >
            <option value="default">by default</option>
            <option value="priceAsc">Ascending</option>
            <option value="priceDesc">Descending</option>
            <option value="name_az">by name A-Z</option>
            <option value="name_za">by name Z-A</option>
          </select>
        </div>
      </div>
    </form>
  );
};
