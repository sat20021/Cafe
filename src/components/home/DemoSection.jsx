import React, { useState } from 'react';
import { Card, Typography, Form, Input, Button, Statistic, Row, Col, message } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { create } from 'zustand';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const { Title, Paragraph } = Typography;

const useDemoStore = create((set) => ({
  count: 0,
  theme: 'light',
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const fetchDemoData = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    sales: [
      { month: 'Jan', sales: 4000 },
      { month: 'Feb', sales: 3000 },
      { month: 'Mar', sales: 5000 },
      { month: 'Apr', sales: 4500 },
      { month: 'May', sales: 6000 },
      { month: 'Jun', sales: 5500 },
    ],
    stats: {
      totalOrders: 1234,
      revenue: 45678,
      customers: 567,
    }
  };
};

const DemoSection = () => {
  const { count, increment, decrement, theme, toggleTheme } = useDemoStore();
  // React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data) => {
    message.success('Form submitted successfully!');
    reset();
  };

  return (
    <section style={{ padding: '64px 0', background: 'linear-gradient(135deg, #f0f5ff 0%, #e6fffb 100%)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>Feature Demo</Title>
        <Paragraph style={{ textAlign: 'center', marginBottom: 48, fontSize: 16 }}>
          Experience all the modern libraries powering our cafe website
        </Paragraph>
        <Row gutter={[32, 32]}>
          {/* Form Section */}
          <Col xs={24} md={12}>
            <Card title="Contact Form (React Hook Form + Zod)" variant="borderless" styles={{ root: { borderRadius: 16, marginBottom: 24 } }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Form.Item label="Name" validateStatus={errors.name ? 'error' : ''} help={errors.name?.message}>
                  <Input {...register('name')} />
                </Form.Item>
                <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
                  <Input {...register('email')} />
                </Form.Item>
                <Form.Item label="Message" validateStatus={errors.message ? 'error' : ''} help={errors.message?.message}>
                  <Input.TextArea rows={3} {...register('message')} />
                </Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </form>
            </Card>
          </Col>
          {/* Chart and Stats Section */}
          <Col xs={24} md={12}>
            <Card title="Sales Chart (Recharts)" variant="borderless" styles={{ root: { borderRadius: 16, marginBottom: 24 } }}>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={[]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#52c41a" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={8}>
                <Statistic title="Total Orders" value={0} valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={8}>
                <Statistic title="Revenue" value={0} prefix="$" valueStyle={{ color: '#faad14' }} />
              </Col>
              <Col span={8}>
                <Statistic title="Customers" value={0} valueStyle={{ color: '#1890ff' }} />
              </Col>
            </Row>
          </Col>
        </Row>
        {/* Counter Section */}
        <Row gutter={32} style={{ marginTop: 48 }}>
          <Col xs={24} md={12}>
            <Card title="Counter (Zustand)" variant="borderless" styles={{ root: { borderRadius: 16, textAlign: 'center' } }}>
              <Title level={3}>{count}</Title>
              <Button onClick={decrement} style={{ marginRight: 8 }}>-</Button>
              <Button onClick={increment} type="primary" style={{ marginRight: 8 }}>+</Button>
              <Button onClick={toggleTheme} type="dashed">Toggle Theme ({theme})</Button>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default DemoSection; 