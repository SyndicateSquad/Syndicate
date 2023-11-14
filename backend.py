# Importing AWS SDK for Python and other helper libraries

import boto3
from decimal import Decimal
import json
from boto3.dynamodb.conditions import Key
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import JSONResponse


app = FastAPI()
dynamoDB = boto3.resource('dynamodb')
table = dynamoDB.Table('Users')



class LoginCredential(BaseModel):
    email: str
    password: str

# Check for login credential validity
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



class SignUpCredential(BaseModel):
    phone_number: int
    email: str
    password: str
    repeat_password: str

# Add Sign Up details to DynamoDB
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
    


class DeleteUser(BaseModel):
    email: str
    
# Handle Delete User Request
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