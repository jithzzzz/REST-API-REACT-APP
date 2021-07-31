import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import "bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import MaterialTable from "material-table";
import axios from 'axios';

import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import PaymentIcon from '@material-ui/icons/Payment';
import IconButton from "@material-ui/core/IconButton";
import LinkIcon from '@material-ui/icons/Link';

import {Link} from 'react-router-dom'





function Tables(props) {

    const [datas, setDatas] = React.useState([])

    useEffect(()=>{
        axios.get('http://localhost:8000/api/invoicelist').then(response => response.data)
        .then((data) => {
            setDatas(data)
            })
            .catch((err)=>{
        })
    },[]);

    function genaretNewLink(id){
        let url = 'http://localhost:8000/api/siglerecord/' + id
        axios.put(url).then(response => response.data)
        .then((data) => {
            setDatas(data)
            window.location.reload();
         })
         .catch((err)=>{
           
        })
    }

    function DeleteRecord(id){
        let url = 'http://localhost:8000/api/siglerecord/' + id
        
        axios.delete(url).then(response => response.data)
        .then((data) => {
            setDatas(data)
         })
         .catch((err)=>{
           
        })
    }
    
    function paymentCheckOut(url){
        axios.delete(url).then(response => response.data)
        .then((data) => {
            setDatas(data)
         })
         .catch((err)=>{
           
        })
    }
    return(
        <>
            <div style={{margin:30, fontWeight:"bold", fontSize:20, flexDirection:'row', display:'flex', justifyContent:'space-between'}}>
                <p>Invoice Payment Records</p>
            </div>
            <div style={{margin:30}}>
                <MaterialTable
                    title="Multiple Actions Preview"
                    columns={[
                        { title: 'Invoice Number', field: 'invoiceNumber' },
                        { title: 'Client Name', field: 'clientName' },
                        { title: 'Client Email', field: 'clientEmail', type: 'email' },
                        { title: 'Project Name', field: 'projectName' },
                        { title: 'Amount', field: 'amout' },
                        {title: 'paymentstatus', field:'paymentstatus'},
                        {
                            title: "Payment Link",
                            field: "paymentlink",
                            editable: false,
                            render: (rowData) =>
                                rowData.paymentlink && (
                                    <Link to={"/checkout/" + rowData.paymentlink.split("/")[2] + '-' + rowData.paymentlink.split("/")[3] }>
                                <IconButton
                                    color="secondary"

                                >
                                    <PaymentIcon />
                                </IconButton>
                                </Link>
                                )
                            }
                    ]}
                    data={datas}  
                    options={{
                        paging: false,
                        filtering: false,
                        search: false,
                      }}      
                    actions={[
                        {
                        icon: () => <LinkIcon/>,
                        tooltip: 'Genarate Payment Link',
                        onClick: (event, rowData) => {
                            genaretNewLink(rowData.id)
                        }
                        },
                        {
                            icon: () => <DeleteOutline/>,
                            tooltip: 'Delete Invoice',
                            onClick: (event, rowData) => {
                                DeleteRecord(rowData.id)
                            }
                        }
                    ]}
                />

            </div>
        </>
    )
}

export default Tables;