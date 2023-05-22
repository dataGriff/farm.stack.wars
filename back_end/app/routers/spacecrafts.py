from fastapi import APIRouter, Request, Body, status, HTTPException, Response
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from ..models import SpaceCraft

router = APIRouter()

collection = "spacecrafts"

@router.get("/", response_description="List all spacecrafts")
async def get_spacecrafts(request: Request, number_spacecrafts: int = 5
                          , fictional_source: str | None = None):
    """Gets the spacecrafts from the database

    Args:
        request (Request): The incoming request.
        number_spacecrafts (int, optional): Number of spacecrafts to return. Defaults to 5.

    Returns:
        array: Array of spacecraft objects
    """
    spacecrafts = []
    query = ""
    if fictional_source is not None:
        query =  { "fictional_source": fictional_source }
    for spacecraft in await request.app.mongodb[collection].find(query).to_list(number_spacecrafts):
        spacecrafts.append(spacecraft)
    return JSONResponse(status_code=status.HTTP_200_OK, content=spacecrafts)

@router.post("/", response_description="Add new spacecraft")
async def create_spacecraft(request: Request, spacecraft: SpaceCraft = Body(
    examples={
            "standard": {
                "summary": "Standard Example",
                "description": "A **standard** item works correctly.",
                "value": {
                    "name": "Serenity",
                    "fictional_source": "Firefly"
                },
            },
    }
)):
    """Creates a new spacecraft

    Args:
        request (Request): The incoming request
        spacecraft (_type_, optional): The spacecraft to create.

    Returns:
        string: ID of newly created spacecraft
    """
    spacecraft = jsonable_encoder(spacecraft)
    new_spacecraft = await request.app.mongodb[collection].insert_one(spacecraft)
    new_id = new_spacecraft.inserted_id
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=new_id)

@router.get("/{id}", response_description="Get a single spacecraft")
async def get_spacecraft(id: str, request: Request):
    """Gets a spacecraft of the given identifier

    Args:
        id (str): ID that identifies the spacecraft
        request (Request): The incoming request

    Raises:
        HTTPException: 404 if spacecraft not found

    Returns:
        SpaeCraft: A specific spacecraft object
    """
    if (spacecraft := await request.app.mongodb["spacecrafts"].find_one({"_id": id})) is not None:
        return SpaceCraft(**spacecraft)
    raise HTTPException(status_code=404, detail=f"Spacecraft with {id} not found")

@router.delete("/{id}", response_description="Delete spacecraft")
async def delete_spacecraft(
    id: str, request: Request
):
    """_summary_

    Args:
        id (str): ID of spacecraft to delete
        request (Request): The incoming request

    Raises:
        HTTPException: 404 if spacecraft not found

    Returns:
        Response: 204 if spacecraft deleted
    """

    delete_result = await request.app.mongodb[collection].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Spacecraft with {id} not found")