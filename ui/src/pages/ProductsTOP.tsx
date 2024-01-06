import { AdverOffer } from "../models/adver";
import Image from 'react-bootstrap/Image';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };


const ProductsTOP = (props :{
        products: AdverOffer[]}) => {
    return (
        <Carousel autoplay>
            {props.products.map(product => {
                return (
                <div>
                    <p style={contentStyle}>{product.description}</p>
                    {/* <Image h-160
                        className="d-block"
                        src={product.bannerimage}                        
                        fluid /> */}
                </div>
                )
            })}
        </Carousel>
    );
};

export default ProductsTOP;

