import cn from 'classnames';
import styles from './Tag.module.scss';

export interface TagProps {
  text: string;
  isActive?: boolean;
}

const Tag = ({ text, isActive = true }: TagProps) => (
  <span className={cn(styles.tag, { [styles.active]: isActive })}>{text}</span>
);

export default Tag;
