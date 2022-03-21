import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {  loadSaveClient, loadAllClients, loadUpdateClient, loadStatistics } from '../../actions/client'
import { Button, Row, Col, Modal, Form, Input, InputNumber, DatePicker } from "antd";
import { AlertErrors } from '../AlertErrors'

const validateMessages = { required: "${label} es requerido!", };
const isRequired = { required: true };
const dateFormat = "YYYY-MM-DD";

export const ClientFormModal = ({ isVisible=false, isEdit=false, handleToggleFormModal}) => {

  const dispatch = useDispatch();
  const { isFetching,  selected:clientSelected, error } = useSelector(state => state.clients);
  const [form] = Form.useForm();

  useEffect(() => form.resetFields(), [form, clientSelected]);

  const onFinish = async values => {
    try{
      if(isEdit){
        await dispatch(loadUpdateClient(values.id, values));
      }else{
        await dispatch(loadSaveClient(values));
      }
      dispatch(loadAllClients());
      dispatch(loadStatistics());
      handleToggleFormModal(false);
    }catch(error){ 
      // Handle by redux
    }     
  }

  return (
    <Modal
    title={isEdit ? "Editar Cliente" : "Crear Cliente"}
    visible={isVisible}    
    confirmLoading={isFetching}
    onCancel={()=>handleToggleFormModal(false)}
    width={500}
    footer={null}
  >
    { error && <AlertErrors errors={error} /> }    
    <Form
      form={form}
      validateMessages={validateMessages}
      initialValues={(isEdit && clientSelected) ? ( clientSelected || {} ) : {}}
      requiredMark={true}
      onFinish={onFinish}
      layout="vertical"
      autoComplete="off"
        >          
      <Form.Item hidden={true} name="id">
        <Input />
      </Form.Item>          
      <Form.Item rules={[isRequired]} name="name" label="Nombres">
        <Input />
      </Form.Item>          
      <Form.Item rules={[isRequired]} name="surname" label="Apellidos">
        <Input />
      </Form.Item>
      <Row>
        <Col sm={24} lg={11}>
          <Form.Item rules={[isRequired]} name="birthdate" label="Fecha de Nacimiento">
            <DatePicker style={{ width: '100%' }} format={dateFormat}/>
          </Form.Item>
        </Col>
        <Col sm={0} lg={2} />
        <Col sm={24} lg={11}>
          <Form.Item name="phone" label="Celular" rules={[{ type: "number",  message:"Número inválido" }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>          
      <Form.Item rules={[ { type:"email", message:"Correo inválido" } ]} name="email" label="Correo">
        <Input />
      </Form.Item>          
      <Form.Item>
        <Button 
          type="primary"
          className={ isEdit?'green':'' } 
          htmlType="submit" 
          style={{ width: "100%" }} 
          loading={isFetching}
        >
          {isEdit ? "Editar" : "Crear"}
        </Button>
      </Form.Item>
    </Form>
  </Modal>
  )
}

