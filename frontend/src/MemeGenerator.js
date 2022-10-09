import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

/**
 * Initialize state to save the following data:
 *      top text
 *      bottom text
 *      random image (intialize with "http://i.imgflip.com/1bij.jpg")
 */

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            SenderName: "",
            RecepientName: "",
            Message: "",
            BibleVerse: "",
            Prompt: "",
            Theme: "", //edit the values for themes under inputfields.js
            // topText: "",
            // bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    /**
     * We'll be using an API that provides a bunch of meme images.
     * 
     * Your task:
     * make an API call to "https://api.imgflip.com/get_memes" and save the 
     * data that comes back (`response.data.memes`) to a new state property
     * called `allMemeImgs`. (The data that comes back is an array)
     */
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                this.setState({ allMemeImgs: memes })
            })
    }

    /**
     * Create the onChange handler method
     * It should update the corresponding state on every change of the input box
     */
    handleChange(event) {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    /**
     * Create a method that, when the "Gen" button is clicked, chooses one of the
     * memes from our `allMemeImgs` array at random and makes it so that is the
     * meme image that shows up in the bottom portion of our meme generator site (`.url`)
     */

    handleSubmit(event) {
        event.preventDefault()
        // get a random int (index in the array)
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
        // get the meme from that index
        const randomMemeImg = this.state.allMemeImgs[randNum].url //just want the url of the random image
        this.setState({ randomImg: randomMemeImg })
        // set `randomImg` to the `.url` of the random item I grabbed

    }

    render() {
        return (
            <div>
                {
                    // <h2>{this.state.topText}</h2>
                    // <img src={this.state.randomImg}/>
                    // <h2>{this.state.bottomText}</h2>
                }
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupSender">
                        <FloatingLabel label="Sender Name">
                            <Form.Control
                                type="text"
                                placeholder="Sender"
                                value={this.state.SenderName}
                                onChange={e => this.setState({ SenderName: e.target.value })}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupRecipient">
                        <FloatingLabel label="Recipient Name">
                            <Form.Control
                                type="text"
                                placeholder="Recipient"
                                value={this.state.RecepientName}
                                onChange={e => this.setState({ RecepientName: e.target.value })}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <FloatingLabel controlId="floatingPrompt" label="Message">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a message here"
                            style={{ height: '100px' }}
                            value={this.state.Message}
                            onChange={e => this.setState({ Message: e.target.value })}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingBibleVerse" label="Bible Verse (optional)">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a bible verse here"
                            style={{ height: '100px' }}
                            value={this.state.BibleVerse}
                            onChange={e => this.setState({ BibleVerse: e.target.value })}
                            />
                    </FloatingLabel>
                    <Row className="g-2">
                        <Col md>
                            <FloatingLabel controlId="floatingInputGrid" label="Prompt (to generate AI art)">
                                <Form.Control
                                    type="text"
                                    placeholder="Prompt (to generate AI art)"
                                    value={this.state.Prompt}
                                    onChange={e => this.setState({ Prompt: e.target.value })}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel
                                controlId="floatingSelectTheme"
                            >
                                <Form.Select aria-label="Floating label select theme">
                                    <option>Select a Theme</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                    <option value="4">Four</option>
                                    <option value="5">Five</option>
                                    <option value="6">Six</option>
                                    <option value="7">Seven</option>
                                    
                                    theme = {this.state.Theme} {/* not sure about this part */}
                                    onChange={e => this.setState({ theme: e.target.value })}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Form>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    {
                        /**
                         * Create 2 input fields, one for the topText and one for the bottomText
                         * Remember that these will be "controlled forms", so make sure to add
                         * all the attributes you'll need for that to work
                         */
                    }
                    {/* <input
                        type="text"
                        name="topText"
                        value={this.state.topText}
                        placeholder="Top Text"
                        onChange={this.handleChange}
                    />

                    <br />

                    <input
                        type="text"
                        name="bottomText"
                        value={this.state.bottomText}
                        placeholder="Bottom Text"
                        onChange={this.handleChange}
                    /> */}


                    <button>Generate</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator;