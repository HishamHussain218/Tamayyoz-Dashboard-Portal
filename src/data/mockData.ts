// Mock Data — Admin Dashboard
// 20 teachers, 30 courses, 50 students, 20 books, revenue data

import { Teacher, Student, Course, Book, Transaction, AdminStaff, RevenueData } from '../types';

// --- Teachers (20) ---
export const teachers: Teacher[] = [
  { id: 't1', name: 'أ. أحمد محمد', email: 'ahmed@tamayyoz.com', avatar: 'https://i.pravatar.cc/150?img=1', coursesCount: 5, studentsCount: 120, totalSales: 45000, status: 'active', joinedAt: '2024-01-15' },
  { id: 't2', name: 'أ. سارة علي', email: 'sara@tamayyoz.com', avatar: 'https://i.pravatar.cc/150?img=5', coursesCount: 3, studentsCount: 89, totalSales: 32000, status: 'active', joinedAt: '2024-02-20' },
  { id: 't3', name: 'أ. محمد عمر', email: 'omar@tamayyoz.com', avatar: 'https://i.pravatar.cc/150?img=3', coursesCount: 7, studentsCount: 200, totalSales: 78000, status: 'active', joinedAt: '2023-11-01' },
  { id: 't4', name: 'أ. فاطمة حسن', email: 'fatma@tamayyoz.com', avatar: 'https://i.pravatar.cc/150?img=9', coursesCount: 2, studentsCount: 45, totalSales: 15000, status: 'active', joinedAt: '2024-03-10' },
  { id: 't5', name: 'أ. خالد إبراهيم', email: 'khaled@tamayyoz.com', avatar: 'https://i.pravatar.cc/150?img=12', coursesCount: 4, studentsCount: 156, totalSales: 62000, status: 'active', joinedAt: '2023-09-05' },
  { id: 't6', name: 'أ. نور الدين', email: 'nour@tamayyoz.com', avatar: 'https://i.pravatar.cc/150?img=14', coursesCount: 3, studentsCount: 78, totalSales: 28000, status: 'active', joinedAt: '2024-01-20' },
  { id: 't7', name: 'أ. ياسمين عادل', email: 'yasmin@tamayyoz.com', avatar: 'https://i.pravatar.cc/150?img=16', coursesCount: 2, studentsCount: 34, totalSales: 12000, status: 'inactive', joinedAt: '2024-04-01' },
  { id: 't8', name: 'أ. عبدالله سعيد', email: 'abdullah@tamayyoz.com', avatar: 'https://i.pravatar.cc/150?img=18', coursesCount: 6, studentsCount: 180, totalSales: 71000, status: 'active', joinedAt: '2023-08-15' },
  { id: 't9', name: 'أ. مريم يوسف', email: 'mariam@tamayyoz.com', avatar: 'https://i.pravatar.cc/150?img=20', coursesCount: 1, studentsCount: 22, totalSales: 8000, status: 'active', joinedAt: '2024-05-10' },
  { id: 't10', name: 'أ. حسن طارق', email: 'hasan@tamayyoz.com', avatar: 'https://i.pravatar.cc/150?img=22', coursesCount: 4, studentsCount: 98, totalSales: 38000, status: 'active', joinedAt: '2024-02-01' },
  { id: 't11', name: 'أ. ليلى أحمد', email: 'layla@tamayyoz.com', avatar: 'https://i.pravatar.cc/150?img=25', coursesCount: 3, studentsCount: 67, totalSales: 25000, status: 'active', joinedAt: '2024-03-15' },
  { id: 't12', name: 'أ. عمرو وليد', email: 'amr@tamayyoz.com', avatar: 'https://i.pravatar.cc/150?img=27', coursesCount: 5, studentsCount: 145, totalSales: 55000, status: 'active', joinedAt: '2023-10-20' },
  { id: 't13', name: 'أ. رانيا مصطفى', email: 'rania@tamayyoz.com', avatar: 'https://i.pravatar.cc/150?img=29', coursesCount: 2, studentsCount: 40, totalSales: 14000, status: 'inactive', joinedAt: '2024-06-01' },
  { id: 't14', name: 'أ. كريم شريف', email: 'kareem@tamayyoz.com', avatar: 'https://i.pravatar.cc/150?img=31', coursesCount: 3, studentsCount: 82, totalSales: 30000, status: 'active', joinedAt: '2024-01-05' },
  { id: 't15', name: 'أ. دينا خالد', email: 'dina@tamayyoz.com', avatar: 'https://i.pravatar.cc/150?img=33', coursesCount: 4, studentsCount: 110, totalSales: 42000, status: 'active', joinedAt: '2023-12-10' },
  { id: 't16', name: 'أ. يوسف ماجد', email: 'yousef@tamayyoz.com', avatar: 'https://i.pravatar.cc/150?img=35', coursesCount: 2, studentsCount: 55, totalSales: 19000, status: 'active', joinedAt: '2024-04-15' },
  { id: 't17', name: 'أ. هدى سامي', email: 'huda@tamayyoz.com', avatar: 'https://i.pravatar.cc/150?img=38', coursesCount: 1, studentsCount: 18, totalSales: 6500, status: 'active', joinedAt: '2024-07-01' },
  { id: 't18', name: 'أ. طارق حسين', email: 'tarek@tamayyoz.com', avatar: 'https://i.pravatar.cc/150?img=40', coursesCount: 6, studentsCount: 190, totalSales: 74000, status: 'active', joinedAt: '2023-07-20' },
  { id: 't19', name: 'أ. سلمى ناصر', email: 'salma@tamayyoz.com', avatar: 'https://i.pravatar.cc/150?img=42', coursesCount: 3, studentsCount: 72, totalSales: 27000, status: 'active', joinedAt: '2024-02-28' },
  { id: 't20', name: 'أ. وليد جمال', email: 'waleed@tamayyoz.com', avatar: 'https://i.pravatar.cc/150?img=44', coursesCount: 4, studentsCount: 130, totalSales: 49000, status: 'active', joinedAt: '2023-11-15' },
];

