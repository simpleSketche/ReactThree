import Clicker from './clicker.jsx'
import { useState } from 'react'

export default function App({children})
{
    
    const value = "sample data can be injected in the HTML"

    const [hasClicker, setHasClicker] = useState(true);

    const [totalCount, setTotalCount] = useState(0)

    const toggleClickerClick = () => 
    {
        setHasClicker(!hasClicker)
    }

    const increment = () => {
        setTotalCount(totalCount + 1)
    }

    return <div>
                {children}

                {/** Some comment */}
                <h1>Hello React</h1>
                <h2>Subtitle</h2>
                <h3>Paragraph title</h3>
                <p> {value} <strong>HERE</strong></p>
                <p> {"you can also directly add the js type in the html, such as string in this example!!"}</p>
                
                <p>Total Count: {totalCount}</p>

                <button onClick={toggleClickerClick}>{hasClicker ? 'Hide ' : 'Show '}Toggle Click</button>
                {hasClicker ? <Clicker keyName="countA" color="red" increment = {increment}></Clicker> : null}
                {hasClicker ? <Clicker keyName="countC" color="purple" increment = {increment}></Clicker> : null}
                {hasClicker ? <Clicker keyName="countB" color="green" increment = {increment}></Clicker> : null}
                
            </div>

}