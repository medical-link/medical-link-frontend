import { NextRouter } from 'next/router';
import cn from 'classnames';
import Like from 'public/like.svg';
import Report from 'public/report.svg';
import MyInfo from 'public/my-info.svg';
import styles from './Tab.module.scss';

interface TabIconProps {
  handleRoute: () => void;
  text: string;
  isActive: boolean;
  icon: React.ReactElement;
}

const TabIcon = ({
  handleRoute, text, isActive, icon,
}: TabIconProps) => (
  <div className={styles['tab-button']}>
    <button
      className={cn({ [styles.active]: isActive })}
      type="button"
      onClick={handleRoute}
    >
      <div className={styles.icon}>{icon}</div>
      <span>{text}</span>
    </button>
  </div>
);

const TAB_INFO = [
  { path: 'report', text: '리포트', icon: <Report /> },
  { path: 'like', text: '좋아요', icon: <Like /> },
  { path: 'my-info', text: '내 정보', icon: <MyInfo /> },
];

const Tab = ({ push, pathname }: NextRouter) => {
  if (pathname.includes('auth') || pathname.includes('detail') || pathname.includes('login')) {
    return null;
  }

  return (
    <div className={cn(styles.tab)}>
      <div className={styles['tab-container']}>
        {TAB_INFO.map(({ path, text, icon }) => (
          <TabIcon
            key={path}
            text={text}
            handleRoute={() => push(path)}
            isActive={pathname.includes(path)}
            icon={icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Tab;