// --- Courses (30) ---
export const courses: Course[] = [
  { id: 'c1', title: 'أساسيات البرمجة بـ Python', teacherId: 't1', teacherName: 'أ. أحمد محمد', category: 'برمجة', price: 499, studentsCount: 45, status: 'approved', submissionDate: '2024-01-20' },
  { id: 'c2', title: 'تطوير تطبيقات الويب بـ React', teacherId: 't3', teacherName: 'أ. محمد عمر', category: 'برمجة', price: 699, studentsCount: 78, status: 'approved', submissionDate: '2024-02-15' },
  { id: 'c3', title: 'تصميم واجهات المستخدم UI/UX', teacherId: 't2', teacherName: 'أ. سارة علي', category: 'تصميم', price: 399, studentsCount: 56, status: 'approved', submissionDate: '2024-03-01' },
  { id: 'c4', title: 'الذكاء الاصطناعي للمبتدئين', teacherId: 't5', teacherName: 'أ. خالد إبراهيم', category: 'تقنية', price: 899, studentsCount: 34, status: 'pending', submissionDate: '2024-08-10' },
  { id: 'c5', title: 'تعلم اللغة الإنجليزية - المستوى المتقدم', teacherId: 't4', teacherName: 'أ. فاطمة حسن', category: 'لغات', price: 299, studentsCount: 90, status: 'approved', submissionDate: '2024-01-10' },
  { id: 'c6', title: 'الرياضيات للثانوية العامة', teacherId: 't8', teacherName: 'أ. عبدالله سعيد', category: 'رياضيات', price: 350, studentsCount: 120, status: 'approved', submissionDate: '2023-09-01' },
  { id: 'c7', title: 'إدارة المشاريع الاحترافية PMP', teacherId: 't3', teacherName: 'أ. محمد عمر', category: 'إدارة', price: 799, studentsCount: 42, status: 'approved', submissionDate: '2024-04-20' },
  { id: 'c8', title: 'التصوير الفوتوغرافي الاحترافي', teacherId: 't6', teacherName: 'أ. نور الدين', category: 'فنون', price: 450, studentsCount: 28, status: 'pending', submissionDate: '2024-08-15' },
  { id: 'c9', title: 'الفيزياء للصف الثالث الثانوي', teacherId: 't10', teacherName: 'أ. حسن طارق', category: 'علوم', price: 300, studentsCount: 85, status: 'approved', submissionDate: '2024-02-01' },
  { id: 'c10', title: 'تطوير تطبيقات الموبايل Flutter', teacherId: 't5', teacherName: 'أ. خالد إبراهيم', category: 'برمجة', price: 650, studentsCount: 62, status: 'approved', submissionDate: '2024-03-15' },
  { id: 'c11', title: 'أساسيات التسويق الرقمي', teacherId: 't12', teacherName: 'أ. عمرو وليد', category: 'تسويق', price: 399, studentsCount: 55, status: 'approved', submissionDate: '2024-01-25' },
  { id: 'c12', title: 'الكيمياء العضوية', teacherId: 't14', teacherName: 'أ. كريم شريف', category: 'علوم', price: 280, studentsCount: 40, status: 'rejected', submissionDate: '2024-07-01', rejectReason: 'محتوى غير مكتمل' },
  { id: 'c13', title: 'تعلم Adobe Photoshop', teacherId: 't2', teacherName: 'أ. سارة علي', category: 'تصميم', price: 350, studentsCount: 33, status: 'approved', submissionDate: '2024-05-10' },
  { id: 'c14', title: 'البرمجة بلغة JavaScript', teacherId: 't1', teacherName: 'أ. أحمد محمد', category: 'برمجة', price: 499, studentsCount: 75, status: 'approved', submissionDate: '2024-02-20' },
  { id: 'c15', title: 'قواعد اللغة العربية', teacherId: 't11', teacherName: 'أ. ليلى أحمد', category: 'لغات', price: 250, studentsCount: 67, status: 'approved', submissionDate: '2024-03-01' },
  { id: 'c16', title: 'تحليل البيانات بـ Excel', teacherId: 't15', teacherName: 'أ. دينا خالد', category: 'تقنية', price: 300, studentsCount: 48, status: 'pending', submissionDate: '2024-08-20' },
  { id: 'c17', title: 'تصميم الجرافيك بـ Illustrator', teacherId: 't6', teacherName: 'أ. نور الدين', category: 'تصميم', price: 400, studentsCount: 30, status: 'approved', submissionDate: '2024-04-15' },
  { id: 'c18', title: 'الأحياء للمرحلة الثانوية', teacherId: 't18', teacherName: 'أ. طارق حسين', category: 'علوم', price: 320, studentsCount: 95, status: 'approved', submissionDate: '2023-10-01' },
  { id: 'c19', title: 'كتابة المحتوى الإبداعي', teacherId: 't19', teacherName: 'أ. سلمى ناصر', category: 'كتابة', price: 200, studentsCount: 38, status: 'approved', submissionDate: '2024-05-20' },
  { id: 'c20', title: 'مقدمة في علم النفس', teacherId: 't9', teacherName: 'أ. مريم يوسف', category: 'تنمية', price: 280, studentsCount: 22, status: 'pending', submissionDate: '2024-09-01' },
  { id: 'c21', title: 'تعلم Git و GitHub', teacherId: 't3', teacherName: 'أ. محمد عمر', category: 'برمجة', price: 199, studentsCount: 80, status: 'approved', submissionDate: '2024-03-10' },
  { id: 'c22', title: 'أساسيات الشبكات', teacherId: 't20', teacherName: 'أ. وليد جمال', category: 'تقنية', price: 450, studentsCount: 35, status: 'approved', submissionDate: '2024-04-01' },
  { id: 'c23', title: 'التصميم ثلاثي الأبعاد 3D', teacherId: 't16', teacherName: 'أ. يوسف ماجد', category: 'تصميم', price: 550, studentsCount: 25, status: 'pending', submissionDate: '2024-08-25' },
  { id: 'c24', title: 'اللغة الفرنسية للمبتدئين', teacherId: 't4', teacherName: 'أ. فاطمة حسن', category: 'لغات', price: 350, studentsCount: 45, status: 'approved', submissionDate: '2024-06-15' },
  { id: 'c25', title: 'أمن المعلومات السيبراني', teacherId: 't8', teacherName: 'أ. عبدالله سعيد', category: 'تقنية', price: 750, studentsCount: 60, status: 'approved', submissionDate: '2024-01-30' },
  { id: 'c26', title: 'إدارة الوقت والإنتاجية', teacherId: 't17', teacherName: 'أ. هدى سامي', category: 'تنمية', price: 180, studentsCount: 18, status: 'approved', submissionDate: '2024-07-10' },
  { id: 'c27', title: 'تطوير واجهات بـ Vue.js', teacherId: 't12', teacherName: 'أ. عمرو وليد', category: 'برمجة', price: 550, studentsCount: 40, status: 'approved', submissionDate: '2024-05-01' },
  { id: 'c28', title: 'الجبر الخطي', teacherId: 't10', teacherName: 'أ. حسن طارق', category: 'رياضيات', price: 400, studentsCount: 13, status: 'rejected', submissionDate: '2024-06-20', rejectReason: 'يحتاج لتحسين جودة الفيديوهات' },
  { id: 'c29', title: 'الإحصاء وتحليل البيانات', teacherId: 't15', teacherName: 'أ. دينا خالد', category: 'رياضيات', price: 380, studentsCount: 52, status: 'approved', submissionDate: '2024-04-10' },
  { id: 'c30', title: 'مهارات العرض والتقديم', teacherId: 't19', teacherName: 'أ. سلمى ناصر', category: 'تنمية', price: 220, studentsCount: 34, status: 'approved', submissionDate: '2024-06-01' },
];

