import React from 'react'
import Overview from './Overview'
import List from './List'

const Home = () => {
    return (
        <div>
            <Overview />
            <List groupByCountry={true} />
        </div>
    )
}

export default Home
