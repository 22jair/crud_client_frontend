import React, { useEffect } from 'react'
import { Table, Button, Tag } from "antd";
import { useDispatch, useSelector } from 'react-redux'
import { loadAllClients, selectClient } from '../../actions/client'
import { EditOutlined, DeleteOutlined, UnlockOutlined } from "@ant-design/icons";
import moment from 'moment';

export const ClientList = ({ handleToggleFormModal, handleToggleStatusModal }) => {

  const dispatch = useDispatch();
  const { clients=[] } = useSelector(state => state.clients);

  useEffect(() => {
    dispatch(loadAllClients());
  }, [])

  const handleActions = (action, client) => {

    dispatch(selectClient(client));
    if (action === 'edit') {
      // ( Open | edit )
      handleToggleFormModal(true, true);    
    } else if (action === 'delete') {
      handleToggleStatusModal(true);
    }        
  }  

  let columns = [
    { 
      title: "ID",
      dataIndex: "id",
      width: 50,
      sorter: (a, b) => a.id - b.id
    },
    { 
      title: "NOMBRES", 
      render: (text, item) => item.name,
      sorter: (a, b) => { return a.name.localeCompare(b.name)}
    },
    { 
      title: "APELLIDOS",
      render: (text, item) => item.surname,
      sorter: (a, b) => { return a.surname.localeCompare(b.surname)}
    },
    { 
      title: "FEC. NAC.",
      width: 150, render: (text, item) => moment(item.birthdate).format('YYYY-MM-DD'),
      sorter: (a, b) => { return a.birthdate.localeCompare(b.birthdate)}
    },
    { 
      title: "ESTADO",
      dataIndex: "status", render: (text, record) =>
       (<Tag color={record.status ? "green" : "volcano"}>
         {record.status ? "Activo" : "Inactivo"}
      </Tag>),
      sorter: (a, b) => a.status - b.status
    },
    {
      title: "",
      render: (text, record) => (
        <>
          { (record.status) 
            ? <Button type="link" onClick={() => handleActions('edit', record)}>
                <EditOutlined /> 
              </Button>
            : <span></span>
          }
          
          <Button type="link" onClick={() => handleActions('delete', record)}>
            { (record.status) 
              ? <DeleteOutlined  style={{ color: '#e95353' }}/> 
              : <UnlockOutlined  style={{ color: '#389e0d' }}/> 
            }            
          </Button>           
        </>
      ),
    }
  ];
  
  return (    
    <Table
      rowKey="id"
      columns={columns}
      dataSource={clients}      
      pagination={{ pageSize: 5 }}
      scroll={{ x: 500 }}
    />
  )
}

