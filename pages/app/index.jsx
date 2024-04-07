import React from 'react';
import { QRCode } from 'antd';
import Head from "next/head";

import styles from '../../styles/app/index.module.scss';
import { nameWeb } from '../../utils/constants';

export default function index() {
    return (
        <>
            <Head>
                <title>Ứng dụng | {nameWeb}</title>
                <meta name="description" content={`Các ứng dụng chia sẻ trên ${nameWeb}`} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>
                <div className={styles.title}>Quét mã QR</div>
                <div className={styles.wrapQr}>
                    <QRCode
                        value={process.env.REACT_APP_FRONTEND_URL + '/app/download'}
                        style={{
                            marginBottom: 5,
                            marginTop: 5,
                        }}
                        size={300}
                    />
                </div>
            </div>
        </>
    );
}
