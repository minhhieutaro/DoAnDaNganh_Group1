from fastapi import APIRouter, Request
from model import login_info

router = APIRouter(prefix="/login", tags=["Login"])

@router.get("/")
def get_login_status():
    return {"status": "login is working"}

@router.post("/authentication")
async def turn_off_fan(request : Request, data: login_info ):
    try:
        username = data.username
        password = data.password
        cursor = request.app.state.db.cursor()
        query = "SELECT * FROM users WHERE username = %s AND pass = %s"
        cursor.execute(query, (username, password))
        result = cursor.fetchone()
        cursor.close()

        if result:
            return {"message": "Login successful", "user": result}
        else:
            return {"message": "Invalid username or password"}
    except Exception as e:
        return {"error": str(e)}

@router.get("/items/")
def read_items(request: Request):
    cursor = request.app.state.db.cursor()
    cursor.execute("SELECT * FROM items")
    results = cursor.fetchall()
    cursor.close()
    return results
