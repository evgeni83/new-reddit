import React from 'react';
import styles from './title.css';

export function Title() {
    return (
        <h2 className={styles.title}>
            <a href="#post-url" className={styles.postLink}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo modi neque nesciunt quaerat quidem
                veniam voluptatibus?
            </a>
        </h2>
    );
}
