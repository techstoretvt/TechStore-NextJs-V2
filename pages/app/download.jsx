import React from 'react';

import styles from '../../styles/app/dowload.module.scss';
import { nameWeb } from '../../utils/constants'

const listFile = [
    {
        title: `${nameWeb} trên mobile`,
        sub: 'Mở bằng trình duyệt để tải',
        file: '/files/app.apk',
        version: "1.0"
    },
    {
        title: 'Ứng dụng nghe nhạc trên mobile',
        sub: 'Mở bằng trình duyệt để tải',
        file: '/files/music-app.apk',
        version: '3/11'
    },
    {
        title: 'Ứng dụng nghe nhạc trên desktop',
        sub: 'Mở bằng trình duyệt để tải',
        file: '',
        version: 'Chưa tải lên'
    },
    {
        title: 'Website demo video call',
        sub: 'Mở bằng trình duyệt để xem',
        file: 'https://webrtc-react-five.vercel.app/',
        version: '8/4/2024'
    },
    {
        title: 'Mô hình nhận dạng vật thể trong hình ảnh',
        sub: 'Mở bằng trình duyệt để xem',
        file: 'https://thoaidev.store/ai',
        version: '8/4/2024'
    }
]

export default function dowload() {
    return (
        <div className={styles.container}>

            {
                listFile.map((item, index) => (
                    <div key={index} className={styles.wrapItem}>
                        <div className={styles.title}>{item.title}</div>
                        <div
                            style={{ color: '#737373', textAlign: 'center', fontSize: 12 }}
                        >
                            {item.sub}
                        </div>
                        <div className={styles.wrapFile}>
                            <a href={item.file} aria-label="Trang danh sách ứng dụng có thể tải xuống" className={styles.btnDownload}>
                                Tải xuống
                            </a>
                        </div>
                        <div style={{ color: '#fff' }}>Version: {item.version}</div>
                    </div>
                ))
            }
        </div>
    );
}
