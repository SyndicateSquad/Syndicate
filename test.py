import boto3
from boto3.dynamodb.conditions import Key


dynamoDB = boto3.resource('dynamodb')
table = dynamoDB.Table('Investor')
response = table.query(
    KeyConditionExpression=key_condition_expression
)

return response['Items'][0]


def get_property_swipe_list(email):

    key_condition_expression = Key('Email').eq(email)

    # Execute the query
    table = dynamoDB.Table('Investor')
    response = table.query(
        KeyConditionExpression=key_condition_expression
    )

    # return response['Items'][0]['Min_Investment']
    return response['Items'][0]

ret = get_property_swipe_list('abc@gmail.com')
print(ret)
