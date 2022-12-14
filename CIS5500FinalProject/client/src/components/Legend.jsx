import React from 'react';

export const Legend = ({legendItems}) => {
    return ( 
       
        <div style={{
            width: "10%",
            alignItems: "right",
            justifyContent: "right",
            position: "absolute",
            right: "2px",
            paddingTop: "3px"
            /*
            display: "flex",
            alignItems: "stretch"*/
            }}
        >
            {legendItems.map((item)=>(
                <div key={item.title}
                style={{
                    backgroundColor: item.color,
                    width: "100%",
                    boxShadow: "10px 0 0 0",
                    display: "flex",
                    alignItems: "right", //vertical
                    justifyContent: "center", //horizontal
                    fontFamily: "Poppins,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif",
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