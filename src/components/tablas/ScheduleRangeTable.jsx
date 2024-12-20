const ScheduleRangeTable = ({ title, data }) => {
  const convertTo24HourFormat = (time12h) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");

    if (modifier.toLowerCase() === "p.m." && parseInt(hours, 10) !== 12) {
      hours = parseInt(hours, 10) + 12;
    } else if (
      modifier.toLowerCase() === "a.m." &&
      parseInt(hours, 10) === 12
    ) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  };

  // Ordenar los datos basados en la hora de la zona, dejando "Total" al final
  const sortedData = [...data].sort((a, b) => {
    if (a.zone.toLowerCase() === "total") return 1;
    if (b.zone.toLowerCase() === "total") return -1;

    const timeA = convertTo24HourFormat(a.zone);
    const timeB = convertTo24HourFormat(b.zone);

    return timeA.localeCompare(timeB);
  });

  return (
    <div className="table-container">
      <h3>{title}</h3>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Zona</th>
            <th>Intentos</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => {
            const isTotalRow = item.zone.toLowerCase() === "total";
            const backgroundColor = isTotalRow
              ? "#0044cc"
              : item.color || "transparent";
            const textColor = isTotalRow
              ? "#fff"
              : item.color === "yellow"
              ? "#000"
              : "#fff";

            return (
              <tr
                key={index}
                style={{
                  backgroundColor,
                  color: textColor,
                }}
              >
                <td>{item.zone}</td>
                <td>{item.tries}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleRangeTable;
