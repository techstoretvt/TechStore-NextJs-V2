import Head from "next/head";
import Link from "next/link";
import { sdtContact } from '../../utils/constants'

import styles from "../../styles/home/HeaderTop.module.scss";

const HeaderTop = () => {
  return (
    <>
      <Head>
        {/* <link href='/css/home/HeaderTop.css' rel='stylesheet' /> */}
      </Head>
      <div className={styles["header-top-container"]}>
        <div className={styles["header-top-content"]}>
          <div className={styles["left"]}>
            Hotline:{" "}
            <b>
              <a href={`tel:+${sdtContact}`} aria-label="Số điện thoại liên hệ">{sdtContact}</a>
            </b>{" "}
            (8h - 12h, 13h30 - 17h)
          </div>
          <div className={styles["right"]}>
            <Link href="/" aria-label={`Liên kết`}>
              <span></span>
              Hệ thống cửa hàng
            </Link>
            <Link href="/" aria-label={`Liên kết`}>Cài đặt</Link>
            <Link href="/" aria-label={`Liên kết`}>Liên hệ</Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default HeaderTop;
