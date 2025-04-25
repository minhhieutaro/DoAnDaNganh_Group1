from fastapi import APIRouter, Request
from model import login_info

router = APIRouter(prefix="/login", tags=["Login"])

@router.get("/")
def get_login_status():
    return {"status": "login is working"}

@router.post("/authentication")
async def check_authentication(request : Request, data: login_info ):
    try:
        username = data.username
        password = data.password
        supabase = request.app.state.db
        result = supabase.table("users").select("*")\
                .eq("username", username)\
                .eq("pass", password)\
                .execute()

        if result.data != []:
            return {"message": "Login successful", "user": result.data[0]}
        else:
            return {"message": "Invalid username or password"}
    except Exception as e:
        return {"error": str(e)}

# @router.get("/items/")
# def read_items(request: Request):
#     cursor = request.app.state.db.cursor()
#     cursor.execute("SELECT * FROM items")
#     results = cursor.fetchall()
#     cursor.close()
#     return results