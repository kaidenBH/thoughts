import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post'
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const isLoading = useSelector((state) => state.loading);
  const classes = useStyles();


  if(!posts.length && !isLoading) return null;
  return (
    isLoading? <CircularProgress thickness={6} size={70} color='secondary' className={classes.loadingPosts} /> : (
      <Grid className={classes.container} container alignItems='stretch' spacing={3}>
        { posts.slice().reverse().map((post)=> (
          <Grid key={post.id} item xs={12} sm={4} md={3}>
            <Post post={post} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
      </Grid>
    )
  );
}

export default Posts