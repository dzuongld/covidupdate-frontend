import React from 'react'

const Loader = () => {
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
                    src="https://media.giphy.com/media/l4FGDT7FZkvojdKMw/giphy.gif"
                    alt="Loader"
                    width="300"
                />
                <h5 style={{ textAlign: 'center' }}>LOADING...</h5>
            </div>
        </div>
    )
}

export default Loader
