import axios from 'axios';
import React from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ENDPOINT } from '../../../config/config';
import { mapInvoiceState } from '../../../config/constant';
import { setLoading } from '../../../redux/loadingSlice';
import { useAppDispatch } from '../../../redux/store';
import { InvoiceInterface } from '../../../types/InvoiceInterfaces';
import BaseContent from '../BaseContent'

type Props = {}

function Invoice({ }: Props) {
    const [invoices, setInvoices] = React.useState<InvoiceInterface[]>([]);
    const dispatch = useAppDispatch();

    async function fetchInvoice() {
        dispatch(setLoading(true))
        const res = await axios.get(ENDPOINT + '/admin/invoice').finally(() => {
            dispatch(setLoading(false))
        })
        console.log(res.data.data)
        setInvoices(res.data.data);
    }

    React.useEffect(() => {
        fetchInvoice();
    }, [])

    return (
        <BaseContent
            title="Đơn hàng"
            rightContent={
                <Link to="/admin/invoice/create" className="btn btn-primary">Thêm đơn hàng</Link>
            }
        >
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên khách hàng</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Ngày đặt hàng</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice, index) => (
                        <tr key={invoice.id}>
                            <td>{invoice.id}</td>
                            <td>{invoice.name}</td>
                            <td>{invoice.address}</td>
                            <td>{invoice.phone}</td>
                            <td>
                                {
                                    new Date(invoice.createdAt.date).toLocaleDateString()
                                }
                            </td>
                            <td>{mapInvoiceState(invoice.state)}</td>
                            <td>
                                <Link to={`/admin/invoice/${invoice.id}`} className="btn btn-sm btn-primary">Chi tiết</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </BaseContent>
    )
}

export default Invoice