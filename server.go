package main

import (
	"net/http"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir("./dist/client")))
	http.ListenAndServe(":3333", nil)
}
