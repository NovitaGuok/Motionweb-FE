import React, { useState, useMemo } from 'react'
import api from '../../services/api'
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import cameraIcon from '../../assets/camera.png'
import './events.css'

export default function EventsPage() {
    const user_id = localStorage.getItem('user')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [category, setCategory] = useState('')
    const [date, setDate] = useState('')

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    }, [thumbnail])

    console.log(title, description, price, category)

    const submitHandler = () => {
        return ""
    }

    return (
        <Container>
            <h1>Create your Event</h1>
            <Form onSubmit={submitHandler}>
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
                    <Input id="price" type="text" value={price} placeholder={'Event price'} onChange={(evt) => setPrice(evt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Date: </Label>
                    <Input id="date" type="date" value={date} placeholder={'Event date'} onChange={(evt) => setDate(evt.target.value)} />
                </FormGroup>
                <Button type="submit">
                    Create Event
                </Button>
            </Form>
        </Container>
    )
}