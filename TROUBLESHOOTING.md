# 🔧 Troubleshooting Guide - Love App

## ❌ Lỗi thường gặp và cách fix

### 1. Lỗi Tailwind CSS PostCSS Plugin

**Lỗi:**
```
[postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin.
The PostCSS plugin has moved to a separate package...
```

**Nguyên nhân:**
Tailwind CSS v4 đã chuyển PostCSS plugin sang package riêng `@tailwindcss/postcss`.

**Cách fix:**
```bash
# 1. Cài đặt package mới
npm install -D @tailwindcss/postcss

# 2. Cập nhật postcss.config.js
# Thay 'tailwindcss' bằng '@tailwindcss/postcss'

# 3. Restart dev server
npm run dev
```

**File `postcss.config.js` đúng:**
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### 2. Dev server không chạy

**Lỗi:** Server không khởi động hoặc báo lỗi port

**Cách fix:**
```bash
# Kiểm tra port 5173 có bị chiếm không
lsof -ti:5173 | xargs kill -9

# Hoặc thay đổi port
vite --port 3000
```

### 3. Dependencies lỗi

**Lỗi:** Module not found hoặc dependency conflicts

**Cách fix:**
```bash
# Xóa node_modules và reinstall
rm -rf node_modules package-lock.json
npm install
```

### 4. Tailwind styles không áp dụng

**Kiểm tra:**
1. File `tailwind.config.js` có content paths đúng không?
2. File `index.css` có import Tailwind directives không?
3. PostCSS config đúng chưa?

**Cách fix:**
```bash
# Kiểm tra tailwind.config.js
# Phải có:
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]

# Kiểm tra index.css
# Phải có:
@tailwind base;
@tailwind components;
@tailwind utilities;

# Restart dev server
npm run dev
```

### 5. Redux state không persist

**Lưu ý:** App này sử dụng in-memory state, sẽ mất khi refresh.

**Muốn persist state?**
```bash
# Cài đặt redux-persist
npm install redux-persist

# Wrap store với persistor
# Xem docs: https://github.com/rt2zz/redux-persist
```

### 6. TypeScript errors

**Lỗi:** Type errors khi compile

**Cách fix:**
```bash
# Kiểm tra TypeScript config
npx tsc --noEmit

# Fix common issues:
# - Import paths
# - Type definitions
# - tsconfig.json settings
```

### 7. Build production lỗi

**Lỗi:** Build failed hoặc missing dependencies

**Cách fix:**
```bash
# Clean build
rm -rf dist

# Rebuild
npm run build

# Preview
npm run preview
```

### 8. Images không load

**Nguyên nhân:** URLs trong memorySlice dùng Unsplash

**Lưu ý:** Cần internet để load images từ Unsplash

**Muốn dùng local images?**
1. Đặt images vào `/public/images/`
2. Update URLs trong `memorySlice.ts`:
```typescript
image: '/images/photo1.jpg'
```

### 9. Login không hoạt động

**Kiểm tra:**
- Username: `lover` (lowercase)
- Password: `1234`
- Redux store đã được provide chưa?

**Debug:**
```javascript
// Trong Login.tsx, thêm console.log
console.log('Attempting login:', username, password);
```

### 10. Routes không hoạt động

**Kiểm tra:**
- BrowserRouter đã wrap App chưa?
- Routes được define trong App.tsx chưa?
- Navigation links có đúng path không?

**Lưu ý với deployment:**
- Netlify/Vercel: Cần configure redirects cho SPA
- Tạo file `_redirects` hoặc `netlify.toml`:
```
/* /index.html 200
```

## 🆘 Vẫn gặp vấn đề?

### Reset toàn bộ project
```bash
# Xóa tất cả và bắt đầu lại
rm -rf node_modules package-lock.json dist
npm install
npm run dev
```

### Check versions
```bash
node --version   # Should be >= 18
npm --version    # Should be >= 9
```

### Clear cache
```bash
# Vite cache
rm -rf node_modules/.vite

# npm cache
npm cache clean --force
```

## 📚 Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)

## 💬 Support

Nếu gặp lỗi khác, hãy:
1. Đọc error message kỹ
2. Google error message
3. Check dependencies versions
4. Try clean install
5. Ask on Stack Overflow với tag `reactjs`, `tailwindcss`, `redux-toolkit`

---

**Made with 💕 Love App 2023**

