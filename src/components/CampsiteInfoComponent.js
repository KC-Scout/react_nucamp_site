import React, { Component } from 'react';
import { Card, CardImg, CardimgOverlay, CardText, CardBody, CardTitle, CardImgOverlay, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { render } from '@testing-library/react';


class CommentForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Button outline><i class="fa fa-pencil" aria-hidden="true"></i> Submit Comment</Button>
        );
    }
}

function RenderCampsite({ campsite }) {
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

function RenderComments({ comments }) {
        if (comments) {
            return (
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment => (
                        <p key={comment.id}><div>{comment.text}</div> <div>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</div></p>
                    ))
                    }
                    <CommentForm />
                </div>
            )
        }
        return <div></div>
    }

function CampsiteInfo(props) {
        if (props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to='/directory'>Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active >{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
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


export default CampsiteInfo 