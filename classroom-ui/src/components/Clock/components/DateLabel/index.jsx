import React from "react";
import PropTypes from "prop-types";

const DateLabel = ({ time }) => {
  const days = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo"
  ];
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];
  const actualDay = days[time.getDay() - 1];
  const actualMonth = months[time.getMonth()];
  const actualDate = time.getDate();
  return (
    <div className="datelabel">
      <span className="datelabel_day">{actualDay}</span>
      <span className="datelabel_date">
        <span>{actualDate}</span>
        <span className="datelabel_month">{actualMonth}</span>
      </span>
    </div>
  );
};

DateLabel.propTypes = {
  time: PropTypes.instanceOf(Date)
};

export default DateLabel;
