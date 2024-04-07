import Link from 'next/link'

import styles from '../../styles/home/ExhibitionImage2.module.scss'
const ExhibitionImage2 = () => {

    return (
        <div className={styles['ExhibitionImage2-container']} >
            <div data-aos="fade-up" className={styles['ExhibitionImage2-content']} data-aos-offset="300">
                <Link href={'/search?keyword=tai nghe&brand=apple'}
                    aria-label={`Xem danh mục: tai nghe apple`}
                    className={styles['ExhibitionImage2-img'] + ' ' + styles['img-1'] + ' ' + 'light-effect light-effect-flash'}>

                </Link>
                <Link href={'/search?keyword=bút cảm ứng&brand=apple'}
                    aria-label={`Xem danh mục: bút cảm ứng apple`}
                    className={styles['ExhibitionImage2-img'] + ' ' + styles['img-2'] + ' ' + 'light-effect light-effect-flash'}>

                </Link>
                <Link href={'/search?keyword=cáp sạc&brand=apple'}
                    aria-label={`Xem danh mục: cáp sạc apple`}
                    className={styles['ExhibitionImage2-img'] + ' ' + styles['img-3'] + ' ' + 'light-effect light-effect-flash'}>

                </Link>
                <Link href={'/search?keyword=điện thoại&brand=apple'}
                    aria-label={`Xem danh mục: điện thoại apple`}
                    className={styles['ExhibitionImage2-img'] + ' ' + styles['img-4'] + ' ' + 'light-effect light-effect-flash'}>

                </Link>
            </div>
        </div>
    )
}
export default ExhibitionImage2