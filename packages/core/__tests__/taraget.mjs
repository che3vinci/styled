import React from "react"

const Button = styled('div', {
  h:200,
  '& > *':{},
  variants: {
    size: {
      small: {
        width: 100,
      },
      large: {
        width: 200,
      },
      x =>{
        return {width:x}
      }
    },
  },
});

//=====================================================================================================
// 1.variants的转换
//=====================================================================================================
const App:React.FC = ()=>{
    return  <Button size="small">login</Button>      
} 
//jsx
React.createElement(Button, {size: "small"}, "login")
=>
React.createElement('div', {className: "xyz2ss-small"}, "login")


//=====================================================================================================
// 2.css转换
//=====================================================================================================
const App:React.FC = ()=>{
    return <div>
        <Button css={{color:'red'}}>login</Button>      
    </div>
} 
//jsx
React.createElement(Button, {css: {color:'red'}}, "login")
=>
React.createElement('div', {className: "xyz2ss-css"}, "login")
