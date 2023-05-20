from models import SpaceCraft
from fastapi import FastAPI, status, Response, Body

app = FastAPI()
spacecrafts = []

@app.get("/")
async def root():
    """Welcomes you to the hungover coders spacecraft API

    Returns:
        string: Welcome message
    """
    return "Welcome to the hungovercoders spacecraft API!"

@app.post("/spacecrafts")
async def create_spaceraft(response: Response, spacecraft: SpaceCraft= Body()):
    response.status_code=status.HTTP_204_NO_CONTENT
    if spacecrafts.append(spacecraft) is True:
        content = f'Spacecraft "{spacecraft.name}" Added.'
        response.status_code=status.HTTP_201_CREATED
        return content

@app.get("/spacecrafts")
async def get_spacecrafts(response: Response, name: str | None = None
                          , fictional_source: str | None = None):
    """Returns example spacecraft

    Returns:
        SpaceCraft: Returns spacecrafts
    """
    
    if (name is None) & (fictional_source is None):
        response.status_code=status.HTTP_200_OK
        return spacecrafts
    
    found_spacecrafts = []
    for spacecraft in spacecrafts:
        if name is not None:
            if  spacecraft.name.lower() == name.lower():
                response.status_code=status.HTTP_200_OK
                return spacecraft
        if fictional_source is not None:
            if spacecraft.fictional_source.lower() == fictional_source.lower():
                found_spacecrafts.append(spacecraft)

    if len(found_spacecrafts) > 0:
        response.status_code=status.HTTP_200_OK
        return found_spacecrafts



@app.get("/spacecrafts/{id}/")
async def get_spacecraft(response: Response, id: int):
    for spacecraft in spacecrafts:
        if spacecraft.id == id:
            response.status_code=status.HTTP_200_OK
            return spacecraft

@app.delete("/spacecrafts/{id}/")
async def delete_spacecraft(response: Response, id: int):
    response.status_code=status.HTTP_204_NO_CONTENT
    for spacecraft in spacecrafts:
        if spacecraft.id == id:
            spacecrafts.remove(spacecraft)
            content = f'Spacecraft "{spacecraft.name}" removed.'
            response.status_code=status.HTTP_200_OK
        return content
