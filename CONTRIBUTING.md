# Contributing to AI Legal Ecosystem 🤝

First off, thank you for considering contributing to AI Legal Ecosystem! It's people like you that make this project such a great tool for the legal community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Workflow](#development-workflow)
- [Style Guidelines](#style-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Community](#community)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of:
- Age, body size, disability, ethnicity, gender identity and expression
- Level of experience, education, socio-economic status
- Nationality, personal appearance, race, religion
- Sexual identity and orientation

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16.x or higher)
- **npm** (v8.x or higher)
- **Python** (v3.8 or higher) - for Local Legal Intelligence API
- **pip** - Python package manager
- **Git**
- A code editor (we recommend **VS Code**)

### Setting Up Your Development Environment

1. **Fork the Repository**
   
   Click the "Fork" button at the top right of the repository page.

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/aiLegalEcosystem.git
   cd aiLegalEcosystem/aiLegalAssistant
   ```

3. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/aiLegalEcosystem.git
   ```

4. **Install Dependencies**
   ```bash
   npm install
   ```

5. **Set Up Environment Variables**
   
   Create a `.env` file in the `aiLegalAssistant` directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key
   VITE_INDIAN_KANOON_TOKEN=your_indian_kanoon_token
   VITE_COURT_LISTENER_TOKEN=your_court_listener_token
   ```

6. **Start Development Server**
   ```bash
   npm run dev
   ```

7. **Set Up Local Legal Intelligence API**
   
   Navigate to the API directory:
   ```bash
   cd ../legal_intelligence_api
   ```

8. **Install Python Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

9. **Start Local API Server**
   ```bash
   python main.py
   ```
   
   The API will run on `http://localhost:8000`

10. **Verify Setup**
    
    - Frontend: Open your browser and navigate to `http://localhost:5173`
    - Backend API: Open `http://localhost:8000/health` to verify API is running
    - You should see `{"status": "healthy"}` from the API

---

## 🎯 How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

**Bug Report Template:**
```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. Windows 11, macOS 13.0]
 - Browser: [e.g. Chrome 120, Firefox 121]
 - Node Version: [e.g. 18.17.0]
 - npm Version: [e.g. 9.6.7]

**Additional context**
Add any other context about the problem here.
```

### Suggesting Enhancements 💡

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

**Enhancement Template:**
```markdown
**Is your feature request related to a problem?**
A clear and concise description of what the problem is.

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.

**Potential Implementation**
If you have ideas on how to implement this, please share them.
```

### Contributing Code 💻

#### Types of Contributions

1. **Bug Fixes**: Fix existing bugs in the codebase
2. **New Features**: Implement new functionality
3. **Documentation**: Improve or add documentation
4. **Performance**: Optimize existing code
5. **Testing**: Add or improve tests
6. **Refactoring**: Improve code structure without changing functionality

#### Good First Issues

Look for issues labeled `good first issue` or `beginner-friendly` if you're new to the project.

---

## 🔄 Development Workflow

### Branch Naming Convention

Use descriptive branch names with the following prefixes:

- `feature/` - New features (e.g., `feature/add-case-export`)
- `fix/` - Bug fixes (e.g., `fix/chat-scroll-issue`)
- `docs/` - Documentation updates (e.g., `docs/update-api-guide`)
- `refactor/` - Code refactoring (e.g., `refactor/simplify-state-management`)
- `test/` - Adding or updating tests (e.g., `test/add-component-tests`)
- `perf/` - Performance improvements (e.g., `perf/optimize-search`)
- `chore/` - Maintenance tasks (e.g., `chore/update-dependencies`)

### Development Process

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Write clean, readable code
   - Follow the style guidelines
   - Add comments where necessary
   - Update documentation if needed

3. **Test Your Changes**
   ```bash
   npm run lint        # Check for linting errors
   npm run typecheck   # Check TypeScript types
   npm run build       # Ensure build succeeds
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   ```

5. **Keep Your Branch Updated**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template

---

## 🎨 Style Guidelines

### TypeScript/JavaScript Style

- Use **TypeScript** for all new code
- Follow **ESLint** rules configured in the project
- Use **functional components** with hooks
- Prefer **const** over **let**, avoid **var**
- Use **arrow functions** for callbacks
- Use **async/await** instead of promises chains

