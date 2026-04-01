# Education Dashboard - Data Architecture & Flow

This skill focuses on managing the data representation for an educational center. It defines how entities like students, finances, and courses are structured and persist across the dashboard.

## 👥 Student Entity Structure
All student data used in the dashboard should contain:
- `id`: (Unique string)
- `name`: (Full Arabic name)
- `email`: (Contact email)
- `enrolledAt`: (ISO date)
- `courses`: (Array of Course IDs)
- `progress`: (Total percentage)
- `status`: (Active | Inactive | Suspended)

## 💰 Financial & Wallet Records
Standardize how money is tracked in the center:
- **Income**: Grouped by Course sales, Subscriptions, or One-time payments.
- **Transactions**: (Amount, Description, Category, Date, Status [Success|Pending|Failed]).
- **Wallet**: Current Balance, Pending Withdrawals, Total Profit.

## 🚀 Mock Data Persistence Patterns
Patterns for generating and using realistic Mock Data for high-fidelity UI previews:
- **initialSales**: Array containing monthly income trends for the last 6 months.
- **recentStudents**: Array of at least 5 newest enrollments with random mock avatars.
- **liveCourses**: List of top-performing courses with student counts.

## 🔄 Search & Filter Logic
Standardized approach for filtering data across the dashboard:
- **Search**: Case-insensitive partial matches for names and emails.
- **Filter**: Dropdowns for "Status", "Course Category", and "Date Range".
- **Pagination**: Handle lists in chunks of 5, 10, or 20 for mobile performance.
