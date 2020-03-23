import React from 'react'

const Error = () => {
    const parent = {
        minHeight: '90vh',
        display: 'grid'
    }
    const child = {
        alignSelf: 'center',
        justifySelf: 'center'
    }

    return (
        <div style={parent}>
            <div style={child}>
                <img
                    src="https://media.giphy.com/media/8L0Pky6C83SzkzU55a/giphy.gif"
                    alt="Loader"
                    width="300"
                />
                <h5 style={{ textAlign: 'center' }}>
                    Error retrieving data :(
                </h5>
                <h5 style={{ textAlign: 'center' }}>Please try again later!</h5>
            </div>
        </div>
    )
}

export default Error