// --- Students (50) ---
const studentNames = [
  'يوسف أحمد', 'منى حسن', 'عمر خالد', 'نورا سعيد', 'حسام علي',
  'ريم محمد', 'أيمن وليد', 'جنى إبراهيم', 'كريم طارق', 'سلمى عادل',
  'بلال ناصر', 'هند فؤاد', 'سامي جمال', 'لمياء مصطفى', 'زياد ماجد',
  'آية سامي', 'فارس شريف', 'ملك يوسف', 'تامر رمضان', 'شهد عمرو',
  'ياسر حسين', 'إسراء نبيل', 'مصطفى كمال', 'رهام طلعت', 'أنس حاتم',
  'نادين وائل', 'عادل فتحي', 'غادة بهاء', 'حاتم رفعت', 'سمر علاء',
  'وسام صلاح', 'لينا حمدي', 'باسم منير', 'دعاء خيري', 'شادي رءوف',
  'هبة زهران', 'محمود نصر', 'إيمان بكر', 'أشرف مجدي', 'ولاء عبدالرحمن',
  'رامي فاروق', 'سحر عوض', 'خالد نعيم', 'هالة جابر', 'عصام راغب',
  'جهاد سراج', 'مها حمزة', 'ثابت وجيه', 'روان مختار', 'أمير فهمي',
];

