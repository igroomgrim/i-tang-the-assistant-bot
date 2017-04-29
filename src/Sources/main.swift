import PerfectLib
import PerfectHTTP
import PerfectHTTPServer
import Foundation

// Create HTTP server.
let server = HTTPServer()

// Facebook messenger vefify & access token
let facebookVerifyToken = "woofwoof"
let facebookAccessToken = ProcessInfo.processInfo.environment["facebook_access_token"]

// Register your own routes and handlers
var routes = Routes()
routes.add(method: .get, uri: "/", handler: {
    request, response in
    response.setHeader(.contentType, value: "text/html")
    response.appendBody(string: "WOOF WOOF")
    response.completed()
})

routes.add(method: .get, uri: "/webhook", handler: { (request, response) in
    guard let verifyToken = request.param(name: "hub.verify_token"), verifyToken == facebookVerifyToken else {
        response.setBody(string: "Woof Woof : Verify token cannot empty")
        response.status = .forbidden
        response.completed()
        return
    }
    
    guard let hubChallenge = request.param(name: "hub.challenge") else {
        response.setBody(string: "Woof Woof : hub.challenge is empty")
        response.status = .forbidden
        response.completed()
        return
    }
    
    response.setBody(string: hubChallenge)
    response.status = .ok
    response.completed()
})

routes.add(method: .post, uri: "/webhook", handler: { (request, response) in
    print(request.params())
    response.status = .ok
    response.completed()
})

// Add the routes to the server.
server.addRoutes(routes)

// Set a listen port of 8888
server.serverPort = 8888

do {
    // Launch the HTTP server.
    try server.start()
} catch PerfectError.networkError(let err, let msg) {
    print("Network error thrown: \(err) \(msg)")
}
