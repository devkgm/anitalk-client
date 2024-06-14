import styles from './Footer.module.scss';
function Footer() {
    return (
        <div className={styles.container}>
            <span className={styles.copyright}>Copyright © 2024</span>
            <span className={styles.company}>애니톡</span>
        </div>
    );
}

export default Footer;
