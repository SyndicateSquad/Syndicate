# Developer
# Email PRIMARY KEY str
# Name str
# Password str
# Description varchar 100 (why i want to invest)
# Location (N,  S)
# Social Media (list(linkedin, instagram))

# Preferences (distance from property/investor (calculated using Py), investment amount min)

# Swipes (set[PROPERTY ID])
# /
# Properties (list[PROPERTY ID])

# functions to implement:
# 1. get property list that match investor preferences
# 2. get investors that match property preferences
# 3. get relevant investor/property & developer data for swipe
# 4. get relevant investor/property & developer data for chat
# 5. add investor swipe to property
# 6. add property swipe to investor

# for the photos, just add them in AWS bucket with name = email

# Property
# Property ID (generate)
# Property Name
# Preferences (investment amnt min, distance from property) - every property will have separate matches and chats
# Swipes (list[INVESTORS])
# Developer email of property

file = open('abc.txt', 'r')

newline_count = upper_count = 0

for line in file.readlines():
    if line[-1] == '\n':
        newline_count += 1
    for char in line:
        if char.isupper():
            upper_count += 1

file.close()
print(f"Newline Count: {newline_count}, Upper Count {upper_count}")


# when investor swipes on property, we check if that developer's property owner has swiped on the investor
# if yes, match
# if no, add to property's matches list

# developer chooses one of their property listings, and then proceeds to tinder-like site
# when property (of developer) swipes on investor, we check if that investor has swiped on that property
# if yes, match
# if no, add to investor's matches list

# investors matches has properties, we can get property owner from that
# properties matches has investors, and developers can access all of their property information

# items_to_insert = [
#     {
#         'Email': 'johndoe@example.com',
#         'Name': 'John Doe',
#         'Password': 'password123',
#         'Description': 'A real estate enthusiast, looking for small-scale investment opportunities!',
#         'Preferences': ['50 miles', 'Small', 'Residential House'],
#         'Location': [32.7767, -96.7970],
#         'Social_Media': ['https://www.linkedin.com/in/johndoe/', '@johndoe_instagram'],
#         'Property_Listings': [1, 2],
#     },
#     {
#         'Email': 'alice@example.com',
#         'Name': 'Alice Smith',
#         'Password': 'securepwd321',
#         'Description': 'A property investor looking for new opportunities',
#         'Preferences': ['10 miles', 'S', 'RA'],
#         'Location': [Decimal('32.7555'), Decimal('-97.3308')],
#         'Social_Media': ['https://www.linkedin.com/in/alice_smith/', '@alice_instagram'],
#         'Property_Listings': [3],
#     },
#     {
#         'Email': 'mark@example.com',
#         'Name': 'Mark Johnson',
#         'Password': 'mysecretpass',
#         'Description': 'A first-time homebuyer with a budget',
#         'Preferences': ['3 miles', 'S', 'RH'],
#         'Location': [Decimal('32.5949'), Decimal('-96.9529')],
#         'Social_Media': ['https://www.linkedin.com/in/mark_johnson/', '@mark_instagram'],
#         'Property_Listings': [4, 5, 6],
#     },
#     {
#         'Email': 'emily@example.com',
#         'Name': 'Emily Davis',
#         'Password': 'emilyspass',
#         'Description': 'Experienced realtor specializing in commercial properties',
#         'Preferences': ['7 miles', 'C', 'C'],
#         'Location': [Decimal('32.9866'), Decimal('-96.8236')],
#         'Social_Media': ['https://www.linkedin.com/in/emily_davis/', '@emily_instagram']
#     },
#     {
#         'Email': 'sam@example.com',
#         'Name': 'Sam Green',
#         'Password': 'sampassword123',
#         'Description': 'Seeking an industrial space for a new venture',
#         'Preferences': ['15 miles', 'C', 'I'],
#         'Location': [Decimal('32.8364'), Decimal('-97.1457')],
#         'Social_Media': ['https://www.linkedin.com/in/sam_green/', '@sam_instagram']
#     }
# ]

# with table.batch_writer() as batch:
#     for item in items_to_insert:
#         batch.put_item(Item=item)
