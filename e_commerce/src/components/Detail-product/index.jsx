import React from "react"

const ProductContent = ({product})=>{

    const BASE_URL_IMG = 'http://localhost:3090/'
    const URL_IMG = `${BASE_URL_IMG}${product.productImage}`

    return(
        <div>
            <h1 className="titre_detail_product">{product.name}</h1>
            <div className="border_img_detail">
            <img className="img_detail_product" alt="Product image" src={URL_IMG}/>
            <h2 className="price_detail_product">Prix : {product.price}€ </h2> 
            <div className="descrption_product">
            <h3 className="title_description_product">Description :</h3>
            <p className="text_description_product">{product.description}</p>
            </div>
            <div className="feature_product">
            <h3 className="title_feature_product">Caractéristiques :</h3>
            <p className="text_feature_product">{product.feature}</p>
            </div>
            </div>
            
            
        </div>
    )
}

export default ProductContent