package main

import (
	"fmt"
	"crypto/tls"
	"encoding/json"
	"github.com/zlincon/imersao-go/email"
	"github.com/zlincon/imersao-go/kafka"
	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	gomail "gopkg.in/mail.v2"
)

func main() {
	var emailChan = make(chan email.Email)
	var msgChan = make(chan *ckafka.Message)

	d := gomail.NewDialer(
		"smtp.gmail.org",
		587,
		"linconsilva08@gmail.com",
		"xxxxxxxxxx",
	)

	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	es := email.NewMailSender()
	es.From = "linconsilva08@gmail.com"
	es.Dailer = d

	go es.Send(emailChan)

	configMap := &ckafka.ConfigMap {
		"bootstrap.servers": "kafka:9094",
		"client.id": "emailapp",
		"group.id": "emailapp",
	}

	topics := []string{"emails"}
	consumer := kafka.NewConsumer(configMap, topics)
	go consumer.Consume(msgChan)

	for msg := range msgChan {
		var input email.Email
		json.Unmarshal(msg.Value, &input)
		fmt.Println("recebendo mensagem")
		emailChan <- input
	}
}