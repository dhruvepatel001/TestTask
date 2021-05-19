import React, { Component } from 'react';
import 'carbon-components/scss/globals/scss/styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    DataTable,
    TableContainer,
    Table,
    TableHead, Button,
    TableRow,
    TableHeader,
    TableBody, TableToolbar, TableBatchActions, TableToolbarContent, TableToolbarSearch, TableToolbarMenu,
    TableCell, TableToolbarAction,
    TableSelectRow, TableBatchAction,
    // TableSelectAll

} from 'carbon-components-react';
import Modal from 'react-bootstrap/Modal';
import ReactFormInputValidation from "react-form-input-validation";

import "../App.css"
// import { headers, rows } from './stories/shared';

// const token = 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InRlc3RAeHl6LmNvbSIsImV4cCI6MTYyMTQxNjAyNiwiZW1haWwiOiJ0ZXN0QHh5ei5jb20ifQ.8hvvkf626U1X8sweSl05QEWwauq5CwV4gLMuvXaKeOc'
const cokkie = 'csrftosken=A25VnUcv3AYDuxwwWq4rZooBPSHrbhJdZPBe8EvrC9Fj9A37RFMC4E2iiWghOiaH; sessionid = yxcj1xyztpd95g37psi105cm2jroqw15'


// const required = "Required";


