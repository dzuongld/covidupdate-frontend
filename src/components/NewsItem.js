import React from 'react'

const NewsItem = (props) => {
    return (
        <div className="card my-2">
            <div className="card-body">
                <a
                    href={props.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link"
                >
                    <h5 className="card-title">{props.title}</h5>
                </a>
                <h6 className="card-subtitle mb-2 text-muted">{props.date}</h6>
                <p className="card-text">{props.description}</p>
            </div>
        </div>
    )
}

export default NewsItem
