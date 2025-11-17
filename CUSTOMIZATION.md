# 🎨 Hướng dẫn tùy chỉnh Love App

## 1️⃣ Thay đổi màu sắc

### Sửa màu chính
Mở file `tailwind.config.js` và chỉnh sửa:

```javascript
colors: {
  'pastel-pink': '#FFB6C1',     // Màu hồng pastel
  'pastel-purple': '#E6B0FF',   // Màu tím pastel
  'pastel-blue': '#B0E0FF',     // Màu xanh pastel
  'pastel-peach': '#FFDAB9',    // Màu đào pastel
}
```

### Thay đổi gradient background
Mở file `src/index.css` và sửa:

```css
body {
  @apply bg-gradient-to-br from-pastel-pink via-pastel-purple to-pastel-blue min-h-screen;
}
```

## 2️⃣ Thêm/Sửa thông tin đăng nhập

Mở file `src/features/authSlice.ts`:

```typescript
if (username === 'your_username' && password === 'your_password') {
  state.isAuthenticated = true;
  state.username = username;
}
```

## 3️⃣ Thêm mã thông điệp mới

Mở file `src/features/memorySlice.ts` và thêm vào mảng `codeMessages`:

```typescript
{
  code: 'NEWCODE',
  message: 'Nội dung thông điệp của bạn 💕',
  emoji: '🎁',
}
```

## 4️⃣ Thêm kỷ niệm mới

Trong cùng file `src/features/memorySlice.ts`, thêm vào mảng `memories`:

```typescript
{
  id: 7,
  image: 'https://images.unsplash.com/photo-xxxxx',
  description: 'Mô tả kỷ niệm của bạn 💖',
  date: '01/01/2024',
}
```

## 5️⃣ Thay đổi thông tin cá nhân

### Trang About
Mở file `src/pages/About.tsx` và sửa:

```typescript
// Thông tin người 1
<h3 className="text-2xl font-bold text-pastel-purple mb-2">
  Tên của bạn
</h3>
<p className="text-gray-600 mb-4">
  Mô tả về bạn 💙
</p>
```

### Link mạng xã hội
Trong cùng file, sửa phần Social Links:

```typescript
<a href="https://instagram.com/your_handle" ...>
<a href="https://facebook.com/your_profile" ...>
<a href="mailto:your_email@example.com" ...>
```

## 6️⃣ Tùy chỉnh animations

### Thêm animation mới
Mở file `tailwind.config.js`:

```javascript
animation: {
  'your-animation': 'yourAnimation 1s ease-in-out',
},
keyframes: {
  yourAnimation: {
    '0%': { /* properties */ },
    '100%': { /* properties */ },
  },
}
```

### Sử dụng animation
Trong component React:

```typescript
<div className="animate-your-animation">
  Content
</div>
```

## 7️⃣ Thay đổi logo và icon

### Header Logo
Mở file `src/components/Header.tsx`:

```typescript
<div className="...">
  <span className="text-2xl">💕</span> {/* Đổi emoji ở đây */}
</div>
<span className="text-2xl font-bold text-white drop-shadow-lg">
  Your App Name {/* Đổi tên ở đây */}
</span>
```

## 8️⃣ Thêm page mới

### Bước 1: Tạo component page
Tạo file mới trong `src/pages/`, ví dụ: `NewPage.tsx`

```typescript
const NewPage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1>Your New Page</h1>
    </div>
  );
};

export default NewPage;
```

### Bước 2: Thêm route
Mở file `src/App.tsx` và thêm:

```typescript
import NewPage from './pages/NewPage';

// Trong Routes:
<Route path="/new-page" element={<NewPage />} />
```

### Bước 3: Thêm navigation
Mở file `src/components/Header.tsx`:

```typescript
<Link to="/new-page" className="...">
  New Page
</Link>
```

## 9️⃣ Kết nối Backend

### Cài đặt Axios
```bash
npm install axios
```

### Tạo API service
Tạo file `src/services/api.ts`:

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api.com',
});

export const getMemories = () => api.get('/memories');
export const verifyCode = (code: string) => api.post('/verify-code', { code });

export default api;
```

### Sử dụng trong Redux
Cài đặt Redux Thunk hoặc RTK Query để handle async operations.

## 🔟 Deploy lên production

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload thư mục dist/ lên Netlify
```

### Firebase
```bash
npm install -g firebase-tools
firebase init
firebase deploy
```

## 💡 Tips & Tricks

1. **Performance**: Sử dụng React.lazy() cho code splitting
2. **SEO**: Thêm react-helmet cho meta tags
3. **Mobile**: Test responsive trên nhiều thiết bị
4. **Animation**: Không dùng quá nhiều animation nặng
5. **Images**: Tối ưu hình ảnh trước khi upload

## 🐛 Troubleshooting

### Build lỗi
```bash
rm -rf node_modules
npm install
npm run build
```

### Tailwind không hoạt động
Kiểm tra `tailwind.config.js` có đúng content paths không.

### Redux lỗi
Kiểm tra có import Provider và store đúng không.

---

**Cần hỗ trợ?** Đọc thêm documentation của React, Redux Toolkit, và TailwindCSS.

