import React from 'react';
import styles from './textcontent.css';
import {Title} from "./Title";
import {MetaData} from "./MetaData";

export function TextContent() {
    return (
        <div className={styles.textContent}>
            <MetaData/>
            <Title/>
        </div>
    );
}
