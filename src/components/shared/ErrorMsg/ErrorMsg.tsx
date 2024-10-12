import { useEffect } from "react";
import Modal from "simple-react-modal";

import styles from "./errorMsg.module.scss";

interface ErrorMsgProps {
  error: any;
  showModal: boolean;
  closeModal: () => void;
}

const ErrorMsg = ({ error, showModal, closeModal }: ErrorMsgProps) => {
  useEffect(() => {
    document.body.setAttribute("style", "overflow: hidden;");

    return () => {
      document.body.removeAttribute("style");
    };
  }, []);

  return (
    <Modal
      show={showModal}
      onClose={closeModal}
      closeOnOuterClick={true}
      containerClassName={styles.container}
    >
      <div className={styles.header}>
        <button onClick={closeModal}>&#x2715;</button>
      </div>
      <div className={styles.content}>
        <p className={styles.error}>{!!error ? "City is not valid" : error}</p>
      </div>
    </Modal>
  );
};

export default ErrorMsg;
