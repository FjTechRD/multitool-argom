import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ScheduleRangeTable from "../components/tablas/ScheduleRangeTable"; // Importar el componente
import "../css/ScheduleTable.css"; // Estilos CSS

const ScheduleTable = () => {
  const scheduleData = useSelector((state) => state.schedule.scheduleData); // Obtener datos desde Redux
  const [splitData, setSplitData] = useState([]);

  useEffect(() => {
    if (scheduleData && scheduleData.length > 0) {
      // Dividir los datos en 4 partes iguales
      const chunkSize = Math.ceil(scheduleData.length / 4);
      const chunks = [];
      for (let i = 0; i < scheduleData.length; i += chunkSize) {
        chunks.push(scheduleData.slice(i, i + chunkSize));
      }
      setSplitData(chunks);
    }
  }, [scheduleData]);

  if (!splitData || splitData.length === 0) {
    return <div>No hay datos disponibles para mostrar.</div>;
  }

  return (
    <div className="schedule-tables">
      <div className="schedule-tables__header">
        <h4>TABLA DE HORARIOS</h4>
        <h5>Horario República Dominicana</h5>
      </div>
      {splitData.map((tableData, index) => {
        // Obtener la hora de inicio y fin de cada tabla
        const startZone = tableData[0]?.zone || "";
        const endZone = tableData[tableData.length - 1]?.zone || "";

        return (
          <ScheduleRangeTable
            key={index}
            title={`${startZone} - ${endZone}`} // Título dinámico basado en las horas
            data={tableData} // Datos de cada rango
          />
        );
      })}
    </div>
  );
};

export default ScheduleTable;
