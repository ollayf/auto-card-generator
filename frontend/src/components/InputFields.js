import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function InputFields() {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formGroupSender">
                <FloatingLabel label="Sender Name">
                    <Form.Control type="text" placeholder="Sender" />
                </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupRecipient">
                <FloatingLabel label="Recipient Name">
                    <Form.Control type="text" placeholder="Recipient" />
                </FloatingLabel>
            </Form.Group>
            <FloatingLabel controlId="floatingPrompt" label="Message">
                <Form.Control
                    as="textarea"
                    placeholder="Leave a message here"
                    style={{ height: '100px' }}
                />
            </FloatingLabel>
            <FloatingLabel controlId="floatingBibleVerse" label="Bible Verse (optional)">
                <Form.Control
                    as="textarea"
                    placeholder="Leave a bible verse here"
                    style={{ height: '100px' }}
                />
            </FloatingLabel>
            <Row className="g-2">
                <Col md>
                    <FloatingLabel controlId="floatingInputGrid" label="Prompt (to generate AI art)">
                        <Form.Control type="text"
                        placeholder="Prompt (to generate AI art)"
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
                        </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>
        </Form>
    );
}

export default InputFields;