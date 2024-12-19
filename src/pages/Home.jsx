import React, { useState, useEffect } from "react";
import MartinGalaCalculator from "../components/MartinGalaCalculator";
import "../css/pages/Home.css";
import { useSelector } from "react-redux";
import strategiesData from "../data/strategies.json"; // Importar estrategias desde el JSON
import ScheduleTable from "../components/ScheduleTable";

const Main = () => {
  const { currentTheme } = useSelector((state) => state.theme);
  const bgColor = currentTheme === "dark" ? "#181a47" : "#c3c3c3";
  const [strategies, setStrategies] = useState([]);
  const [selectedStrategy, setSelectedStrategy] = useState(null);

  // Cargar estrategias desde el JSON
  useEffect(() => {
    setStrategies(strategiesData);
  }, []);

  const openModal = (strategy) => setSelectedStrategy(strategy);
  const closeModal = () => setSelectedStrategy(null);

  return (
    <main className="home__page">
      <section className="first__section" style={{ backgroundColor: bgColor }}>
        <article className="martingala__section">
          <MartinGalaCalculator />
        </article>
        <span className="separator"></span>
        <article className="information__baca">
          <h2>Conoce las Estrategias de Baccarat</h2>
          <div className="strategies__list">
            {strategies.map((strategy) => (
              <div key={strategy.id} className="strategy__item">
                <h3>{strategy.title}</h3>
                <p>{strategy.shortDescription}</p>
                <button
                  className="btn__read-more"
                  onClick={() => openModal(strategy)}
                >
                  Leer más...
                </button>
              </div>
            ))}
          </div>
        </article>
      </section>

      {selectedStrategy && (
        <div className="modal">
          <div className="modal__content">
            <h3>{selectedStrategy.title}</h3>
            <p>{selectedStrategy.fullDescription}</p>
            <button className="btn__close" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
      <section>
        <ScheduleTable />
      </section>
    </main>
  );
};

export default Main;
