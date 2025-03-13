/**
 * <h1>{@link DataTypes}</h1>
 */
export var DataTypes;
(function (DataTypes) {
    DataTypes[DataTypes["FAISS"] = 0] = "FAISS";
    DataTypes[DataTypes["MILVUS"] = 1] = "MILVUS";
    DataTypes[DataTypes["PINECONE"] = 2] = "PINECONE";
    DataTypes[DataTypes["WEAVIATE"] = 3] = "WEAVIATE";
    DataTypes[DataTypes["QDRANT"] = 4] = "QDRANT";
    DataTypes[DataTypes["REDIS_VECTOR"] = 5] = "REDIS_VECTOR";
    DataTypes[DataTypes["NEO4J"] = 6] = "NEO4J";
    DataTypes[DataTypes["POSTGRESQL_VECTOR"] = 7] = "POSTGRESQL_VECTOR";
    DataTypes[DataTypes["H_2"] = 8] = "H_2";
})(DataTypes || (DataTypes = {}));
//# sourceMappingURL=data-types.js.map