# 🎨 Tailwind CSS v4 - Hướng dẫn

## Thay đổi chính trong Tailwind v4

Love App đang sử dụng **Tailwind CSS v4** (next) - phiên bản mới nhất với nhiều cải tiến.

### 1. Không cần `tailwind.config.js`

Tailwind v4 không còn yêu cầu file `tailwind.config.js` nữa. Thay vào đó, theme được định nghĩa trực tiếp trong CSS.

### 2. Import mới

**V3 (cũ):**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**V4 (mới):**
```css
@import "tailwindcss";
```

### 3. Custom Theme với `@theme`

Custom colors và animations được định nghĩa trong CSS với directive `@theme`:

```css
@theme {
  --color-pastel-pink: #FFB6C1;
  --color-pastel-purple: #E6B0FF;
  --color-pastel-blue: #B0E0FF;
  --color-pastel-peach: #FFDAB9;
  
  --animate-fade-in: fade-in 0.6s ease-in-out;
  --animate-slide-up: slide-up 0.6s ease-out;
  /* ... */
}
```

### 4. Sử dụng Custom Colors

Với theme đã định nghĩa, bạn có thể dùng như sau:

```jsx
// Background
<div className="bg-pastel-pink">

// Text
<div className="text-pastel-purple">

// Border
<div className="border-pastel-blue">

// Gradient
<div className="bg-gradient-to-r from-pastel-pink to-pastel-purple">
```

### 5. Animations

```jsx
<div className="animate-fade-in">
<div className="animate-slide-up">
<div className="animate-shake">
```

### 6. PostCSS Config

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

## Custom CSS Classes

App này cũng định nghĩa các utility classes custom:

```css
.card - Card component cơ bản
.card-hover - Card với hover effect
.btn-primary - Button chính (gradient)
.btn-secondary - Button phụ (outline)
.input-field - Input field styled
```

## Thêm Custom Colors Mới

Mở file `src/index.css` và thêm vào block `@theme`:

```css
@theme {
  /* ... colors hiện tại ... */
  --color-your-custom-color: #FF0000;
}
```

Sau đó sử dụng:

```jsx
<div className="bg-your-custom-color text-your-custom-color">
```

## Thêm Animation Mới

1. Định nghĩa trong `@theme`:
```css
@theme {
  --animate-your-animation: your-animation 1s ease-in-out;
}
```

2. Tạo keyframes:
```css
@keyframes your-animation {
  0% { /* styles */ }
  100% { /* styles */ }
}
```

3. Sử dụng:
```jsx
<div className="animate-your-animation">
```

## Lợi ích của Tailwind v4

✅ **Faster**: Build nhanh hơn  
✅ **Simpler**: Không cần config file phức tạp  
✅ **Modern**: CSS-first approach  
✅ **Powerful**: Đầy đủ tính năng như v3  

## Migration từ v3

Nếu bạn có project cũ dùng v3:

1. Update dependencies:
```bash
npm install -D tailwindcss@next @tailwindcss/postcss@next
```

2. Xóa `tailwind.config.js`

3. Sửa CSS:
```css
// Old
@tailwind base;
@tailwind components;
@tailwind utilities;

// New
@import "tailwindcss";
```

4. Move theme config vào CSS:
```css
@theme {
  --color-primary: #your-color;
}
```

5. Update PostCSS config:
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

## Resources

- [Tailwind CSS v4 Beta](https://tailwindcss.com/blog/tailwindcss-v4-beta)
- [Tailwind v4 Docs](https://tailwindcss.com/docs)

---

**Made with 💕 Love App 2023 - Powered by Tailwind CSS v4**


