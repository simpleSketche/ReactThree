import { useEffect } from "react";


export default function UITemplate(props){

    const {inputs} = props;

    useEffect(() => {

        console.log(inputs)

    }, [inputs])


}