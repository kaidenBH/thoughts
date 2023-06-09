import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper, Container } from '@material-ui/core';
import useStyles from './styles';
import ChipInput from 'material-ui-chip-input';
import FileBase from 'react-file-base64';
import IconButton from '@mui/material/IconButton';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId, setAnchorEl }) => {
  const [postData, setPostData] = useState ({ title: '', message: '', selectedFile: ''})
  const [tags, setTags] = useState([]);
  const classes = useStyles();
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if(post) {
      setPostData(post);
      setTags(post.tags);
    }
  },[post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(currentId){
      dispatch(updatePost(currentId, {...postData, tags: tags, name: user?.result.name}));
    } 
    else{
      dispatch(createPost({...postData, tags: tags, name: user?.result.name}));
    }
    clear();
    setAnchorEl(null);
    ScrollToTopButton();
  }
  const clear = () => {
    setCurrentId(null);
    setPostData({ title: '', message: '', selectedFile: '' });
    setTags([]);
  }
  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  }
  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  }
  function ScrollToTopButton() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if(!user?.result?.name) {
    return (
      <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper}>
          <Typography variant='h6' align='center'>
            Please Sign In to be able to Create your own Posts.
          </Typography>
        </Paper>
      </Container>
    )
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper}>
        <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant='h6'>{currentId ? 'Edit the ' : 'Create a '}Post</Typography>
          <TextField name='title' variant='outlined' label='Title' fullWidth required value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
          <TextField name='message' variant='outlined' label='Message' multiline required maxRows={3} fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
          <ChipInput name='tags' variant='outlined' label="Tags" fullWidth style={{margin: '10px 8px'}} value={tags} onAdd={handleAdd} onDelete={handleDelete} />
          <IconButton  color="primary" aria-label="upload picture" component="label">
            <AddPhotoAlternateIcon sx={{ fontSize: 40 }}/>
            <div className={classes.fileInput}>
              <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}/>
            </div>          </IconButton> 
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
      </Paper>
    </Container>
  )
}

export default Form