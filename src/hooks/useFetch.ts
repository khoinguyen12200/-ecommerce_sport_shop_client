import { useAppSelector } from './../redux/store';
import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

interface IReqInfo {
    headers?: any
    method?: string
    endPoint: string
    body?: any,
}

interface IResInfo {
    data: any
    hasError: boolean
    success: boolean
}

interface ConfigUseFetch {
    toast?: boolean
}

const useFetch = (url?: string, config?: ConfigUseFetch): [IResInfo, boolean, React.Dispatch<React.SetStateAction<any>>] => {
    const [isFetching, setIsFetching] = useState(false)
    const [requestFunction, setRequestFunction] = useState<Function>()
    const [resInfo, setResInfo] = useState<IResInfo>({} as IResInfo)

    const account = useAppSelector(state => state.account);


    const fetchData = async () => {
        if (!requestFunction) return;
        if(config?.toast && isFetching) {
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
            console.log(typeof requestFunction)
            // is function
            if (typeof requestFunction === "function") {
                console.log("is function")
            }
            const res = await requestFunction();
            console.log('fetch success', res);
            setResInfo({ data: res.data, hasError: false, success: true })
            //success
            if(config?.toast && idToast) {
                toast.update(idToast, {render: "Thành công", type: "success", isLoading: false, autoClose: 2000});
            }
        } catch (error) {
            console.log('error in fetch',error);
            const e = error as AxiosError;
            setResInfo({ data: error, hasError: true, success: false })

            //error
            if(config?.toast && idToast) {
                toast.update(idToast, {render: e.message || 'Lỗi không rõ', type: "error", isLoading: false, autoClose: 2000});
            }
        }
        setIsFetching(false)
    }

    useEffect(() => {
        console.log("useFetch useEffect", );
        if(requestFunction) {
            console.log("useFetch useEffect requestFunction", requestFunction);
            fetchData()
        }
    }, [requestFunction])

    return [resInfo, isFetching, setRequestFunction]
}

export default useFetch
