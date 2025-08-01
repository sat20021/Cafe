import React from 'react';
import { Card, Typography, Row, Col, Button } from 'antd';
import { CarOutlined, ShoppingOutlined, ThunderboltOutlined } from '@ant-design/icons';
import Lottie from 'lottie-react';
import cakeAnimation from '../../assets/lottie/cake-dessert.json';
import ContactCTA from '../common/ContactCTA';

const { Title, Paragraph } = Typography;

const services = [
  {
    icon: <CarOutlined style={{ fontSize: 40, color: '#52c41a' }} />,
    title: 'Low-Emission Delivery',
    desc: 'We deliver your treats using bikes and electric vehicles for a cleaner future.',
    btn: 'Learn More',
    btnType: 'primary',
  },
  {
    icon: <ShoppingOutlined style={{ fontSize: 40, color: '#faad14' }} />,
    title: 'Eco Packaging',
    desc: 'All our packaging is 100% biodegradable and plastic-free.',
    btn: 'See Packaging',
    btnType: 'default',
  },
  {
    icon: <ThunderboltOutlined style={{ fontSize: 40, color: '#1890ff' }} />,
    title: 'Sustainable Baking',
    desc: 'We use green energy and zero-waste baking methods every day.',
    btn: 'Our Green Promise',
    btnType: 'primary',
  },
];

const Services = () => {
  return (
    <>
      <section style={{ padding: '64px 0', background: '#fafafa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <Row gutter={[48, 32]} align="middle" style={{ marginBottom: 48 }}>
            <Col xs={24} md={16}>
              <Title level={1} style={{ marginBottom: 16 }}>Our Eco-Friendly Services</Title>
              <Paragraph style={{ fontSize: 18 }}>
                We're committed to serving delicious treats while protecting our planet
              </Paragraph>
            </Col>
            <Col xs={24} md={8} style={{ textAlign: 'center' }}>
              <Lottie
                animationData={cakeAnimation}
                loop={true}
                autoplay={true}
                style={{ height: 200 }}
              />
            </Col>
          </Row>
          <Row gutter={[32, 32]}>
            {services.map((service, idx) => (
              <Col xs={24} md={8} key={idx}>
                <Card
                  hoverable
                  style={{ borderRadius: 16, textAlign: 'center', minHeight: 340 }}
                  styles={{ body: { padding: 32 } }}
                >
                  <div style={{ marginBottom: 24 }}>{service.icon}</div>
                  <Title level={3} style={{ marginBottom: 16 }}>{service.title}</Title>
                  <Paragraph style={{ marginBottom: 24 }}>{service.desc}</Paragraph>
                  <Button type={service.btnType} size="large">{service.btn}</Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>
      <ContactCTA />
    </>
  );
};

export default Services;    