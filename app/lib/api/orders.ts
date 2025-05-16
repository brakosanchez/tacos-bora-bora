import { api } from './client';

export const createOrder = async (orderData: any) => {
  return api.post('/orders', orderData);
};

export const getUserOrders = async () => {
  return api.get('/orders');
};

export const getOrderStatus = async (orderId: number) => {
  return api.get(`/orders/${orderId}`);
};
