```
~ docker-compose up --build
```

```
~ docker build -t alexisvgutec/repo-utec-ms-orchestrator-ts:latest . --platform linux/amd64
~ docker tag alexisvgutec/repo-utec-ms-orchestrator-ts:latest alexisvgutec/repo-utec-ms-orchestrator-ts:1
~ docker push alexisvgutec/repo-utec-ms-orchestrator-ts:1
```

```
~ docker pull alexisvgutec/repo-utec-ms-orchestrator-ts:1
~ docker run -d -p 5000:5000 --name container-orchestrator alexisvgutec/repo-utec-ms-orchestrator-ts:1
```
