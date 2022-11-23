import axios from 'axios'
import React from 'react'
import { ENDPOINT } from '../../../config/config'
import { mapInvoiceState } from '../../../config/constant'
import { setLoading } from '../../../redux/loadingSlice'
import { useAppDispatch } from '../../../redux/store'
import { InvoiceInterface } from '../../../types/InvoiceInterfaces'
import BaseContent from '../../Admin/BaseContent'
import { Link } from 'react-router-dom';

type Props = {}

function Invoices({ }: Props) {

    const [invoices, setInvoices] = React.useState([])
    const dispatch = useAppDispatch();

    async function fetchInvoice() {
        dispatch(setLoading(true))
        const res = await axios.get(ENDPOINT+'/user/invoices').finally(() => {
            dispatch(setLoading(false))
        })
        setInvoices(res.data.data)
    }

    React.useEffect(() => {
        fetchInvoice()
    }, [])

    return (
        <BaseContent
            title='Hoá đơn'
        >
            <table
                className='table table-striped table-bordered table-hover'
            >
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Ngày đặt hàng</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice: InvoiceInterface, index) => (
                        <tr key={index}>
                            <td>
                                <Link to={`/user/invoices/${invoice.id}/${invoice.hash}`}>
                                <i className="fa-solid fa-file-lines mr-2"></i>
                                # {invoice.id}
                                </Link>
                            </td>
                            <td>
                                {new Date(invoice.createdAt.date).toLocaleDateString()}
                            </td>
                            <td>
                                {invoice.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </td>
                            <td>
                                {mapInvoiceState(invoice.state)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </BaseContent>

    )
}

export default Invoices