import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from random import randint

with open("confirmation_email.html", 'r') as html:
    confirmation_code_content = html.read()

# api key deleted 
SENDGRID_API_KEY = "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"
CONFIRMATION_CODE = randint(12345, 98765)

confirmation_code_content = confirmation_code_content.replace("{{CONFIRMATION_CODE}}", str(CONFIRMATION_CODE))

message = Mail(
    from_email= 'syndicatesquad9@gmail.com',
    to_emails= 'pranav_pujar@hotmail.com',
    subject= 'Sending an email with Twilio SendGrid',
    html_content= confirmation_code_content)
try:
    sg = SendGridAPIClient(SENDGRID_API_KEY)
    response = sg.send(message)
    print(response.status_code)
    print(response.body)
    print(response.headers)
except Exception as e:
    print(e)