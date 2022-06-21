import Sad from 'public/sad.svg';
import styles from './NoData.module.scss';

interface NoDataProps {
    text: string;
}

const NoData = ({ text }: NoDataProps) => (
  <div className={styles['no-data']}>
    <Sad />
    <div>{text}</div>
  </div>
);

export default NoData;
