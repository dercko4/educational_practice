import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { REGISTRATION_ROUTE, REQUEST_ROUTE } from "../utils/consts";
import { Button, Card, Container, Form } from "react-bootstrap"




const Auth = observer(() => {
    document.body.style.backgroundColor = "#faeedd"
    const { user } = useContext(Context)
    const navigate = useNavigate()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const submit = async () => {
        try {
            const response = await auth(login, password)
            if(!response) return
            user.setUser()
            user.setIsAuth(true)
            navigate(REQUEST_ROUTE)
        } catch (error) {
            console.log(error.message)
            alert(error.message)
        }
    }

    return (
        <Container style={{ height: window.innerHeight - 54, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Card style={{ borderRadius: "26px", width: window.innerWidth - 100, height: window.innerHeight - 150, backgroundColor: "#ffdbbd", fontFamily: "Play", border: "5px solid #ffb999" }}>
                <p style={{ fontSize: "25px", display: "flex", justifyContent: "center", fontWeight: "bold", color: "#911e42" }}>Нарушителям.Нет</p>
                <p style={{ marginLeft: "7%", fontWeight: "bold", fontSize: "120%", color: "black", marginTop: "50%" }}>Авторизация</p>
                <Form className="d-flex flex-column" style={{ justifyContent: "center" }}>
                    <Form.Control
                        style={{
                            backgroundColor: "#f5e3d7",
                            height: window.innerHeight - 810, width: window.innerWidth - 175, marginLeft: "7%", border: "2px solid #854f46",
                            borderRadius: "30px", paddingLeft: "15px", marginTop: "10%"
                        }}
                        placeholder="Ваш логин..."
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </Form>
                <Form className="d-flex flex-column" style={{ justifyContent: "center" }}>
                    <Form.Control
                        style={{
                            backgroundColor: "#f5e3d7",
                            height: window.innerHeight - 810, width: window.innerWidth - 175, marginLeft: "7%", border: "2px solid #854f46",
                            borderRadius: "30px", paddingLeft: "15px", marginTop: "10%"
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ваш пароль..."
                    />
                </Form>
                <div style={{color: "blue", display: "flex", marginLeft:"30%", marginTop:"3%"}}>
                    <NavLink to={REGISTRATION_ROUTE}>
                    Регистрация
                    </NavLink>
                </div>
                <Button
                    style={{
                        display: 'flex', justifyContent: 'center', fontWeight: 'bold', borderRadius: '30px', width: '200px',
                        height: '50px', fontSize: '20px', border: "2px solid", alignItems: "center",
                        backgroundColor: '#595959', borderColor: 'black',
                        color: 'white', textShadow: '-1px -1px 0 black, 2px -1px 0 black, -2px  2px 0 black, 2px  2px 0 black',
                        marginLeft: '45px', marginTop: "100px"
                    }}
                    variant={"outline-dark"}
                    size="lg"
                    onClick={submit}>
                    Войти
                </Button>
            </Card>
        </Container>
    );
})

export default Auth;