import React from 'react';
import { Typography, Button, Row, Col, Card, List } from 'antd';
import { ArrowRightOutlined, EnvironmentOutlined, ShoppingCartOutlined, CoffeeOutlined, GiftOutlined, CarOutlined } from '@ant-design/icons';
import Lottie from 'lottie-react';
import heroAnimation from '../../assets/lottie/hero-animation.json';
import leavesAnimation from '../../assets/lottie/leaves-falling.json';
import ContactCTA from '../common/ContactCTA';

const { Title, Paragraph, Text } = Typography;

const heroFeatures = [
  {
    icon: <GiftOutlined style={{ color: '#faad14', fontSize: 24 }} />, 
    title: 'Artisanal Cakes & Bakes',
    desc: 'Freshly made with organic, locally sourced ingredients',
  },
  {
    icon: <ShoppingCartOutlined style={{ color: '#52c41a', fontSize: 24 }} />, 
    title: 'Eco-Friendly Packaging',
    desc: '100% biodegradable and plastic-free',
  },
  {
    icon: <CarOutlined style={{ color: '#1890ff', fontSize: 24 }} />, 
    title: 'Sustainable Café Culture',
    desc: 'Zero-waste baking, green energy, and mindful choices',
  },
  {
    icon: <CoffeeOutlined style={{ color: '#d46b08', fontSize: 24 }} />, 
    title: 'Relax & Refresh',
    desc: 'Enjoy your treat with a hot coffee or herbal tea in our green, peaceful space',
  },
  {
    icon: <EnvironmentOutlined style={{ color: '#13c2c2', fontSize: 24 }} />, 
    title: 'Delivery with Care',
    desc: 'Low-emission local deliveries to support a cleaner future',
  },
];

const Hero = () => {
  return (
    <>
      <section style={{ 
        background: 'var(--hero-bg, linear-gradient(135deg, #f0fff4 0%, #fff7e6 50%, #f0f9ff 100%))',
        padding: '64px 0',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh'
      }} className="hero-section">
        {/* Full Page Lottie Background Animations */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 1
        }}>
          {/* Decorative Cake PNG in upper section */}
          <div style={{ 
            position: 'absolute', 
            top: '5%', 
            right: '5%', 
            width: 120, 
            height: 120,
            zIndex: 3
          }}>
            <img 
              src="/cake/cake1.webp" 
              alt="Decorative Cake" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
                animation: 'float 3s ease-in-out infinite'
              }} 
            />
          </div>
          
          {/* Decorative Cake PNG on left side */}
          <div style={{ 
            position: 'absolute', 
            top: '8%', 
            left: '3%', 
            width: 100, 
            height: 100,
            zIndex: 3
          }}>
            <img 
              src="/cake/cake3.webp" 
              alt="Decorative Cake" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
                animation: 'float 4s ease-in-out infinite reverse'
              }} 
            />
          </div>
          
          {/* Large background animation covering the whole page */}
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%',
            opacity: 0.3
          }}>
            <Lottie
              animationData={leavesAnimation}
              loop={true}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          {/* Additional smaller animations scattered across the page */}
          <div style={{ position: 'absolute', top: '5%', left: '10%', width: 200, height: 200 }}>
            <Lottie
              animationData={leavesAnimation}
              loop={true}
              autoplay={true}
              style={{ opacity: 0.4, transform: 'scale(1.2)' }}
            />
          </div>
          <div style={{ position: 'absolute', top: '70%', right: '15%', width: 180, height: 180 }}>
            <Lottie
              animationData={leavesAnimation}
              loop={true}
              autoplay={true}
              style={{ opacity: 0.35, transform: 'scale(0.9)' }}
            />
          </div>
          <div style={{ position: 'absolute', top: '40%', left: '75%', width: 150, height: 150 }}>
            <Lottie
              animationData={leavesAnimation}
              loop={true}
              autoplay={true}
              style={{ opacity: 0.3, transform: 'scale(0.7)' }}
            />
          </div>
          <div style={{ position: 'absolute', bottom: '15%', left: '25%', width: 160, height: 160 }}>
            <Lottie
              animationData={leavesAnimation}
              loop={true}
              autoplay={true}
              style={{ opacity: 0.4, transform: 'scale(0.8)' }}
            />
          </div>
          <div style={{ position: 'absolute', top: '20%', right: '40%', width: 140, height: 140 }}>
            <Lottie
              animationData={leavesAnimation}
              loop={true}
              autoplay={true}
              style={{ opacity: 0.25, transform: 'scale(0.6)' }}
            />
          </div>
          <div style={{ position: 'absolute', top: '60%', left: '60%', width: 120, height: 120 }}>
            <Lottie
              animationData={leavesAnimation}
              loop={true}
              autoplay={true}
              style={{ opacity: 0.3, transform: 'scale(0.5)' }}
            />
          </div>
        </div>
        {/* Content */}
        <div style={{ 
          maxWidth: 1200, 
          margin: '0 auto', 
          padding: '0 24px',
          position: 'relative',
          zIndex: 2
        }}>
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} md={12}>
              <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center' }}>
                <img src="/icons/logo-2.svg" alt="Bela Logo" style={{ height: 48, marginRight: 16 }} />
                <Title level={2} style={{ margin: 0, color: '#389e0d' }}>Bela</Title>
              </div>
              <Title level={1} style={{ color: 'var(--text-primary)', marginBottom: 16 }}>The Eco-Friendly Cake Café</Title>
              <Paragraph style={{ fontSize: 18, color: 'var(--text-secondary)', marginBottom: 32 }}>
                At Bela, we blend the joy of delicious cakes with a deep love for the planet. Our cozy, eco-conscious café is your go-to spot for handcrafted cakes, pastries, and fresh bakes, made with natural ingredients and sustainable practices.
              </Paragraph>
              <Row gutter={16} style={{ marginBottom: 32 }}>
                <Col>
                  <Button type="primary" size="large" icon={<ShoppingCartOutlined />} style={{ marginRight: 8 }}>
                    See Our Cakes
                  </Button>
                </Col>
                <Col>
                  <Button type="default" size="large" icon={<EnvironmentOutlined />}>
                    Visit Us
                  </Button>
                </Col>
              </Row>
              <List
                itemLayout="horizontal"
                dataSource={heroFeatures}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={item.icon}
                      title={<Text strong>{item.title}</Text>}
                      description={item.desc}
                    />
                  </List.Item>
                )}
                style={{ 
                  background: 'rgba(255, 255, 255, 0.8)', 
                  borderRadius: 12, 
                  padding: 16, 
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              />
            </Col>
            <Col xs={24} md={12} style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: 24 }}>
                <img src="/cake/Vanilla-Cake-1.jpg" alt="Vanilla Berry Delight Cake" style={{ maxWidth: 400, borderRadius: 16, boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)' }} />
              </div>
              <div style={{ maxWidth: 320, margin: '0 auto' }}>
                <img src="/cake/cake2.jpg" alt="Chocolate Drip Masterpiece" className="shake" style={{ maxWidth: 320, borderRadius: 16, boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)' }} />
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <ContactCTA />
    </>
  );
};

export default Hero;