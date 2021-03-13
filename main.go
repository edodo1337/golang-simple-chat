package main

import (
	"log"
	"net/http"
)

func main() {
	log.SetFlags(log.LstdFlags)

	server := NewServer()
	log.Println("Server starting at :8080")
	go server.Listen()
	http.Handle("/", http.FileServer(http.Dir("./public")))
	http.Handle("/ws", server.Handler())
	http.ListenAndServe(":8080", nil)
}
