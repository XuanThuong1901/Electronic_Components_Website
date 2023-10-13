import React from "react";

import Slider from "../components/Slider/MainSlider";
import Advertise from "../components/Advertise/Advertise";
import HealthyAd from "../components/Healthy/HealthyAd";
import Footer from "../components/UI/Footer";
import ListBanner from "../components/Banner/ListBanner";

const HomePage = () => {
  return (
    <div>
      <Slider />
      <ListBanner />
      <Advertise />
      {/* <HomePageFoods /> */}
      <HealthyAd />
      {/* <SubSlider /> */}
      <Footer/>
    </div>
  );
};

export default HomePage;