export class Userlist extends Component {

    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            fields: {
                name: "",
                username: "",
                superuser: "",
                active: "",
                staff: ""
            },
            errors: {},
            token: ''
        };
        this.form = new ReactFormInputValidation(this);
        this.form.useRules({
            name: "required",
            username: "required",
            superuser: "required",
            active: "required",
            staff: "required"
        });
        this.form.onformsubmit = () => {
            // Do you ajax calls here.
        }
    }


    handleShow = () => {
        this.setState({ openModal: true })
    }

    handleClose = () => {
        this.setState({ openModal: false })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        setTimeout(() => {
            this.form.showError(this.userInput, <span>API error</span>);
        }, 1000);
    };

    removeApiError = () => {
        this.form.hideError(this.userInput);
    };


    componentDidMount() {

        var data = new FormData()
        data.append('email', 'test@xyz.com');
        data.append('password', 'test1234');
        // var headers = new Headers();
        // headers.append('Host', '<calculated when request is sent>');
        // headers.append("Authorization", token);
        // headers.append("Cookie", cokkie);
        fetch('https://localhost:8000/api/auth/login/', {
            method: "POST",
            body: data,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("API Login RES", responseJson);
                this.setState({ token: responseJson.token });

                var headers = new Headers();
                headers.append('Accept', 'application/json');
                var tokennew = 'Bearer ' + responseJson.token
                console.log("New TOken==>", tokennew);
                headers.append("Authorization", tokennew);
                headers.append("Cookie", cokkie);

                fetch('https://localhost:8000/api/users/', {
                    method: "GET",
                    headers: headers,
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log("API Users", responseJson);

                    }).catch((error) => {
                        console.error(error);
                    });


            }).catch((error) => {
                console.error(error);
            });




    }



    render() {
        return (
            <div>

                <Modal show={this.state.openModal} onHide={() => { this.handleClose() }}>
                    <Modal.Dialog style={{ margin: "0", padding: "20px" }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add New</Modal.Title>
                        </Modal.Header>

                        <form onSubmit={this.form.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                <input type="text" name="name" className="form-control" id="exampleInputEmail1" onBlur={this.form.handleBlurEvent}
                                    onChange={this.form.handleChangeEvent}
                                    value={this.state.fields.name} aria-describedby="emailHelp" />
                                <label className="error form-text text-danger">
                                    {this.state.errors.name ? this.state.errors.name : ""}
                                </label>

                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                                <input type="text" name="username" className="form-control" id="exampleInputEmail1" onBlur={this.form.handleBlurEvent}
                                    onChange={this.form.handleChangeEvent}
                                    value={this.state.fields.username} aria-describedby="emailHelp" />
                                <label className="error text-danger">
                                    {this.state.errors.username ? this.state.errors.username : ""}
                                </label>

                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" name="superuser"
                                    onBlur={this.form.handleBlurEvent}
                                    onChange={this.form.handleChangeEvent}
                                    checked={this.state.fields.superuser} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Superuser
                                </label>
                                <label className="error text-danger ml-2">
                                    {this.state.errors.superuser ? this.state.errors.superuser : ""}
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" name="superuser"
                                    name="staff"
                                    onBlur={this.form.handleBlurEvent}
                                    onChange={this.form.handleChangeEvent}
                                    checked={this.state.fields.staff} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Staff
                                </label>
                                <label className="error text-danger ml-2">
                                    {this.state.errors.staff ? this.state.errors.staff : ""}
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" name="superuser"
                                    name="staff"
                                    name="active"
                                    onBlur={this.form.handleBlurEvent}
                                    onChange={this.form.handleChangeEvent}
                                    checked={this.state.fields.active} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Active
                                </label>
                                <label className="error text-danger ml-2">
                                    {this.state.errors.active ? this.state.errors.active : ""}
                                </label>
                            </div>

                            <Modal.Footer>

                                <Button variant="secondary" >Close</Button>
                                <Button type="submit" variant="primary" class="btn btn-primary">Save changes</Button>
                            </Modal.Footer>
                        </form>

                    </Modal.Dialog>

                </Modal>


                <DataTable rows={rows} headers={headers}>
                    {({
                        // rows,
                        // headers,
                        // getHeaderProps,
                        getRowProps,
                        getSelectionProps,
                        getToolbarProps,
                        getBatchActionProps,
                        onInputChange,
                        // selectedRows,
                        getTableProps,
                        getTableContainerProps,
                    }) => (
                        <TableContainer
                            title="DataTable"
                            description="With batch actions"
                            {...getTableContainerProps()}>
                            <TableToolbar {...getToolbarProps()}>
                                <TableBatchActions {...getBatchActionProps()}>
                                    <TableBatchAction
                                        tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                                    // renderIcon={Delete}
                                    // onClick={batchActionClick(selectedRows)}
                                    >
                                        Delete
          </TableBatchAction>
                                    <TableBatchAction
                                        tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                                    // renderIcon={Save}
                                    // onClick={batchActionClick(selectedRows)}
                                    >
                                        Save
          </TableBatchAction>
                                    <TableBatchAction
                                        tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                                    // renderIcon={Download}
                                    // onClick={batchActionClick(selectedRows)}
                                    >
                                        Download
          </TableBatchAction>
                                </TableBatchActions>
                                <TableToolbarContent>
                                    <TableToolbarSearch
                                        persistent="true"
                                        tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                                        onChange={onInputChange}
                                    />
                                    <TableToolbarMenu
                                        tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}>
                                        <TableToolbarAction onClick={() => alert('Alert 1')}>
                                            Action 1
            </TableToolbarAction>
                                        <TableToolbarAction onClick={() => alert('Alert 2')}>
                                            Action 2
            </TableToolbarAction>
                                        <TableToolbarAction onClick={() => alert('Alert 3')}>
                                            Action 3
            </TableToolbarAction>
                                    </TableToolbarMenu>
                                    <Button
                                        tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                                        // onClick={action('Add new row')}
                                        onClick={() => { this.handleShow() }}
                                        size="small"
                                        kind="primary">
                                        Add new
          </Button>
                                </TableToolbarContent>
                            </TableToolbar>
                            <Table {...getTableProps()}>
                                <TableHead>
                                    <TableRow>
                                        {/* <TableSelectAll {...getSelectionProps()} /> */}
                                        <TableHeader>

                                        </TableHeader>
                                        <TableHeader>
                                            Name
                                </TableHeader>
                                        <TableHeader>
                                            Username
                                </TableHeader>
                                        <TableHeader>
                                            Superuser
                                </TableHeader>
                                        <TableHeader>
                                            Staff
                                </TableHeader>
                                        <TableHeader>
                                            Active
                                </TableHeader>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, i) => {
                                        return (
                                            <TableRow key={i} {...getRowProps({ row })}>

                                                <TableSelectRow {...getSelectionProps({ row })} />

                                                {/* <TableSelectRow /> */}
                                                <TableCell>
                                                    {row.first_name}
                                                </TableCell>
                                                <TableCell>
                                                    {row.last_name}
                                                </TableCell>
                                                <TableCell>
                                                    <label className="checkbox-container">
                                                        <input type="checkbox" checked={row.is_superuser == true ? "checked" : null} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </TableCell>
                                                <TableCell>
                                                    <label className="checkbox-container">
                                                        <input type="checkbox" checked={row.is_staff == true ? "checked" : null} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </TableCell>
                                                <TableCell>
                                                    <label class="checkbox-container">
                                                        <input type="checkbox" checked={row.is_active == true ? "checked" : null} />
                                                        <span class="checkmark"></span>
                                                    </label>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}



                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </DataTable>
            </div>
        )
    }
}

export default Userlist




const rows = [
    {
        id: 1,
        url: "http://starkk.pythonanywhere.com/api/users/1/",
        email: "test@xyz.com",
        first_name: "Test",
        last_name: "1",
        is_superuser: true,
        is_active: true,
        is_staff: true,
        profile: null
    },
    {
        id: 2,
        url: "http://starkk.pythonanywhere.com/api/users/1/",
        email: "test@xyz.com",
        first_name: "Test",
        last_name: "1",
        is_superuser: true,
        is_active: false,
        is_staff: true,
        profile: null
    },
    {
        id: 3,
        url: "http://starkk.pythonanywhere.com/api/users/1/",
        email: "test@xyz.com",
        first_name: "Test",
        last_name: "1",
        is_superuser: false,
        is_active: true,
        is_staff: true,
        profile: null
    },
    {
        id: 4,
        url: "http://starkk.pythonanywhere.com/api/users/1/",
        email: "test@xyz.com",
        first_name: "Test",
        last_name: "1",
        is_superuser: true,
        is_active: false,
        is_staff: false,
        profile: null
    }
]

// const rows = [
//     {
//         id: 'load-balancer-1',
//         name: 'Load Balancer 1',
//         rule: 'Round robin',
//         Status: 'Starting',
//     },
//     {
//         id: 'load-balancer-2',
//         name: 'Load Balancer 2',
//         rule: 'DNS delegation',
//         status: 'Active',
//     },
//     {
//         id: 'load-balancer-3',
//         name: 'Load Balancer 3',
//         rule: 'Round robin',
//         status: 'Disabled',
//     },
// ];
const headers = ['Name', 'Rule', 'Status'];



