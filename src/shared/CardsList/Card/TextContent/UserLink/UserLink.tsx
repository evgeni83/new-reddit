import React from 'react';
import styles from './userlink.css';

export function UserLink() {
    return (
        <div className={styles.userLink}>
            <img className={styles.avatar}
                 src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png"
                 alt="avatar"/>
            <a href="#user-link" className={styles.username}>Дмитрий Гришин</a>
        </div>
    );
}
