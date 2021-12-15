import React from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { selectCollection } from '../../redux/shop/shop.selector'

import './collection.styles.scss'
import CollectionItem from '../../components/collection-item/collection-item.component'

const CollectionPage = () => {
    let params = useParams();

    const collection = useSelector(state => selectCollection(params.categoryId)(state));
    
    const { title, items } = collection;

    return (
        <div className="collection-page">
            <h2 className="title">{ title }</h2>
            <div className="items">
                {
                    items.map( item => 
                        (<CollectionItem key={item.id} item={item} />) 
                    )
                }
            </div>
        </div>
    )
}

// const mapStateToProps = (reducer, ownProps) => {
//     console.log(ownProps)
//     let params = useParams();
//     console.log(params);
//     // console.log(reducer);
//     return (
//         {
//             collection: 'hats'
//         // selectCollection(ownProps.collection)
//         }
//     )
// }

export default CollectionPage
