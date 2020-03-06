FROM golang:1.13 as builder

WORKDIR /app

COPY . /app

RUN go get github.com/yanzay/tbot/v2

RUN CGO_ENABLED=0 go build -v -o bridger .

FROM alpine:latest

COPY --from=builder /app/bridger /bridger

ENTRYPOINT ["/bridger"]