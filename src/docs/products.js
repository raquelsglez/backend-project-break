module.exports = {
    paths: {
      "/api/products/": {
        get: {
          tags: {
            Products: "Get all products",
          },
          description: "Get all Products",
          operationId: "getAllProducts",
          parameters: [],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
          responses: {
            200: {
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/Product",
                            }
                        },
                    },
                },
            },
            500: {
              description: "Server error",
            },
          },
        },
        post: {
            tags: {
              Products: "Create a product",
            },
            description: "Create Product",
            operationId: "createProduct",
            parameters: [],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Product",
                  },
                },
              },
            },
            responses: {
              201: {
                description: "Product successfully created",
                content: {
                  "application/json": {
                      schema: {
                          $ref: "#/components/schemas/Product",                          
                      },
                  },
              },
              },
              500: {
                description: "There was a problem trying to create a product",
              },
            },
        },
      },

      "/api/products/{productId}": {
        get: {
          tags: {
            Products: "Get a product",
          },
          description: "Get a Product",
          operationId: "GetOneProduct",
          parameters: [
            {
                name: "productId",
                in: "path",
                schema: {
                  $ref: "#/components/schemas/productId",
                },
                description: "Id of Product to be obtained",
            },
          ],
          requestBody: {},
          responses: {
            200: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Product",                          
                        },
                    },
                },
            },
            500: {
              description: "Server error",
            },
          },
        },
        put: {
          tags: {
            Products: "Update product",
          },
          description: "Update a Product",
          operationId: "updateProduct",
          parameters: [
            {
                name: "productId",
                in: "path",
                schema: {
                  $ref: "#/components/schemas/productId",
                },
                description: "Id of Product to be obtained",
              },
    
          ],
          requestBody: {
            content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/UpdateProduct" },
                },
              },    
          },
          responses: {
            200: {
                description: "product successfully updated",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Product",                          
                        },
                    },
                },
            },
            500: {
              description: "Server error",
            },
          },
        },
        delete: {
            tags: {
              Produts: "Delete product",
            },
            description: "Delete a Product",
            operationId: "deleteProduct",
            parameters: [
              {
                  name: "productId",
                  in: "path",
                  schema: {
                    $ref: "#/components/schemas/productId",
                  },
                  description: "Id of Product to be deleted",
                },
      
            ],
            requestBody: {},
            responses: {
              200: {
                  description: "product deleted",
                  content: {
                      "application/json": {
                          schema: {
                              $ref: "#/components/schemas/Product",                          
                          },
                      },
                  },
              },
              500: {
                description: "There was a problem trying to delete a product",
              },
            },
        },
      },
    },
};