export const students: Student[] = studentNames.map((name, i) => ({
  id: `s${i + 1}`,
  name,
  email: `student${i + 1}@mail.com`,
  avatar: `https://i.pravatar.cc/150?img=${i + 50}`,
  enrolledAt: `2024-0${(i % 9) + 1}-${(i % 28) + 1 < 10 ? '0' : ''}${(i % 28) + 1}`,
  coursesCount: Math.floor(Math.random() * 5) + 1,
  subscriptions: Math.floor(Math.random() * 3) + 1,
  progress: Math.floor(Math.random() * 100),
  status: i % 8 === 0 ? 'suspended' : i % 5 === 0 ? 'inactive' : 'active',
}));

// --- Books (20) ---
export const books: Book[] = [
  { id: 'b1', title: 'مقدمة في البرمجة', author: 'أ. أحمد محمد', price: 120, sales: 340, commission: 15 },
  { id: 'b2', title: 'أساسيات التصميم الجرافيكي', author: 'أ. سارة علي', price: 95, sales: 210, commission: 12 },
  { id: 'b3', title: 'الرياضيات المتقدمة', author: 'أ. حسن طارق', price: 150, sales: 180, commission: 18 },
  { id: 'b4', title: 'قواعد اللغة الإنجليزية', author: 'أ. فاطمة حسن', price: 80, sales: 420, commission: 10 },
  { id: 'b5', title: 'إدارة المشاريع الرقمية', author: 'أ. محمد عمر', price: 200, sales: 150, commission: 20 },
  { id: 'b6', title: 'التسويق الإلكتروني', author: 'أ. عمرو وليد', price: 110, sales: 280, commission: 14 },
  { id: 'b7', title: 'الذكاء الاصطناعي العملي', author: 'أ. خالد إبراهيم', price: 250, sales: 95, commission: 22 },
  { id: 'b8', title: 'الفيزياء الحديثة', author: 'أ. طارق حسين', price: 130, sales: 160, commission: 16 },
  { id: 'b9', title: 'علم النفس التربوي', author: 'أ. مريم يوسف', price: 90, sales: 200, commission: 11 },
  { id: 'b10', title: 'كتابة المحتوى الرقمي', author: 'أ. سلمى ناصر', price: 75, sales: 310, commission: 9 },
  { id: 'b11', title: 'شبكات الحاسوب', author: 'أ. وليد جمال', price: 180, sales: 120, commission: 20 },
  { id: 'b12', title: 'تعلم Python خطوة بخطوة', author: 'أ. أحمد محمد', price: 140, sales: 380, commission: 17 },
  { id: 'b13', title: 'أساسيات الأمن السيبراني', author: 'أ. عبدالله سعيد', price: 220, sales: 85, commission: 22 },
  { id: 'b14', title: 'التصوير الاحترافي', author: 'أ. نور الدين', price: 160, sales: 140, commission: 18 },
  { id: 'b15', title: 'مبادئ الإحصاء', author: 'أ. دينا خالد', price: 100, sales: 190, commission: 12 },
  { id: 'b16', title: 'الأحياء الجزيئية', author: 'أ. طارق حسين', price: 170, sales: 75, commission: 19 },
  { id: 'b17', title: 'فن الإقناع والتأثير', author: 'أ. هدى سامي', price: 85, sales: 260, commission: 10 },
  { id: 'b18', title: 'تطوير الويب الحديث', author: 'أ. محمد عمر', price: 190, sales: 220, commission: 20 },
  { id: 'b19', title: 'اللغة الفرنسية للجميع', author: 'أ. فاطمة حسن', price: 95, sales: 170, commission: 11 },
  { id: 'b20', title: 'هندسة البرمجيات', author: 'أ. خالد إبراهيم', price: 210, sales: 110, commission: 22 },
];

