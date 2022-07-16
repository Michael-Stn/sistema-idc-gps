FROM nginx
WORKDIR /etc/nginx/
RUN rm nginx.conf
COPY nginx.conf .
COPY . .
EXPOSE 80