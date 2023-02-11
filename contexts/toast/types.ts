export type Toast = {
    text: string;
    type?: 'info' | 'error' | 'success';
    duration?: number;
}
export type ToastContext = {
    setToast: (toast: Toast) => void;
}