# Nyaya-AI Comprehensive Architecture Deep Dive 🏛️🔍

This document provides in-depth architectural and sequence diagrams for the Nyaya-AI Legal Ecosystem. It covers everything from high-level infrastructure to specific data flows like the Retrieval-Augmented Generation (RAG) pipeline and real-time WebSockets.

---

## 1. High-Level Ecosystem Topology

This diagram illustrates the overall infrastructure when deployed via Docker, highlighting the role of the Nginx Reverse Proxy as the central gateway routing traffic to specific containers.

```mermaid
graph TB
    subgraph "External/Client"
        Browser[Web Browser / User]
    end

    subgraph "Docker Host Network"
        Proxy[Nginx Reverse Proxy\n:80 / :443]
        
        subgraph "Frontend Services"
            Platform[Platform SPA\nReact/Vite]
            NyayaAI[Nyaya-AI Assistant\nVanilla JS/Static]
        end

        subgraph "Backend Services"
            FastAPI[FastAPI Server\nUvicorn Workers]
        end

        subgraph "Data & AI Persistence"
            SQL[(SQL Database\nSQLite/MySQL)]
            Mongo[(MongoDB\nUsers, Logs, GridFS)]
            Chroma[(ChromaDB\nVector Store)]
        end
        
        subgraph "External / Host Services"
            Ollama[Ollama Server\nLocal LLM Inference]
        end
    end

    Browser -- HTTP/HTTPS --> Proxy
    
    Proxy -- "/ (SPA)" --> Platform
    Proxy -- "/nyaya-ai/" --> NyayaAI
    Proxy -- "/api/, /auth/, /ws/" --> FastAPI
    
    FastAPI -- "SQLAlchemy" --> SQL
    FastAPI -- "Motor (Async)" --> Mongo
    FastAPI -- "Vector Query" --> Chroma
    FastAPI -- "REST API" --> Ollama

    classDef external fill:#f9f9f9,stroke:#333,stroke-width:2px,color:#000
    classDef proxy fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000
    classDef frontend fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#000
    classDef backend fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#000
    classDef database fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px,color:#000
    classDef ai fill:#ffebee,stroke:#c62828,stroke-width:2px,color:#000

    class Browser external
    class Proxy proxy
    class Platform,NyayaAI frontend
    class FastAPI backend
    class SQL,Mongo,Chroma database
    class Ollama ai
```

---

## 2. Advanced RAG (Retrieval-Augmented Generation) Pipeline

Nyaya-AI uses a privacy-first local RAG pipeline to analyze case facts against stored legal precedents and statutes.

### 2a. Document Ingestion Flow
How legal PDFs and documents are processed and stored.

```mermaid
sequenceDiagram
    participant Admin
    participant FastAPI
    participant Parser as PDF/Text Parser
    participant Splitter as Chunk Splitter
    participant Embedder as Embedding Model
    participant ChromaDB as Vector Database
    participant Mongo as GridFS (Original Doc)

    Admin->>FastAPI: Upload Legal Document (PDF)
    FastAPI->>Mongo: Store original PDF file safely
    FastAPI->>Parser: Extract text from PDF
    Parser-->>FastAPI: Raw Text
    FastAPI->>Splitter: Split text (Chunk size 1000, overlap 200)
    Splitter-->>FastAPI: List of Text Chunks
    
    loop For each chunk
        FastAPI->>Embedder: Generate Vector Embedding
        Embedder-->>FastAPI: Vector Array [0.12, 0.45, ...]
    end
    
    FastAPI->>ChromaDB: Upsert Vectors + Metadata (Source ID, Type)
    ChromaDB-->>FastAPI: Acknowledgment
    FastAPI-->>Admin: Success: Document Indexed
```

### 2b. Legal Query Processing Flow
How a user's question or case facts are analyzed.

```mermaid
sequenceDiagram
    participant User
    participant FastAPI
    participant Embedder as Embedding Model
    participant ChromaDB as Vector DB
    participant ContextBuilder as Prompt Builder
    participant Ollama as Local LLM
    
    User->>FastAPI: Query: "What is the penalty for IPC 379?"
    
    FastAPI->>Embedder: Generate Embedding for Query
    Embedder-->>FastAPI: Query Vector
    
    FastAPI->>ChromaDB: Cosine Similarity Search (Query Vector, top_k=5)
    ChromaDB-->>FastAPI: Relevant Document Chunks + Metadata
    
    FastAPI->>ContextBuilder: Assemble Prompt (System Rules + Query + Context Chunks)
    
    FastAPI->>Ollama: Inference Request (Prompt)
    Ollama-->>FastAPI: Streamed Analysis / Response Draft
    
    FastAPI-->>User: Structured Legal Analysis Report
```

---

## 3. Entity-Relationship Model (Hybrid Database)

We use **SQL** for strict transactional integrity (users, cases, finances) and **MongoDB** for unstructured or heavy data (chat history, AI logs, files).

