import React, {useEffect, useState} from 'react';
import {Button, Modal, Message} from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

function CustomModal(props){

    let navigate = useNavigate();

    const [modalState, setModalState] = useState(
        {
            successPath: props.successPath,
            openModal: false,
            messageType: null,
            message: null
        }
    )  

    function modalCloseHandler(ev,atts){
        if(modalState.messageType === "success"){
            navigate(modalState.successPath)
        }
        props.modalInfo.openModal = false
        setModalState(
            {
                ...modalState,
                openModal: false
            }
        )
    }

    useEffect(()=>{
        setModalState({
            ...modalState,
            openModal: props.modalInfo.openModal,
            messageType: props.modalInfo.messageType,
            message: props.modalInfo.message
        })
    },[props])

    return(
        <Modal centered={false} closeIcon open={modalState["openModal"]} onClose={modalCloseHandler}>
            <Modal.Header>Message</Modal.Header>
            <Modal.Content>
                <Message 
                color= {
                        modalState["messageType"] === "success" ? 
                        "green"
                        :modalState["messageType"] === "warning" ?
                        "orange"
                        : "red" 
                    }
                >
                    <Message.Header>{modalState["message"]}</Message.Header>
                </Message>
            </Modal.Content>
            <Modal.Actions>
                <Button color='grey' onClick={modalCloseHandler}>
                    Close
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default CustomModal;