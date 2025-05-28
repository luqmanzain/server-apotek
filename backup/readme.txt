directory map
backend/prisma
seed.js
schema.prisma


backend/
server.js
.env
.gitignore
package.json
package-lock.json


urutan setup directory backend
cd backend
npm init -y
npm install express prisma @prisma/client cors body-parser
npx prisma init
copy dari file schema.prisma
ganti .env dengan setting database kamu (DATABASE_URL="postgresql://{usernameDB}:{passwordDB}@localhost:5432/{namaDB}")

npx prisma migrate dev --name init
npm install bcryptjs    
npm install jsonwebtoken
pindah seed.js ke folder prisma
copy package.json di folder backup ke file pockage.json
npx prisma db seed
pindahkan server.js ke directory backend
node server.js


setup frontend
cd frontend
npm install
npm run dev