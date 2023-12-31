# Importing AWS SDK for Python and other helper libraries
import os
import boto3
import json
from random import randint
from decimal import Decimal
from boto3.dynamodb.conditions import Key
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from botocore.exceptions import NoCredentialsError, ClientError


app = FastAPI()

origins = [
    "http://10.182.149.211:8000",
    "https://10.182.149.211:8000",
    "exp://10.182.149.211:8000",  # This is for Expo
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Keeping resources ready for use inside FastAPI functions
dynamoDB = boto3.resource('dynamodb')
s3 = boto3.client('s3')



# Defining Classes for proper reading of JSON input from incoming React Native requests
class LoginCredential(BaseModel):
    email: str
    password: str

class SignUpCredential(BaseModel):
    email: str
    password: str
    firstName: str
    lastName: str
    city: str
    state: str
    zipCode: int
    country: str
    phone_number: int
    bio: str
    user_type: str

class UserEmail(BaseModel):
    email: str
    

# Verify Login Credential Validity
@app.post('/login')
async def receive_data(credential: LoginCredential):
    
    # Process the data
    table = dynamoDB.Table('Users')

    query_key = 'email'
    query_value = credential.email  
    
    key_condition_expression = Key(query_key).eq(query_value)

    # Execute the query
    response = table.query(
        KeyConditionExpression=key_condition_expression
    )

    # Process the results to check for password 
    if len(response['Items']) > 0:
        if credential.password == response['Items'][0]['password']:
            return JSONResponse(content=True, status_code=200)

    return JSONResponse(content=False, status_code=400)



# Add Sign Up details to DynamoDB
@app.post('/signup')
async def signup(credential: SignUpCredential):

    table = dynamoDB.Table('Users')

    item = {
        'email': credential.email, #already applied toLower() in frontend
        'password': credential.password,
        'firstname': credential.firstName,
        'lastname': credential.lastName,
        'city': credential.city,
        'state': credential.state,
        'zipcode': credential.zipCode,
        'country': credential.country,
        'phone': credential.phone_number,
        'bio': credential.bio,
        'Type': credential.user_type
    }

    try:
        # Only put item into table if the partition (primary) does not already have an associated entry
        response = table.put_item(Item=item)

    except Exception as e:
        return JSONResponse(content= str(e), status_code=400)

    return JSONResponse(content= "Successfully Signed Up!", status_code= 200)
    

# Check if Email already exists in `Users` table
@app.post('/verify_email_dne')
def verify_email_dne(user: UserEmail):
    
    table = dynamoDB.Table('Users')
    
    item = {'email': user.email}
    
    try:
        response = table.put_item(Item=item, ConditionExpression= 'attribute_not_exists(email)')
    except Exception as e:
        if "ConditionalCheckFailedException" in str(e):
            return JSONResponse(content= "Email already exists, navigate to sign in", status_code=400)
        else:
            return JSONResponse(content= str(e), status_code=400)
        
    return JSONResponse(content= "Email does not exist in records", status_code=200)


# Handle Delete User Request
@app.post('/delete_user')
async def delete(user: UserEmail):
    
    primary_key = {'email': user.email}
    
    try:
        response = table.delete_item(
            Key = primary_key
        )
    except Exception as e:
        print(f'DynamoDB Error: {e}')    
        return JSONResponse(content=False, status_code=400)
    
    return JSONResponse(content)

# Generate Confirmation Code during Sign Up/ Forgot Password
@app.post('/confirmation_code')
async def generate_confirmation_code(user: UserEmail):
    
    with open("confirmation_email.html", 'r') as html:
        confirmation_email_content = html.read()

    CONFIRMATION_CODE = randint(12345, 98765)

    # Substitute in the actual confirmation code into the HTML file
    confirmation_email_content = confirmation_email_content.replace("{{CONFIRMATION_CODE}}", str(CONFIRMATION_CODE))

    message = Mail(
        from_email= 'syndicatesquad9@gmail.com',
        to_emails= user.email,
        subject= 'Syndicate - Confirmation Email',
        html_content= confirmation_email_content)

    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)

    except Exception as e:
        return JSONResponse(content=f'Error: {e}', status_code=400)
    
    return JSONResponse(content= str(CONFIRMATION_CODE), status_code=200)


@app.post('/uploadToDeveloper')
async def upload_to_s3(user_email: str, file: UploadFile = File(...)):
    try:
        bucket_name = 'developerimages'
        response = upload_to_user_folder(bucket_name, user_email, file.file, file.filename, file.content_type)
        return JSONResponse(content={"message": response})
    except NoCredentialsError:
        raise HTTPException(status_code=401, detail='AWS credentials not found or invalid')
    except ClientError as e:
        raise HTTPException(status_code=400, detail=f'AWS Client Error: {e}')
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Server Error: {e}')

# @app.post('/uploadToInvestor')
# async def upload_to_s3(file: UploadFile = File(...)):
#     try:
#         bucket_name = 'investorimages'
#         s3.Bucket(bucket_name).upload_fileobj(
#             file.file,
#             file.filename,
#             ExtraArgs={"ContentType": file.content_type}
#         )
#         return JSONResponse(content={"message": "Successfully uploaded"})
#     except NoCredentialsError:
#         raise HTTPException(status_code=401, detail='AWS credentials not found or invalid')
#     except ClientError as e:
#         raise HTTPException(status_code=400, detail=f'AWS Client Error: {e}')
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f'Server Error: {e}')

def folder_exists(bucket_name, folder_name):
    response = s3.list_objects_v2(Bucket=bucket_name, Prefix=folder_name)
    return 'Contents' in response

def upload_to_user_folder(bucket_name, user_email, file_obj, file_name, content_type):
    folder_name = user_email + '/'  # Folder name is the user's email

    if not folder_exists(bucket_name, folder_name):
        print(f"Creating folder for {user_email}")

    full_file_path = f"{folder_name}{file_name}"
    try:
        s3.upload_fileobj(
            file_obj,
            bucket_name,
            full_file_path,
            ExtraArgs={"ContentType": content_type}
        )
        return "File uploaded successfully."
    except Exception as e:
        return str(e)
# # Receive the Investor's (User's) email id, get the preferences, sort ALL property listings based on preferences, return order of properties by ID
# @app.post('/property_swipe_list')
# async def get_property_swipe_list(investor: UserEmail):

#     # get minimum investment preference of the investor
#     key_condition_expression = Key('Email').eq(email)
#     table = dynamoDB.Table('Investor')
#     response = table.query(
#         KeyConditionExpression=key_condition_expression
#     )
#     min_investment = response['Items'][0]['Min_Investment']

#     # sort property listings by min investment asc and return 