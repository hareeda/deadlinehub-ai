from fastapi import APIRouter

from app.schemas.assignment import (
    AssignmentCreate,
    AssignmentUpdate
)

from app.services.assignment_service import AssignmentService

router = APIRouter(
    prefix="/assignments",
    tags=["Assignments"]
)


@router.post("/")
def create_assignment(assignment: AssignmentCreate):
    return AssignmentService.create_assignment(assignment)


@router.get("/")
def get_all_assignments():
    return AssignmentService.get_all_assignments()


@router.get("/{assignment_id}")
def get_assignment(assignment_id: str):
    return AssignmentService.get_assignment(assignment_id)


@router.put("/{assignment_id}")
def update_assignment(
    assignment_id: str,
    assignment: AssignmentUpdate
):
    return AssignmentService.update_assignment(
        assignment_id,
        assignment
    )


@router.delete("/{assignment_id}")
def delete_assignment(assignment_id: str):
    return AssignmentService.delete_assignment(
        assignment_id
    )