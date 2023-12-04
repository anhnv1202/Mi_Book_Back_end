# Sử dụng hình ảnh Node.js có sẵn
FROM node:16-alpine

# Tạo thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json (nếu có) vào container
COPY package*.json ./
COPY ormconfig.json ./

# Cài đặt dependencies

RUN npm install --legacy-peer-deps

# Sao chép mã nguồn ứng dụng vào container
COPY . .

RUN npm run build



EXPOSE 3636

# Khởi chạy ứng dụng
CMD ["npm", "start"]
