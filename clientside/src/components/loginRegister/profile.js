
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { searchQueryContext } from '../../navigationStack/navigation';
import { baseURL } from '../../App';

const ProfilePage = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState(null);
    const { handleLogin } = useContext(searchQueryContext);
    const navigate=useNavigate()
    const token = localStorage.getItem("TOKEN")
    console.log(token)

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.post(`${baseURL}/userDetails`,{} ,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data)
                setUserDetails(response.data.userDetails);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserDetails();

    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("login")
        handleLogin()
        navigate("/signIn")
        // Redirect to login page or any other desired action after logout
        // Example: window.location.href = '/login';
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container>
        {userDetails ? (
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>User Profile</Card.Title>
                            <Card.Text>
                                <p><strong>Name:</strong> {userDetails.username}</p>
                                <p><strong>Email:</strong> {userDetails.email}</p>
                                {/* Add more details as needed */}
                            </Card.Text>
                            <Button variant="danger" onClick={handleLogout}>Logout</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        ) : (
            <div>Loading...</div>
        )}
    </Container>
    );
};

export default ProfilePage;
