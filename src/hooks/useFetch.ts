import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

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
    toast?: boolean
}

const useFetch = (url?: string, config?: ConfigUseFetch): [IResInfo, boolean, React.Dispatch<React.SetStateAction<IReqInfo|undefined>>] => {
    const [isFetching, setIsFetching] = useState(false)
    const [reqInfo, setReqInfo] = useState<IReqInfo>()
    const [resInfo, setResInfo] = useState<IResInfo>({} as IResInfo)

    const fetchData = async () => {
        if(isFetching) {
            toast.warning("Đang tải dữ liệu, vui lòng đợi");
            return;
        }
        setIsFetching(true)
        let idToast = null;
        if(config?.toast) {
            idToast = toast.info("Đang tải ...", {
                isLoading: true,
                autoClose: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
        }
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
            //success
            if(idToast) {
                toast.update(idToast, {render: "Thành công", type: "success", isLoading: false, autoClose: 2000});
            }
        } catch (error) {
            const e = error as AxiosError;
            setResInfo({ data: error, hasError: true })

            //error
            if(idToast) {
                toast.update(idToast, {render: e.message || 'Lỗi không rõ', type: "error", isLoading: false, autoClose: 2000});
            }
        }
        setIsFetching(false)
    }

    useEffect(() => {
        if(reqInfo) {
            fetchData()
        }
    }, [reqInfo])

    return [resInfo, isFetching, setReqInfo]
}

export default useFetch
