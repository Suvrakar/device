import React, { useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import Backdrop from '@mui/material/Backdrop';
import Alert from 'react-popup-alert'

export const ToastContext = React.createContext();

export const useToastify = () => {
    const toastHelpers = useContext(ToastContext);

    return toastHelpers;
};

export const ToastProvider = (props) => {

    const [isloading, setLoading] = useState(false)
    const [tip, setTip] = useState('Loading...')
    const [alert, setAlert] = React.useState({
        type: 'error',
        text: 'This is a alert message',
        show: false
      })

    const startLoading = () => setLoading(true)
    const stopLoading = () => setLoading(false)

    const successToast = (string) => toast.success(string);
    const errorToast = (string) => toast.error(string);
    const infoToast = (string) => toast.info(string);
    const warnToast = (string) => toast.warn(string);

    const showToast = (type, string) => {

        switch (type) {
            case 'success':
                successToast(string)
                break;
            case 'error':
                errorToast(string)
                break;
            case 'info':
                infoToast(string)
                break;
            case 'warn':
                warnToast(string)
                break;
            case 'info':
                infoToast(string)
                break;

            default:
                infoToast(string)
                break;
        }
        return
    }




    return (
        <ToastContext.Provider value={{ showToast, successToast, infoToast, errorToast, warnToast, startLoading, stopLoading }}>
            {/* <Spin tip={tip} spinning={isloading} style={{ display: 'flex', justifyContent: 'center' }}> */}
            {props.children}
            <ToastContainer
                style={{ wordSpacing: 'normal' }}
                theme="light"
                autoClose={3000}
                position="top-right"
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {/* </Spin> */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isloading}
            >
                <Spin size="large" tip={tip} />

                {/* <CircularProgress color="inherit" /> */}
            </Backdrop>
        </ToastContext.Provider>
    )
}