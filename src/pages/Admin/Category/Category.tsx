import React from 'react'
import BaseLayout from '../BaseLayout/BaseLayout'
import { useEffect } from 'react';
import axios from 'axios';
import { ENDPOINT } from '../../../config/config';
import { Table } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { fetchCategories } from './CategoryState';
import BaseContent from '../BaseContent';

type Props = {}

function Category({ }: Props) {
    const categories = useAppSelector(state => state.admin.categories);
    
    return (
        <BaseContent title="Phân loại">
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
        </BaseContent>
    )
}

export default Category