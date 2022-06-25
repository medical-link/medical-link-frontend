import { Spinner } from '../common';
import styles from './SpinnerView.module.scss';

const SpinnerView = () => (
  <div className={styles['spinner-view']}>
    <Spinner />
  </div>
);

export default SpinnerView;
