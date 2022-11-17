import React from 'react'
import './Register.scss';
import ImageSporterus from "../../../assets/icons/sporterus-high-resolution-logo-transparent-background.png";
import axios, { AxiosError } from 'axios';
import { ENDPOINT } from '../../../config/config';
import { toast } from 'react-toastify';
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

function Register({ }: Props) {



    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');

    async function submit() {
        if (!validateEmail(email)) {
            alert('Email không hợp lệ');
            return;
        }
        if (password !== password2) {
            alert('Mật khẩu không khớp');
            return;
        }

        toast.promise(
            sendRegister(),
            {
                pending: 'Đang đăng ký...',
                success: 'Đăng ký thành công',
                error: 'Đăng ký thất bại'
            }
        )


    }

    async function sendRegister() {
        const res = await axios.post(ENDPOINT + '/registry/user', {
            email: email,
            password: password
        }).catch((err: AxiosError) => {
            const data = err.response?.data as any;
            toast.error(data?.message || '');
            throw err.response?.data;
        })
        toast.success('Đăng ký thành công, hãy kiểm tra email để kích hoạt tài khoản', {
            autoClose: 10000
        })
    }

    function validateEmail(email: string) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
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
                            <small>Tạo tài khoản</small>
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
                                        value={password2}
                                        onChange={e => setPassword2(e.target.value)}
                                    />
                                </InputGroup>
                            </FormGroup>


                            <div className="text-center">
                                <Button onClick={submit} className="my-4" color="primary" type="button">
                                    Đăng ký
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </div>
    )
}

export default Register