import React, { Component } from 'react';
import { Card, CardImg, CardimgOverlay, CardText, CardBody, CardTitle, CardImgOverlay } from 'reactstrap';


class CampsiteInfo extends Component {
    constructor(props) {
        super(props);
    }

    renderCampsite(campsite) {
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                    <CardImgOverlay>
                        <CardTitle>{campsite.name}</CardTitle>
                    </CardImgOverlay>
                </Card>
            </div>
        )
    }

    renderComments(comments) {
        if (comments) {
            return (
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment => (
                        <p key={comment.id}><div>{comment.text}</div> <div>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</div></p>
                    ))
                    }
                </div>
            )
        }
        return <div></div>
    }

    render() {
        if (this.props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        {this.renderCampsite(this.props.campsite)}
                        {this.renderComments(this.props.campsite.comments)}
                    </div>
                </div>
            )
        } else {
            return (
                <div>

                </div>
            )
        }
    };
}

export default CampsiteInfo 