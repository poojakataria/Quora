import React, { Component } from 'react';
import '../../index.css';
import topic_img from "../../public/user.png"
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Collapse } from 'react-bootstrap';
import Cookies from 'js-cookie';
export class Question extends Component {
  
   constructor(){
      super();
      this.state = {  
      
         comment:"",
         button:false,
         open: false

      }
   this.changeComment=this.changeComment.bind(this);
      this.addComment = this.addComment.bind(this);

  }  

changeComment(e){

   this.setState({
      comment:e.target.value,
      button:true
   })
}

addComment(e){
   e.preventDefault();
   const data={
      comment:this.state.comment,
      answer_id:this.props.answer_id,
      comment_owner:Cookies.get('_id')
   }
   // alert(JSON.stringify(data ));
   axios.post(`http://localhost:3001/answer/${this.props.answer_id}/comment`,data)
   .then((response) => {
      //  alert(response.data);
       this.setState({
          comment:""
       })

   });
   this.props.passedfunc();
}



    render() {
   
      const { open } = this.state;

if(this.state.button==true && this.state.comment!=""){
var comment_button=<button className="btn btn-success" onClick={this.addComment}>Add comment</button>;
}else{
   var comment_button=  <button className="btn btn-default"
   onClick={() => this.setState({ open: !open })}
   aria-controls="example-collapse-text"
   aria-expanded={open}
 >
   show comments
 </button>;
}
let details = this.props.comments.map(item => {
   var d = new Date(`${item.date}`);
   var n = d.toDateString();
   let image='http://localhost:3001'+item.comment_owner.image;
   return(
      <div>
      <div className="row">
      <div className="col-md-1">
          <img src={image} height="20px" width="20px"/>
      </div>
      <div className="col-md-8">
          <p className="bold">{item.comment_owner.firstname}</p>
       
      </div>
      <div className="col-md-3">
      <p>{n}</p>

      </div>
</div>
       <p >{item.comment}</p>
       <hr/>
       </div>
   )
});

 return(

<div>
<div className="commentbox">
            <div className="row">
            <div className="col-md-1">
            <img src={topic_img} height="30px" width="30px"/>
            </div>
            <div className="col-md-7">
            <input type="text" onChange={this.changeComment} value={this.state.comment}id="ip2" />
</div>
<div className="col-md-4">
{comment_button}
</div>

            </div>   
                                </div>
 
<br/>
     <Collapse in={this.state.open}>
          <div id="example-collapse-text">
    {details}
          </div>
        </Collapse>  
 </div>
 )
    }
  }
  
  export default Question
  