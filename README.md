# InfoFlow - Interactive Documentation Tool

InfoFlow is an innovative online tool that empowers users to interact with online documentation like never before. It combines PDF parsing capabilities with LLAMAINDEX integration to create an interactive and user-friendly experience for accessing and extracting information from documents.

## Features

- **PDF Parsing**: Effortlessly extract text and data from PDF documents hosted on websites.
- **LLAMAINDEX Integration**: Seamlessly connect parsed data to LLAMAINDEX for robust indexing and retrieval capabilities.
- **Interactive Chat Interface**: Engage with your documentation using a chat-style interface, making it easy to search, ask questions, and retrieve information.
- **User-Friendly Experience**: Intuitive and dynamic web interface for a smooth user experience.
- **Scalability**: Designed to scale with your growing documentation needs.

## Getting Started

To get started with DocuChat Pro, follow these steps:

1. Clone this repository.
2. Set up the necessary environment and dependencies.
3. Configure LLAMAINDEX integration with your API keys.
4. Deploy the tool on your web server or cloud platform.
5. Begin interacting with your online documentation with ease.

## Usage

Once InfoFlow is up and running, users can:

- Search for specific content within the documentation hosted as a website.
- Ask questions and receive answers based on indexed information.
- Explore, browse, and retrieve data in a conversational and intuitive manner.

## To do:

- [x] Parse each page of website to the pdf.
   - ~~Use pdfkit to parse the pdfs~~ pdfkit can only parse simpler websites, doesn't go well with modern websites
   - Use puppeteer to parse the websites with CSS/JS

- [x] Use llamaindex to attach this pdf as a data source to a LLM

## License

This project is licensed under the [Apache License]


---
