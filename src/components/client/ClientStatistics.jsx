import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Statistic, Badge, Card } from "antd";
import { UsergroupAddOutlined, UsergroupDeleteOutlined, BarChartOutlined, AreaChartOutlined } from "@ant-design/icons";
import { loadStatistics } from "../../actions/client";

export const ClientStatistics = () => {

  const dispatch = useDispatch();
  const { statistics=null } = useSelector(state => state.clients);

  useEffect(() => {    
    dispatch(loadStatistics());
  }, [])

  return (
    <>
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12} lg={24}>
        <Badge.Ribbon text="Cantidades" color="#1890ff">
          <Card title="Clientes" >
            <Row gutter={[16,16]}>
              <Col xs={24} md={12}> 
                <Card>
                  <Statistic
                    title="Activos"
                    value={statistics?.actives || 0}
                    valueStyle={{ color: '#389e0d' }}
                    prefix={<UsergroupAddOutlined />}            
                  />
                </Card>
              </Col>
              <Col xs={24} md={12}> 
                <Card>
                  <Statistic
                    title="Inactivos"
                    value={statistics?.inactives || 0}
                    valueStyle={{ color: '#e95353' }}
                    prefix={<UsergroupDeleteOutlined />}            
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Badge.Ribbon>
      </Col>
      <Col xs={24} md={12} lg={24}>
        <Badge.Ribbon text="Avg"  color="#1890ff">
          <Card title="Promedio de Edad" >
            <Row gutter={[16,16]}>
              <Col xs={24} md={12}>
                <Card>
                  <Statistic
                    title="Activos"
                    value={statistics?.avgBirthdateActive || 0}
                    precision={2}
                    prefix={<BarChartOutlined />}            
                  />
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card>
                  <Statistic                    
                    title="Total Act. e Inact."                    
                    value={statistics?.avgBirthdateAll || 0}
                    precision={2}
                    prefix={<AreaChartOutlined />}            
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Badge.Ribbon>
      </Col>
    </Row>
    </>
  )
}
