import React from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader'
import Error from './Error'

const PAGE_SIZE = 4

const getDataByPage = (data, page) => {
    const end = page * PAGE_SIZE
    const start = end - PAGE_SIZE
    return data.slice(start, end)
}

class NewsFeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            dataDisplayed: [],
            currentPage: 1,
            totalPages: 1,
            loading: true,
            error: false
        }
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/newsfeed`)
            .then((response) => {
                return response.json()
            })
            .then((newData) => {
                const newTotalPages = Math.ceil(newData.length / PAGE_SIZE)
                this.setState({
                    data: newData,
                    totalPages: newTotalPages,
                    dataDisplayed: getDataByPage(
                        newData,
                        this.state.currentPage
                    ),
                    loading: false,
                    error: false
                })
            })
            .catch((error) => {
                console.log(error)
                this.setState({ error: true })
            })
    }

    toPage(goBack) {
        const page = goBack
            ? this.state.currentPage - 1
            : this.state.currentPage + 1
        const newData = getDataByPage(this.state.data, page)
        this.setState({
            dataDisplayed: newData,
            currentPage: page
        })
    }

    render() {
        if (this.state.error) return <Error />
        if (this.state.loading) return <Loader />
        return (
            <div>
                <h2>News Feed</h2>
                <hr className="my-2" style={{ borderColor: 'white' }}></hr>
                <h4>
                    Latest updates from the Australian Department of Health.
                    Many of the articles are about the COVID-19 situation in
                    Australia.
                </h4>
                {this.state.dataDisplayed.map((piece) => {
                    return (
                        <NewsItem
                            key={piece.description}
                            title={piece.title}
                            description={piece.description}
                            date={piece.pubDate[0]
                                .split(' ')
                                .slice(0, 4)
                                .join(' ')}
                            link={piece.guid[0]._}
                        />
                    )
                })}

                <div className="d-flex justify-content-center p-3">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        disabled={this.state.currentPage === 1}
                        onClick={() => this.toPage(true)}
                    >
                        Prev
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary ml-1"
                        disabled={
                            this.state.currentPage === this.state.totalPages
                        }
                        onClick={() => this.toPage(false)}
                    >
                        Next
                    </button>
                </div>
            </div>
        )
    }
}

export default NewsFeed
