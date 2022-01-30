import React from "react";

interface CardProps {
  className?: string;
  style?: object;
  children?: React.ReactElement<any, any>;
}

export const Card: React.FC<CardProps> = ({ className, style, children }) => {
  return (
    <div className={className ? `card ${className}` : "card"} style={style}>
      {children}
    </div>
  );
};
