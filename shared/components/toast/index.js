import Image from "next/image";
import { toast } from "react-toastify";

export const Toast = (message, type) => {
   
    if (type == 'success') {
        return toast.success(<div className='div-test'>
            <Image src="/assets/success-svgrepo-com.svg" alt="gif" width={'20px'} height={'20px'} />
            <strong>{message}</strong>
        </div>, {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: true,
            toastId: 'toast1',
            icon: false,
        })
    } else if (type == 'error') {
        return toast.error(
            <div style={{'display':'flex', 'justifyContent':'center', 'alignItems':'center'}}>
            <Image style={{'display':'inline-block'}}  src="/assets/error-svgrepo-com.svg" alt="gif" width={'20px'} height={'20px'} />
            <strong style={{'fontSize':'13px', 'marginLeft':'10px'}}>{message}</strong>
            </div>
            , {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 'toast2',
            icon: false,
        })
    }
    else if (type == 'warning') {
        return toast.warning(
            <div style={{'display':'flex', 'justifyContent':'center', 'alignItems':'center'}}>
            <Image style={{display:'inline-block'}}  src="/assets/warning-svgrepo-com.svg" alt="gif" width={'20px'} height={'20px'} />
            <strong style={{'fontSize':'13px', 'marginLeft':'10px'}}>{message}</strong>
            </div>, {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 'toast3',
            icon: false,
        })
    }
    else {
        return toast.info(
            <div style={{'display':'flex', 'justifyContent':'center', 'alignItems':'center'}}>
            <Image style={{display:'inline-block'}}  src="/assets/info-svgrepo-com.svg" alt="gif" width={'20px'} height={'20px'} />
            <strong style={{'fontSize':'13px', 'marginLeft':'10px'}}>{message}</strong>
            </div>
            , {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 'toast4',
            icon: false,
        })
    }
}