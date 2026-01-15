# AI Legal Case Analysis Platform

A modern, AI-powered web application designed to assist legal professionals and individuals in analyzing legal cases, finding precedents, and predicting outcomes.

## 🚀 Project Overview

This platform leverages advanced AI (Google Gemini for case analysis) and legal databases (Indian Kanoon, Local Legal Intelligence API) to provide deep insights into legal cases. It helps users understand the strength of their case, potential risks, and strategic moves based on historical data and local legal knowledge.

### Key Features

*   **⚖️ Intelligent Case Analysis**: Input case facts and issues to get a comprehensive analysis, including win probability and strategic advice.
*   **🔍 Local Legal Intelligence Search**: A dedicated search interface to query your local legal database with Q&A retrieval - no external AI calls, all data stays local.
*   **📚 Case Library**: Access a repository of relevant legal cases and precedents.
*   **📊 Legal Analytics Dashboard**: Visualize case history trends, including win probability over time and common risk factors.
*   **📜 History Management**: Automatically saves your analysis history for easy retrieval and review.
*   **🎙️ Voice Input & Text-to-Speech**: Hands-free searching with voice input and audio playback of answers.

## 🏗️ Architecture

The application follows a modern component-based architecture:

### System Architecture

```mermaid
graph TD
    User[User] --> App[App Component]
    App --> Sidebar[Sidebar Navigation]
    App --> Main[Main Content Area]

    subgraph Views
        Main --> Analysis[New Analysis View]
        Main --> History[History View]
        Main --> Library[Case Library View]
        Main --> AIChat[Local Legal Search View]
        Main --> Stats[Statistics View]
    end

    Analysis --> InputForm[Case Input Form]
    InputForm -->|Submit| ServiceLayer[Service Layer]
    
    subgraph Services
        ServiceLayer --> IK[Indian Kanoon Service]
        ServiceLayer --> Gemini[Gemini AI Service - Case Analysis]
        ServiceLayer --> LocalAPI[Local Legal Intelligence API]
    end

    ServiceLayer -->|Results| AnalysisResults[Analysis Results Component]
    AnalysisResults --> Comparison[Comparison Table]
    
    History -->|Load| LocalStorage[(LocalStorage)]
    
    AIChat --> LocalAPI
    LocalAPI --> VectorDB[(Vector Database - Q&A)]
```

### Technology Stack Diagram

```mermaid
graph LR
    subgraph Frontend
        React[React 18]
        TS[TypeScript]
        Vite[Vite]
        Tailwind[Tailwind CSS]
    end
    
    subgraph Backend
        FastAPI[FastAPI Server]
        Python[Python 3.8+]
        LangChain[LangChain]
    end
    
    subgraph External_APIs
        Gemini[Gemini AI]
        IK[Indian Kanoon API]
    end
    
    subgraph Data
        LocalDB[Local JSON Database]
        LocalStorage[Browser Storage]
    end
    
    React --> TS
    React --> Tailwind
    Vite --> React
    
    React --> FastAPI
    FastAPI --> Python
    FastAPI --> LangChain
    LangChain --> LocalDB
    
    React --> Gemini
    React --> IK
    React --> LocalStorage
    
    style React fill:#61DAFB
    style FastAPI fill:#009688
    style Gemini fill:#4285F4
    style LocalDB fill:#00E676
```

### Data Flow Diagram

```mermaid
flowchart TD
    Start([User Action]) --> ActionType{Action Type?}
    
    ActionType -->|Case Analysis| InputCase[Enter Case Details]
    ActionType -->|Legal Search| InputQuery[Enter Search Query]
    ActionType -->|View History| LoadHistory[Load from LocalStorage]
    
    InputCase --> ValidateCase{Valid?}
    ValidateCase -->|No| InputCase
    ValidateCase -->|Yes| SearchPrecedents[Search Indian Kanoon]
    
    SearchPrecedents --> GeminiAnalysis[Gemini AI Analysis]
    GeminiAnalysis --> DisplayResults[Display Results]
    DisplayResults --> SaveHistory[Save to LocalStorage]
    
    InputQuery --> LocalAPISearch[Query Local API]
    LocalAPISearch --> VectorSearch[Vector Database Search]
    VectorSearch --> RetrieveQA[Retrieve Top 2 Q&A]
    RetrieveQA --> DisplayQA[Display Q&A Results]
    
    LoadHistory --> DisplayHistory[Display Past Analyses]
    
    SaveHistory --> End([End])
    DisplayQA --> End
    DisplayHistory --> End
    
    style Start fill:#4CAF50
    style End fill:#F44336
    style GeminiAnalysis fill:#2196F3
    style LocalAPISearch fill:#00C853
    style VectorSearch fill:#00E676
```