// --- Transactions / Payouts ---
export const transactions: Transaction[] = teachers.slice(0, 15).map((t, i) => ({
  id: `tx${i + 1}`,
  teacherId: t.id,
  teacherName: t.name,
  amountDue: t.totalSales * 0.7,
  commission: t.totalSales * 0.3,
  netPayable: t.totalSales * 0.7,
  status: i % 3 === 0 ? 'paid' : i % 3 === 1 ? 'pending' : 'processing',
  date: `2024-0${(i % 9) + 1}-15`,
}));

// --- Admin Staff ---
export const adminStaff: AdminStaff[] = [
  { id: 'a1', name: 'هشام حسين', email: 'hisham@tamayyoz.com', role: 'super_admin', accessAreas: ['الكل'] },
  { id: 'a2', name: 'منى سالم', email: 'mona@tamayyoz.com', role: 'content_manager', accessAreas: ['المكتبة', 'الموافقات'] },
  { id: 'a3', name: 'رامي فاروق', email: 'rami@tamayyoz.com', role: 'finance_manager', accessAreas: ['المالية', 'التقارير'] },
  { id: 'a4', name: 'هبة كمال', email: 'heba@tamayyoz.com', role: 'support', accessAreas: ['الطلاب', 'الدعم الفني'] },
];

// --- Revenue Data (6 months) ---
export const revenueData: RevenueData[] = [
  { month: 'يناير', revenue: 45000 },
  { month: 'فبراير', revenue: 52000 },
  { month: 'مارس', revenue: 61000 },
  { month: 'أبريل', revenue: 48000 },
  { month: 'مايو', revenue: 72000 },
  { month: 'يونيو', revenue: 68000 },
];

// --- Derived KPIs ---
export const kpis = {
  totalRevenue: revenueData.reduce((sum, d) => sum + d.revenue, 0),
  netProfit: revenueData.reduce((sum, d) => sum + d.revenue, 0) * 0.3,
  totalTeachers: teachers.filter(t => t.status === 'active').length,
  totalStudents: students.length,
  pendingApprovals: courses.filter(c => c.status === 'pending').length,
  activeCourses: courses.filter(c => c.status === 'approved').length,
};
