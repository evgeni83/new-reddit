import React from 'react';
import styles from './timestamp.css';

export function TimeStamp() {
    return (
        <span className={styles.timeStamp}>
            <span className={styles.publishedLabel}>опубликовано </span>
            4 часа назад
        </span>
    );
}
