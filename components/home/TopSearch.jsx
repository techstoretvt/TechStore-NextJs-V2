import Link from 'next/link';

import styles from '../../styles/home/TopSearch.module.scss'
import Image from 'next/image';

const TopSearch = () => {
    return (
        <div className={styles['TopSearch-container']}>
            <div className={styles['TopSearch-content']}>
                <div className={styles['TopSearch-left']}>
                    <div className={styles['wrap']}>
                        <div className={styles['title']}>
                            Xu hướng tìm kiếm
                        </div>
                        <Link href={'/search?promotion=true'} className={styles['btn']}
                            aria-label={`tìm kiếm`}
                        >
                            <div className={styles['btn-name']}>
                                Khuyến mãi
                            </div>
                            <div className={styles['btn-bg']}>

                            </div>
                        </Link>
                    </div>
                </div>
                <div className={styles['TopSearch-right']}>
                    <Link href={'/search?keyword=điện thoại'} aria-label={`tìm kiếm`} className={styles['TopSearch-item']}>
                        <Image
                            src={'/images/home/top-search/dienthoai.webp'}
                            width={200}
                            height={200}
                            alt=''
                            className={styles['image']}
                        />
                        <div className={styles['title']}>
                            Điện thoại
                        </div>
                    </Link>
                    <Link href={'/search?keyword=tai nghe'} aria-label={`tìm kiếm`} className={styles['TopSearch-item']}>
                        <Image
                            src={'/images/home/top-search/tainghe.webp'}
                            width={200}
                            height={200}
                            alt=''
                            className={styles['image']}
                        />
                        <div className={styles['title']}>
                            Tai nghe
                        </div>
                    </Link>
                    <Link href={'/search?keyword=chuột máy tính'} aria-label={`tìm kiếm`} className={styles['TopSearch-item']}>
                        <Image
                            src={'/images/home/top-search/chuot.webp'}
                            width={200}
                            height={200}
                            alt=''
                            className={styles['image']}
                        />
                        <div className={styles['title']}>
                            Chuột
                        </div>
                    </Link>
                    <Link href={'/search?keyword=bàn phím'} aria-label={`tìm kiếm`} className={styles['TopSearch-item']}>
                        <Image
                            src={'/images/home/top-search/banphim.webp'}
                            width={200}
                            height={200}
                            alt=''
                            className={styles['image']}
                        />
                        <div className={styles['title']}>
                            Bàn phím
                        </div>
                    </Link>
                    <Link href={'/search?keyword=đồng hồ'} aria-label={`tìm kiếm`} className={styles['TopSearch-item']}>
                        <Image
                            src={'/images/home/top-search/dongho.webp'}
                            width={200}
                            height={200}
                            alt=''
                            className={styles['image']}
                        />
                        <div className={styles['title']}>
                            Đồng hồ
                        </div>
                    </Link>
                    <Link href={'/search?keyword=loa'} aria-label={`tìm kiếm`} className={styles['TopSearch-item']}>
                        <Image
                            src={'/images/home/top-search/loa.webp'}
                            width={200}
                            height={200}
                            alt=''
                            className={styles['image']}
                        />
                        <div className={styles['title']}>
                            Loa
                        </div>
                    </Link>
                    <Link href={'/search?keyword=màn hình máy tính'} aria-label={`tìm kiếm`} className={styles['TopSearch-item']}>
                        <Image
                            src={'/images/home/top-search/manhinh.webp'}
                            width={200}
                            height={200}
                            alt=''
                            className={styles['image']}
                        />
                        <div className={styles['title']}>
                            Màn hình máy tính
                        </div>
                    </Link>
                    <Link href={'/search?keyword=sạc dự phòng'} aria-label={`tìm kiếm`} className={styles['TopSearch-item']}>
                        <Image
                            src={'/images/home/top-search/pin.webp'}
                            width={200}
                            height={200}
                            alt=''
                            className={styles['image']}
                        />
                        <div className={styles['title']}>
                            Pin dự phòng
                        </div>
                    </Link>


                </div>
            </div>
        </div>
    )
}
export default TopSearch;