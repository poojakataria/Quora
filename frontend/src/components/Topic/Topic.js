import React, { Component } from 'react';
import '../../index.css';

import Question from "../Question/Question";
import Answer from "../Answer/Answer";
import Comment from "../Comment/Comment";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
export class Topic extends Component {


    constructor() {
        super();
        this.state = {

            topics: [],
            user: [],
            questions: [],
            topic_name: "",
            authFlag: false,
            increment:false,
            upvote:[],
            downvote:[],
            bookmark:[],
            current_topic:""

        }
        this.passedfunc=this.passedfunc.bind(this);
        this.changeTopic=this.changeTopic.bind(this);
    }

    componentDidUpdate() {

        if (this.state.increment==true) {
            const { topic_name } = this.props.match.params
            let id = { topic_name };
            axios.get(`http://localhost:3001/topic/${this.state.current_topic}`)
                .then((response) => {
    
                    this.setState({
    
                        questions: response.data.data[0].question,
                        topic_name: response.data.data[0].name
    
                    })
                    // alert(this.state.questions.length);
                });
            axios.get('http://localhost:3001/user/'+Cookies.get('_id')+'/home')
                .then((response) => {
                //update the state with the response data
                this.setState({
           
                    upvote:response.data.data.upvote,
                    downvote:response.data.data.downvote,
                    bookmark:response.data.data.bookmark,
                    increment:false,
                    topics:response.data.data.topic


                })
           
   
            });

        }

    }
    componentDidMount() {
        const { topic_name } = this.props.match.params
        let id = { topic_name };
        axios.get(`http://localhost:3001/topic/${id.topic_name}`)
            .then((response) => {

                this.setState({

                    questions: response.data.data[0].question,
                    topic_name: response.data.data[0].name

                })
                // alert(this.state.questions.length);
            });

            axios.get('http://localhost:3001/user/'+Cookies.get('_id')+'/home')
            .then((response) => {
            //update the state with the response data
            this.setState({
        
                upvote:response.data.data.upvote,
                downvote:response.data.data.downvote,
                bookmark:response.data.data.bookmark,
                topics:response.data.data.topic

            })
            // alert(JSON.stringify(response.data.data.question.answer[0].comment));
    // alert(JSON.stringify(response.data.data.firstname));
        });


    }

    passedfunc(){
        alert("passed");
        this.setState({
            increment:true
        })
    }
changeTopic(e)
{
  
    this.setState({
        current_topic:e.target.value,
        increment:true
    })
}

    render() {

        let topics = this.state.topics.map(item => {
            return(
                <Link to={`/topic/${item.name}`}> <button  value={item.name} onClick={this.changeTopic}><img src={item.image} height="20px" width="20px"/> {item.name}</button></Link>
             
            )
        })

        let questions = this.state.questions.map(items => {




            if (items.answer.length > 0) {
                if(this.state.upvote.includes(items.answer[0]._id))
                {
                  var button_type=<i className="fas fa-thumbs-up blue"> Upvote {items.answer[0].upvote}</i>;
                }else{
                    var button_type=<i className="fas fa-thumbs-up "> Upvote {items.answer[0].upvote}</i>;
                }
                if(this.state.downvote.includes(items.answer[0]._id))
                {
                  var button_type2=<i className="fas fa-thumbs-down blue"> Downvote {items.answer[0].downvote}</i>;
                }else{
                    var button_type2=<i className="fas fa-thumbs-down "> Downvote {items.answer[0].downvote}</i>;
                }
                if(this.state.bookmark.includes(items.answer[0]._id))
                {
                  var button_type3=<i className="fas fa-bookmark blue"> Bookmark</i>;
                }else{
                    var button_type3=<i className="fas fa-bookmark "> Bookmark</i>;
                }
                
                return (


                    <div>
                        <div className="questionBox">
                            {/* <div className="question">
                                    <h4>{items.question}</h4>
                                    <p>{}</p>

                                </div> */}
                            {/* <Question question={items.question} name={this.state.topic_name}/> */}
                            <div className="question">
                                <Link className="black" to={`/question/${items._id}`}>   <h4>{items.question}</h4></Link>
                            </div>
                            <Answer answer={items.answer[0]} />
                           
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
                            <Comment answer_id={items.answer[0]._id} comments={items.answer[0].comment} passedfunc={this.passedfunc}/>
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
                                <a href="#"><span class="glyphicon glyphicon-bookmark"></span> Bookmarks</a>
                            </div>
                        </div>
                        <div className="col-md-6">

                            {questions}

                        </div>
                        <div className="col-md-3">

                        </div>

                    </div>





                </div>





            </div>
        )
    }
}

export default Topic
