# Tamayyoz Teacher Portal - Architecture & Design System

## 🚀 Tech Stack
- **Core:** React Native / Expo (TypeScript) [Adapted from React 18 Web]
- **Styling:** Styled components/StyleSheet following Tailwind principles (NativeWind or Custom)
- **Animations:** React Native Reanimated / Moti (Replacing Framer Motion)
- **Icons:** Lucide React Native
- **Layout:** Standardized RTL-first architecture.

## 🎨 Design System (The "Tamayyoz Neo-Brutalist" Style)
The project follows a **Neo-Brutalist / Modern Premium** aesthetic:
- **Primary Color:** `#4f46e5` (Indigo/Deep Blue - for Trust & Focus)
- **Secondary Color:** `#000000` (Pure Black)
- **Success/Action:** `#10b981` (Emerald Green - for Progress/Completed lessons)
- **Background:** `#F9FAFB` (Very Soft Gray - Slate 50)
- **Borders:** `2px solid #000000` (Universal for containers and inputs)
- **Shadows:** Hard, non-blurred shadows. 
  - **Native Implementation**: `shadowOffset: { width: 8, height: 8 }, shadowOpacity: 1, shadowColor: '#000000', elevation: 8`
- **Border Radius:** 
  - Buttons/Small Cards: `16px`
  - Large Containers/Modals: `40px`

## 🧱 Component Patterns

### 1. Modals & Overlays
All modals use specific entry/exit animations for a premium feel.
- **Mobile Animation:** Vertical slide + Scale (`initial: y=50, opacity=0, scale=0.95 -> animate: y=0, opacity=1, scale=1`).

### 2. State & Data Handling
- Modular data handling via mock arrays.
- Tab-based navigation using `activeTab` state logic.

### 3. Coding & UX Principles
1. **No Placeholders:** Functional UI mockups only.
2. **Standardized Inputs:** `border-2 border-black rounded-xl p-4 font-bold text-sm bg-gray-50`.
3. **Arabic Support:** Full RTL support with `Alexandria` font and right-aligned inputs.
