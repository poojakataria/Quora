import React, { Component } from 'react';
import '../../index.css';
import topic_img from "../../public/user.png"


export class Answer extends Component {






    render() {
        //let image='http://localhost:3001'+this.props.answer.answer_owner.image;
        return (

            <div>
                <div className="responderBox">
                    <div className="row">
                        <div className="col-md-1">
                            {/* <img src={image} height="40px" width="40px"/> */}
                        </div>
                        <div className="col-md-11">
                            <p>{this.props.answer.answer_owner.firstname}, <span dangerouslySetInnerHTML={{ __html: this.props.answer.answer_owner.description }} /> </p>
                            <span className="answeredDate">{this.props.answer.date}</span>
                        </div>
                    </div>


                </div>
                <div className="answerBox">
                    {/* <p>{this.props.answer.answer} 
      </p> */}
                    <span><p dangerouslySetInnerHTML={{ __html: this.props.answer.answer }} /> </span>
                </div>

                <hr />

            </div>
        )
    }
}

export default Answer
