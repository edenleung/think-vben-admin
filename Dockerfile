FROM nginx:1.17.7-alpine

ARG TZ="Asia/Shanghai"
ENV TZ ${TZ}

# 国内机器构建镜像 建议开启
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

RUN apk upgrade --update \
    && apk add bash tzdata \
    && ln -sf /usr/share/zoneinfo/${TZ} /etc/localtime \
    && echo ${TZ} > /etc/timezone \
    && rm -rf /var/cache/apk/*

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY default.conf /etc/nginx/conf.d/default.conf

COPY dist/ /usr/share/nginx/html

WORKDIR /usr/share/nginx/html
