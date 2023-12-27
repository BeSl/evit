import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { User } from "../models/user";
import ProductsTOP from '../pages/ProductsTOP';
import axios from 'axios';
import { AdverOffer } from '../models/adver';
import {Button} from '@gravity-ui/uikit';
import { DivKit } from '@divkitframework/react';
import '@divkitframework/divkit/dist/client.css';
import { DivJson } from '@divkitframework/divkit/typings/common';

let defaultAdvHeader= {
    "templates": {
        "title": {
            "type": "text",
            "font_size": 20,
            "line_height": 24,
            "paddings": {
                "left": 24,
                "right": 24,
                "bottom": 16
            }
        }
    },
    "card": {
        "log_id": "sample_card",
        "states": [
            {
                "state_id": 0,
                "div": {
                    "type": "container",
                    "items": [
                        {
                            "type": "title",
                            "text": "Text properties"
                        }
                    ]
                }
            }
        ]
    }
};

// defaultAdvHeader = {
//     "templates": {
//         "title": {
//             "type": "text",
//             "font_size": 20,
//             "line_height": 24,
//             "paddings": {
//                 "bottom": 16,
//                 "left": 24,
//                 "right": 24
//             }
//         }
//     },
//     "card": {
//         "log_id": "sample_card",
//         "states": [
//             {
//                 "state_id": 0,
//                 "div": {
//                     "type": "container",
//                     "items": [
//                         {
//                             "type": "title",
//                             "text": "Hello From Back!!!"
//                         }
//                     ]
//                 }
//             }
//         ]
//     }
// };


const Header = (props: { user: User }) => {
    const [offers, setOffers] = useState<AdverOffer[]>([]);
    const [mjson, setTest] = useState<DivJson>(defaultAdvHeader);

    useEffect(() => {
        (
            async () => {
                // const { data } = await axios.get('productstop');
                // setOffers(data.data);

                const { data } = await axios.get('productstest');
                setTest(data as DivJson);
console.log(data)
            }
        )()
    }, []);

    let buttons;
    
    // let json ={
    //     "templates": {
    //         "text_block": {
    //             "type": "text",
    //             "font_size": 14,
    //             "text_alignment_horizontal": "center",
    //             "text_alignment_vertical": "center",
    //             "alignment_horizontal": "center",
    //             "paddings": {
    //                 "top": 4,
    //                 "bottom": 4,
    //                 "left": 8,
    //                 "right": 8
    //             },
    //             "width": {
    //                 "type": "match_parent"
    //             },
    //             "height": {
    //                 "type": "match_parent"
    //             },
    //             "background": [
    //                 {
    //                     "type": "solid",
    //                     "color": "#f1f1f1"
    //                 }
    //             ],
    //             "border": {
    //                 "corner_radius": 16
    //             }
    //         }
    //     },
    //     "card": {
    //         "log_id": "sample_card",
    //         "states": [
    //             {
    //                 "state_id": 0,
    //                 "div": {
    //                     "type": "container",
    //                     "orientation": "vertical",
    //                     "margins": {
    //                         "top": 5,
    //                         "bottom": 5
    //                     },
    //                     "items": [
    //                         {
    //                             "type": "container",
    //                             "items": [
    //                                 {
    //                                     "type": "pager",
    //                                     "id": "pager_with_indicator",
    //                                     "item_spacing": {
    //                                         "type": "fixed",
    //                                         "value": 8
    //                                     },
    //                                     "height": {
    //                                         "type": "fixed",
    //                                         "value": 300
    //                                     },
    //                                     "items": [
    //                                         {
    //                                             "type": "text_block",
    //                                             "height": {
    //                                               "type": "fixed",
    //                                                "value": 300
    //                                             },
    //                                             "background": [
    //                                               {
    //                                                 "type": "image",
    //                                                 "image_url": "http://192.168.1.119:3030/085c4b071cd8.jpg"
    //                                               },
    //                                               {
    //                                                 "type": "gradient",
    //                                                 "colors": [
    //                                                   "#000",
    //                                                   "#0fff"
    //                                                 ],
    //                                                 "angle": 270
    //                                               }
    //                                             ],
    //                                             "text_alignment_vertical": "bottom",
    //                                             "font_size":30,
    //                                             "text_color":"#ffffff",
    //                                             "text": "Gradient and image"
    //                                           },
    //                                         {
    //                                             "type": "text_block",
    //                                             "text": "Item 1"
    //                                         },
    //                                         {
    //                                             "type": "text_block",
    //                                             "text": "Item 2"
    //                                         },
    //                                         {
    //                                             "type": "text_block",
    //                                             "text": "Item 3"
    //                                         },
    //                                         {
    //                                             "type": "text_block",
    //                                             "text": "Item 4"
    //                                         },
    //                                         {
    //                                             "type": "text_block",
    //                                             "text": "Item 5"
    //                                         },
    //                                         {
    //                                             "type": "text_block",
    //                                             "text": "Item 6"
    //                                         },
    //                                         {
    //                                             "type": "text_block",
    //                                             "text": "Item 7"
    //                                         },
    //                                         {
    //                                             "type": "text_block",
    //                                             "text": "Item 8"
    //                                         },
    //                                         {
    //                                             "type": "text_block",
    //                                             "text": "Item 9"
    //                                         },
    //                                         {
    //                                             "type": "text_block",
    //                                             "text": "Item 10"
    //                                         }
    //                                     ],
    //                                     "layout_mode": {
    //                                         "type": "fixed",
    //                                         "neighbour_page_width": {
    //                                             "type": "fixed",
    //                                             "value": 16
    //                                         }
    //                                     },
    //                                     "paddings": {
    //                                         "right": 4,
    //                                         "left": 4
    //                                     }
    //                                 },
    //                                 {
    //                                     "type": "indicator",
    //                                     "active_item_color": "#000000",
    //                                     "active_item_size": 1.5,
    //                                     "height": {
    //                                         "type": "fixed",
    //                                         "value": 10
    //                                     },
    //                                     "margins": {
    //                                         "top": 10,
    //                                         "bottom": 10
    //                                     },
    //                                     "space_between_centers": 10,
    //                                     "inactive_item_color": "#D0D1D9",
    //                                     "pager_id": "pager_with_indicator",
    //                                     "shape": {
    //                                         "type": "rounded_rectangle",
    //                                         "corner_radius": {
    //                                             "type": "fixed",
    //                                             "value": 2
    //                                         },
    //                                         "item_height": {
    //                                             "type": "fixed",
    //                                             "value": 2
    //                                         },
    //                                         "item_width": {
    //                                             "type": "fixed",
    //                                             "value": 10
    //                                         }
    //                                     }
    //                                 }
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             }
    //         ]
    //     }
    // };    

    if (!props.user?.id) {
        buttons = (
            <p>
                <Button view="normal" size="l">Normal</Button>
                <Link to={'/login'} className="btn btn-primary my-2">Войти</Link>
                <Link to={'/register'} className="btn btn-primary my-2">Регистрация</Link>
            </p>
        )
    }

    return (
        <section className="text-center container mx-auto">
            <DivKit id="test" json={mjson}/>;
            <ProductsTOP products={offers} />
        </section>


    );
};

export default connect(
    (state: { user: User }) => ({
        user: state.user
    })
)(Header);
