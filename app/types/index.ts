export interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url?: string;
}

export interface Order {
  id: number;
  user_id: number;
  items: OrderItem[];
  total: number;
  status: string;
  created_at: string;
}

export interface OrderItem {
  id: number;
  menu_item_id: number;
  quantity: number;
  price: number;
}

export interface Comment {
  id: number;
  menu_item_id: number;
  user_id: number;
  content: string;
  rating: number;
  created_at: string;
}

export interface Feedback {
  id: number;
  user_id: number;
  category: string;
  rating: number;
  comment: string;
  created_at: string;
}
