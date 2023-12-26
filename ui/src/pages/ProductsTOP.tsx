import { AdverOffer } from "../models/adver";
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

const ProductsTOP = (props :{
        products: AdverOffer[]}) => {
    return (
        <Carousel data-bs-theme="dark">
            {props.products.map(product => {
                return (
                <Carousel.Item>
                    <Image
                        className="d-block w-100"
                        src={product.bannerimage}
                        
                        fluid />
                    <Carousel.Caption>
                        <p>{product.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                )
            })}
        </Carousel>
    );
};

export default ProductsTOP;

