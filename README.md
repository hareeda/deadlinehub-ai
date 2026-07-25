# DeadlineHub AI - System Architecture

> Version: 0.1.0 (MVP)  
> Last Updated: 25 July 2026

---

# 1. Overview

DeadlineHub AI is an AI-powered academic assistant that helps students manage assignment deadlines by automatically extracting assignment details, storing them, scheduling reminders, and sending notifications before deadlines.

The application is designed as a **Modular Monolith**, allowing rapid MVP development while maintaining a clean architecture that can scale in the future.

---

# 2. Objectives

## Primary Objectives

- Reduce missed assignment deadlines
- Automatically extract assignment details using AI
- Automatically schedule reminders
- Notify users through multiple channels
- Provide a centralized assignment dashboard

## Future Objectives

- AI study planner
- Calendar integration
- Gmail integration
- OCR for PDFs and Images
- WhatsApp notifications
- Mobile application

---

# 3. High-Level Architecture

```text
                         User
                           │
                           ▼
                 Next.js Web Application
                           │
                    HTTPS REST API
                           │
                           ▼
                  FastAPI Backend
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
 Assignment Module     AI Orchestrator   Notification Module
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                           ▼
                  PostgreSQL (Supabase)
```

---

# 4. System Components

## 4.1 Frontend

### Responsibilities

- User Authentication
- Dashboard
- Assignment Management
- AI Chat Interface
- Notification Preferences
- User Settings

### Technology

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui

---

## 4.2 Backend

### Responsibilities

- Business Logic
- API Layer
- AI Integration
- Reminder Scheduling
- Notification Delivery
- Database Operations

### Technology

- FastAPI
- SQLAlchemy
- Pydantic

---

## 4.3 Database

### Responsibilities

- Store users
- Store assignments
- Store reminder jobs
- Store notification preferences
- Store AI history

### Technology

- PostgreSQL
- Supabase

---

## 4.4 AI Orchestrator

The AI Orchestrator acts as the central layer between the application and AI providers.

### Responsibilities

- Assignment Extraction
- Priority Detection
- Reminder Recommendation
- Announcement Summarization

### Supported Providers

- OpenAI (Initial)
- Ollama (Future)
- Gemini (Future)
- Claude (Future)

---

## 4.5 Notification Module

### Responsibilities

- Browser Notifications
- Email Notifications
- Telegram Notifications

### Future

- WhatsApp
- Mobile Push Notifications
- SMS

---

# 5. Core Modules

```text
Frontend

↓

Authentication

↓

Assignments

↓

AI Orchestrator

↓

Reminder Scheduler

↓

Notification Service

↓

Database
```

---

# 6. Request Flow

## Assignment Creation Flow

```text
User

↓

Paste Assignment Announcement

↓

POST /api/v1/ai/extract

↓

AI Extracts Assignment Information

↓

User Reviews Details

↓

POST /api/v1/assignments

↓

Assignment Saved

↓

Reminder Jobs Generated

↓

Scheduler

↓

Notification Sent
```

---

# 7. Notification Flow

```text
Assignment Created

↓

Reminder Scheduler

↓

Reminder Job

↓

Notification Service

↓

┌─────────────┬──────────────┬─────────────┐
│             │              │
▼             ▼              ▼
Browser      Email       Telegram
```

---

# 8. Folder Structure

```text
DeadlineHubAI/
│
├── backend/
│
├── frontend/
│
├── docs/
│
├── supabase/
│   ├── config.toml
│   ├── migrations/
│   └── seed.sql
│
├── README.md
│
└── .gitignore
```

---

# 9. Backend Structure

```text
backend/
│
├── app/
│
│   ├── routers/
│   │
│   ├── services/
│   │
│   ├── models/
│   │
│   ├── schemas/
│   │
│   ├── database/
│   │
│   ├── scheduler/
│   │
│   ├── prompts/
│   │
│   └── utils/
│
├── tests/
│
├── requirements.txt
│
└── main.py
```

---

# 10. Frontend Structure

```text
frontend/
│
├── app/
│
├── components/
│
├── hooks/
│
├── services/
│
├── types/
│
├── lib/
│
└── public/
```

---

# 11. Architectural Principles

## Modular Monolith

The system is developed as a single deployable application with clearly separated modules.

---

## Separation of Concerns

Each module has a single responsibility.

---

## Service Layer Pattern

Routers contain no business logic.

Business logic belongs inside services.

---

## AI Abstraction

The application never communicates directly with AI providers.

All AI requests pass through the AI Orchestrator.

---

## Database First

Database schema is managed through Supabase migrations.

No production tables should be created manually from the dashboard.

---

## Stateless Backend

All API endpoints remain stateless.

Session information is stored using authentication tokens.

---

## API Versioning

All endpoints follow versioning.

Example:

```
/api/v1/assignments
```

---

# 12. Technology Stack

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui

## Backend

- FastAPI
- SQLAlchemy
- Pydantic

## Database

- PostgreSQL
- Supabase

## AI

- OpenAI API

## Notifications

- Browser Notifications
- SMTP Email
- Telegram Bot API

## Deployment

- Vercel (Frontend)
- Render (Backend)

## Version Control

- Git
- GitHub

---

# 13. Future Expansion

The architecture is designed to support future modules without significant refactoring.

Future modules include:

- Gmail Integration
- Google Calendar Sync
- OCR Pipeline
- WhatsApp Notifications
- Mobile Application
- AI Study Planner
- Analytics Dashboard
- Collaboration Features

---

# 14. Architecture Decisions

| Decision | Reason |
|----------|--------|
| Modular Monolith | Faster MVP development |
| FastAPI | High performance and excellent AI ecosystem |
| Next.js | Modern React framework with excellent DX |
| Supabase | Managed PostgreSQL with authentication and storage |
| AI Orchestrator | Prevents vendor lock-in |
| REST APIs | Simple, widely supported, and easy to document |
| Telegram | Free and simple notification provider for MVP |

---

# 15. MVP Scope

Included in Version 1:

- User Authentication
- Assignment Creation
- AI Assignment Extraction
- Assignment Dashboard
- Reminder Scheduler
- Browser Notifications
- Email Notifications
- Telegram Notifications

Excluded from Version 1:

- WhatsApp Integration
- Mobile App
- OCR
- Gmail Integration
- Google Calendar Integration
- AI Study Planner
- Analytics Dashboard
- Team Collaboration

---

# 16. Next Documents

After completing this document, the following design documents will be created:

1. Database Design
2. API Specification
3. Backend Architecture
4. Frontend Architecture
5. AI Design
6. Notification System
7. Development Roadmap