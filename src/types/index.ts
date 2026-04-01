// TypeScript Interfaces — Admin Dashboard Entities

export type CourseStatus = 'pending' | 'approved' | 'rejected';
export type StudentStatus = 'active' | 'inactive' | 'suspended';
export type TeacherStatus = 'active' | 'inactive';
export type TransactionStatus = 'success' | 'pending' | 'failed';
export type PayoutStatus = 'paid' | 'pending' | 'processing';
export type AdminRole = 'super_admin' | 'content_manager' | 'finance_manager' | 'support';

export interface Teacher {
  id: string;
  name: string;
  email: string;
  avatar: string;
  coursesCount: number;
  studentsCount: number;
  totalSales: number;
  status: TeacherStatus;
  joinedAt: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  enrolledAt: string;
  coursesCount: number;
  subscriptions: number;
  progress: number;
  status: StudentStatus;
}

export interface Course {
  id: string;
  title: string;
  teacherId: string;
  teacherName: string;
  category: string;
  price: number;
  studentsCount: number;
  status: CourseStatus;
  submissionDate: string;
  rejectReason?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  sales: number;
  commission: number;
}

export interface Transaction {
  id: string;
  teacherId: string;
  teacherName: string;
  amountDue: number;
  commission: number;
  netPayable: number;
  status: PayoutStatus;
  date: string;
}

export interface AdminStaff {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  accessAreas: string[];
}

export interface RevenueData {
  month: string;
  revenue: number;
}

// Navigation
export type TabKey = 
  | 'dashboard' 
  | 'teachers' 
  | 'approvals' 
  | 'library' 
  | 'finance' 
  | 'students' 
  | 'roles';
