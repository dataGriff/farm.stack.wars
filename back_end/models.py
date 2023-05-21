from pydantic import BaseModel, Field

class SpaceCraft(BaseModel):
    """This is a spacecraft

    Args:
        BaseModel (BaseModel): This is a pydantic base model
    """
    id: int = Field(example=1, description="This is the id of the spacecraft",default=1)
    name: str = Field(example="Serenity"
                      ,description="This is the name of the spacecraft")
    fictional_source: str = Field(example="Firefly"
                        ,description="This is fictional source of the spacecraft")

    