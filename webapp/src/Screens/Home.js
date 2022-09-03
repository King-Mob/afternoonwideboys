import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const slogans = [
    "Grease yer bits, it's time to get slippery ;)",
    "Elizabeth II of the United Kingdom smells of the afternoonwideboys",
    "Kiss me you bigoted thing!",
    "Exclaim it unto the binman👼",
    "Screw this! I'm Welsh!",
    "Wacky-backy is the only true currency",
    "Even pious lads need a helping hand",
  ];

  const slogan = slogans[Math.floor(Math.random() * slogans.length)];

  return (
    <div className="about-container">
      <h1 className="clown-title">🤡🤡</h1>
      <h1 className="home-text">{slogan}</h1>
      <p className="home-text">
        Welcome to the domain of the afternoonwideboys.
      </p>
      <p>
        <Link to={"/map"}>Play with the Map</Link> (unfinished)
      </p>
      <p>
        <Link to={"/text"}>Read the Posts </Link>(mildy amusing)
      </p>
      <p>
        <a href="https://www.youtube.com/channel/UCZJvRDSp5TaCmN_s5bP3HIw">
          Experience the Videos
        </a>{" "}
        (hours of effort, the best option)
      </p>

      <p className="home-text">You are not safe</p>
    </div>
  );
};

export default Home;
