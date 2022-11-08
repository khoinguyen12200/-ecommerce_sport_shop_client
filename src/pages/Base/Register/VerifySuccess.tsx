import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

type Props = {}

function VerifySuccess({ }: Props) {
    const [settingDone, setSettingDone] = React.useState(false);

    const navigate = useNavigate();
    React.useEffect(() => {
        setSettingDone(true);
    }, [])
    React.useEffect(() => {
        if (settingDone) {
            toast.success('Kích hoạt tài khoản thành công, hãy đăng nhập để tiếp tục');
            navigate('/login');
        }
    }, [settingDone])
    return (
        <div>

        </div>
    )
}

export default VerifySuccess