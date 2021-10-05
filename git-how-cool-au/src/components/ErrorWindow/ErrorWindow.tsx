import React from "react";
import styles from "./ErrorWindow.module.scss";

const ErrorWindow: React.FC = () => {
  return (
    <div className={styles.error_window}>
      Ошибка! Пожалуйста, перезагрузите страницу
    </div>
  );
};

export default ErrorWindow;
