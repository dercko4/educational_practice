import ListGroup from "react-bootstrap/ListGroup";
import { observer } from "mobx-react-lite";
import { Col } from "react-bootstrap";


const RequestList = observer(({ user }) => {
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
                            {data.status == "новое" ? <div style={{ color: "blue" }}>Новое</div> : data.status == "denied" ? <div
                                style={{ color: "red" }}>Отклонено</div> :
                                <div style={{ color: "green" }}>Подтверждено</div>}
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

export default RequestList;