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
- [System Architecture](#-system-architecture)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
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

### 7. **Secure Authentication** 🔐
- **Role-Based Access**: Strict separation of User, Lawyer, and Admin capabilities.
- **Profile Management**: Lawyers can manage their specialization, experience, and office details.
- **Modern UI**: Animated login/signup flows with validation.

---

## 🏗️ System Architecture

The system follows a modern client-server architecture:

- **Frontend**: Single Page Application (SPA) built with React and TypeScript.
- **Backend**: RESTful API built with FastAPI (Python).
- **Database**: MySQL relational database for structured data (Users, Cases, Appointments).
- **AI Layer**: Hybrid approach using Google Gemini for analysis and local Vector DB for the assistant.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18.3.1 (Vite)
- **Language**: TypeScript 5.5.3
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Lucide React
- **State Management**: Zustand
- **HTTP Client**: Axios

### Backend
- **Framework**: FastAPI (Python)
- **Database ORM**: SQLAlchemy
- **Database**: MySQL (via XAMPP)
- **Authentication**: OAuth2 / JWT
- **AI Integration**: Google Generative AI SDK, LangChain

---

## 🚀 Installation

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

## 📝 Configuration

### Environment Variables
Create a `.env` file in `legal_intelligence_api` if needed, but the project defaults to standard local ports:
- **Backend**: `http://localhost:8000`
- **Frontend**: `http://localhost:5173`
- **Database**: `mysql+pymysql://root:@localhost/legal_services`

---

## 👥 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
