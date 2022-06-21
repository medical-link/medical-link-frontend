import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Accordion } from '~/components';
import { titleAtom } from '~/store';
import styles from './Medicine.module.scss';

const MEDICINE_DATA = {
  date: '2022.06.12',
  title: '서울보라매병원',
  info: {
    병원정보: '손이비인후과의원 (서대문구 수색로)',
    방문일수: 1,
    처방일수: 0,
    투약일수: 1,

  },
  illnessList: ['대장암3기', '당뇨', '저혈압'],
};

const MedicinePage = () => {
  const setTitle = useSetAtom(titleAtom);

  useEffect(() => {
    setTitle('내 정보');
    return () => setTitle('');
  }, []);

  return (
    <div className={styles.medicine}>
      <Accordion {...MEDICINE_DATA} />
    </div>
  );
};

export default MedicinePage;