### Component Structure

```mermaid
graph TB
    subgraph App_Layer
        App[App.tsx]
        Header[Header.tsx]
        Sidebar[Sidebar.tsx]
    end
    
    subgraph Feature_Components
        CaseInput[CaseInputForm.tsx]
        CaseResults[CaseAnalysisResults.tsx]
        AIChat[AIChat.tsx]
        CaseLib[CaseLibrary.tsx]
        Analytics[LegalAnalyticsDashboard.tsx]
        Comparison[ComparisonTable.tsx]
        Drafting[DocumentDrafting.tsx]
    end
    
    subgraph Services_Layer
        APIService[services/api.ts]
        IKService[services/indianKanoon.ts]
        CLService[services/courtListener.ts]
        GeminiLib[lib/gemini.ts]
    end
    
    App --> Header
    App --> Sidebar
    App --> CaseInput
    App --> CaseResults
    App --> AIChat
    App --> CaseLib
    App --> Analytics
    
    CaseInput --> IKService
    CaseInput --> GeminiLib
    CaseResults --> Comparison
    
    AIChat --> APIService
    
    CaseLib --> IKService
    CaseLib --> CLService
    
    style App fill:#FF6B6B
    style APIService fill:#00C853
    style GeminiLib fill:#4285F4
```


## 🛠️ Technology Stack

### Frontend
*   **React 18**: Core UI library.
*   **TypeScript**: For type safety and robust development.
*   **Vite**: Fast build tool and development server.
*   **Tailwind CSS**: Utility-first CSS for styling.
*   **Lucide React**: Modern, lightweight icons.

### AI & Data
*   **Google Generative AI (Gemini)**: Powers the case analysis logic only.
*   **Local Legal Intelligence API**: FastAPI-based local server for privacy-focused legal Q&A search.
*   **Indian Kanoon API**: Integration for fetching real legal precedents.
*   **Vector Database**: LangChain-powered semantic search for local legal knowledge.

### Utilities
*   **jsPDF**: For generating PDF reports of case analyses.
*   **React Router**: Client-side routing.

## 🏁 Getting Started

### Prerequisites
*   Node.js (v18 or higher)
*   npm or yarn
*   Python (v3.8 or higher)
*   pip (Python package manager)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/ai-legal-case.git
    cd ai-legal-case/aiLegalAssistant
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your API keys:
    ```env
    VITE_GEMINI_API_KEY=your_gemini_api_key
    VITE_INDIAN_KANOON_API_KEY=your_indian_kanoon_api_key
    ```

4.  **Set Up Local Legal Intelligence API**
    ```bash
    cd ../legal_intelligence_api
    pip install -r requirements.txt
    python main.py
    ```
    The API will run on `http://localhost:8000`

5.  **Run the development server** (in a new terminal)
    ```bash
    cd ../aiLegalAssistant
    npm run dev
    ```

## 📖 Usage Guide

1.  **New Analysis**: Navigate to the "New Analysis" tab. Enter the facts of your case, the legal issues, and relevant sections. Click "Analyze Case" to get a prediction.
2.  **View History**: Check the "History" tab to see all your past analyses. Click on any record to view the full details again.
3.  **Local Legal Search**: Use the "AI Assistant" tab to search your local legal database. Enter queries like "What is Section 302 IPC?" and get instant answers from your local knowledge base. Use voice input or text-to-speech for hands-free operation.
4.  **Analytics**: Visit the "Statistics" tab to see a dashboard of your case performance trends.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
