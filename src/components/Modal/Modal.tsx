import styles from './Modal.module.scss';

const Modal = ({ onClose, children }) => {
    return (
        <div className={`${styles.modalWrapper}`}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
