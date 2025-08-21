# Auth API (Express + TypeScript + Swagger)

Bu loyiha **Express.js + TypeScript** da yozilgan oddiy autentifikatsiya (register, login, getAll users) API hisoblanadi. 
Swagger UI yordamida hujjatlashtirilgan va JWT orqali himoyalangan.

---

## 🚀 Loyihani ishga tushirish

1. **Repository ni klon qiling**
   ```bash
   git clone <repo-link>
   cd <repo-folder>


2.	Kerakli paketlarni o‘rnating

   npm install


3.Environment fayl yarating
Loyihaning root papkasida .env fayl ochib, quyidagilarni yozing:

   PORT=5000
   MONGO_URI=mongodb://localhost:27017/authdb
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=1h


4.	Loyihani ishga tushiring

   npm run dev



📚 API hujjatlari

Swagger UI quyidagi manzilda mavjud bo‘ladi:

👉 http://localhost:5000/api-docs




🔑 Endpoints

🔹 Auth
	•	POST /api/users/register – yangi foydalanuvchi ro‘yxatdan o‘tkazish
	•	POST /api/users/login – foydalanuvchi login qilish

🔹 Users
	•	GET /api/users/all – barcha foydalanuvchilarni olish (JWT token talab qiladi)




🔒 Authentication
	•	API JWT (JSON Web Token) orqali himoyalangan.
	•	Swagger UI’da Authorize tugmasi orqali tokenni kiritib, protected route’lardan foydalanish mumkin.

⸻

📦 Texnologiyalar
	•	Express.js – backend framework
	•	TypeScript – tip xavfsizligi uchun
	•	MongoDB + Mongoose – ma’lumotlar bazasi
	•	JWT (jsonwebtoken) – autentifikatsiya
	•	Swagger (swagger-jsdoc, swagger-ui-express) – API hujjatlari



👩‍💻 Muallif
	•	Loyihani ishlab chiqqan: Nematova Shahlo ✨
