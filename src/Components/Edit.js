import React, { useState, useEffect } from 'react'
import { Form, Label, Input, Button } from 'reactstrap'
import * as yup from 'yup'
import { addPost, spotLight } from '../Action/action'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import PhotoCard from './PhotoCard'
import styled from 'styled-components'

const Edit = (props) => {
  // console.log('EDIT COMPONENT ', props)
  const param = useParams().id
  const initialState = {
    photo_url: props.image.photo_url,
    photo_title: '',
    photo_description: ''
  }
  const [formState, setFormState] = useState(initialState)
  const [serverError, setServerError] = useState("")
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [errors, setErrors] = useState({
    photo_title: "",
    photo_description: "",
    photo_url: ""
  })
  const formSchema = yup.object().shape({
    photo_title: yup.string().required("Title is a required field"),
    photo_description: yup.string().required("Description is a required fiels"),
    photo_url: yup.string().required("Please enter a valid URL").matches(/[https://]/)
  })

  useEffect(() => {
    formSchema.isValid(formState).then(isFormValid => {
      setButtonDisabled(!isFormValid) // disabled= false if form is valid
    })
    props.spotLight(param)

    // setTimeout(setFormState({
    //   photo_url: props.image.photo_url,
    //   photo_title: props.image.photo_title,
    //   photo_description: props.image.photo_description
    // }), 900)
  }, [formState])

  const formSubmit = e => {
    e.preventDefault()
    console.log(formState)
    props.addPost(formState)
    setFormState(initialState)
  }

  const validateChange = e => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value) // value in input
      .then(inputIsValid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        })
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        })
      })
  }

  const inputChange = e => {
    e.persist()

    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.value
    }

    validateChange(e)
    setFormState(newFormData)
  }

  const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  `
  console.log('SPOTLIGHT ', props.image)
  return (
    <>
      {props.spotLight !== undefined ?
        <StyledContainer>
          <Form onSubmit={formSubmit}>
            {serverError ? <p className="error">{serverError}</p> : null}
            <Label for="photo_title">
              <legend>Title</legend>
              <Input
                id="photo_title"
                type="text"
                name="photo_title"
                onChange={inputChange}
                value={props.image.photo_title}
              />
              {errors.photo_title === '' ? <p className="error">{errors.photo_title}</p> : null}
            </Label><br />
            <Label htmlFor="photo_description">
              <legend>photo_description</legend>
              <Input
                type="textarea"
                name="photo_description"
                id="photo_photo_description"
                placeholder="Please enter details here"
                value={formState.photo_description}
                onChange={inputChange}
              />
              {errors.photo_description === '' ? (
                <p className="error">{errors.photo_description}</p>
              ) : null}
            </Label>
            <br />
            <Label htmlFor="photo_url">
              <legend>Image photo_url</legend>
              <Input
                type="url"
                name="photo_url"
                id="photo_url"
                placeholder="Please enter image URL here"
                value={formState.photo_url}
                onChange={inputChange}
              />
              {errors.photo_url.length > 0 ? (
                <p className="error">{errors.photo_url}</p>
              ) : null}
            </Label>
            <br />
            <Button type="submit" disabled={buttonDisabled}> Post </Button>
          </Form>
        </StyledContainer>
        : null
      }
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    image: state.spotLight || ''
  }
}

export default connect(mapStateToProps, { addPost, spotLight })(Edit)

// export default Posts