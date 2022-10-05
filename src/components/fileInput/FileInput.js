import React from 'react';
import styles from './FileInput.module.scss';
import { FileUploader } from "react-drag-drop-files";

const FileInput = ({ onChange }) => {
  return (
    <div className={styles.main}>
      <FileUploader handleChange={onChange} multiply={false}/>
    </div>
  );
};

export default FileInput;
