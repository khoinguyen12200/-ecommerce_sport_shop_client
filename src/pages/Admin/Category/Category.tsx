import React from 'react'
import BaseLayout from '../BaseLayout/BaseLayout'
import { useEffect } from 'react';
import axios from 'axios';
import { ENDPOINT } from '../../../config/config';
import { Table } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { fetchCategories } from './CategoryState';

type Props = {}

function Category({ }: Props) {
    const categories = useAppSelector(state => state.admin.categories);
    const dispatch = useAppDispatch();

    useEffect(() => {
        fetchCategories(dispatch);
    }, [])

    return (
        <BaseLayout title="Phân loại">
            <Table  striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên</th>
                        <th>Slug</th>
                        </tr>
                </thead>
                <tbody>
                    {
                        categories && categories.map((category: any, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{category.name}</td>
                                <td>{category.slug}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </BaseLayout>
    )
}

export default Category