from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel


class AssignmentStatus(str, Enum):
    TODO = "Todo"
    IN_PROGRESS = "In Progress"
    SUBMITTED = "Submitted"
    COMPLETED = "Completed"


class AssignmentCreate(BaseModel):
    title: str
    subject: str
    description: Optional[str] = None
    due_date: datetime
    platform: Optional[str] = None
    priority: Optional[str] = "Medium"
    status: AssignmentStatus = AssignmentStatus.TODO


class AssignmentUpdate(BaseModel):
    title: Optional[str] = None
    subject: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    platform: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[AssignmentStatus] = None


class AssignmentResponse(BaseModel):
    id: str
    title: str
    subject: str
    description: Optional[str]
    due_date: datetime
    platform: Optional[str]
    priority: str
    status: AssignmentStatus