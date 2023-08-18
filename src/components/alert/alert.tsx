import { useMemo } from 'react';
import { ToastContainer, ToastItem, toast } from 'react-toastify';

interface IAlertProps {
  message: string;
  clearMessageFromAlert: () => void;
}

const Alert = ({ message, clearMessageFromAlert }: IAlertProps) => {
  const generateAlertMessage = () => {
    toast(message);
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
