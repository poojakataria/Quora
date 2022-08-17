import React, { Component } from 'react';
import '../../index.css';

import Question from "../Question/Question";
import Answer from "../Answer/Answer";
import Comment from "../Comment/Comment";
import axios from 'axios';
import { Link } from 'react-router-dom';
import topic_img from "../../public/user.png"
import Cookies from 'js-cookie';
export class Bookmarks extends Component {


    constructor() {
        super();
        this.state = {

            topics: [],
            user: [],
            answers: [],
            topic_name: "",
            authFlag: false,
            increment: false,
            upvote: [],
            downvote: [],
            bookmark: [],
            current_topic: ""

        }
        this.passedfunc = this.passedfunc.bind(this);

    }

    componentDidUpdate() {

        if (this.state.increment == true) {

            axios.get('http://localhost:3001/user/'+Cookies.get('_id')+'/bookmarked_answers')
                .then((response) => {
                    //update the state with the response data
                    this.setState({

                        upvote: response.data.data.upvote,
                        downvote: response.data.data.downvote,
                        bookmark: response.data.data.bookmark,
                        increment: false,
                        answers: response.data.data.bookmark


                    })


                });

        }

    }
    componentDidMount() {
        axios.get('http://localhost:3001/user/'+Cookies.get('_id')+'/bookmarked_answers')
            .then((response) => {
                //update the state with the response data
                this.setState({

                    upvote: response.data.data.upvote,
                    downvote: response.data.data.downvote,
                    bookmark: response.data.data.bookmark,
                    increment: false,
                    answers: response.data.data.bookmark
                })
                // alert(response.data.data.bookmark[0].answer);
            });


    }

    passedfunc() {
        alert("passed");
        this.setState({
            increment: true
        })
    }

    render() {


        let answers = this.state.answers.map(items => {

            let image='http://localhost:3001'+items.answer_owner.image;

                if (this.state.upvote.includes(items._id)) {
                    var button_type = <i className="fas fa-thumbs-up blue"> Upvote {items.upvote}</i>;
                } else {
                    var button_type = <i className="fas fa-thumbs-up "> Upvote {items.upvote}</i>;
                }
                if (this.state.downvote.includes(items._id)) {
                    var button_type2 = <i className="fas fa-thumbs-down blue"> Downvote {items.downvote}</i>;
                } else {
                    var button_type2 = <i className="fas fa-thumbs-down "> Downvote {items.downvote}</i>;
                }
               
                    var button_type3 = <i className="fas fa-bookmark blue"> Bookmark</i>;
                

                return (


                    <div>
                        <div className="questionBox">
                            {/* <div className="question">
                                    <h4>{items.question}</h4>
                                    <p>{}</p>

                                </div> */}
                            {/* <Question question={items.question} name={this.state.topic_name}/> */}
                            <div className="question">
                                <Link className="black" to={`/question/${items.question._id}`}>   <h4>{items.question.question}</h4></Link>
                            </div>
                            <div className="responderBox">
                                <div className="row">
                                    <div className="col-md-1">
                                        <img src={image} height="40px" width="40px" />
                                    </div>
                                    <div className="col-md-11">
                                        <p>{items.answer_owner.firstname}, <span dangerouslySetInnerHTML={{ __html: items.answer_owner.description }} /> </p>
                                        <span className="answeredDate">{items.date}</span>
                                    </div>
                                </div>


                            </div>
                            <div className="answerBox">
                              
                                <span><p dangerouslySetInnerHTML={{ __html: items.answer }} /> </span>
                            </div>

                            <hr />

                            <div className="answerOptions">
                                <div className="row">
                                    <div className="col-md-3">
                                        <p className='clickables' onClick={(e) => {



                                            axios.put(`http://localhost:3001/answer/${items._id}/upvote`, { user_id: Cookies.get('_id') })
                                                .then((response) => {
                                                    //update the state with the response data

                                                    this.setState({
                                                        increment: true
                                                    })
                                                })

                                        }


                                        }>{button_type}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <p className='clickables' onClick={(e) => {



                                            axios.put(`http://localhost:3001/answer/${items._id}/downvote`, { user_id: Cookies.get('_id') })
                                                .then((response) => {
                                                    //update the state with the response data

                                                    this.setState({
                                                        increment: true
                                                    })
                                                })

                                        }


                                        }>{button_type2}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <p className='clickables' onClick={(e) => {



                                            axios.put(`http://localhost:3001/answer/${items._id}/bookmark`, { user_id: Cookies.get('_id') })
                                                .then((response) => {
                                                    //update the state with the response data

                                                    this.setState({
                                                        increment: true
                                                    })
                                                })

                                        }


                                        }>{button_type3}</p>
                                    </div>
                                    <div className="col-md-3">

                                    </div>


                                </div>

                            </div>
                            {/* <Comment answer_id={items.answer._id} comments={items.answer.comment} passedfunc={this.passedfunc}/> */}
                        </div>


                    </div>
                )

           
        })

        return (
            <div>



                <div className="container top_100">

                    <div className="row">
                        <div className="col-md-3">
                            <div className="sidenav">
                                {/* <a href="#"><img src={topic_img} height="20px" width="20px"/> Topic 1</a>
                        <a href="#"><img src={topic_img} height="20px" width="20px"/> Topic 2</a>
                        <a href="#"><img src={topic_img} height="20px" width="20px"/> Topic 3</a>
                        <a href="#"><img src={topic_img} height="20px" width="20px"/> Topic 4</a>
                        <a href="#"><img src={topic_img} height="20px" width="20px"/> Topic 5</a> */}
                                {/* {topics} */}
                                {/* <a href="#"><span class="glyphicon glyphicon-bookmark"></span> Bookmarks</a> */}
                            </div>
                        </div>
                        <div className="col-md-6">

                            {answers}

                        </div>
                        <div className="col-md-3">

                        </div>

                    </div>





                </div>





            </div>
        )
    }
}

export default Bookmarks
