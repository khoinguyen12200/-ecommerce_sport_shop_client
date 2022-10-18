import { useEffect, useState } from "react"
import axios from "axios";

interface IReqInfo {
    headers?: HeadersInit
    method?: string
    endPoint: string
    body?: Record<string, unknown>,
}

interface IResInfo {
    data: any
    hasError: boolean
}

interface ConfigUseFetch {
    headers?: HeadersInit
    method?: string
    body?: Record<string, unknown>
    toast?: boolean

}

const useFetch = (url: string, config?: ConfigUseFetch): [IResInfo, boolean, React.Dispatch<React.SetStateAction<IReqInfo|undefined>>] => {
    const [isFetching, setIsFetching] = useState(false)
    const [reqInfo, setReqInfo] = useState<IReqInfo>()
    const [resInfo, setResInfo] = useState<IResInfo>({} as IResInfo)

    useEffect(() => {
        if(config) {
            setReqInfo({
                headers: config.headers,
                method: config.method,
                endPoint: url,
                body: config.body
            })
        }
    },[url, config])

    const fetchData = async () => {
        setIsFetching(true)
        try {
            if(!reqInfo) {
                return;
            }
            const res = await axios({
                url: reqInfo.endPoint,
                method: reqInfo.method,
                data: reqInfo.body,
            });
            setResInfo({ data: res.data, hasError: false })
        } catch (error) {
            setResInfo({ data: error, hasError: true })
        }
        setIsFetching(false)
    }

    useEffect(() => {
        fetchData();
    }, [reqInfo])

    return [resInfo, isFetching, setReqInfo]
}

export default useFetch
