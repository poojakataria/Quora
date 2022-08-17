import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ProfileViews from './ProfileViews';
import AnswerViews from './AnswerViews';
import Upvotes from './Upvotes';
import Downvotes from './Downvotes';
import Bookmarks from './Bookmarks';

export class Stats extends Component {

    constructor(props){
        super(props);
        this.state = {
            key: "profileview",
            profileviews: null
        }
    }

    componentDidMount(){
        const profileviews = [
            {day:30, views: 1},
            {day:29, views: 131},
            {day:28, views: 51},
            {day:27, views: 11},
            {day:26, views: 0},
            {day:25, views: 66},
            {day:24, views: 23},
            {day:23, views: 13},
            {day:22, views: 90},
            {day:21, views: 12},
            {day:20, views: 10},
            {day:19, views: 150},
            {day:18, views: 90},
            {day:17, views: 9},
            {day:16, views: 10},
            {day:15, views: 80},
            {day:14, views: 55},
            {day:13, views: 12},
            {day:12, views: 199},
            {day:11, views: 10},
            {day:10, views: 40},
            {day:9, views: 22},
            {day:8, views: 1},
            {day:7, views: 0},
            {day:6, views: 1},
            {day:5, views: 0},
            {day:4, views: 40},
            {day:3, views: 10},
            {day:2, views: 19},
            {day:1, views: 55}
        ]
        //axios.get here
        profileviews.map((d) => { return d.name = d.day+" day ago" })
        this.setState({profileviews});
    }

  render() {
    return (
      <div className="stats">
      <h4>Stats</h4><br />
            <Tabs
                id="controlled-tab-example"
                activeKey={this.state.key}
                onSelect={key => this.setState({ key })}
            >
                <Tab eventKey="profileview" title="Profile Views">
                    <ProfileViews data={this.state.profileviews}  />
                </Tab>
                <Tab eventKey="answerview" title="Answer Views">
                    <AnswerViews />
                </Tab>
                <Tab eventKey="upvotes" title="Upvotes">
                    <Upvotes />
                </Tab>
                <Tab eventKey="downvotes" title="Downvotes">
                    <Downvotes />
                </Tab>
                <Tab eventKey="bookmarks" title="Bookmarks">
                    <Bookmarks />
                </Tab>
            </Tabs>
      </div>
    )
  }
}

export default Stats
