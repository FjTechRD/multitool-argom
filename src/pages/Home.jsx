import React from "react";
import MartinGalaCalculator from "../components/MartinGalaCalculator";
import "../css/pages/Home.css";
import { useSelector } from "react-redux";

const Main = () => {
  const { currentTheme } = useSelector((state) => state.theme);
  const bgColor = currentTheme === "dark" ? "#181a47" : "#c3c3c3";

  return (
    <main className="home__page">
      <section className="first__section" style={{ backgroundColor: bgColor }}>
        <article className="">
          <MartinGalaCalculator />
        </article>
        <span className="separator"></span>
        <article className="information__baca">
          <div className="information__baca-content">
            <h2>conoce mas sobre las estrategias de baccarat</h2>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Main;
