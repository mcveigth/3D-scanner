# 3DShock Client

# Requirements (pages)

# Routes

Client Datatype

```ts
type Client = {
  name: string
  email: string
  phone: number
  photos: string[]
}
```

post /api/clients -> create new client
get /api/clients/:id -> get client

post /api/clients/:id/session -> begin capture
delete /api/clients/:id/session -> delete all current photos (for new capture)

### Note Needed

get /api/clients -> get client list
get /api/clients/:id/session -> get active sesion (list of preview photo locations)

## Create Session

Information gathering

- name
- email
- phone

## Session Capture

start session

## Capture Review Phase

## Capture Finish -> Create Session
