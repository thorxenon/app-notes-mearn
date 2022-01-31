import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteNoteAction, updateNoteAction } from '../../actions/noteAction'
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';

import MainScreen from '../../components/MainScreen';

const SingleNote = ({ match, history}) => {

  const [ title, setTitle ] = useState();
  const [ content, setContent ] = useState();
  const [ category, setCategory ] = useState();
  const [ date, setDate ] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const updateNote = useSelector(state => state.updateNote);
  const { loading, error } = updateNote;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  

  useEffect(() => {
    const fetching = async() =>{
      const config ={
        headers:{
          authorization:`Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(
        `/api/notes/${id}`,
        config
      );

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [id, date]);

  const resetHandler = () =>{
    setTitle("");
    setContent("");
    setCategory("");
  };

  const updateHandler = (e) =>{
    e.preventDefault();
    dispatch(updateNoteAction(id, title, content, category));

    if(!title || !content || !category) return;

    resetHandler();
    //setTimeout(()=>{
      navigate('/mynotes')
    //},500);
  };

  const deleteHandler = (id) =>{
    if(window.confirm('Are you sure')){
      dispatch(deleteNoteAction(id));
    };
    navigate('/mynotes');
  };

  return (
    <MainScreen title="EDIT NOTE">
      <Card>
        <Card.Header>Edit Your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='title'
                placeholder='Enter the title'
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                style={{marginBottom:10}}
              />
            </Form.Group>

            <Form.Group controlId='content'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Enter the content'
                rows={4}
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                style={{marginBottom:10}}
              />
            </Form.Group>

            {content && (
                <Card>
                  <Card.Header>Note Preview</Card.Header>
                  <Card.Body>
                    <ReactMarkdown
                      style={{marginBottom:10}}
                    >{content}</ReactMarkdown>
                  </Card.Body>
                </Card>
            )}

            <Form.Group controlId='content'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='content'
                placeholder='Enter the Category'
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                style={{marginBottom:10}}
              />
            </Form.Group>
            {loading && <Loading size={50}/>}
            <Button variant='primary' type='submit'>Update Note</Button>
            <Button
              className="mx-2"
              variant='danger'
              onClick={()=>deleteHandler(id)}
            >Delete Note</Button>
          </Form>
        </Card.Body>

        <Card.Footer>
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default SingleNote;
