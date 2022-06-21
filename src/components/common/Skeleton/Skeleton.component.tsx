import styles from './Skeleton.module.scss';

const Skeleton = () => (
  <div className={styles.skeleton}>
    <div className={styles.top} />
    <div className={styles.bottom} />
  </div>
);

export default Skeleton;
