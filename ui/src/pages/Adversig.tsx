import React , { useEffect, useState } from 'react';
import LayoutM from '../components/Layout';
import { DivKit } from '@divkitframework/react';
import '@divkitframework/divkit/dist/client.css';
import axios from 'axios';
const tempjson = {
    "templates": {
        "title": {
            "type": "text",
            "font_size": 20,
            "line_height": 24,
            "font_weight": "bold",
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
                    "orientation": "vertical",
                    "items": [
                        {
                            "type": "title",
                            "text": "информация про акции скоро появится"
                        }
                    ]
                }
            }
        ]
    }
}

const Adversing = () => {
    const [json, setPages] = useState(tempjson);
    useEffect(() => {
        (
          async () => {
            const { data } = await axios.get('actions');
            setPages(data);
          }
        )()
      }, []);

    return (
        <LayoutM>
             <DivKit id="smth" json={json} />
        </LayoutM>
    );
};

export default Adversing;