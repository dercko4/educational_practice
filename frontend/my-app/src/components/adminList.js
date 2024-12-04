import ListGroup from "react-bootstrap/ListGroup";
import { observer } from "mobx-react-lite";
import { Button, Col } from "react-bootstrap";
import { updateAccess, updateDenied, getAll, getAllID } from "../http/userApi"
import { useContext} from "react";
import { Context } from "../index";

const AdminList = observer(({ user }) => {
    const { UserRequest } = useContext(Context)
    const denied = async (id_request) => {
        try {
            const response = await updateDenied(id_request)
            await getAll().then(data => { UserRequest.setUserRequest(data)})
            return response
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
    const access = async (id_request) => {
        try {
            const response = await updateAccess(id_request)
            const admin = await getAll().then(data => { UserRequest.setUserRequest(data)})
            if(!admin) await getAllID().then(data => { UserRequest.setUserRequest(data)}) 
            return response
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
    return (
        <ListGroup style={{
            display: "inline-block",
            maxWidth: 300, borderRadius: "0 px",
            marginLeft: 15, color: '#FFFFFF4D',
            overflow: 'scroll', height: "500px", marginTop: "10px"
        }}>
            {
                
                user.map((data) => (
                    <ListGroup.Item key={data.id_request} style={{ backgroundColor: '#FFFFFF4D' }}>
                        
                        <Col style={{
                            maxHeight: "120px", width: "100", border: "1px solid black",
                            borderRadius: "10px", marginTop: "10px", overflow: 'scroll'
                        }}>
                            {data.status == "новое" ? <div style={{ color: "blue" }}>Новое<Button style={{
                                display: "inline-block",
                                marginLeft: "50%"
                            }} onClick={() => denied(data.id_request)}>
                                Отклонить</Button><Button style={{  
                                    display: "inline-block",
                                }} onClick={() => {access(data.id_request)}}>
                                    Подтвердить</Button></div> : data.status == "denied" ? <div
                                        style={{ color: "red" }}>Отклонено</div> : data.status == "подтверждено" ?
                                <div style={{ color: "green" }}>Подтверждено</div> : ''}
                            <div style={{ color: "black" }}>Гос. номер нарушителя: <div>{data.car_number}</div>
                            </div>
                            <div style={{ color: "black" }}>Описание: <div>{data.description}</div>
                            </div>
                            <div style={{ color: "black" }}>{data.status == "новое" ? <div>Создана {data.date.split("-")[2].split("T")[0]}.
                                {data.date.split("-")[1]}.{data.date.split("-")[0]} в {data.date.split("-")[2].split("T")[1].split(".")[0]}
                            </div> : <div>Изменён статус {data.date.split("-")[2].split("T")[0]}.
                                {data.date.split("-")[1]}.{data.date.split("-")[0]} в {data.date.split("-")[2].split("T")[1].split(".")[0]}</div>}</div>
                        </Col>
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    )
})

export default AdminList;