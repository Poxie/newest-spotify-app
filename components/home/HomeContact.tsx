import { useToast } from '@/contexts/toast/ToastProvider';
import { FormEvent, useRef, useState } from 'react';
import styles from '../../styles/Home.module.scss';
import Button from '../button';
import { Input } from '../input';

export const HomeContact = () => {
    const { setToast } = useToast();
    const [loading, setLoading] = useState(false);
    const email = useRef<HTMLInputElement>(null);
    const message = useRef<HTMLInputElement>(null);

    const sendMessage = async (e: FormEvent) => {
        if(!email.current || !message.current) return;
        e.preventDefault();

        setLoading(true);
        const response = await fetch(`/api/message`, {
            method: 'POST',
            body: JSON.stringify({ email: email.current.value, message: message.current.value })
        });
        setLoading(false);
        
        if(response.status === 200) {
            setToast({
                text: 'Thank you for your message.',
                type: 'success'
            })
            email.current.value = '';
            message.current.value = ''
        } else {
            setToast({
                text: 'Something went wrong. Try again later.',
                type: 'error'
            })
        }
    }

    return(
        <section className={styles['contact-section']}>
            <div className={styles['contact-content']}>
                <h2>
                    Feel like something is missing?
                </h2>
                <form onSubmit={sendMessage}>
                    <Input 
                        label="Email or name" 
                        containerClassName={styles['contact-input']}
                        ref={email}
                    />
                    <Input 
                        label="Message"
                        textArea
                        ref={message}
                    />
                    <Button 
                        type={'secondary'}
                        buttonType={'submit'}
                        disabled={loading}
                    >
                        {loading ? 'Sending message...' : 'Send Message'}
                    </Button>
                </form>
            </div>
        </section>
    )
}