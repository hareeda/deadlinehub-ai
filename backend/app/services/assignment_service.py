from fastapi import HTTPException
from app.database.supabase import supabase
from app.schemas.assignment import AssignmentCreate, AssignmentUpdate


class AssignmentService:

    @staticmethod
    def create_assignment(assignment: AssignmentCreate):
        try:
            data = assignment.model_dump(mode="json")

            response = (
                supabase
                .table("assignments")
                .insert(data)
                .execute()
            )

            return response.data

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to create assignment: {str(e)}"
            )

    @staticmethod
    def get_all_assignments():

        try:
            response = (
                supabase
                .table("assignments")
                .select("*")
                .order("due_date")
                .execute()
            )

            return response.data

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=str(e)
            )

    @staticmethod
    def get_assignment(assignment_id: str):

        try:
            response = (
                supabase
                .table("assignments")
                .select("*")
                .eq("id", assignment_id)
                .execute()
            )

            if not response.data:
                raise HTTPException(
                    status_code=404,
                    detail="Assignment not found"
                )

            return response.data[0]

        except HTTPException:
            raise

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=str(e)
            )

    @staticmethod
    def update_assignment(
        assignment_id: str,
        assignment: AssignmentUpdate
    ):

        try:

            data = assignment.model_dump(
                exclude_none=True,
                mode="json"
            )

            response = (
                supabase
                .table("assignments")
                .update(data)
                .eq("id", assignment_id)
                .execute()
            )

            if not response.data:
                raise HTTPException(
                    status_code=404,
                    detail="Assignment not found"
                )

            return response.data[0]

        except HTTPException:
            raise

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=str(e)
            )

    @staticmethod
    def delete_assignment(assignment_id: str):

        try:

            response = (
                supabase
                .table("assignments")
                .delete()
                .eq("id", assignment_id)
                .execute()
            )

            if not response.data:
                raise HTTPException(
                    status_code=404,
                    detail="Assignment not found"
                )

            return {
                "message": "Assignment deleted successfully"
            }

        except HTTPException:
            raise

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=str(e)
            )