import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { Button } from 'reactstrap';

const style = {
        padding  : ".25rem .4rem",
        fontSize: ".875rem",
        lineHeight: ".5",
        borderRadius: ".2rem",
        opacity: 0.8
}

const post = props => {
    let buttons = null;
    if(props.editHandler){
        buttons = (
            <React.Fragment>
                <span>
                <Button onClick={props.editHandler} style={style} color="primary" outline>Edit</Button>
                </span>
                &nbsp;
                <span>
                <Button onClick={props.deleteHandler} style={style} color="danger" outline>Delete</Button>
                </span>
            </React.Fragment>
        )
    }
    return (
        <div className="col-md-12 mb-4 pt-3 pb-3" style={{
            background: '#F8F9FA',
            borderRadius: '5px',
            boxShadow: '0px 2px 3px #ccc'
        }}>
            <h4>{props.post.title}</h4>
            <p>{props.post.content}</p>
            <div>
            {buttons}
            </div>
            <div>
                <span className="badge badge-secondary">Posted <Moment fromNow>{props.post.time}</Moment></span>
                <div className="float-right"><span className="label label-default">By {props.post.name}</span></div>         
            </div>
        </div>
    )
}

export default post;