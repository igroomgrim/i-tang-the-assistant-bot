package main

import (
	"fmt"
	"net/http"
	"log"
	"github.com/gorilla/mux"
)

const verifyToken = "itangbot"

func main() {
	requestHandler()
}

func requestHandler() {
	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/", rootHandler).Methods("GET")
	router.HandleFunc("/webhook", webhookHandler).Methods("GET", "POST")


	log.Println("Start itang server at port 8000 . . .")
	log.Fatal(http.ListenAndServe(":8000", router))
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("!!WOOF WOOF!!"))
}

func webhookHandler(w http.ResponseWriter, r *http.Request) {
	
	switch r.Method {
		case "GET":
			fmt.Println("webhookHandler : GET")
			
			query := r.URL.Query()

			if query.Get("hub.verify_token") != verifyToken {
				w.WriteHeader(http.StatusUnauthorized)
				log.Println("Failed validation. Make sure the validation tokens match.")
				return
			}

			w.WriteHeader(http.StatusOK)

			log.Println("Validating webhook")

			w.Write([]byte(query.Get("hub.challenge")))

		case "POST":
			fmt.Println("webhookHandler : POST")
		default:
			fmt.Println("Error request")
	}
}
