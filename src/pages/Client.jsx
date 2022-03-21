import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeSelectClient } from "../actions/client";
import { Typography, Col, Row, Button } from "antd";
import { ClientList } from "./../components/client/ClientList";
import { ClientFormModal } from "./../components/client/ClientFormModal";
import { ClientStatusModal } from "./../components/client/ClientStatusModal";
import { ClientStatistics } from "./../components/client/ClientStatistics";
import { UserAddOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Client = () => {
  const dispatch = useDispatch();
  const [modalVisibleForm, setModalVisibleForm] = useState(false);
  const [modalVisibleStatus, setModalVisibleStatus] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  
  const handleToggleFormModal = async (bool, edit = false) => {    
    if (!bool) { await dispatch(removeSelectClient()); }
    setIsEdit(edit);
    setModalVisibleForm(bool);
  };
  
  const handleToggleStatusModal = async (bool) => {
    if (!bool) { await dispatch(removeSelectClient()); }
    setModalVisibleStatus(bool);
  };

  return (
    <>
      <Row gutter={16}>
        <Col xs={24} md={24} lg={15}>
          <Row>
            <Col xs={24} sm={16} md={14} lg={17}>
              <Title level={2} style={{ margin: 0, marginBottom: 10 }}>CLIENTES</Title>
            </Col>
            <Col xs={24} sm={8} md={10} lg={7}>
              <Button type="primary" style={{ marginBottom: 10 }} block onClick={handleToggleFormModal}>
                <UserAddOutlined /> AGREGAR
              </Button>
            </Col>
          </Row>
          {/* Lista */}
          <ClientList handleToggleFormModal={handleToggleFormModal} handleToggleStatusModal={handleToggleStatusModal} />
        </Col>        
        <Col xs={24} md={24} lg={9}>
          <ClientStatistics />                    
        </Col>
      </Row>

      {/* Formulario */}
      <ClientFormModal
        isVisible={modalVisibleForm}
        isEdit={isEdit}
        handleToggleFormModal={handleToggleFormModal}
      />

      {/* Cambiar estado Cliente */}
      <ClientStatusModal
        isVisible={modalVisibleStatus}
        handleToggleStatusModal={handleToggleStatusModal}
      />
    </>
  );
};

export default Client;
