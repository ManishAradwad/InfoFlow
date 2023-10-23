from llama_index import VectorStoreIndex, SimpleDirectoryReader

documents = SimpleDirectoryReader('output_pdf').load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()
response = query_engine.query("How to use parametrized type and functions in Mojo?")
print(response)
