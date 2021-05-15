import React, { useState, useMemo } from 'react'
import api from '../../services/api'
import { Container, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import cameraIcon from '../../assets/camera.png'
import './events.css'

export default function EventsPage() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [category, setCategory] = useState('')
    const [date, setDate] = useState('')
    const [errorMessage, setErrorMessage] = useState(false)

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    }, [thumbnail])

    const submitHandler = async (evt) => {
        evt.preventDefault()

        const user_id = localStorage.getItem('user')
        const eventData = new FormData()

        eventData.append('thumbnail', thumbnail)
        eventData.append('category', category)
        eventData.append('title', title)
        eventData.append('price', price)
        eventData.append('description', description)
        eventData.append('date', date)

        try {
            if (title !== "" && description !== "" && price !== "" && category !== "" && date !== "" && thumbnail !== null) {
                await api.post('/event', eventData, { headers: { user_id } })
                console.log(user_id, title, description, price, category, date)

            } else {
                setErrorMessage(true)
                setTimeout(() => {
                    setErrorMessage(false)
                }, 2000);

                console.log("Missing required data!")
            }
        } catch (error) {
            Promise.reject(error)
            console.log(error)
        }
    }

    return (
        <Container>
            <h1>Create your Event</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <FormGroup>
                        <Label>Upload Image: </Label>
                        <Label id="thumbnail" style={{ backgroundImage: `url(${preview})` }} className={thumbnail ? 'has-thumbnail' : ''} >
                            <Input type="file" onChange={evt => setThumbnail(evt.target.files[0])} />
                            <img src={cameraIcon} style={{ maxWidth: "50px" }} aria-hidden alt="Upload icon image" />
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>Category: </Label>
                        <Input id="category" type="text" value={category} placeholder={'Event category'} onChange={(evt) => setCategory(evt.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Title: </Label>
                        <Input id="title" type="text" value={title} placeholder={'Event title'} onChange={(evt) => setTitle(evt.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Description: </Label>
                        <Input id="description" type="text" value={description} placeholder={'Event description'} onChange={(evt) => setDescription(evt.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Price: </Label>
                        <Input id="price" type="number" value={price} placeholder={'Event price Rp0.0'} onChange={(evt) => setPrice(evt.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Date: </Label>
                        <Input id="date" type="date" value={date} placeholder={'Event date'} onChange={(evt) => setDate(evt.target.value)} />
                    </FormGroup>
                    <Button type="submit">
                        Create Event
                    </Button>
                </FormGroup>
            </Form>
            {errorMessage ? (
                <Alert className="event-validation" color="danger">Missing required information</Alert>
            ) : ""}
        </Container>
    )
}