**Example:**
```typescript
// Good ✅
const fetchCases = async (query: string): Promise<Case[]> => {
  try {
    const response = await api.search(query);
    return response.data;
  } catch (error) {
    console.error('Error fetching cases:', error);
    throw error;
  }
};

// Avoid ❌
function fetchCases(query) {
  return api.search(query).then(response => {
    return response.data;
  }).catch(error => {
    console.error('Error fetching cases:', error);
    throw error;
  });
}
```

### React Component Guidelines

1. **Component Structure**
   ```typescript
   // Imports
   import { useState, useEffect } from 'react';
   import { ComponentProps } from './types';
   
   // Interface/Type definitions
   interface MyComponentProps {
     title: string;
     onSubmit: (data: FormData) => void;
   }
   
   // Component
   export const MyComponent: React.FC<MyComponentProps> = ({ title, onSubmit }) => {
     // Hooks
     const [state, setState] = useState<string>('');
     
     // Event handlers
     const handleClick = () => {
       // handler logic
     };
     
     // Effects
     useEffect(() => {
       // effect logic
     }, []);
     
     // Render
     return (
       <div>
         {/* JSX */}
       </div>
     );
   };
   ```

2. **Props Destructuring**
   ```typescript
   // Good ✅
   const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
     return <h1>{title}</h1>;
   };
   
   // Avoid ❌
   const Header: React.FC<HeaderProps> = (props) => {
     return <h1>{props.title}</h1>;
   };
   ```

3. **State Management**
   - Use `useState` for local component state
   - Use `useEffect` for side effects
   - Keep state as close to where it's used as possible
   - Lift state up only when necessary

### CSS/Styling Guidelines

- Use **Tailwind CSS** utility classes
- Follow mobile-first responsive design
- Use semantic color names from Tailwind
- Group related utility classes together

**Example:**
```tsx
// Good ✅
<div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
  <p className="text-gray-600">Description</p>
</div>

// Avoid ❌
<div className="p-6 flex bg-white gap-4 shadow-md flex-col rounded-lg">
  <h2 className="font-bold text-gray-900 text-2xl">Title</h2>
  <p className="text-gray-600">Description</p>
</div>
```

### File Naming Conventions

