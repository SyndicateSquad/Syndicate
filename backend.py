import boto3
from decimal import Decimal
import json
from boto3.dynamodb.conditions import Key
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2AuthorizationCodeBearer
from starlette.requests import Request
from starlette.responses import RedirectResponse
from social_core.utils import slugify

app = FastAPI()
dynamoDB = boto3.resource('dynamodb')
table = dynamoDB.Table('Users')

# try to unify both classes later using Optional[]
class LoginCredential(BaseModel):
    email: str
    password: str

class SignUpCredential(BaseModel):
    phone_number: int
    email: str
    password: str
    repeat_password: str

class DeleteUser(BaseModel):
    email: str
    

@app.post('/login', response_model=bool)
async def receive_data(credential: LoginCredential):
    # Process the data
    print("backedn hit!!")
    query_key = 'Email'  # The key you want to query on
    query_value = credential.email  # The value to query for
    
    key_condition_expression = Key(query_key).eq(query_value)

    # Execute the query
    response = table.query(
        KeyConditionExpression=key_condition_expression
    )

    # Process the results
    if len(response['Items']) > 0:
        if credential.password == response['Items'][0]['Password']:
            return True 
            # return JSONResponse(content=True, status_code=200)
    return False
    # return JSONResponse(content=False, status_code=400)


@app.post('/signup', response_model=bool)
async def signup(credential: SignUpCredential):
    # if credential.password != credential.repeat_password:
    #     return False
    
    # if credential.email.split('@')[-1] not in ['gmail.com', 'yahoo.com', 'hotmail.com', 'icloud.com']:
    #     return False
    
    
    item = {
        'Email': credential.email,
        'Password': credential.password,
        'Phone_Number': credential.phone_number
    }

    try:
        response = table.put_item(Item=item)
    # if email is not unique or some other issue
    except Exception as e:
        print(f'DynamoDb Error: {e}')
        return False
    
    print("Successfully Signed Up!")
    return True
    

@app.post('/delete_user', response_model=bool)
async def delete(user: DeleteUser):
    
    primary_key = {'Email': user.email}
    
    try:
        response = table.delete_item(
            Key = primary_key
        )
    except Exception as e:
        print(f'DynamoDB Error: {e}')    
        return False
    
    return True

    class GoogleOAuth2(OAuth2AuthorizationCodeBearer):
    def __init__(self, authorizationUrl, tokenUrl, clientId, clientSecret, scopes=None):
        self.client_id = clientId
        self.client_secret = clientSecret
        self.authorizationUrl = authorizationUrl
        self.tokenUrl = tokenUrl
        self.scopes = scopes or []

oauth2_scheme = GoogleOAuth2(
    authorizationUrl="Google Authorization URL",
    tokenUrl="Google Token URL",
    clientId="Your Google Client ID",
    clientSecret="Your Google Client Secret",
    scopes=["openid"],
)

@app.get("/login/google")
async def login_google(request: Request):
    redirect_uri = "Your Redirect URI"
    state = slugify("Some Random State String")
    auth_url = oauth2_scheme.get_authorization_url(request, redirect_uri, state)
    return RedirectResponse(url=auth_url)

@app.get("/login/callback")
async def login_callback(
    request: Request, token: str = Depends(oauth2_scheme)
):
    # Handle the callback and obtain user information from Google
    # Use the obtained information to authenticate the user in your system
    # You may need to store user information in your DynamoDB table

    # Example:
    # user_info = get_user_info_from_google(token)
    # authenticate_user_in_your_system(user_info)

    return {"token_type": "bearer", "access_token": token.credentials}