import React, { useEffect, useState } from "react";
import "./Home.scss";
import { Pixelify } from "react-pixelify";
import CardImage1 from "./CardImages/1/Card-main.png";
import CardImageZoomed1 from "./CardImages/1/Card-zoom.png";
import Logo1 from './CardImages/1/Logo.png'

import CardImage2 from "./CardImages/2/Card-main.png";
import CardImageZoomed2 from "./CardImages/2/Card-zoom.png";
import Logo2 from './CardImages/2/Logo.png'

import CardImage3 from "./CardImages/3/Card-main.png";
import CardImageZoomed3 from "./CardImages/3/Card-zoom.png";
import Logo3 from './CardImages/3/Logo.png'

export default function Home() {
  const Projects = [
    {
      mainImage: CardImage1,
      zoomedImage: CardImageZoomed1,
      srcLogo: Logo1,
    },
    {
      mainImage: CardImage2,
      zoomedImage: CardImageZoomed2,
      srcLogo: Logo2,
    },
    {
      mainImage: CardImage3,
      zoomedImage: CardImageZoomed3,
      srcLogo: Logo3,
    },
  ]

  return (
    <main className="projects">
      {Projects.map((currP, i) => (
        <CardProject
          key={i}
          srcBg={currP.mainImage}
          srcBgZoomed={currP.zoomedImage}
          srcLogo={currP.srcLogo}
        />
      ))}
    </main>
  );
}

const CardProject = ({ srcBg, srcBgZoomed, srcLogo }) => {
  const [pixelSize, setPixelSize] = useState(0);
  const [image, setImage] = useState(srcBg);

  const animEnterStepsHandler = () => {
    setPixelSize(18);

    setTimeout(() => {
      setPixelSize(28);
    }, 200);

    setTimeout(() => {
      setPixelSize(0);
      setImage(srcBgZoomed);
    }, 400);
  };

  const animLeaveStepsHandler = () => {
    setPixelSize(28);
    setImage(srcBg);
    
    setTimeout(() => {
      setPixelSize(18);
    }, 200);
    
    setTimeout(() => {
      setImage(srcBg);
      setPixelSize(0);
    }, 400);
  };

  return (
    <div
      className="pixel-card"
      onMouseEnter={() => animEnterStepsHandler()}
      onMouseLeave={() => animLeaveStepsHandler()}
    >
      <Pixelify src={image} pixelSize={pixelSize} />
      <div className="pixel-card__logo">
        <img
          src={srcLogo}
          alt=""
          className="pixel-card__logo-image"
        />
      </div>
    </div>
  );
};
