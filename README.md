# auth-example

## Development

1. `npm install`
2. `npm start`

## Running

First, start up the application. Then from your terminal, you can run these cURL commands to test.

### Sign up

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"mdboop","password":"wow terrible password"}' \
  http://localhost:3000/api/signup
```

### Log in

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"mdboop","password":"wow terrible password"}' \
  http://localhost:3000/api/login
```

### Inspect

Why not just send the whole database with our hashed passwords to anyone who asks? Here's a way to look at what's been saved to our "database".

```bash
curl http://localhost:3000/api/inspect
```
