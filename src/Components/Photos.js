import React, { useEffect, Component } from "react"
import { connect } from 'react-redux'
import { loadPosts, spotLight, deletePhoto } from '../Action/action'
import PhotoCard from './PhotoCard'
import styled from 'styled-components'
import { Link, Route } from 'react-router-dom'
import { Button } from 'reactstrap'
import axiosWithAuth from '../axiosWithAuth/axiosWithAuth'
import Edit from './Edit'
import NoPostMessage from './NoPostMessage'



const StyledCardContainer = styled.div`
  display: flex;
 flex-wrap: wrap;
  justify-content: space-around;
  flex-direction:row
`

const StyledCard = styled.div`
  width: 800px;
  margin:20px;
`
const Photos = ({ images, loadPosts, isLoading, spotLight, deletePhoto }) => {
  function remove(e) {
    alert("Are you sure want to delete this post")
    console.log('Delete id ---> ', e.target.id)
    deletePhoto(e.target.id)
  }

  useEffect(() => {
    const id = localStorage.getItem('id')
    loadPosts(id)
    console.log(images)
  }, [])

  const spotLightPhoto = id => {
    spotLight(id)
  }

  return (
    <div>

      {!isLoading ?
        <StyledCardContainer>
          {console.log(images)}
          {images.map((image) => (
            <StyledCard id={image.id} onClick={() => spotLightPhoto(image.id)} >
              <Link to={`/photos/${image.id}`}>
                <PhotoCard image={image} key={image.id} height="900px" />
              </Link>
              <Link to="/Edit">
                <Button style={{ marginLeft: "25%" }}>Edit</Button>
              </Link>
              <Button style={{ marginLeft: "10%" }} id={image.id} onClick={remove}>Delete</Button>

            </StyledCard>
          ))}
        </StyledCardContainer>
        : <NoPostMessage />}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    images: state.data,
    isLoading: state.isLoading
  }
}

export default connect(mapStateToProps, { loadPosts, spotLight, deletePhoto })(Photos)
