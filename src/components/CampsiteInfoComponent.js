import React, { Component } from 'react';
import { Card, CardImg, CardimgOverlay, CardText, CardBody, CardTitle, CardImgOverlay, Breadcrumb, BreadcrumbItem, Button, Modal, Row, Label, ModalHeader, ModalBody, Form, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);


class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isModalOpen: false,
            rating: '',
            author: '',
            text: ''
        };
    }
    
    toggleModal() {
        return (
            this.setState({
                isModalOpen: !this.state.isModalOpen
            })
        );
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.campsiteId, values.rating, values.text);
}
    
    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}><i class="fa fa-pencil" aria-hidden="true"></i> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit} initialState={{rating: '1'}}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select className="form-control" model=".rating" id="rating" name="rating" innerRef={input => this.rating = input}>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="firstname">Your Name</Label>
                                <Control.text className="form-control" model=".author" id="firstname" name="firstname" innerRef={input => this.firstname = input}
                                    validators={{
                                        required,
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                                ></Control.text>
                                <Errors className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: "Required",
                                        minLength: "Must be at least 2 characters",
                                        maxLength: "Must be atleast 15 characters"
                                    }} />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea className="form-control" model=".text" id="comment" name="comment" innerRef={input => this.text = input}></Control.textarea>                               
                            </div>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5 m-1">
            <FadeTransform
                in
                transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    );
}

function RenderComments({ comments, postComment, campsiteId }) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                <Stagger in>
                    {comments.map(comment => (
                        <Fade in key={comment.id}>
                            <p><div>{comment.text}</div> <div>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</div></p>
                        </Fade>
                    ))
                    }
                </Stagger>
                <CommentForm campsiteId={campsiteId} postComment={postComment} />
            </div>
        )
    }
    return <div></div>
}

function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
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
                    <RenderComments
                        comments={props.comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    />
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