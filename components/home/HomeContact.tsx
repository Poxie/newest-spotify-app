import { WaveIcon } from '@/assets/icons/WaveIcon';
import { useState } from 'react';
import styles from '../../styles/Home.module.scss';
import Button from '../button';
import { Input } from '../input';

export const HomeContact = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    return(
        <section className={styles['contact-section']}>
            <div className={styles['contact-content']}>
                <h2>
                    Feel like something is missing?
                </h2>
                <form>
                    <Input 
                        label="Email" 
                        onChange={setEmail}
                        value={email}
                        containerClassName={styles['contact-input']}
                    />
                    <Input 
                        onChange={setMessage}
                        value={message}
                        label="Message"
                        textArea
                    />
                    <Button 
                        type={'secondary'}
                        buttonType={'submit'}
                    >
                        Send Message
                    </Button>
                </form>
            </div>
        </section>
    )
}