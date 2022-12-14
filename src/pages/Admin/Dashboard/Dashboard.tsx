/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col
} from "reactstrap";
import Header from "../../../Components/Headers/Header";
import { chartExample1, chartExample2 } from "../../../variables/charts";
import Wrapper from "../Wrapper";
import axios from 'axios';
import { ENDPOINT } from "../../../config/config";
import { useMemo } from 'react';
import { colors } from '../../../variables/charts';

interface InvoiceData {
    count: number;
    month: string;
}

type InvoicesData = InvoiceData[];

interface ProductData {
    count: number;
    month: string;
}

type ProductsData = ProductData[];

interface DashboardData {
    users: number;
    admins: number;
    products: ProductsData;
    invoices: InvoicesData;
}

const Index = (props: any) => {
    const [activeNav, setActiveNav] = useState(1);
    const [chartExample1Data, setChartExample1Data] = useState("data1");

    const [data, setData] = useState<DashboardData | null>(null);

    async function fetchDashboard() {
        const res = await axios.get(ENDPOINT + '/admin');
        setData(res.data.data);
    }

    useEffect(() => {
        fetchDashboard();
    }, []);

    const countInvoices = useMemo(() => {
        if (data) {
            const invoices = data.invoices[data.invoices.length - 1];
            return invoices.count;
        }

        return 0;
    }, [data])

    const countProducts = useMemo(() => {
        if (data) {
            const products = data.products[data.products.length - 1];
            return products.count;
        }

        return 0;
    }, [data])

    const users = data?.users || 0;
    const admins = data?.admins || 0;


    const toggleNavs = (e: any, index: any) => {
        e.preventDefault();
        setActiveNav(index);
        setChartExample1Data("data" + index);
    };

    const invoicesDataChart = useMemo(() => {
        if (data && data.invoices) {
            const labels = data.invoices.map((item) => item.month);
            const dataForLabels = data.invoices.map((item) => item.count);
            return {
                labels,
                datasets: [
                    {
                        label: "Ho?? ????n",
                        data: dataForLabels,
                        fill: false,
                        borderColor: colors.theme["primary"],

                    }
                ]
            }
        }

        return {
            labels: [],
            datasets: [
                {
                    label: "Ho?? ????n",
                    data: []
                }
            ]
        }
    }, [data])

    const productsDataChart = useMemo(() => {
        if (data && data.products) {
            const labels = data.products.map((item) => item.month);
            const dataForLabels = data.products.map((item) => item.count);
            return {
                labels,
                datasets: [
                    {
                        label: "S???n ph???m",
                        data: dataForLabels,
                        fill: false,
                        borderColor: colors.theme["primary"],
                        backgroundColor: colors.theme["success"],
                    }
                ]
            }
        }

        return {
            labels: [],
            datasets: [
                {
                    label: "S???n ph???m",
                    data: [],
                    borderColor: colors.theme["primary"],
                    backgroundColor: colors.theme["success"],
                }
            ]
        }
    }, [data])

    return (
        <Wrapper
            header={
                <Header
                    users={users}
                    admins={admins}
                    countProducts={countProducts}
                    countInvoices={countInvoices} />
            }
        >

            {/* Page content */}
            <Container fluid>
                <Row>
                    <Col className="mb-5 mb-xl-0" xl="8">
                        <Card className="bg-gradient-default shadow">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h6 className="text-uppercase text-light ls-1 mb-1">
                                            T???ng quan
                                        </h6>
                                        <h2 className="text-white mb-0">
                                            ????n h??ng
                                        </h2>
                                    </div>
                                    <div className="col">
                                        <Nav className="justify-content-end" pills>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames("py-2 px-3", {
                                                        active: activeNav === 1
                                                    })}
                                                    href="#pablo"
                                                    onClick={(e) => toggleNavs(e, 1)}
                                                >
                                                    <span className="d-none d-md-block">Th??ng</span>
                                                    <span className="d-md-none">M</span>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames("py-2 px-3", {
                                                        active: activeNav === 2
                                                    })}
                                                    data-toggle="tab"
                                                    href="#pablo"
                                                    onClick={(e) => toggleNavs(e, 2)}
                                                >
                                                    <span className="d-none d-md-block">Tu???n</span>
                                                    <span className="d-md-none">W</span>
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                {/* Chart */}
                                <div className="chart">
                                    <Line
                                        data={invoicesDataChart}
                                        options={chartExample1.options as any}
                                        getDatasetAtEvent={(e: any) => console.log(e) as any}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="4">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h6 className="text-uppercase text-muted ls-1 mb-1">
                                            theo th??ng
                                        </h6>
                                        <h2 className="mb-0">
                                            S???n ph???m m???i
                                        </h2>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                {/* Chart */}
                                <div className="chart">
                                    <Bar
                                        //height 100%
                                        height={300}
                                        data={productsDataChart}
                                        options={chartExample2.options as any}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>


            </Container>
        </Wrapper>
    );
};

function Others() {
    return (
        <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <Row className="align-items-center">
                            <div className="col">
                                <h3 className="mb-0">Page visits</h3>
                            </div>
                            <div className="col text-right">
                                <Button
                                    color="primary"
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                    size="sm"
                                >
                                    See all
                                </Button>
                            </div>
                        </Row>
                    </CardHeader>
                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Page name</th>
                                <th scope="col">Visitors</th>
                                <th scope="col">Unique users</th>
                                <th scope="col">Bounce rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">/argon/</th>
                                <td>4,569</td>
                                <td>340</td>
                                <td>
                                    <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">/argon/index.html</th>
                                <td>3,985</td>
                                <td>319</td>
                                <td>
                                    <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                                    46,53%
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">/argon/charts.html</th>
                                <td>3,513</td>
                                <td>294</td>
                                <td>
                                    <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                                    36,49%
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">/argon/tables.html</th>
                                <td>2,050</td>
                                <td>147</td>
                                <td>
                                    <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">/argon/profile.html</th>
                                <td>1,795</td>
                                <td>190</td>
                                <td>
                                    <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                                    46,53%
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
            </Col>
            <Col xl="4">
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <Row className="align-items-center">
                            <div className="col">
                                <h3 className="mb-0">Social traffic</h3>
                            </div>
                            <div className="col text-right">
                                <Button
                                    color="primary"
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                    size="sm"
                                >
                                    See all
                                </Button>
                            </div>
                        </Row>
                    </CardHeader>
                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Referral</th>
                                <th scope="col">Visitors</th>
                                <th scope="col" />
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Facebook</th>
                                <td>1,480</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <span className="mr-2">60%</span>
                                        <div>
                                            <Progress
                                                max="100"
                                                value="60"
                                                barClassName="bg-gradient-danger"
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Facebook</th>
                                <td>5,480</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <span className="mr-2">70%</span>
                                        <div>
                                            <Progress
                                                max="100"
                                                value="70"
                                                barClassName="bg-gradient-success"
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Google</th>
                                <td>4,807</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <span className="mr-2">80%</span>
                                        <div>
                                            <Progress max="100" value="80" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Instagram</th>
                                <td>3,678</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <span className="mr-2">75%</span>
                                        <div>
                                            <Progress
                                                max="100"
                                                value="75"
                                                barClassName="bg-gradient-info"
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">twitter</th>
                                <td>2,645</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <span className="mr-2">30%</span>
                                        <div>
                                            <Progress
                                                max="100"
                                                value="30"
                                                barClassName="bg-gradient-warning"
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
            </Col>
        </Row>
    )
}

export default Index;
