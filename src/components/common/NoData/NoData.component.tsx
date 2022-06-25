import Sad from 'public/sad.svg';
import styles from './NoData.module.scss';

interface NoDataProps {
  text: string;
  text2?: string;
}

const NoData = ({ text, text2 }: NoDataProps) => (
  <div className={styles['no-data']}>
    <Sad />
    <div>{text}</div>
    {text2 && <div>{text2}</div>}
  </div>
);

export default NoData;
