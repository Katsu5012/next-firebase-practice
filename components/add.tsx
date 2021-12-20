import { useState } from "react"
function Add(props:{count:number}){
    let [count,setCount]=useState(props.count)
    function addCount(){
        props.count++
    }
    return(
<div>
    <button onClick={()=>setCount(count++)}>click</button>
</div>
    )
}

export default Add;