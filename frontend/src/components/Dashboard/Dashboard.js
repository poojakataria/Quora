import React, { Component } from 'react';
import '../../index.css';

import Question from "../Question/Question";
import Answer from "../Answer/Answer";
import Comment from "../Comment/Comment";
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Collapse } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';


export class Dashboard extends Component {

    constructor() {
        super();
        this.state = {

            topics: [],
            user: [],
            questions: [],
            authFlag: false,
            increment: false,
            upvote: [],
            downvote: [],
            bookmark: [],

        }
        this.passedfunc = this.passedfunc.bind(this);


    }
    componentDidUpdate() {

        if (this.state.increment == true) {

            axios.get('http://localhost:3001/user/' + Cookies.get('_id') + '/home')
                .then((response) => {
                    //update the state with the response data
                    this.setState({
                        topics: response.data.data.topic,
                        questions: response.data.data.topic.question,
                        upvote: response.data.data.upvote,
                        downvote: response.data.data.downvote,
                        bookmark: response.data.data.bookmark,
                        increment: false



                    })


                });

        }

    }

    componentDidMount() {


        axios.get('http://localhost:3001/user/' + Cookies.get('_id') + '/home')
            .then((response) => {
                //update the state with the response data
                this.setState({
                    topics: response.data.data.topic,
                    questions: response.data.data.topic.question,
                    upvote: response.data.data.upvote,
                    downvote: response.data.data.downvote,
                    bookmark: response.data.data.bookmark

                })
                // alert(JSON.stringify(response.data.data.question.answer[0].comment));
                // alert(JSON.stringify(response.data.data.firstname));
            });
    }


    upvote() {
        alert("happening");
    }
    passedfunc() {
        alert("passed");
        this.setState({
            increment: true
        })
    }

    render() {

        let topics = this.state.topics.map(item => {
            return (
                <Link to={`/topic/${item.name}`}><img src={item.image} height="20px" width="20px" /> {item.name}</Link>

            )
        })

        let questions = this.state.topics.map(item => {

            return (item.question.map(items => {
                if (items.answer.length > 0) {
                    if (this.state.upvote.includes(items.answer[0]._id)) {
                        var button_type = <i className="fas fa-thumbs-up blue"> Upvote {items.answer[0].upvote}</i>;
                    } else {
                        var button_type = <i className="fas fa-thumbs-up "> Upvote {items.answer[0].upvote}</i>;
                    }
                    if (this.state.downvote.includes(items.answer[0]._id)) {
                        var button_type2 = <i className="fas fa-thumbs-down blue"> Downvote {items.answer[0].downvote}</i>;
                    } else {
                        var button_type2 = <i className="fas fa-thumbs-down "> Downvote {items.answer[0].downvote}</i>;
                    }
                    if (this.state.bookmark.includes(items.answer[0]._id)) {
                        var button_type3 = <i className="fas fa-bookmark blue"> Bookmark</i>;
                    } else {
                        var button_type3 = <i className="fas fa-bookmark "> Bookmark</i>;
                    }


                    return (


                        <div>
                            <div className="questionBox">
                                {/* <div className="question">
                                    <h4>{items.question}</h4>
                                    <p>{}</p>

                                </div> */}

                                <div className="question">
                                    <Link className="black" to={`/question/${items._id}`}>   <h4>{items.question}</h4></Link>
                                </div>
                                <Answer answer={items.answer[0]} upvote={this.upvote} />

                                <div >



                                </div>

                                <div className="answerOptions">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <p className='clickables' onClick={(e) => {



                                                axios.put(`http://localhost:3001/answer/${items.answer[0]._id}/upvote`, { user_id: Cookies.get('_id') })
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



                                                axios.put(`http://localhost:3001/answer/${items.answer[0]._id}/downvote`, { user_id: Cookies.get('_id') })
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



                                                axios.put(`http://localhost:3001/answer/${items.answer[0]._id}/bookmark`, { user_id: Cookies.get('_id') })
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
                                <hr />
                                <div>

                                    <Comment answer_id={items.answer[0]._id} comments={items.answer[0].comment} passedfunc={this.passedfunc} />
                                </div>
                            </div>


                        </div>







                    )

                } else {

                    return (




                        <div className="questionBox">
                            <div className="question">
                                <h4>{items.question}</h4>


                            </div>

                            <div className="answerBox">
                                <p>No answers yet
                                        </p>
                            </div>

                            <hr />


                        </div>








                    )




                }

            })

            )
            //   for(i=0;i<item.question.length;i++){

            //     return(
            //         <a href="#"> {i} <br/></a>
            //         )

            //   }


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
                                {topics}
                                <Link to={'/user/' + Cookies.get('_id') + '/bookmarked_answers'}>Bookmarks</Link>

                            </div>
                        </div>
                        <div className="col-md-8">

                            {questions}

                        </div>
                        <div className="col-md-1">

                        </div>

                    </div>





                </div>





            </div>
        )
    }
}

export default Dashboard
