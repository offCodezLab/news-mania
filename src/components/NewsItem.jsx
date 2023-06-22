import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, discription, imgUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className='container my-3'>
                <div className="card">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-primary" style={{ zIndex: 1, left: "90%" }}>{source}
                    </span>
                    <img src={!imgUrl ? "" : imgUrl} className="card-img-top" alt="" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{discription}</p>
                        <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toUTCString()}</small></p>
                        <a href={newsUrl} target='_blank' className="btn btn-sm btn-outline-primary">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem