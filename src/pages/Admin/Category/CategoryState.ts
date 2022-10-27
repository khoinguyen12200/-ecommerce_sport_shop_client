import axios from "axios";
import ts from "typescript";
import { ENDPOINT } from "../../../config/config";
import { setCategories } from "../../../redux/adminDataSlice";
import { AppDispatch, useAppDispatch } from '../../../redux/store';

export async function fetchCategories(dispatch: AppDispatch) {
    const res = await axios.get(ENDPOINT+'/admin/category');
    const categories = res?.data?.categories || [];
    dispatch(setCategories(categories));
}