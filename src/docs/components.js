module.exports = {
    components:{
        schemas:{
            Product:{
                type:'object',
                properties:{
                    _id:{
                        type:'objectId',
                        description:"product identification number",
                        example:"6661a8f7b4e178f524598a06"
                    },
                    name:{
                        type:'string',
                        description:"name of the product",
                        example:"Camiseta North Face"
                    },
                    description:{
                        type:'string',
                        description:"description of the product",
                        example:"Camiseta North Face color beige oversize"
                    },
                    image:{
                        type:'string',
                        description:"image of the product",
                        example:"https://www.bfgcdn.com/1500_1500_90/216-2918/the-north-face-s-s-simple-dome-tee-camiseta-de-manga-corta-detail-2.jpg"
                    },
                    category:{
                        type:'string',
                        description:"category of the product",
                        example:"Camisetas"
                    },
                    size:{
                        type:'string',
                        description:"size of the product",
                        example:"XS"
                    },
                    price:{
                        type:'number',
                        description:"price of the product",
                        example: 40
                    }  
                }
            },
            _id:{
                type:'objectId',
                description:"An id of a product",
                example: "6661a8f7b4e178f524598a06"
            },
            UpdateProduct:{
                type:'object',
                properties:{
                    name:{
                        type:'string',
                        description:"name of the product",
                        example:"Camiseta oversize"
                    },
                    description:{
                        type:'string',
                        description:"description of the product",
                        example:"Camiseta color beige, oversize, de marca"
                    },
                    image:{
                        type:'string',
                        description:"image of the product",
                        example:"https://www.bfgcdn.com/1500_1500_90/216-2918/the-north-face-s-s-simple-dome-tee-camiseta-de-manga-corta-detail-2.jpg"
                    },
                    category:{
                        type:'string',
                        description:"category of the product",
                        example:"Camisetas"
                    },
                    size:{
                        type:'string',
                        description:"size of the product",
                        example:"L"
                    },
                    price:{
                        type:'number',
                        description:"price of the product",
                        example: 40
                    }
                }
            },
        }
    }
};
