import React, { useContext, useEffect} from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Container } from "react-bootstrap"
import 'react-phone-number-input/style.css'
import { getAll } from "../http/userApi";
import AdminList from "../components/adminList";


const Admin = observer(() => {
    document.body.style.backgroundColor = "#faeedd"
    const { UserRequest } = useContext(Context)
    const new_getAllID = async () => {
        try {
            const response = await getAll()
            return response
        } catch (error) {
            alert(error)
        }
    }
    useEffect(() => {
        new_getAllID().then(data => { UserRequest.setUserRequest(data);})
    }, [AdminList]
    )

    return (
        <Container style={{ height: window.innerHeight - 54, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Card style={{ borderRadius: "26px", width: window.innerWidth - 100, height: window.innerHeight - 150, backgroundColor: "#ffdbbd", fontFamily: "Play", border: "5px solid #ffb999" }}>
                <p style={{
                    fontSize: "25px", display: "flex", justifyContent: "center",
                    fontWeight: "bold", color: "#911e42", height: "10px"
                }}>Нарушителям.Нет</p>
                <p style={{
                    marginLeft: "7%", fontWeight: "bold", fontSize: "120%", color: "black",
                    height: "2px", marginTop: "20%"
                }}>Заявления</p>
                 {UserRequest.getUserRequest() ? <AdminList user={UserRequest.getUserRequest()}/> : <div>Недостаточно прав!</div>}
            </Card>
        </Container>
    );
})

export default Admin;