- **Components**: PascalCase (e.g., `CaseInputForm.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Services**: camelCase (e.g., `indianKanoon.ts`)
- **Types**: PascalCase (e.g., `CaseTypes.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

### Code Organization

```
src/
├── components/          # React components
│   ├── common/         # Reusable components
│   └── features/       # Feature-specific components
├── lib/                # Utility libraries
├── services/           # API services
│   ├── api.ts         # Local Legal Intelligence API
│   ├── indianKanoon.ts
│   └── courtListener.ts
├── data/               # Local data files
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── utils/              # Helper functions
└── constants/          # Application constants
```

---

## 📝 Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `chore`: Changes to build process or auxiliary tools

### Examples

```bash
# Feature
git commit -m "feat(chat): add voice input support"

# Bug fix
git commit -m "fix(analysis): resolve case matching algorithm error"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Refactoring
git commit -m "refactor(components): simplify state management in CaseInputForm"

# Performance
git commit -m "perf(search): optimize database query performance"
```

### Commit Message Rules

- Use the imperative mood ("add" not "added" or "adds")
- Don't capitalize the first letter
- No period (.) at the end
- Keep the subject line under 50 characters
- Separate subject from body with a blank line
- Use the body to explain what and why vs. how

---

## 🔀 Pull Request Process

### Before Submitting

1. ✅ Ensure your code follows the style guidelines
2. ✅ Update documentation if needed
3. ✅ Add tests for new features
4. ✅ Ensure all tests pass
5. ✅ Update the CHANGELOG.md if applicable
6. ✅ Rebase your branch on the latest main

### Pull Request Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Related Issue
Fixes #(issue number)

## How Has This Been Tested?
Describe the tests you ran to verify your changes

## Screenshots (if applicable)
Add screenshots to demonstrate the changes

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
```

### Review Process

1. At least one maintainer must approve the PR
2. All CI checks must pass
3. No merge conflicts with main branch
4. Code review feedback must be addressed

### After Your PR is Merged

1. Delete your branch (both locally and on GitHub)
2. Pull the latest changes from upstream
3. Celebrate! 🎉

---

## 🧪 Testing Guidelines

### Writing Tests

- Write tests for all new features
- Ensure tests are deterministic
- Use descriptive test names
- Follow the AAA pattern: Arrange, Act, Assert

**Example:**
```typescript
describe('CaseAnalysis', () => {
  it('should calculate case strength correctly', () => {
    // Arrange
    const caseData = {
      strongPoints: ['point1', 'point2'],
      weakPoints: ['point1']
    };
    
    // Act
    const strength = calculateStrength(caseData);
    
    // Assert
    expect(strength).toBeGreaterThan(50);
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

---

## � Contributing to Local Legal Intelligence API

### Python Code Guidelines

When contributing to the `legal_intelligence_api` directory, follow these guidelines:

1. **Code Style**
   - Follow [PEP 8](https://pep8.org/) style guide
   - Use type hints for function parameters and return values
   - Use descriptive variable names

**Example:**
```python
# Good ✅
from typing import List, Dict

async def search_legal_database(
    query: str,
    dataset: str = "all"
) -> Dict[str, List[Dict]]:
    """
    Search the legal database for relevant Q&A pairs.
    
    Args:
        query: The search query string
        dataset: The dataset to search (default: "all")
        
    Returns:
        Dictionary containing search results
    """
    # Implementation
    pass

# Avoid ❌
def search(q, d="all"):
    # Implementation
    pass
```

2. **API Endpoint Structure**
   ```python
   @app.post("/search")
   async def search_endpoint(request: SearchRequest):
       """
       Endpoint docstring explaining what it does
       """
       # Validate input
       # Process request
       # Return response
       pass
   ```

3. **Error Handling**
   ```python
   from fastapi import HTTPException
   
   try:
       result = await perform_search(query)
   except ValueError as e:
       raise HTTPException(status_code=400, detail=str(e))
   except Exception as e:
       raise HTTPException(status_code=500, detail="Internal server error")
   ```

### Adding Legal Data

To contribute legal Q&A data:

1. **Data Format**
   - Use JSON format
   - Follow the existing structure in `data/` folder
   
   ```json
   [
     {
       "question": "What is Section 302 IPC?",
       "answer": "Section 302 of the Indian Penal Code deals with punishment for murder..."
     }
   ]
   ```

2. **Data Quality Guidelines**
   - Ensure accuracy of legal information
   - Cite sources where applicable
   - Use clear, concise language
   - Avoid legal jargon where possible
   - Include relevant context

3. **Adding New Datasets**
   - Create a new JSON file in `legal_intelligence_api/data/`
   - Update `main.py` to load the new dataset
   - Document the dataset in the API README

### Testing the API

```bash
# Start the API server
python main.py

# Test health endpoint
curl http://localhost:8000/health

# Test search endpoint
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{"query": "murder", "dataset": "ipc"}'
```

---

## �📚 Documentation Guidelines

### Code Documentation

- Add JSDoc comments for functions and components
- Explain complex logic with inline comments
- Keep comments up-to-date with code changes

**Example:**
```typescript
/**
 * Analyzes a legal case and returns matched precedents
 * @param caseData - The case details to analyze
 * @param options - Analysis options
 * @returns Promise resolving to analysis results
 * @throws {Error} If API request fails
 */
async function analyzeCase(
  caseData: CaseFormData,
  options?: AnalysisOptions
): Promise<AnalysisResult> {
  // Implementation
}
```

### README Updates

- Update README.md when adding new features
- Include usage examples
- Update diagrams if architecture changes

---

## 🌐 Community

### Getting Help

- **GitHub Discussions**: For questions and discussions
- **GitHub Issues**: For bug reports and feature requests
- **Discord**: [Join our Discord server](#) (if applicable)

### Recognition

Contributors will be recognized in:
- README.md Contributors section
- Release notes
- Project documentation

---

## 🎓 Learning Resources

### Recommended Reading

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Python Documentation](https://docs.python.org/3/)

### Project-Specific Resources

- [Google Gemini AI Documentation](https://ai.google.dev/docs) - Used for case analysis only
- [Indian Kanoon API Documentation](https://api.indiankanoon.org/doc/)
- [Court Listener API Documentation](https://www.courtlistener.com/api/)
- [LangChain Documentation](https://python.langchain.com/) - For vector search implementation

---

## 📞 Contact

If you have questions or need help, feel free to:
- Open a GitHub Discussion
- Comment on relevant issues
- Reach out to maintainers

---

## 🙏 Thank You!

Your contributions make this project better for everyone in the legal community. We appreciate your time and effort!

**Happy Coding! 💻⚖️**
