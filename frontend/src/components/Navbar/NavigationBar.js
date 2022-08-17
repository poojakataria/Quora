import React, { Component } from 'react';
import title from "../../public/quora.jpg";
import ReactModal from 'react-modal';
// import Question from './Question';
import { Link, Redirect } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Form } from 'react-bootstrap';
import Cookies from 'js-cookie';

const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '400px',
    width: '570px',
    borderRadius: '2%',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.377)',
    padding: '0'
  }
};

export class NavigationBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: null,
      openQuestionModal: false,
      openMsgModal: false,
      openMsgThreadModal: false,
      question_owner: Cookies.get("_id"),
      question: null,
      topics: [],
      topicsSelected: [],
      msgthreads: []
    }
    //navbar
    this.searchHandler = this.searchHandler.bind(this);
    this.searchResult = this.searchResult.bind(this);
    //modal
    this.openModel = this.openModel.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openMsgModel = this.openMsgModel.bind(this);
    this.closeMsgModal = this.closeMsgModal.bind(this);
    this.openMsgThreadModel = this.openMsgThreadModel.bind(this);
    this.closeMsgThreadModal = this.closeMsgThreadModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addTopic = this.addTopic.bind(this);
    this.removeTopic = this.removeTopic.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    // get topics from db asign it to this.state.topics
    let response = [
      { id: 1, name: "Technology", image: "https://png.pngtree.com/element_origin_min_pic/16/12/16/0958534a4d654dd.jpg" },
      { id: 2, name: "Science", image: "https://img.freepik.com/free-vector/science-icon-collection_23-2147504869.jpg?size=338&ext=jpg" },
      { id: 3, name: "Movies", image: "https://images.cdn4.stockunlimited.net/clipart/film-camera-icon_2022806.jpg" },
      { id: 4, name: "Sports", image: "http://www.paredro.com/wp-content/uploads/2016/04/1-Sport-Icons.jpg" },
      { id: 5, name: "Business", image: "https://bettermoneyhabits.bankofamerica.com/content/dam/bmh/khan-thumbnails/Tips-to-save-money-250px-01.jpg.thumb.1280.1280.jpg" },
      { id: 6, name: "History", image: "https://st3.depositphotos.com/3268541/12707/v/950/depositphotos_127072292-stock-illustration-history-vector-symbol.jpg" },
      { id: 7, name: "Cooking", image: "https://img.freepik.com/free-vector/cooking-utensils-set-vector-illustration_53876-43767.jpg?size=338&ext=jpg" },
      { id: 8, name: "Photography", image: "https://i.pinimg.com/originals/aa/f7/26/aaf72696855548fce7180ec85273988a.jpg" },
      { id: 9, name: "Education", image: "http://www.soidergi.com/wp-content/uploads/mi/thumb-minimal-logo-graduation-cap-white-background-vector-illustration-design-minimal-logo-graduation-cap-vector-illustration-image.jpg" },
      { id: 10, name: "Politics", image: "https://t3.ftcdn.net/jpg/01/96/92/26/500_F_196922693_YHc0Ws3vgRF01nyzQXsYOttriLH7AnbY.jpg" },
      { id: 11, name: "Literature", image: "https://irp-cdn.multiscreensite.com/5ea5d4db/dms3rep/multi/mobile/diversity-knowledge-book-tree-132983-diversity-knowledge-book-tree-jpg-e1Wwmf-clipart-1600x1591.jpg" }
    ]
    // axios.get("/topic", (err, response) => {
    //   if(err) alert("Something went wrong.")
    //   else{
    //     console.log(response.data);
    //   }
    // })
    this.setState({
      topics: response
    })
  }

  searchHandler = (e) => {
    this.setState({
      searchQuery: e.target.value
    })
  }

  handleInputChange = (e) => {
    if (e.target.checked) this.addTopic(e.target.id)
    else this.removeTopic(e.target.id)
  }

  addTopic = (id) => {
    const topicsSelected = this.state.topicsSelected.concat(id)
    this.setState({ topicsSelected })
  }

  removeTopic = (id) => {
    let topics = []
    Object.assign(topics, this.state.topicsSelected)
    let topicsSelected = topics.filter((t) => { return t !== id })
    this.setState({ topicsSelected })
  }

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state.question, this.state.topicsSelected);
    //post request to add question
    const data = {
      user: this.state.question_owner,
      question: this.state.question,
      topics: this.state.topicsSelected
    }
  }

  searchResult = (e) => {
    if (e.keyCode === 13 && this.state.searchQuery) {
      e.preventDefault();
      console.log(this.state.searchQuery)
      this.props.history.push(`/search?q=${this.state.searchQuery}`)
    }
  }

  openModel() {
    this.setState({ openQuestionModal: true });
  }

  closeModal() {
    this.setState({ openQuestionModal: false });
  }

  openMsgModel() {
    this.setState({ openMsgModal: true });
  }

  closeMsgModal() {
    this.setState({ openMsgModal: false });
  }

  openMsgThreadModel() {
    this.setState({ openMsgThreadModal: true });
  }

  closeMsgThreadModal() {
    this.setState({ openMsgThreadModal: false });
  }

  logout() {
    localStorage.setItem('session', false)
    Cookies.set('session', false);
  }

  render() {
    return (
      <div>
        <header className="navbarheader" >
          <Navbar expand="lg" >
            <Navbar.Brand href="#home"><img src={title} alt="navlogo" className="navlogo" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/home"><span className="navPadding"><i className="fas fa-home"></i>&nbsp;&nbsp;&nbsp;Home &nbsp;&nbsp;&nbsp;</span></Nav.Link>
                <Nav.Link href="/answer"><span className="navPadding"><i className="fas fa-edit"></i>&nbsp;&nbsp;&nbsp;Answers &nbsp;&nbsp;&nbsp;</span></Nav.Link>
                <NavDropdown title={<span className="navPadding"><i className="fas fa-bell" />&nbsp;&nbsp;&nbsp;Notifications &nbsp;&nbsp;&nbsp;</span>} id="basic-nav-dropdown">
                  {/* <NavDropdown.Item href="#">Notification 1</NavDropdown.Item>
                  <NavDropdown.Item href="#">Notification 2</NavDropdown.Item>
                  <NavDropdown.Item href="#">Notification 3</NavDropdown.Item> */}
                </NavDropdown>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Form inline >
                  <span className="navPadding"> <input type="text" className="form-control" placeholder="Search Quora" onChange={this.searchHandler} onKeyDown={this.searchResult} required size="30" /></span>
                  {/* <div className="input-group-append">
                    {(this.state.searchQuery===null)
                    ?<i className="fas fa-search fa-1x" style={{ margin: "auto", padding: "10px", cursor: "pointer", border: "0.9px solid rgba(200,200,200,1)" }} />
                    : <Redirect to={`/search?q=${this.state.searchQuery}`}><i className="fas fa-search fa-1x" style={{ margin: "auto", padding: "10px", cursor: "pointer", border: "0.9px solid rgba(200,200,200,1)" }} onClick={this.searchResult} /></Redirect>}
                </div> */}
                </Form>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <NavDropdown title={<span className="navPadding"><i className="fas fa-user"></i></span>} id="basic-nav-dropdown">
                  <NavDropdown.Item href={`/user/${Cookies.get('_id')}`}>Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={this.openMsgModel} >Messages</NavDropdown.Item>
                  <NavDropdown.Item href="/content">Your Content</NavDropdown.Item>
                  <NavDropdown.Item href="/stats">Stats</NavDropdown.Item>
                  <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/" onClick={this.logout}>Logout</NavDropdown.Item>
                </NavDropdown>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="navPadding"><Button className="btn btn-danger askquestion" onClick={this.openModel}>Add Question or Link</Button></span>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>

        {/* ask question modal */}
        <ReactModal
          isOpen={this.state.openQuestionModal}
          contentLabel="Question Modal"
          style={customStyles}
        >
          <div style={{ backgroundColor: "rgb(240,240,240)", padding: "15px" }}>
            Add Question
        <i className="fas fa-times-circle modalcloseicon" onClick={this.closeModal} style={{ float: "right", verticalAlign: "middle" }}></i><br />
          </div>
          <div className="questionmodal">
            <h5>{this.state.question_owner} asked</h5>
            <form className="signupform" onSubmit={this.submitHandler}>
              <input className="form-control" type="text" placeholder="Start your question with 'What', 'How', 'Why', etc." onChange={(e) => { this.setState({ question: e.target.value }) }} style={{ width: "100%" }} pattern='^(How|Why|What|how|what|why){1}[0-9a-zA-Z]*' title="Enter a valid question." required /><hr />
              Add topics that best describe your question
          {(this.state.topics).map((resp, index) => {
                return <div className="checkboxes" key={index}>
                  <input
                    name={resp.name}
                    type="checkbox"
                    id={resp.id}
                    onChange={this.handleInputChange} />
                  <label>{resp.name} </label>
                  <br />
                </div>
              })}
              <input type="submit" name="Add" value="Add Question" style={{ width: "150px" }} className="btn btn-primary" />
              <button className="btn btn-secondary" onClick={this.closeModal}>Cancel</button>
            </form>
          </div>
        </ReactModal>

        {/* msg modal */}
        <ReactModal
          isOpen={this.state.openMsgModal}
          contentLabel="Question Modal"
          style={customStyles}
        >
          <div style={{ backgroundColor: "rgb(240,240,240)", padding: "15px" }}>
            Messages
        <i className="fas fa-times-circle modalcloseicon" onClick={this.closeMsgModal} style={{ float: "right", verticalAlign: "middle" }}></i><br />
          </div>
          <div className="messagemodal">
          </div>
        </ReactModal>

        {/* msg thread modal */}
        <ReactModal
          isOpen={this.state.openMsgThreadModal}
          contentLabel="Question Modal"
          style={customStyles}
        >
          <div style={{ backgroundColor: "rgb(240,240,240)", padding: "15px" }}>
            Messages
        <i className="fas fa-times-circle modalcloseicon" onClick={this.closeMsgThreadModal} style={{ float: "right", verticalAlign: "middle" }}></i><br />
          </div>
          <div className="messagethreadmodal">
          </div>
        </ReactModal>

      </div>
    )
  }
}

export default NavigationBar

