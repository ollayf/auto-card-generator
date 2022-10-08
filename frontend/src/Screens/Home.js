import React from 'react'
import { useState } from 'react'

export default function Home() {
    const [cards, setCards] = useState([])

    return (
        <div>
            <h2>Profile</h2>
            {/* {
                cards && 
                feeds.map(({...f}) => <Card key={f.id} {...f}/>)
            } */}
        </div>
    )
}