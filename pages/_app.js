import '../styles/globals.css'
import Navbar from '../components/navbar'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      {/* {router.pathname !== '/auth/login' ? <Navbar /> : null} */}
      <Component {...pageProps} />
    </>
  )
}



export default MyApp
