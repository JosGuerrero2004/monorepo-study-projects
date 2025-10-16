import React, { ReactNode } from "react";

import "./estilos.css";

// Definir la interfaz para los props
interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="card">{children}</div>;
};

export default Card;