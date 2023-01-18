import styles from '../../styles/Home.module.scss';
import Button from '../button';

export const HomeMainText = () => {
    return(
        <div className={styles['main-text']}>
            <h1>
                What does music mean <br/> <span className={'highlighted'}><span className='underlined'>for you</span>?</span>
            </h1>
            <p>
                Music is different for everyone. Are you interested in exploring others’ taste in music, or would you rather get a better insight into your own? 
            </p>
            <div className={styles['buttons']}>
                <Button href={'/profile'}>
                    View my stats
                </Button>
                <Button 
                    type={'secondary'}
                    href={'/explore'}
                >
                    Explore mode
                </Button>
            </div>
        </div>
    )
}