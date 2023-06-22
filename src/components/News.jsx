import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=88b3990f82f94270a90aedb34720cf0b&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
        this.setState({ loading: false });
    }

    handlePreviuosClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=88b3990f82f94270a90aedb34720cf0b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        window.scrollTo(0, 0);
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles })
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        });

    }

    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=88b3990f82f94270a90aedb34720cf0b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            window.scrollTo(0, 0);
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({ articles: parsedData.articles })
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            });

        }

    }
    render() {
        return (
            <>
                <div className='container my-5'>
                    <h1 className='text-center my-5'>News Mania - Top Headlines</h1>
                    {this.state.loading && <Spinner />}
                    <div className="row">
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} discription={element.description ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}

                    </div>
                </div>

                {!this.state.loading && <div className="container my-5 d-flex justify-content-around">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-secondary my-2" onClick={this.handlePreviuosClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-secondary my-2" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>}
            </>
        )
    }
}

export default News