import axios from 'axios'
import React, { useEffect, useState } from 'react'
function Experiment() {
    const [d, setd] = useState()
    useEffect(() => {
        // axios.get("https://www.eporner.com/api/v2/video/search/?query=${riley my heart}&per_page=${10}&page=${1}&thumbsize=${thumbsize}&order=${order}&gay=${gay}&lq=${lq}&format=json").then((d) => {
        axios.get("https://cdn.jsdelivr.net/npm/pornhub-api@0.0.1/src/Videos.min.js").then((d) => {
            setd(d);
        })
        .catch(e => console.log(e))

    })
  return (
    <div>Experiment</div>
  )
}

export default Experiment