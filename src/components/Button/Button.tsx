import React from "react";

interface ButtonProps {
  text: string;
  custom: boolean;
  clickButton?: () => void;
  style?: object;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  custom,
  clickButton,
  style,
}) => {
  return (
    <button
      style={style}
      className={custom ? "custom-button" : "danger-button"}
      onClick={clickButton}
    >
      {text}
    </button>
  );
};
