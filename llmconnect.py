import requests

# Replace these with your LLAMAINDEX API details
LLAMAINDEX_API_BASE_URL = 'https://api.llamaindex.com'
# LLAMAINDEX_API_KEY = 
# LLAMAINDEX_INDEX_ID = 

# Define the URL of the parsed PDF file
parsed_pdf_url = 'https://example.com/parsed.pdf'

# Data to send to LLAMAINDEX
data = {
    'parsed_pdf_url': parsed_pdf_url,
    # Add other relevant data fields here
}

# Define the LLAMAINDEX endpoint for adding data
add_data_endpoint = f'{LLAMAINDEX_API_BASE_URL}/index/{LLAMAINDEX_INDEX_ID}/add_data'

# Set the API headers, including the API key
headers = {
    'Authorization': f'Bearer {LLAMAINDEX_API_KEY}',
    'Content-Type': 'application/json',
}

# Send a POST request to LLAMAINDEX to add the data
response = requests.post(add_data_endpoint, json=data, headers=headers)

if response.status_code == 200:
    print('Data added to LLAMAINDEX successfully')
else:
    print(f'Failed to add data to LLAMAINDEX. Status Code: {response.status_code}')
    print(response.text)
