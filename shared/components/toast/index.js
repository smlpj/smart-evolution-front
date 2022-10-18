import Image from 'next/image'
import { toast } from 'react-toastify'


export const Toast = (message, type) => {
    
    if (type == 'success') {
        return toast.success(<div style={{display:'flex', flexFlow:'row nowrap', justifyContent:'center', alignItems:'center', margin:'0 20px 0 -50px'}}>
            <Image style={{display:'inline-block'}}  src="/assets/Tooltip.svg" alt="gif" width={'50px'} height={'50px'} />
            <h4 style={{margin:'0 10px 0 10px'}}>{message}</h4>
        </div>, {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 'toast',
            icon: false,
        })
    } else if (type == 'error') {
        return toast.error(
            <div>
            <Image style={{display:'inline-block'}}  src="/assets/Tooltip.svg" alt="gif" width={'20px'} height={'20px'} />
            <strong>{message}</strong>
            </div>
            , {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 'toast',
            icon: false,
        })
    }
    else if (type == 'warning') {
        return toast.warning(
            <div style={{display:'flex', flexFlow:'row nowrap', justifyContent:'center', alignItems:'center', margin:'0 20px 0 -50px'}}>
            <Image style={{display:'inline-block'}}  src="/assets/Tooltip.svg" alt="gif" width={'50px'} height={'50px'} />
            <h4 style={{margin:'0 10px 0 10px'}}>{message}</h4>
            </div>, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 'toast',
            icon: false,
        })
    }
    else {
        return toast.info(
            <div style={{display:'flex', flexFlow:'row nowrap', justifyContent:'center', alignItems:'center', margin:'0 20px 0 -50px'}}>
            <Image style={{display:'inline-block'}}  src="/assets/Tooltip.svg" alt="gif" width={'50px'} height={'50px'} />
            <h4 style={{margin:'0 10px 0 10px'}}>{message}</h4>
            </div>
            , {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 'toast',
            icon: false,
        })
    }
}