```mermaid
erDiagram
    %% SQL Entities
    USER ||--o{ LAWYER_PROFILE : "creates (if lawyer)"
    USER ||--o{ CASE : "owns/manages"
    USER ||--o{ APPOINTMENT : "books"
    USER ||--o{ CHAT_SESSION : "participates in"
    
    CASE ||--o{ HEARING_DATES : "has multiple"
    LAWYER_PROFILE ||--o{ APPOINTMENT : "receives"
    CHAT_SESSION ||--o{ MESSAGE : "contains"

    %% NoSQL Entities (Logical mapping)
    USER ||--o{ REVIEW : "writes (MongoDB)"
    LAWYER_PROFILE ||--o{ REVIEW : "receives (MongoDB)"
    CASE ||--o{ DOCUMENT : "attached files (GridFS)"
    USER ||--o{ ANALYSIS_LOG : "AI requests (MongoDB)"

    subgraph "SQL Database (Relational)"
        USER {
            int id PK
            string email
            string password_hash
            enum role "CLIENT, LAWYER, ADMIN"
        }
        LAWYER_PROFILE {
            int id PK
            int user_id FK
            string bar_council_id
            json specializations
            float rating
            boolean verified
        }
        CASE {
            int id PK
            int client_id FK
            int lawyer_id FK
            string title
            enum status "OPEN, CLOSED, PENDING"
        }
        APPOINTMENT {
            int id PK
            int client_id FK
            int lawyer_id FK
            datetime scheduled_at
            enum status "REQUESTED, CONFIRMED"
        }
        MESSAGE {
            int id PK
            int session_id FK
            int sender_id FK
            text content
            datetime sent_at
        }
    end

    subgraph "MongoDB (Document Store)"
        DOCUMENT
        REVIEW {
            ObjectId _id
            int lawyer_id "SQL ref"
            int client_id "SQL ref"
            int rating
            string text
        }
        ANALYSIS_LOG {
            ObjectId _id
            int user_id "SQL ref"
            json case_facts
            json generated_report
            datetime created_at
        }
    end
```

---

## 4. Security & Authentication Flow

Role-Based Access Control (RBAC) and JWT lifecycle.

```mermaid
sequenceDiagram
    participant Client
    participant AuthRouter as FastAPI Auth Router
    participant DB as SQL DB
    participant JWT as JWT Service
    participant ProtectedRoute as API Endpoint (e.g. /cases)

    Client->>AuthRouter: POST /auth/login (Email + Password)
    AuthRouter->>DB: Fetch User by Email
    DB-->>AuthRouter: User Record
    
    AuthRouter->>AuthRouter: Verify Password Hash
    
    AuthRouter->>JWT: Generate Access Token (Payload: user_id, role)
    JWT-->>AuthRouter: Encoded Token String
    AuthRouter-->>Client: Return Token & User Info
    
    Note over Client, ProtectedRoute: Subsequent Requests
    
    Client->>ProtectedRoute: GET /cases (Header: Bearer Token)
    ProtectedRoute->>JWT: Decode & Validate Token
    
    alt Token Invalid / Expired
        JWT-->>ProtectedRoute: Error
        ProtectedRoute-->>Client: 401 Unauthorized
    else Token Valid
        JWT-->>ProtectedRoute: Claims (user_id, role)
        ProtectedRoute->>ProtectedRoute: Check Role Permissions (RBAC)
        alt Role Unauthorized
            ProtectedRoute-->>Client: 403 Forbidden
        else Role Authorized
            ProtectedRoute->>DB: Fetch permitted data
            DB-->>ProtectedRoute: Data
            ProtectedRoute-->>Client: 200 OK (Data Payload)
        end
    end
```

---

## 5. Real-Time WebSocket Chat Architecture

Ensuring instant communication between clients and lawyers with persistent history.

```mermaid
graph TD
    subgraph "Client Side"
        ReactChat[Chat UI Component]
        WSClient[WebSocket API]
        ReactChat -->|Sends MSG| WSClient
        WSClient -->|Triggers UI| ReactChat
    end

    subgraph "Nginx Proxy"
        NginxBridge[Upgrade: websocket\nConnection: Upgrade]
    end

    subgraph "FastAPI Server"
        ConnectionManager[WebSocketManager]
        ActvConns[(Active Connections Dict)]
        MsgRouter[Message Router]
        DBSaver[Background Task: Save to DB]
    end

    subgraph "SQL Database"
        SQL[(Messages Table)]
    end

    WSClient <-->|"ws://.../api/chat/ws/{id}"| NginxBridge
    NginxBridge <--> ConnectionManager
    
    ConnectionManager -->|Register/Remove| ActvConns
    ConnectionManager -->|Parse JSON| MsgRouter
    
    MsgRouter -->|Broadcast to Target ID| ConnectionManager
    MsgRouter -->|Async Trigger| DBSaver
    
    DBSaver -->|INSERT INTO messages| SQL
```

---

## 6. Directory Structure Mapping

A visual map of how the codebase maps to the unified architecture.

```text
aiLegalEcosystem/
├── client/
│   ├── platform/          => Main React Application (Dashboards, Chat, Auth)
│   │   ├── src/components/
│   │   ├── nginx.conf     => Master Reverse Proxy Configuration
│   │   └── Dockerfile     => Frontend Build
│   └── nyaya-ai/          => Legal Assistant SPA
│       ├── index.html     => Vanilla JS Interface
│       └── Dockerfile     => Static File Server (Nginx)
├── server/                => FastAPI Backend
│   ├── app/
│   │   ├── api/           => Route Controllers
│   │   ├── core/          => Config, JWT Security
│   │   ├── models/        => SQLAlchemy Models
│   │   └── services/      => Ollama, Chroma, VectorDB Logic
│   ├── legal_services.db  => SQLite (Fallback/Dev SQL)
│   ├── chroma_db/         => Vector Embeddings Storage
│   └── Dockerfile         => Python Multi-stage Build
├── docker-compose.yml     => Orchestrates Platform, Nyaya-AI, Server, MongoDB
├── package.json           => Root commands (`npm run dev`)
└── ARCHITECTURE.md        => This document
```
