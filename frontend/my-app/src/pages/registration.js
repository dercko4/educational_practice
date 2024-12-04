import React, { useContext, useState } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { registration } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { LOGIN_ROUTE, MAKE_REQUEST_ROUTE } from "../utils/consts";
import { Button, Card, Container, Form } from "react-bootstrap"


const Registration = observer(() => {
    document.body.style.backgroundColor = "#faeedd"
    const { user } = useContext(Context)
    const navigate = useNavigate()
    const location = useLocation()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [FIO, setFIO] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const submit = async () => {
        try {
            const response = await registration(login, password, FIO, phone, email)
            if (!response) return
            user.setUser()
            user.setIsAuth(true)
            navigate(MAKE_REQUEST_ROUTE)
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    return (
        <Container style={{ height: window.innerHeight - 54, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Card style={{ borderRadius: "26px", width: window.innerWidth - 100, height: window.innerHeight - 150, backgroundColor: "#ffdbbd", fontFamily: "Play", border: "5px solid #ffb999" }}>
                <p style={{ fontSize: "25px", display: "flex", justifyContent: "center", fontWeight: "bold", color: "#911e42" }}>Нарушителям.Нет</p>
                <p style={{ marginLeft: "7%", fontWeight: "bold", fontSize: "120%", color: "black", height: "2px" }}>Регистрация</p>
                <p style={{ marginLeft: "7%", fontSize: "80%", color: "gray", marginTop: "0px" }}>
                    Пожалуйста, введите данные для создания учётной записи
                </p>
                <Form className="d-flex flex-column" style={{ justifyContent: "center" }}>
                    <Form.Control
                        style={{
                            backgroundColor: "#f5e3d7",
                            height: window.innerHeight - 810, width: window.innerWidth - 175, marginLeft: "7%", border: "2px solid #854f46",
                            borderRadius: "30px", paddingLeft: "15px", marginTop: "4%"
                        }}
                        placeholder="Ваше ФИО..."
                        value={FIO}
                        onChange={(e) => setFIO(e.target.value)}
                    />
                    <Form.Control
                        style={{
                            backgroundColor: "#f5e3d7",
                            height: window.innerHeight - 810, width: window.innerWidth - 175, marginLeft: "7%", border: "2px solid #854f46",
                            borderRadius: "30px", paddingLeft: "15px", marginTop: "4%"
                        }}
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder="Ваш логин..."
                    />
                    <Form.Control
                        style={{
                            backgroundColor: "#f5e3d7",
                            height: window.innerHeight - 810, width: window.innerWidth - 175, marginLeft: "7%", border: "2px solid #854f46",
                            borderRadius: "30px", paddingLeft: "15px", marginTop: "4%"
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ваш пароль..."
                    />
                    <Form.Control
                        style={{
                            backgroundColor: "#f5e3d7",
                            height: window.innerHeight - 810, width: window.innerWidth - 175, marginLeft: "7%", border: "2px solid #854f46",
                            borderRadius: "30px", paddingLeft: "15px", marginTop: "4%"
                        }}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ваш телефон..."
                    />
                    <Form.Control
                        style={{
                            backgroundColor: "#f5e3d7",
                            height: window.innerHeight - 810, width: window.innerWidth - 175, marginLeft: "7%", border: "2px solid #854f46",
                            borderRadius: "30px", paddingLeft: "15px", marginTop: "4%"
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ваш email..."
                    />

                </Form>
                <div style={{ color: "blue", display: "flex", marginLeft: "40%", marginTop: "2%" }}>
                    <NavLink to={LOGIN_ROUTE}>
                        Войти
                    </NavLink>
                </div>
                <Button
                    style={{
                        display: 'flex', justifyContent: 'center', fontWeight: 'bold', borderRadius: '30px', width: '200px',
                        height: '50px', fontSize: '15px', border: "2px solid", alignItems: "center",
                        backgroundColor: '#595959', borderColor: 'black',
                        color: 'white', textShadow: '-1px -1px 0 black, 2px -1px 0 black, -2px  2px 0 black, 2px  2px 0 black',
                        marginLeft: '45px', marginTop: "10%"
                    }}
                    variant={"outline-dark"}
                    size="lg"
                    onClick={submit}>
                    Зарегистрироваться
                </Button>
            </Card>
        </Container>
    );
})

export default Registration;