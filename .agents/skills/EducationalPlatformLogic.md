# Educational Platform Core Logic

This skill defines the logic and structures required for a professional educational center platform. It focuses on modularity, progress tracking, and diverse content types.

## 📚 Curriculum Structure
All curriculum data must follow this hierarchical structure to ensure consistency across the dashboard and app:
1. **Course**: (Title, Description, Category, Teacher, Price).
2. **Module**: (Title, Order, List of Lessons).
3. **Lesson**: (Title, Type [Video|PDF|Quiz|Assignment], Duration, Content URL).

## 📊 Progress & Achievement Tracking
Define how "Success" is displayed in the Neo-Brutalist UI:
- **Progress Bars**: Must use the `Emerald Green` action color for completed parts and `Black` borders for the container.
- **Grades**: Badges are styled with primary `Indigo` or secondary `Yellow` based on score performance.
- **Certificates**: A standard pattern for "Coming Soon" certificate mockups.

## 👤 Role-Based Data Flow
Ensure the dashboard handles different logic for each user type:
- **Teacher Perspective**: Focuses on "Course Sales", "Student List", and "Content Uploads".
- **Student Perspective**: Focuses on "Current Courses", "Upcoming Classes", and "Recent Grades".
- **Admin Perspective**: Complete financial overview and center-wide analytics.

## 📝 UI Patterns for Education
- **Course Cards**: High-contrast icons to distinguish subject types (e.g., Code icon for Programming, Pen for Writing).
- **Empty States**: If a library has no resources, show a "Neo-Brutalist" empty box with a "Start Adding Content" button.
