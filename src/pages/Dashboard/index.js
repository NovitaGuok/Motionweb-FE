import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import moment from 'moment'
import { ButtonGroup, Button } from 'reactstrap'
import './dashboard.css'

export default function Dashboard({ history }) {
    const [events, setEvents] = useState([])
    const user_id = localStorage.getItem('user')
    const [cSelected, setCSelected] = useState([]);
    const [rSelected, setRSelected] = useState(null);

    useEffect(() => {
        getEvents()
    }, [])

    const filterHandler = (query) => {
        setRSelected(query)
        getEvents(query)
    }

    const getEvents = async (filter) => {
        const url = filter ? `/dashboard/${filter}` : '/dashboard'
        const response = await api.get(url, { headers: { user_id } })

        setEvents(response.data)
    }

    console.log(events)

    return (
        <>
            <div>Filter:
                <ButtonGroup>
                    <Button color="primary" onClick={() => filterHandler(null)} active={rSelected === null}>All Categories</Button>
                    <Button color="primary" onClick={() => filterHandler('motiontalk')} active={rSelected === 'motiontalk'}>Motion Talk</Button>
                    <Button color="primary" onClick={() => filterHandler('motionfun')} active={rSelected === 'motionfun'}>Motion Fun</Button>
                </ButtonGroup>
                <Button color="secondary" onClick={() => history.push('/events')}>Events</Button>
            </div>
            <ul className="events-list">
                {events.map(event => (
                    <li key={event._id}>
                        <header style={{ backgroundImage: `url(${event.thumbnail_url})` }} />
                        <strong>{event.title}</strong>
                        <span>Date: {moment(event.date).format('dddd, DD-MM-YYYY')}</span>
                        <span>Price: {parseFloat(event.price).toFixed(2)}</span>
                        <span>{event.description}</span>
                        <Button color="primary">Subscribe</Button>
                    </li>
                ))}
            </ul >
        </>
    )
}