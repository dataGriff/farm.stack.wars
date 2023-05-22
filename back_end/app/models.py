from bson import ObjectId
from pydantic import Field, BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum

class FictionalSource(str, Enum):
    """This is the fictional source of the spacecraft

    Args:
        str (_type_): _description_
        Enum (_type_): _description_
    """
    ALIEN = "Alien"
    ALIENS = "Aliens"
    ALIEN3 = "Alien3"
    ALIEN_RESURRECTION = "Alien: Resurrection"
    PROMETHEUS = "Prometheus"
    ALIEN_COVENANT = "Alien: Covenant"
    STAR_WARS = "Star Wars"
    STAR_TREK = "Star Trek"
    FIREFLY = "Firefly"
    STARGATE = "Stargate"
    BATTLESTAR_GALACTICA = "Battlestar Galactica"
    DOCTORWHO = "Doctor Who"
    FUTURAMA = "Futurama"
    HITCHHIKERS_GUIDE_TO_THE_GALAXY = "Hitchhiker's Guide to the Galaxy"
    LOST_IN_SPACE = "Lost in Space"
    SPACE1999 = "Space: 1999"
    THUNDERBIRDS = "Thunderbirds"
    EXPANSE = "Expanse"
    SPACEBALLS = "Spaceballs"
    OTHER = "Other"

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class MongoBaseModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    last_updated: Optional[datetime] = Field(default_factory=datetime.utcnow)
    class Config:
        json_encoders = {ObjectId: str}
        
class SpaceCraft(MongoBaseModel):
    """This is a spacecraft

    Args:
        MongoBaseModel (MongoBaseModel): This is a pydantic base model 
        with an id field and last updated field
    """
    name: str = Field(example="Serenity"
                      ,description="This is the name of the spacecraft")
    fictional_source: FictionalSource = Field(default=None
                                    ,example="Firefly"
                                    ,description="This is the fictional source of the spacecraft")