import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import {  loadChangeStatusClient, loadAllClients, loadStatistics } from '../../actions/client'
import { Button, Modal, Typography, Row, Col } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;

export const ClientStatusModal = ({ isVisible=false, isEdit=false, handleToggleStatusModal}) => {

  const dispatch = useDispatch();
  const { isFetching,  selected:clientSelected } = useSelector(state => state.clients);
    
  const onFinish = async () => {
    try {        
        console.log('clientSelected', clientSelected);
        dispatch(loadChangeStatusClient(clientSelected.status, clientSelected.id)).then(() => {
          dispatch(loadAllClients());
          dispatch(loadStatistics());
          handleToggleStatusModal(false);
        });
       
    } catch (error) {
     
    }
  }

  return (
    <Modal    
    visible={isVisible}    
    confirmLoading={isFetching}
    onCancel={()=>handleToggleStatusModal(false)}
    width={500}
    footer={null}
    centered
  >
    <div style={{ padding:20, textAlign:"center" }}>
      <Title level={4} style={{ margin: 0 }}> <ExclamationCircleOutlined style={{ color: '#e95353' }} /> 
        { ` Seguro de ${ (clientSelected && clientSelected.status) ? 'Eliminar' : 'Restaurar' } al Cliente?` }
      </Title>      
      <Row gutter={[16,16]} justify="center" style={{ marginTop:15 }}>
        <Col >
          <Button 
            type="primary"
            onClick={()=>onFinish()}
            loading={isFetching}
          >Aceptar</Button>
        </Col>
        <Col >
          <Button 
            onClick={()=>handleToggleStatusModal(false)}
            disabled={isFetching}
          >Cancelar</Button>
        </Col>
      </Row>
    </div>    
  </Modal>
  )
}

