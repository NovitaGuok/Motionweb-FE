import React, { useState } from 'react'
import api from '../../services/api'
import { Container, Button, Form, FormGroup, Alert, Input } from 'reactstrap'

export default function Register({ history }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [error, setError] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async evt => {
        evt.preventDefault()

        if (email !== "" && password !== "" && firstName !== "" && lastName !== "") {
            const response = await api.post('/user/register', { email, password, firstName, lastName })
            const user = response.data.user || false
            const user_id = response.data.user_id || false

            if (user && user_id) {
                localStorage.setItem('user', user)
                localStorage.setItem('user_id', user_id)
                history.push('/dashboard')
            } else {
                const { message } = response.data
                setError(true)
                setErrorMessage(message)
                setTimeout(() => {
                    setError(false)
                    setErrorMessage("")
                }, 2000);
            }
        } else {
            setError(true)
            setErrorMessage("All fields required!")
            setTimeout(() => {
                setError(false)
                setErrorMessage("")
            }, 2000);
        }
    }

    return (
        <Container>
            <h2>Register</h2>
            <p>Please <strong>Register</strong> for a new account.</p>
            <Form onSubmit={handleSubmit}>
                <div className="input-group">
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="firstName" name="firstName" id="firstName" placeholder="Your first name" onChange={evt => setFirstName(evt.target.value)} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="lastName" name="lastName" id="lastName" placeholder="Your last name" onChange={evt => setLastName(evt.target.value)} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="email" name="email" id="email" placeholder="Your email" onChange={evt => setEmail(evt.target.value)} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="password" name="password" id="password" placeholder="Your password" onChange={evt => setPassword(evt.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Button className="submit-btn">Submit</Button>
                    </FormGroup>
                    <FormGroup>
                        <Button className="secondary-btn" onClick={() => history.push('/login')}>Login instead?</Button>
                    </FormGroup>
                </div>
            </Form>
            {error ? (
                <Alert className="event-validation" color="danger">{errorMessage}</Alert>
            ) : ""}
        </Container>
    )
}