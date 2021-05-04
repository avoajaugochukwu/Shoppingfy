FROM node:14-alpine3.10

WORKDIR /frontend_code
# COPY . /frontend
# ARG API_URL
# ENV REACT_APP_HOST_IP_ADDRESS $API_URL
COPY /package.json /frontend_code/
COPY /package-lock.json /frontend_code/
RUN npm install --silent
CMD ["npm", "start"]