import Slide from "./Slide";
import React, { useEffect } from "react";
import Banner from "./Banner";
import "./home.css";
import { getProducts } from "../redux/action/action";
import {useDispatch, useSelector} from 'react-redux';

const Maincomp = () => {
  const {products} = useSelector(state => state.getProductsdata);
  console.log(products)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());

  },[dispatch]);
  return (
    <div className="home_section">
      <div className="banner_part">
        <Banner />
      </div>
      <div className="slide_part">
        <div className="left_slide">
          <Slide title="Best Deal of The Day" products={products} />
        </div>
        <div className="right_slide">
          <h4>Festival Offers</h4>
          <img
            src="https://cdn1.desidime.com/cdn-cgi/image/fit=crop,f=auto,onerror=redirect,w=1200,h=1200,q=90/topics/photos/1473713/original/mazon-Great-Indian-Festival-Sale-2022.jpg"
            alt=""
          />
          <a href="/">See More</a>
        </div>
      </div>
      <Slide title="Today's Deals" products={products} />
      <div className="center_img">
        <img
          src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg"
          alt=""
        />
      </div>
      <Slide title="Best Seller" products={products} />
      <Slide title="Upto 80% off" products={products} />
    </div>
  );
};

export default Maincomp;
