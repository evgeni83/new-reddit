import React from 'react';
import styles from './metadata.css';
import {UserLink} from "./UserLink";
import {TimeStamp} from "./TimeStamp";

export function MetaData() {
    return (
        <div className={styles.metaData}>
            <UserLink/>
            <TimeStamp/>
        </div>
    );
}
