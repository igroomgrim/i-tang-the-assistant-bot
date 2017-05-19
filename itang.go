package main

import (
	"net/http"
	"log"
	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/", RootHandler)

	log.Println("Start itang server at port 8888 . . .")
	log.Fatal(http.ListenAndServe(":8888", router))
}

func RootHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("!!WOOF WOOF!!"))
}
