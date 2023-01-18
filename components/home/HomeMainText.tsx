import styles from '../../styles/Home.module.scss';

export const HomeMainText = () => {
    return(
        <div className={styles['main-text']}>
            <h1>
                What does music mean <br/> <span className={'highlighted'}><span className='underlined'>for you</span>?</span>
            </h1>
        </div>
    )
}