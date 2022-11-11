// React
import { useEffect, useState } from "react"
// Hooks
import { useRouter } from "next/router"
import { useFetch } from "@hooks/useFetch"
import { useFormik } from "formik"
// Alerts
import { ToastContainer } from "react-toastify"
import { Toast } from "@components/toast"
// Components
import { RefundV } from './components'
// Validations
import { object, string } from "yup"
// Queries
import { SaveRefund, UpdateRefund, GetRefundByID } from './queries'


export const RefundC = () => {
    // Router
    const router = useRouter()

    // State
    const [option, setOption] = useState("")
    const [id, setId] = useState("")

    // Effects
    useEffect(() => {
        if (router && router.query) {
            setOption(Object.values(router.query)[0]);
            if (router.query.id) {
                setId(router.query.id);
            }
        }
    }, [router.query])

    // Get the refund data
    useEffect(() => {
            if (router.query.id != undefined) {
                RefundByIdFetch(router.query.id)
            }
    }, [router.query.id])

    // Validations
    const validationSchema = object({
        client: string("Selecciona el emisor")
        .nullable(true)
        .required("El emisor es requerido"),
    
        account: string("Selecciona la cuenta")
        .nullable(true)
        .required("La cuenta es requerida"),
    
        date: string("Ingresa la fecha de giro").required("La fecha es requerida"),
    
        amount: string("Ingresa el monto de operación").required("El monto es requerido"),
    
        observations: string("Ingresa una observación").nullable(true),
    
        beneficiary: string("Ingresa el beneficiario").required("El beneficiario es requerido"),
    
        bank: string("Ingresa el banco")
        .nullable(true)
        .required("El banco es requerido"),
    
        accountNumber: string("Ingresa el número de cuenta")
        .nullable(true)
        .required("El número de cuenta es requerido"),
    
        accountType: string("Selecciona el tipo de cuenta")
        .nullable(true)
        .required("El tipo de cuenta es requerido"),
      });

      // Queries
      const {
        fetch: saveRefundFetch,
        loading: saveRefundLoading,
        error: saveRefundError,
        data: saveRefundData,
      } = useFetch({ service: SaveRefund, init: false })

      const {
        fetch: updateRefundFetch,
        loading: updateRefundLoading,
        error: updateRefundError,
        data: updateRefundData,
      } = useFetch({ service: UpdateRefund, init: false })

      const {
        fetch: RefundByIdFetch,
        loading: RefundByIdLoading,
        error: RefundByIdError,
        data: RefundByIdData,
      } = useFetch({ service: GetRefundByID, init: false })

      useEffect(() => {
          
        if (saveRefundLoading) Toast("Se está registrando el reintegro", 'info')

        
        if (saveRefundError) Toast(saveRefundError.message, 'error')
        
        if (saveRefundData) {
            Toast("Se ha registrado el giro correctamente", 'success')
        }
        
      }, [saveRefundData, saveRefundError, saveRefundLoading])

        useEffect(() => {
            if (updateRefundLoading) Toast("Se está actualizando el reintegro", 'info')
    
            if (updateRefundError) Toast(updateRefundError.message, 'error')
            
            if (updateRefundData) {
                Toast("Se ha actualizado el reintegro correctamente", 'success')
            }
        }, [updateRefundData, updateRefundError, updateRefundLoading])

        useEffect(() => {
            if (RefundByIdData !== undefined) {
                formik.setValues(RefundByIdData?.data)
            }

        },[RefundByIdData, RefundByIdError, RefundByIdLoading])

    // Form
    const formik = useFormik({
        initialValues: {
            id: "",
            client: "",
            account: "",
            date: "",
            amount: 0,
            applyGM:false,
            gmAmount: 0,
            bank: "",
            accountType: "",
            accountNumber: "",
            beneficiary: "",
            observations: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (formik.values.id == "") saveRefundFetch(values)
            else updateRefundFetch(values)
        }
    })

    return <RefundV formik={formik} ToastContainer={ToastContainer} />
}