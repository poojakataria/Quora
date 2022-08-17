import React, { Component } from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';
import { Row, Col } from 'react-bootstrap';

export class Downvotes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        const data = [
            { answer:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", downvotes: 100},
            { answer:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", downvotes: 90},
            { answer:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", downvotes: 85},
            { answer:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", downvotes: 70},
            { answer:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", downvotes: 60}
        ]
        //axios.get here
        data.map((d) => { return d.name = d.answer.slice(0, 10)+"..." })
        this.setState({ data });
    }

    render() {
        return (
            <div className="answerviews">
                <Row>
                    <Col sm={6} >
                        {(this.state.data).map((data, index) => {
                            return <p key={index} className="answerviewlist">{data.answer.slice(0, 70)}
                                {(data.answer.length > 70) ? "..." : null}
                            </p>
                        })}
                    </Col>
                    <Col sm={6} >
                        <PieChart width={400} height={400} >
                            <Pie dataKey="downvotes" isAnimationActive={true} data={this.state.data} cx={200} cy={200} innerRadius={40} outerRadius={80} fill="#8884d8" label />
                            <Tooltip />
                        </PieChart>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Downvotes
