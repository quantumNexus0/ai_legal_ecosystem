# NyayaAssist - AI Legal Ecosystem 🏛️⚖️

<div align="center">

![AI Legal Ecosystem](https://img.shields.io/badge/AI-Legal%20Ecosystem-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-009688?style=for-the-badge&logo=fastapi)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**NyayaAssist - India's premier AI-powered legal platform connecting citizens with verified lawyers. Comprehensive legal research, instant messaging, intelligent case management, and seamless appointment scheduling.**

[Features](#-features) • [Architecture](#-system-architecture) • [Installation](#-installation) • [Usage](#-usage) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Ecosystem Overview (ERP View)](#-ecosystem-overview-erp-view)
- [System Architecture](#-system-architecture)
- [Entity Relationship Diagram](#-entity-relationship-diagram)
- [Detailed Component Diagrams](#-detailed-component-diagrams)
- [Module Details](#-module-details)
    - [Legal Services Platform](#1-legal-services-platform)
    - [Legal Templates Library](#2-legal-templates-library-legaltemplate)
    - [AI Legal Assistant](#3-ai-legal-assistant-ailegalassistant)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**AI Legal Ecosystem** is a unified legal technology platform that bridges the gap between legal professionals and citizens. It combines advanced AI for case analysis with robust practice management tools for lawyers.

For **Citizens**, it offers AI-driven legal insights, easy access to verified lawyers, and a simple way to manage their legal journey.
For **Lawyers**, it provides a comprehensive dashboard to manage cases, appointments, client communications, and specialized profiles.

---

## ✨ Features

### 1. **Role-Based Dashboards**
- **User Dashboard**: Track your legal cases, view upcoming appointments, and manage lawyer communications.
- **Lawyer Dashboard**: specialized interface for practice management, case tracking, and client interactions.
- **Admin Dashboard**: System-wide oversight of users, lawyers, and platform metrics.

### 2. **Intelligent Case Management**
- **Create & Manage**: Lawyers can create new patient/client files, track case status, and update details.
- **Visibility**: Clients get real-time visibility into their case progress and next hearing dates.
- **Deletion**: Secure deletion of cases with strict ownership validation (Lawyers only).

### 3. **Appointment Scheduling**
- **Easy Booking**: Lawyers can schedule consultations and hearings directly from the dashboard.
- **Status Tracking**: Track appointments (Scheduled, Confirmed, Completed).
- **Calendar Integration**: Visual list of upcoming commitments.

### 4. **Real-Time Messaging System** 💬
- **Direct Communication**: Secure, private chat between lawyers and their clients.
- **Instant Access**: "Message" buttons integrated directly into Case and Appointment cards.
- **Notification**: Unread message counts and real-time updates.
- **Persistent History**: All conversations are saved securely for future reference.

### 5. **AI Case Analysis Engine** 🧠
- **Precedent Matching**: Input case facts to find relevant legal precedents using AI.
- **Strength Assessment**: Percentage-based scoring of case strength.
- **Strategy Generation**: AI-identified strong/weak points and actionable legal advice.

### 6. **Local Legal Assistant** 🤖
- **RAG-Powered**: Retrieval-Augmented Generation using a local vector database.
- **Privacy-First**: runs locally to ensure data privacy.
- **Voice Support**: Voice input and Text-to-Speech output for accessibility.

---

## 🌐 Ecosystem Overview (ERP View)

A high-level view of how the different applications in the ecosystem connect and share resources.

```mermaid
graph TB
    subgraph "Core Infrastructure"
        Backend[Unified Backend API]
        DB[(MySQL Database)]
    end

    subgraph "Legal Services Platform"
        Dashboard[Web Dashboard]
        CaseMgr[Case Manager]
        Chat[Chat System]
    end

    subgraph "AI Legal Assistant"
        AssistantUI[Assistant Interface]
        Voice[Voice Processing]
        LocalRAG[Local RAG Engine]
    end

    subgraph "Legal Templates Library"
        TemplateLib[Template Repository]
        Generator[Doc Generator]
    end

    Dashboard --> Backend
    AssistantUI --> Backend
    TemplateLib -.-> Dashboard
    
    Backend --> DB
    Backend --> LocalRAG
    
    Chat --> Backend
    Voice --> AssistantUI
    
    style Backend fill:#ff9800,stroke:#333,stroke-width:2px
    style Dashboard fill:#4caf50,stroke:#333,stroke-width:2px
    style AssistantUI fill:#2196f3,stroke:#333,stroke-width:2px
    style TemplateLib fill:#9c27b0,stroke:#333,stroke-width:2px
```

---

## 📦 Module Details

### 1. Legal Services Platform
The core web application connecting lawyers and clients.

- **Directory**: `LegalServicesPlatform/`
- **Tech**: React, TypeScript, Tailwind CSS
- **Function**: Handles authentication, dashboards, case tracking, and messaging.

### 2. Legal Templates Library (`legalTemplate`)
A comprehensive repository of legal forms and document templates.

- **Directory**: `legalTemplate/`
- **Contents**: 
    - `templates/`: collection of categorized HTML/PDF templates (Contracts, Agreements, Affidavits).
    - `legalforms/`: Standardized legal forms for various jurisdictions.
- **Usage**: Used by the platform to generate ready-to-use documents for clients.

```mermaid
pie title Template Distribution (260 Total)
    "Business" : 80
    "Employment" : 40
    "Personal Legal" : 50
    "Real Estate" : 30
    "Intellectual Property" : 25
    "Financial" : 35
```

```mermaid
graph LR
    User[User] --> Select[Select Category]
    Select --> Browse[Browse Templates]
    Browse --> Preview[Live Preview]
    Preview --> Fill[Fill Details]
    Fill --> Download[Download PDF/Docx]
```

### 3. AI Legal Assistant (`aiLegalAssistant`)
A standalone, privacy-focused AI assistant for answering legal queries.

- **Directory**: `aiLegalAssistant/`
- **Tech**: React, Local Vector DB, Speech API
- **Key Feature**: Runs independently to provide quick legal answers without exposing sensitive case data to external cloud providers.

```mermaid
sequenceDiagram
    participant User
    participant UI as Assistant UI
    participant RAG as Local RAG
    participant Vector as Vector DB
    
    User->>UI: Voice/Text Query
    UI->>RAG: Process Query
    RAG->>Vector: Semantic Search
    Vector-->>RAG: Relevant Legal Context
    RAG-->>UI: Formulated Answer
    UI-->>User: Text & Voice Response
```

---

## 🏗️ System Architecture

The system follows a modern client-server architecture with AI integration:

```mermaid
graph TB
    subgraph "Client Layer"
        UI[React UI Components]
        Router[React Router]
        State[Zustand Store]
    end

    subgraph "API Gateway & Backend"
        FastAPI[FastAPI Server]
        Auth[Auth Middleware]
        Endpoints[API Endpoints]
    end

    subgraph "Data Layer"
        MySQL[(MySQL Database)]
        VectorDB[(Local Vector DB)]
    end

    subgraph "AI Services"
        Gemini[Google Gemini API]
        RAG[Local RAG Engine]
    end

    UI --> Router
    Router --> State
    State -- REST/WS --> FastAPI
    
    FastAPI --> Auth
    Auth --> Endpoints
    
    Endpoints --> MySQL
    Endpoints --> RAG
    Endpoints --> Gemini
    
    RAG --> VectorDB
    
    style UI fill:#61DAFB
    style FastAPI fill:#009688
    style MySQL fill:#4479A1
    style Gemini fill:#4285F4
```

---

## 📊 Entity Relationship Diagram

The core database schema supporting the application:

```mermaid
erDiagram
    USER ||--o{ LAWYER_PROFILE : has
    USER ||--o{ CASE : "involved in"
    USER ||--o{ APPOINTMENT : "has"
    USER ||--o{ MESSAGE : "sends/receives"

    USER {
        int id PK
        string email
        string role "user|lawyer|admin"
    }

    LAWYER_PROFILE {
        int id PK
        int user_id FK
        string specialization
    }

    CASE {
        int id PK
        string title
        int lawyer_id FK
        int client_id FK
        string status
    }

    APPOINTMENT {
        int id PK
        datetime appointment_time
        string status
    }

    MESSAGE {
        int id PK
        int sender_id FK
        int receiver_id FK
        string content
        boolean is_read
    }
```

---

## 🧩 Detailed Component Diagrams

### 1. Messaging System Flow

How the real-time chat works between users and lawyers:

```mermaid
sequenceDiagram
    participant Client as User (Frontend)
    participant Store as ChatStore
    participant API as Messages API
    participant DB as MySQL Database

    Client->>Store: Click "Message"
    Store->>API: GET /messages/conversation/{id}
    API->>DB: Query Messages
    DB-->>API: Return Conversation
    API-->>Store: Message List
    Store-->>Client: Update UI

    Client->>Store: Send Message "Hello"
    Store->>API: POST /messages
    API->>DB: INSERT Message
    DB-->>API: Success
    API-->>Store: Standardized Message
    Store-->>Client: Append to Chat Window
```

---

## 🛠️ Technology Stack

### Frontend Components
```mermaid
graph TD
    React[React 18.3] --> UI[UI Layer]
    UI --> Tailwind[Tailwind CSS]
    UI --> Lucide[Lucide Icons]
    
    React --> Logic[Logic Layer]
    Logic --> Router[React Router]
    Logic --> Store[Zustand State]
    Logic --> API[Axios Client]
```

### Backend Structure
```mermaid
graph TD
    FastAPI[FastAPI] --> Routes[API Routes]
    Routes --> Auth[Security / OAuth2]
    Routes --> Controllers[Business Logic]
    
    Controllers --> Models[SQLAlchemy Models]
    Models --> MySQL[MySQL DB]
    
    Controllers --> AI[AI Services]
    AI --> Google[Google Gemini]
    AI --> LangChain[LangChain Local]
```

---

## � Future Roadmap

We are constantly improving NyayaAssist. Here is what's coming next:

- [ ] **Mobile Application**: Native React Native app for iOS and Android.
- [ ] **Blockchain Evidence**: Secure, immutable storage for legal documents and evidence.
- [ ] **Multilingual Support**: Expanding support for Hindi, Tamil, Telugu, and other regional languages.
- [ ] **e-Courts Integration**: Direct integration with Indian e-Courts services for case filing status.
- [ ] **AI Contract Review**: Automated risk assessment for uploaded contracts.

---

## ❓ Troubleshooting & FAQ

**Q: "Module not found" error when running backend?**
A: Ensure you have activated your virtual environment (`venv\Scripts\activate`) and installed requirements (`pip install -r requirements.txt`).

**Q: Database connection failed?**
A: Make sure XAMPP is running and the MySQL module is started (Port 3306). The default user is `root` with no password.

**Q: Where is the API documentation?**
A: Once the backend is running, visit `http://localhost:8000/docs` for the interactive Swagger UI.

---

## �🚀 Installation

### Prerequisites
1.  **Node.js** (v18+)
2.  **Python** (v3.10+)
3.  **XAMPP** (or any MySQL server)

### Step 1: Clone the Repository
```bash
git clone https://github.com/quantumNexus0/ai_legal_ecosystem.git
cd ai_legal_ecosystem
```

### Step 2: Database Setup
1.  Start **XAMPP Control Panel**.
2.  Start the **Apache** and **MySQL** modules.
3.  The application will automatically create the `legal_services` database on first run, or you can run the setup script:
    ```bash
    cd legal_intelligence_api
    python setup_mysql.py
    ```

### Step 3: Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd legal_intelligence_api
    ```
2.  Create a virtual environment (optional but recommended):
    ```bash
    python -m venv venv
    # Windows
    venv\Scripts\activate
    # Mac/Linux
    source venv/bin/activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Run the server:
    ```bash
    uvicorn app.main:app --reload
    ```
    The API will be available at `http://localhost:8000`.

### Step 4: Frontend Setup
1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd LegalServicesPlatform
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Step 5: AI Assistant Setup (Optional)
If you want to run the separate AI Assistant frontend:
1.  Navigate to `aiLegalAssistant`:
    ```bash
    cd aiLegalAssistant
    npm install
    npm run dev
    ```

---

## 👥 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
