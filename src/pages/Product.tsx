import Slider from '../components/Slider';
import products from '../database/db.json';
import { productDatas } from '../interfaces';
import fullStar from '../assets/star_rate-24px 5.svg'
import emptyStar from '../assets/star_rate-24px 2.svg'
import Layout from './Layout';
import SwitchBar from '../components/SwitchBar';

const Lodging = () => {
    const id = window.location.href.split('/logements/')[1];
    let product!:productDatas;

    for(let i=0; i < products.length; i++) {
        if(products[i].id === id) {
            product = products[i]
        }
    }
    
    return(
        <Layout>
            <section className='product'>
                <Slider images={product.pictures} />
                <div className="productPage__title">
                    <h1>{product.title}</h1>
                    <p>{product.location}</p>
                    {product.tags.map((tag:string,index) => {
                        return(
                            <span key={index} className='tagBox'>{tag}</span>
                        )
                    })}
                </div>
                <div className='productPage__rating'>
                    <div>
                    {[...Array(parseInt(product.rating))].map((data,index) => {
                        return(
                            <img key={index} src={fullStar} alt='' className='star' />
                        )})}
                    {[...Array(5 - parseInt(product.rating))].map((data,index) => {
                        return(
                            <img key={index} src={emptyStar} alt='' className='star' />
                        )})}
                    </div>
                    <div className="host">
                        <span>{product.host.name}</span>
                        <img src={product.host.picture} alt={product.host.name} />
                    </div>
                </div>
                <div className="standard-box">
                    <SwitchBar title='Description' />
                    <p className='box'>{product.description}</p>
                </div>
                <div className="standard-box">
                    <SwitchBar title='Équipements' />
                    <ul className='equipments__list box'>{
                    product.equipments.map((equipment:string,index) => {
                        return(
                            <li key={index}>{equipment}</li>
                        )
                    })}
                    </ul>
                </div>
            </section>
        </Layout>
    )
}


export default Lodging