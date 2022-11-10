// React
import { useEffect, useState } from "react"
// Hooks
import { useFetch } from "@hooks/useFetch"
// Components
import { RefundListC } from './components'
// Queries
import { GetRefund } from './queries'


export const RefundListV = () => {
    
    // State
    const [refund, setRefund] = useState([])

    // Queries
    const {
      fetch: fetch,
      loading: loading,
      error: error,
      data: data,
    } = useFetch({ service: GetRefund, init: true })

    useEffect(() => {
        if(data) {
            const parsed = data.data.map((item) => {
                return {
                    ...item,
                    account:item?.account?.account_number,
                    accountType:item?.accountType?.description,
                    bank:item?.bank?.description,
                    client:item?.client?.social_reason ? item?.client?.social_reason : `${item?.client?.first_name} ${item.client.last_name}`,
                }
            })
            setRefund(parsed)
        }
    },[loading, error, data])

    return (
        <RefundListC data={refund} />
    )
}