import { Button, Card, Form } from "react-bootstrap";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import ReactMarkdown from 'react-markdown';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createNoteAction } from '../../actions/noteAction'


export const CreateNote = ({ history })=> {
    const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState("");
    const [ category, setCategory ] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const createNote = useSelector(state => state.createNote);
    const { loading, error, note } = createNote;

    const resetHandler = () =>{
        setTitle("");
        setContent("");
        setCategory("");
    };

    const submitHandler = (e) =>{
        e.preventDefault();

        dispatch(createNoteAction(title, content, category))

        if(!title || !content || !category) return;

        resetHandler();
        navigate('/mynotes');  
    };

    return(
        <MainScreen title="REGISTER">
            <Card>
                <Card.Header>Create a new note</Card.Header>
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                        {error && <ErrorMessage variant='danger'>{}</ErrorMessage>}
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='title'
                                value={title}
                                placeholder="Enter the title"
                                onChange={(e)=> setTitle(e.target.value)}
                            />
                        </Form.Group>         

                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                type='content'
                                value={content}
                                placeholder="Enter the Content"
                                onChange={(e)=> setContent(e.target.value)}
                                style={{resize:'none'}}
                            />
                        </Form.Group>

                        {content && (
                            <Card>
                                <Card.Header>Note Preview</Card.Header>
                                <Card.Body>
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </Card.Body>
                            </Card>
                        )}

                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='content'
                                value={category}
                                placeholder="Enter the Category"
                                onChange={(e)=> setCategory(e.target.value)}
                                style={{ marginBottom:20 }}
                            />
                        </Form.Group>
                        {loading && <Loading size={50}/>}
                        <Button type="submit" variant="primary">Create Note</Button>
                        <Button className="mx-2" onClick={resetHandler} type="submit" variant="danger">Reset Fields</Button>
                    </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                    Creating on - {new Date().toLocaleDateString()} 
                </Card.Footer>
            </Card>
        </MainScreen>
    )
}

export default CreateNote;