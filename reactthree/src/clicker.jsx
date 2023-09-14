import {useEffect, useState } from "react";

export default function Clicker({keyName, color, increment}){

    const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ?? 0))
    
    // life cycle hook, initiated at the beginning
    useEffect(()=> {
        return () => {
            localStorage.removeItem(keyName)
        }
    }, [])

    // life cycle hook, initiated at the beginning
    useEffect(() => {
        localStorage.setItem(keyName, count)
    }, [count])

    const buttonClick = () => {

        setCount(count + 1)
        increment();
    }


    return  <div>
                <div style={{color: color}}>Clicks Count: {count}</div>
                <button onClick={buttonClick}>Click me</button>
            </div>
}