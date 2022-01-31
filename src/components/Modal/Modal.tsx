import React from "react";
import { Button } from "../Button/Button";

interface ModalProps {
  openModal: boolean;
  hideModal: () => void;
  executeMethod?: () => void;
  header?: string;
  texts?: string | React.ReactElement<any, any>;
}

export const Modal: React.FC<ModalProps> = ({
  openModal,
  hideModal,
  executeMethod,
  header,
  texts,
}) => {
  return (
    <div
      className={openModal ? "modal open" : "modal close"}
      onClick={hideModal}
    >
      <div className="modal-content" onClick={(e: any) => e.stopPropagation()}>
        <span className="close" onClick={hideModal}>
          &times;
        </span>
        <h2>{header}</h2>
        <div className="modal-texts">{texts}</div>
        {executeMethod && (
          <div className="modal-button-container">
            <Button custom text={"No"} clickButton={hideModal} />
            <Button custom={false} text={"Yes"} clickButton={executeMethod} />
          </div>
        )}
      </div>
    </div>
  );
};
