/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <img src="/images/Logo.svg" alt="Logo" />
    </header>
  );
}
