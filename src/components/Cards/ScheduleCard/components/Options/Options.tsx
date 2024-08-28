import React, {useState, useEffect, useRef, MouseEventHandler} from 'react';
// Icons
import Dots from '../icons/Dots';
// Styles
import styles from './Options.module.scss';
import clx from 'classnames'

export interface Option {
  icon: React.ReactNode;
  text: string;
  onClick: (...props: any) => void;
  className?: string;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
}

interface OptionsProps {
  options: Option[];
}

const Options = (props: OptionsProps) => {
  const { options } = props;
  const [visible, setVisible] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setVisible(false);
      }
    };

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible]);

  return (
    <div className={styles.wrapper} ref={optionsRef}>
      <button className={styles.button} onClick={() => setVisible(!visible)}>
        <Dots />
      </button>
      {visible && (
        <div className={styles.options}>
          {options.map(({ icon, text, onClick, className, onMouseEnter }) => (
            <button
              key={text}
              className={clx(styles.optionsItem, className)}
              onClick={() => {
                onClick();
                setVisible(false);
              }}
              onMouseEnter={onMouseEnter}
            >
              {icon}
              {text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Options;
