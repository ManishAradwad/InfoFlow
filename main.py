from llama_index import VectorStoreIndex, SimpleDirectoryReader

print("Loading website...")
documents = SimpleDirectoryReader('output_pdf').load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()
print("Done!")

while True:
    print("=====================================")
    user_input = input("\nEnter your query or Enter 'q' to quit: ")
    if user_input == 'q' or user_input == '':
        print("\nBye!")
        break
    response = query_engine.query(user_input)
    print("\n", response)
    