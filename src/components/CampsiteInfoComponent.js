import React from 'react';
import { Card, CardImg, CardimgOverlay, CardText, CardBody, CardTitle, CardImgOverlay } from 'reactstrap';


function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                <CardImgOverlay>
                    <CardTitle>{campsite.name}</CardTitle>
                </CardImgOverlay>
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
                </div>
            )
        }
        return <div></div>
    }

function CampsiteInfo (props) {
        if (props.campsite) {
            return (
                <div className="container">
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