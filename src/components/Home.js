import React from 'react'
import Overview from './Overview'
import List from './List'

const Home = () => {
    return (
        <div>
            <Overview />

            {/* <div className="alert alert-dismissible alert-info">
                <button type="button" className="close" data-dismiss="alert">
                    &times;
                </button>
                <p className="mb-0">
                    Data of France is erroneous at the moment so please
                    disregard it for now.
                </p>
            </div> */}

            <List groupByCountry={true} />
        </div>
    )
}

export default Home
