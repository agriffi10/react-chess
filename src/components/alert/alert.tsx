import { useMemo } from 'react';
import { ToastContainer, ToastItem, toast } from 'react-toastify';
import { IAlertProps } from '../../interfaces/IComponentProps';

const Alert = ({ message, clearMessageFromAlert }: IAlertProps) => {
  const generateAlertMessage = () => {
    toast(message);
    // When the toast goes away, let's remove our message
    toast.onChange((payload: ToastItem) => {
      if (payload.status == 'removed') {
        clearMessageFromAlert();
      }
    });
  };

  useMemo(() => {
    if (message) generateAlertMessage();
  }, [message]);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={1}
      />
    </>
  );
};

export default Alert;
