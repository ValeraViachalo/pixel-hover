import React, { useEffect, useState } from "react";
import "./Home.scss";
import { Pixelify } from "react-pixelify";
import CardImage1 from "./CardImages/1/Card-main.png";
import CardImageZoomed1 from "./CardImages/1/Card-zoom.png";
import Logo1 from "./CardImages/1/Logo.png";

import CardImage2 from "./CardImages/2/Card-main.png";
import CardImageZoomed2 from "./CardImages/2/Card-zoom.png";
import Logo2 from "./CardImages/2/Logo.png";

import CardImage3 from "./CardImages/3/Card-main.png";
import CardImageZoomed3 from "./CardImages/3/Card-zoom.png";
import Logo3 from "./CardImages/3/Logo.png";
import { Link } from "react-router-dom";

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
  ];

  return (
    <main className="projects">
      <h1>
        NEW
        <br />
        card
      </h1>
      <div className="projects__list">
        {Projects.map((currP, i) => (
          <CardProject1 key={i} project={currP} />
        ))}
      </div>

      <h1>
        OLD
        <br />
        card
      </h1>
      <div className="projects__list">
        {Projects.map((currP, i) => (
          <CardProject key={i} project={currP} />
        ))}
      </div>
    </main>
  );
}

const CardProject1 = ({ project }) => {
  const { mainImage: srcBg, zoomedImage: srcBgZoomed, srcLogo: logo } = project;
  const [images, setImages] = useState([srcBg, srcBgZoomed]);

  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = srcBgZoomed;
    preloadImage.onload = () => {
      setImages([srcBg, preloadImage.src]);
    };
  }, [srcBg, srcBgZoomed]);

  return (
    <Link className="pixel-card pixel-card-new">
      <Pixelify src={images[0]} pixelSize={0} />
      <Pixelify src={images[0]} pixelSize={18} />
      <Pixelify src={images[0]} pixelSize={28} />
      <Pixelify src={images[1]} pixelSize={0} />
      <div className="pixel-card__logo">
        <img src={logo} alt="" className="pixel-card__logo-image" />
      </div>
    </Link>
  );
};

const CardProject = ({ project }) => {
  const { mainImage: srcBg, zoomedImage: srcBgZoomed, srcLogo: logo } = project;

  const [pixelSize, setPixelSize] = useState(0);
  const [images, setImages] = useState([srcBg, srcBgZoomed]);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = srcBgZoomed;
    preloadImage.onload = () => {
      setImages([srcBg, preloadImage.src]);
    };
  }, [srcBg, srcBgZoomed]);

  const animEnterStepsHandler = () => {
    setPixelSize(18);

    setTimeout(() => {
      setPixelSize(28);
    }, 200);

    setTimeout(() => {
      setPixelSize(0);
      setImageIndex(1);
    }, 400);
  };

  const animLeaveStepsHandler = () => {
    setPixelSize(28);
    setImageIndex(0);

    setTimeout(() => {
      setPixelSize(18);
    }, 200);

    setTimeout(() => {
      setImageIndex(0);
      setPixelSize(0);
    }, 400);
  };

  return (
    <Link
      className="pixel-card"
      onMouseEnter={() => animEnterStepsHandler()}
      onMouseLeave={() => animLeaveStepsHandler()}
    >
      <Pixelify src={images[imageIndex]} pixelSize={pixelSize} />
      <div className="pixel-card__logo">
        <img src={logo} alt="" className="pixel-card__logo-image" />
      </div>
    </Link>
  );
};
