import React, { Component } from 'react';
import '../../index.css';
import topic_img from "../../public/user.png"
import axios from 'axios';
import Comment from "../Comment/Comment";
import ReactQuill from 'react-quill';
import { Collapse } from 'react-bootstrap';
import 'react-quill/dist/quill.snow.css';
import Cookies from 'js-cookie';
const modules = {
  toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      //['link', 'image', 'video'],
      ['clean']
  ],
  clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
  }
}

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'image'
]
export class Show_answer extends Component {
  
  constructor(){
    super();
    this.state = {  
   
        answer:[],
        question:"",
        answer_owner:"",
        upvote:[],
        downvote:[],
        bookmark:[],
        comments:[],
        increment:false,
        open: false,
        ans_data:"",
        new_ans:""
       
    }
    this.passedfunc=this.passedfunc.bind(this);
    this.changeAnswer=this.changeAnswer.bind(this);
    this.updateAnswer=this.updateAnswer.bind(this);

}  
  componentDidMount(){

    const {answer_id} = this.props.match.params
    let id= {answer_id};
   
    axios.get(`http://localhost:3001/answer/${id.answer_id}`)
            .then((response) => {
            //update the state with the response data
            this.setState({
              answer:response.data.data,
              question:response.data.data.question.question,
              answer_owner:response.data.data.answer_owner,
              comments:response.data.data.comment,
              ans_data:response.data.data.answer

              

            })
        });


        axios.get('http://localhost:3001/user/'+Cookies.get('_id'))
        .then((response) => {
        //update the state with the response data
        this.setState({
        
          upvote:response.data.data.upvote,
          downvote:response.data.data.downvote,
          bookmark:response.data.data.bookmark
           
        });
        // alert(JSON.stringify(response.data.data.answer.length));
    });
}

componentDidUpdate() {

  if (this.state.increment==true) {
 
    const {answer_id} = this.props.match.params
    let id= {answer_id};
   
    axios.get(`http://localhost:3001/answer/${id.answer_id}`)
    .then((response) => {
    //update the state with the response data
    this.setState({
      answer:response.data.data,
      question:response.data.data.question.question,
      answer_owner:response.data.data.answer_owner,
      comments:response.data.data.comment,
      ans_data:response.data.data.answer
      

    })
});
         axios.get('http://localhost:3001/user/'+Cookies.get('_id'))
         .then((response) => {
         //update the state with the response data
         this.setState({
         
           upvote:response.data.data.upvote,
           downvote:response.data.data.downvote,
           bookmark:response.data.data.bookmark,
           increment:false
            
         });
        //  alert(JSON.stringify(response.data.data.answer.length));
     });

  }

}
passedfunc(){

  this.setState({
      increment:true
  })
}

changeAnswer(value){
  // const val=e.target.value
this.setState({
  ans_data:value
} )
}


updateAnswer(e){
  e.preventDefault();
  const {answer_id} = this.props.match.params
    let id= {answer_id};
  axios.put(`http://localhost:3001/answer/${id.answer_id}`,{answer:this.state.ans_data})
  .then((response) => {
  //update the state with the response data

this.setState({
    increment:true,
    open: false
})
})
}

    render() {
      const { open } = this.state;
      let image='http://localhost:3001'+this.state.answer_owner.image;
      if(this.state.upvote.includes(this.state.answer._id))
                {
                  var button_type=<i className="fas fa-thumbs-up blue"> Upvote {this.state.answer.upvote}</i>;
                }else{
                    var button_type=<i className="fas fa-thumbs-up "> Upvote {this.state.answer.upvote}</i>;
                }
                if(this.state.downvote.includes(this.state.answer._id))
                {
                  var button_type2=<i className="fas fa-thumbs-down blue"> Downvote {this.state.answer.downvote}</i>;
                }else{
                    var button_type2=<i className="fas fa-thumbs-down "> Downvote {this.state.answer.downvote}</i>;
                }
                if(this.state.bookmark.includes(this.state.answer._id))
                {
                  var button_type3=<i className="fas fa-bookmark blue"> Bookmark</i>;
                }else{
                    var button_type3=<i className="fas fa-bookmark "> Bookmark</i>;
                }
                if(this.state.answer_owner._id==Cookies.get('_id'))
                {
                  var button_type4=<i className="fas fa-edit"    onClick={() => this.setState({ open: !open })}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}> Edit</i>;
                }else{
                    var button_type4="";
                }
 return(
 
<div>
<br/>
<br/>
<div className="row">
  <div className="col-md-3">
  </div>
  <div className="col-md-6">
      <div className="questionBox">
              <h4>{this.state.question}</h4>



            <div className="responderBox">
            <div className="row">
                    <div className="col-md-1">
                        <img src={image} height="40px" width="40px"/>
                    </div>
                    <div className="col-md-11">
                        <p>{this.state.answer_owner.firstname}, {this.state.answer_owner.description}</p>
                        <span className="answeredDate">{this.state.answer.date}</span>
                    </div>
            </div>


            </div>
            <div className="answerBox">
            <span><p dangerouslySetInnerHTML={{ __html: this.state.answer.answer }} /> </span>
            
               
                <Collapse in={this.state.open}>
                          <div id="example-collapse-text">
                          <ReactQuill
                                                    onChange={this.changeAnswer}
                                                       value={this.state.ans_data} 
                                                       modules={modules}
                                                       formats={formats}
                                                   />
                                                   <br/>
<button className="btn btn-success right" onClick={this.updateAnswer}>Update</button>  &nbsp; 
<button className="btn btn-default right" onClick={()=>this.setState({open:false})}>cancel</button>                                          
<br/>
                          </div>
                 </Collapse>  


            </div>

            <hr/>


            <div className="answerOptions">
  <div className="row">
      <div className="col-md-3">
      <p className='clickables' onClick={(e) => {
        
        
           
            axios.put(`http://localhost:3001/answer/${this.state.answer._id}/upvote`,{user_id:Cookies.get('_id')})
            .then((response) => {
            //update the state with the response data
        
          this.setState({
              increment:true
          })
        })
            
      }
            
            
            }>{button_type}</p>
      </div>
      <div className="col-md-3">
      <p className='clickables'  onClick={(e) => {
        
        
           
        axios.put(`http://localhost:3001/answer/${this.state.answer._id}/downvote`,{user_id:Cookies.get('_id')})
        .then((response) => {
        //update the state with the response data
    
      this.setState({
          increment:true
      })
    })
        
  }
        
        
        }>{button_type2}</p>
      </div>
      <div className="col-md-3">
      <p className='clickables' onClick={(e) => {
        
        
           
        axios.put(`http://localhost:3001/answer/${this.state.answer._id}/bookmark`,{user_id:Cookies.get('_id')})
        .then((response) => {
        //update the state with the response data
    
      this.setState({
          increment:true
      })
    })
        
  }
        
        
        }>{button_type3}</p>
      </div>
      <div className="col-md-3">
   <p className="clickables">{button_type4}</p>
      </div>


  </div>

</div>

<Comment answer_id={this.state.answer._id} comments={this.state.comments} passedfunc={this.passedfunc}/>

          </div>
  </div>
  <div className="col-md-3">
  </div>
</div>




 

      </div> 
 )
    }
  }
  
  export default Show_answer
  