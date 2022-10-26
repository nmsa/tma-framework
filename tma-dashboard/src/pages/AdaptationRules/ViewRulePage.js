import { Loader, Divider, Header, Button, Grid, Container, Segment, Modal, Message} from 'semantic-ui-react'
import ApiModule from "../../utils/api/ApiModule"
import {useState, useEffect} from "react"
import { useNavigate ,useParams } from 'react-router-dom';

function ViewRulePage(props){
    let navigate = useNavigate();
    
    const ruleName = useParams()["ruleName"];
    
    const [apiData, setAPIData] = useState(null);

    const [removeButtonLoad, setRemoveButtonLoad] = useState(false);

    const [deleteResponseMessage, setDeleteResponseMessage] = useState({"openModal": false})

    async function makeAPIRequest(){
        let res = await ApiModule().getRuleCode(ruleName)
        setAPIData(res)
    }

    //Execute upon component rendering
    useEffect(() => {
        //perform API request
        makeAPIRequest()
    },[]);

    async function deleteRuleHandler(){
        setRemoveButtonLoad(true)
        let resData = await ApiModule().removeRule(ruleName)
        setRemoveButtonLoad(false)
        resData["openModal"] = true
        setDeleteResponseMessage(resData)
    }

    function modalCloseHandler(ev,atts){
        if(deleteResponseMessage.messageType === "success"){
            navigate("/getAdaptationRules")
        }
        setDeleteResponseMessage(
            {
                ...deleteResponseMessage,
                openModal: false
            }
        )
    }

    return (
        <div>
            <Grid centered>
                <Grid.Row> 
                    <Grid.Column>
                        <Divider section horizontal>
                            <Header  as="h1" textAlign="center">Rule Detail</Header> 
                        </Divider>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <br/>
            {
                //if apiData is null, then it is because the response from the API hasn't arrived
                apiData === null ? <Loader active inline='centered'> Retrieving content</Loader> :

                <Grid centered columns={1}> 
                    <Grid.Column>
                        <Container>
                            <Segment compact style={{margin: "auto"}}>     
                                <Header  style={{color: "#0057b3"}} as="h2" textAlign="center">{ruleName}</Header>
                                <Divider section horizontal>
                                    <Header as="h4" textAlign="center"> Definition </Header> 
                                </Divider>
                                
                                <code style={{whiteSpace: "pre-wrap", color: "#0057b3"}}>{apiData}</code>
                                <Divider></Divider>
                                <Button loading={removeButtonLoad} floated='right' negative onClick={deleteRuleHandler}>Delete</Button>
                            </Segment>
                        </Container>
                    </Grid.Column>
                    <Modal centered={false} closeIcon open={deleteResponseMessage["openModal"]} onClose={modalCloseHandler}>
                        <Modal.Header>Message</Modal.Header>
                        <Modal.Content>
                            <Message 
                            color= {
                                    deleteResponseMessage["messageType"] === "success" ? 
                                    "green"
                                    :deleteResponseMessage["messageType"] === "warning" ?
                                    "orange"
                                    : "red" 
                                }
                            >
                                <Message.Header>{deleteResponseMessage["message"]}</Message.Header>
                            </Message>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='grey' onClick={modalCloseHandler}>
                                Close
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </Grid>
            }
        </div>
        
    )
}

export default ViewRulePage;