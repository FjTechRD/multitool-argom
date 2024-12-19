import React from "react";
import { useSelector } from "react-redux";
import "../css/ScheduleTable.css";

const ScheduleTable = () => {
  const scheduleData = useSelector((state) => state.schedule.scheduleData);

  if (!scheduleData || scheduleData.length === 0) {
    return <div>No hay datos para mostrar.</div>;
  }

  const adjustScheduleToUserTimeZone = (data) => {
    const userOffset = new Date().getTimezoneOffset() / 60; // Offset del usuario en horas
    const originalOffset = -4; // Zona horaria de República Dominicana (UTC-4)
    const offsetDifference = userOffset - originalOffset;

    return data.map((item) => {
      try {
        const [hour, minute] = item.zone.split(/[: ]/).map(Number);
        const isPM = item.zone.includes("p.m.");
        let adjustedHour = isPM && hour !== 12 ? hour + 12 : hour;
        adjustedHour = isPM && hour === 12 ? 12 : adjustedHour;
        adjustedHour = !isPM && hour === 12 ? 0 : adjustedHour;

        adjustedHour -= offsetDifference;
        if (adjustedHour < 0) adjustedHour += 24;
        if (adjustedHour >= 24) adjustedHour -= 24;

        const adjustedZone = `${adjustedHour % 12 || 12}:${minute
          .toString()
          .padStart(2, "0")} ${adjustedHour >= 12 ? "p.m." : "a.m."}`;
        return { ...item, zone: adjustedZone };
      } catch (error) {
        console.error("Error al ajustar la zona horaria:", error, item);
        return item;
      }
    });
  };

  const validData = scheduleData.filter((item) => item.zone !== "Total");
  const adjustedData = adjustScheduleToUserTimeZone(validData);

  const splitDataByHours = (data) => {
    const ranges = [0, 6, 12, 18, 24];
    return ranges.slice(0, -1).map((start, index) =>
      data.filter((item) => {
        const hour = parseInt(item.zone.split(":")[0], 10);
        const isPM = item.zone.includes("p.m.");
        const adjustedHour =
          isPM && hour !== 12 ? hour + 12 : hour === 12 && !isPM ? 0 : hour;
        return adjustedHour >= start && adjustedHour < ranges[index + 1];
      })
    );
  };

  const formatHourRange = (startHour, endHour) => {
    const formatHour = (hour) =>
      `${hour % 12 || 12}:00 ${hour >= 12 ? "p.m." : "a.m."}`;
    return `${formatHour(startHour)} - ${formatHour(endHour)}`;
  };

  const tables = splitDataByHours(adjustedData);

  // Información del usuario
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const userLocalTime = new Date();
  const userOffset = userLocalTime.getTimezoneOffset() / 60; // Offset del usuario en horas

  // Validar si el usuario está sincronizado correctamente
  const isSynced = userOffset === -4; // Verificar si el offset es igual al de República Dominicana

  return (
    <div className="schedule-tables">
      {/* Encabezado con información de zona horaria */}
      <div>
        <div className="schedule-header">
          <h2>Tabla de horarios</h2>
          <p>
            Hora local:{" "}
            <span className="highlight">
              {userLocalTime.toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
            </span>
          </p>
          <p>
            Zona horaria del usuario:{" "}
            <span className="highlight">{userTimeZone}</span>
          </p>
        </div>

        <div className="schedule-tables">
          {tables.map((tableData, tableIndex) => (
            <div key={tableIndex}>
              <div className="schedule-table-caption">
                {formatHourRange(tableIndex * 6, (tableIndex + 1) * 6)}
              </div>
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Cant. Try</th>
                    <th>ZONA</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      style={{ backgroundColor: row.color || "white" }}
                    >
                      <td>{row.tries}</td>
                      <td>{row.zone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleTable;
