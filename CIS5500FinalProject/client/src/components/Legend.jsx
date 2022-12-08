import React from 'react';

export const Legend = ({legendItems}) => {
    return ( 
       
        <div style={{
            display: "flex",
            alignItems: "stretch"
            }}
        >
            {legendItems.map((item)=>(
                <div key={item.title}
                style={{
                    backgroundColor: item.color,
                    flex: 1,
                    boxShadow: "10px 0 0 0",
                    display: "flex",
                    alignItems: "center", //vertical
                    justifyContent: "center", //horizontal
                    color: item.textColor,
                    height: "6vh",
                    fontWeight: "bolder",
                    fontSize: "1.2em"
                }}
                >
                    <span>{item.title}</span>
                </div>
            ))}
        </div>
     );
}

export default Legend;