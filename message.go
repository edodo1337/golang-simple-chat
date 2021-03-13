package main

// Структура сообщений
type Message struct {
	Body     string `json:"body"`
	Username string `json:"user"`
}

func (msg *Message) String() string {
	return msg.Username + " > " + msg.Body
}
