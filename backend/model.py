from pydantic import BaseModel, Field
from enum import Enum
from decimal import Decimal
from datetime import datetime
from typing import List, Optional

class Config:
        # Allow None for any fields that are optional
        orm_mode = True
        anystr_strip_whitespace = True

class login_info(BaseModel):
    username: str = Field(..., min_length=1, max_length= 200) 
    password: str = Field(..., min_length=1, max_length= 255) 

# Pydantic model to validate input
class FanSpeed(BaseModel):
    speed: int = Field(..., ge=0, le=100, description="Fan speed from 0 (off) to 100 (max)")