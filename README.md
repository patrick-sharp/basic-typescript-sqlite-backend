# How to run:

## In one terminal
```bash
npm i
npm run dev
```

## In another terminal
```bash
curl localhost:3000/api/trip
curl localhost:3000/api/ship
curl localhost:3000/api/location

curl \
  -X POST localhost:3000/api/trip \
  -H "Content-Type: application/json" \
  -d '{"startCode": "SFO", "endCode": "LAX", "departureTime": "2025-01-02T00:00:00"}'
```
