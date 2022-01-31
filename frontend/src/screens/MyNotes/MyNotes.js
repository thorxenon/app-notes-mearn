import React, { useEffect } from 'react';
import { Accordion, Badge, Button, Card, useAccordionButton } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
import { useDispatch, useSelector } from 'react-redux';
import { listNotes, deleteNoteAction } from '../../actions/noteAction';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';


const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteList = useSelector(state=> state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const createNote = useSelector(state => state.createNote);
  const { success: successCreate } = createNote;

  const updateNote = useSelector(state => state.updateNote);
  const { success: successUpdate } = updateNote;

  const deleteNote = useSelector(state=> state.deleteNote);
  const { success: successDelete } = deleteNote;

  const deleteHandler = (id) =>{
    if(window.confirm('Are you sure?')){
        dispatch(deleteNoteAction(id))
    };
    navigate('/mynotes');
  };

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log('totally custom!'),
    );
  
    return (
      <button
        type="button"
        style={{
          border:"none",
          outline:"none",
          backgroundColor:"transparent" 
        }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  };

  useEffect(()=>{
    //setTimeout(()=>{
      dispatch(listNotes())
    //},500);

    if(!userInfo){
      navigate('/');
    };
  },[dispatch, successCreate, userInfo, successUpdate, successDelete]);

  return(
    <MainScreen title={`Welcome back ${userInfo.name.firstName} ...`}>
      <Link to="/createnote">
        <Button style={{marginLeft:10, marginBottom:6,}} size="lg">
          Create New Note
        </Button>
      </Link>
          {error && <ErrorMessage varaint='danger'>{error}</ErrorMessage>}
          {loading && <Loading/>}
          {notes?.reverse().filter((filteredNote) =>(
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )).map((note)=>(
              <Accordion eventkey="0" key={note._id}>
                <Card style={{margin:10}}>
                <Card.Header style={{display:"flex"}}>
                  <span style={{
                    color:"black",
                    textDecoration:'none',
                    flex:1,
                    cursor:"pointer",
                    alignSelf:"center",
                    fontSize:18
                  }}>
                      <CustomToggle
                        as={Card.Text}
                        variant="link"
                        eventKey="0"
                      >{note.title}</CustomToggle>
                  </span>
                <div>
                  <Button href={`/note/${note._id}`}>Edit</Button>
                  <Button variant="danger" className="mx-2" onClick={()=>deleteHandler(note._id)}>Delete</Button>
                </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <h4>
                      <Badge variant='success'> Category - {note.category} </Badge>
                    </h4>

                    <blockquote className="blockquote mb-0">
                      <p>
                        {note.content}
                      </p>
                        <footer className="blockquote-footer">
                          Created On - {" "}
                          <cite title="Source Title">
                            {note.createdAt.substring(0, 10)}
                          </cite>.
                        </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>  
                </Card>
              </Accordion>
          ))}
    </MainScreen>
  )
};

export default MyNotes;