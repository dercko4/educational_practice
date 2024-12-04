import React, { useContext, useState } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { insertRequest } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { LOGIN_ROUTE, REQUEST_ROUTE } from "../utils/consts";
import { Button, Card, Container, Form } from "react-bootstrap"

const MakeRequest = observer(() => {
    document.body.style.backgroundColor = "#faeedd"
    const { user } = useContext(Context)
    const navigate = useNavigate()
    const [car_number, setCar_Number] = useState('')
    const [description, setDescription] = useState('')
    const submit = async () => {
        try {
            const response = await insertRequest(car_number, description)
            console.log(response)
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
    return (
        <Container style={{ height: window.innerHeight - 54, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Card style={{ borderRadius: "26px", width: window.innerWidth - 100, height: window.innerHeight - 150, backgroundColor: "#ffdbbd", fontFamily: "Play", border: "5px solid #ffb999" }}>
                <p style={{ marginLeft: "12%", fontWeight: "bold", fontSize: "120%", color: "black", height: "2px", marginTop:'25px' }}>Новое заявление</p>
                <p style={{ marginLeft: "12%", fontWeight: "bold", fontSize: "80%", color: "gray", marginTop: "50%" }}>Гос. номер с регионом
                    <Form className="d-flex flex-column">
                        <Form.Control
                            style={{
                                backgroundColor: "#f5e3d7", marginBottom:'5%',
                                height: window.innerHeight - 810, width: window.innerWidth - 175, border: "2px solid #854f46",
                                borderRadius: "30px", paddingLeft: "15px"
                            }}
                            
                            value={car_number}
                            onChange={(e) => setCar_Number(e.target.value)}
                        />
                    
                        Описание нарушения
                        <Form.Control
                            style={{
                                backgroundColor: "#f5e3d7",
                                height: window.innerHeight - 810, width: window.innerWidth - 175, border: "2px solid #854f46",
                                borderRadius: "30px", paddingLeft: "15px"
                            }}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form>
                </p>
                <div style={{ color: "blue", display: "flex", marginLeft: "35%", marginTop: "2%" }}>
                    <NavLink to={REQUEST_ROUTE}>
                        Мои заявки
                    </NavLink>
                </div>
                <Button
                    style={{
                        display: 'flex', justifyContent: 'center', fontWeight: 'bold', borderRadius: '30px', width: '200px',
                        height: '50px', fontSize: '15px', border: "2px solid", alignItems: "center",
                        backgroundColor: '#595959', borderColor: 'black',
                        color: 'white', textShadow: '-1px -1px 0 black, 2px -1px 0 black, -2px  2px 0 black, 2px  2px 0 black',
                        marginLeft: '45px', marginTop:'90%'
                    }}
                    variant={"outline-dark"}
                    size="lg"
                    onClick={submit}
                    >
                    Создать заявку
                </Button>
                
            </Card>
        </Container>
    );
})

export default MakeRequest;