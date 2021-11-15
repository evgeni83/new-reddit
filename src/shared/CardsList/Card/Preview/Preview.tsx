import React from 'react';
import styles from './preview.css';

export function Preview() {
    return (
        <div className={styles.preview}>
            <img className={styles.previewImg}
                 src="https://cdn3.vectorstock.com/i/1000x1000/18/92/new-post-sticker-for-social-media-content-vector-23241892.jpg"
                 alt="preview"/>
        </div>
    );
}
