from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2AuthorizationCodeBearer
from starlette.requests import Request
from starlette.responses import RedirectResponse
from social_core.utils import slugify

app = FastAPI()

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
