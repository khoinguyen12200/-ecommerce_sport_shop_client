import React, { useEffect } from 'react'
import './Login.scss'

import ImageSporterus from '../../../assets/icons/sporterus-high-resolution-logo-transparent-background.png';
import useFetch from '../../../hooks/useFetch';
import { ENDPOINT } from '../../../config/config';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { updateToken } from '../../../redux/authSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    Label
} from "reactstrap";

type Props = {}


function Login() {
    const navigate = useNavigate();

    const account = useAppSelector(state => state.account);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [res, loading, dispatchFetch] = useFetch(undefined, { toast: true });
    const dispatch = useAppDispatch();

    useEffect(() => {
        let data = res?.data;
        if (data) {
            dispatch(updateToken({
                accessToken: data.token,
                role: data.role,
                email: data.email,
                id: data.id
            }))
        }
    }, [loading, res])

    useEffect(() => {
        if(account.role == 'ROLE_ADMIN') {
            navigate('/admin')
        }

        if(account.role == 'ROLE_USER') {
            navigate('/user')
        }


    },[account])

    async function submit() {
        toast.promise(
            sendForm(),
            {
                pending: 'Đang đăng nhập...',
                success: 'Đăng nhập thành công',
                error: 'Đăng nhập thất bại'
            }
        )
    }

    async function sendForm() {
        const reqData = {
            username: email,
            password: password
        };

        const res = await axios.post(ENDPOINT + '/login_check', reqData)

        const data = res.data;
        dispatch(updateToken({
            accessToken: data.token,
            role: data.role,
            email: data.email,
            id: data.id,
            user: data.user
        }))
    }



    return (
        <div className='LoginPage'>
            <img src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1344,c_limit/beba11dc-27f3-4fac-97cc-560674ebfe6f/nike-just-do-it.png"
                alt="" className="bg" />
            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0 loginForm">
                    <CardBody className="px-lg-5 py-lg-5">
                        <img src={ImageSporterus} className='logo mb-5 text-center' />
                        <div className="text-center text-muted mb-4">
                            <small>Đăng nhập với tài khoản</small>
                        </div>
                        <Form role="form">
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <Label addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83" />
                                        </InputGroupText>
                                    </Label>
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        autoComplete="new-email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <Label addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </Label>
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </InputGroup>
                            </FormGroup>

                            <div className="text-center">
                                <Button onClick={submit} className="my-4" color="primary" type="button">
                                    Đăng nhập
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
                <Row className="mt-3">
                    <Col xs="6">
                        <a
                            className="btn btn-light btn-sm"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                            <small>Forgot password?</small>
                        </a>
                    </Col>
                    <Col className="text-right" xs="6">
                        <Link to='/register'
                            className="btn btn-warning btn-sm"
                        >
                            <small>Tạo tài khoản mới</small>
                        </Link>
                    </Col>
                </Row>
            </Col>
        </div>
    )
}

export default Login