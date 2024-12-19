import React from "react";
import { useSelector } from "react-redux";
import "../css/ScheduleTable.css";

const ScheduleTable = () => {
  const scheduleData = useSelector((state) => state.schedule.scheduleData);

  if (!scheduleData || scheduleData.length === 0) {
    return <div>No hay datos para mostrar.</div>;
  }

  const adjustScheduleToUserTimeZone = (data) => {
    const userOffset = new Date().getTimezoneOffset() / 60;
    return data.map((item) => {
      try {
        const [hour, minute] = item.zone.split(/[: ]/).map(Number);
        const isPM = item.zone.includes("p.m.");
        let adjustedHour = isPM && hour !== 12 ? hour + 12 : hour;
        adjustedHour = isPM && hour === 12 ? 12 : adjustedHour;
        adjustedHour = !isPM && hour === 12 ? 0 : adjustedHour;

        adjustedHour -= userOffset;
        if (adjustedHour < 0) adjustedHour += 24;

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

  const getAdjustedHour = (zone) => {
    const hour = parseInt(zone.split(":")[0], 10);
    const isPM = zone.includes("p.m.");
    return isPM && hour !== 12 ? hour + 12 : hour === 12 && !isPM ? 0 : hour;
  };

  const splitDataByHours = (data) => {
    const ranges = [0, 6, 12, 18, 24];
    return ranges.slice(0, -1).map((start, index) =>
      data.filter((item) => {
        const adjustedHour = getAdjustedHour(item.zone);
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

  return (
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
  );
};

export default ScheduleTable;
