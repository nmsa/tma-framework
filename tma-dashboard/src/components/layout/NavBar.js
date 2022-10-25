import { Menu, Icon, Image, Grid } from 'semantic-ui-react'
import { useNavigate, useLocation } from 'react-router-dom';

function NavBar() {

  let navigate = useNavigate();

  const { pathname } = useLocation();

  function handleItemClick (e, { name }){
    switch (name) {
      case 'home':
        navigate("/");
        break;
      case 'metrics':
        navigate("/getMetrics")
        break;
      case 'qms':
        navigate("/getQualityModels")
        break;
      case 'resources':
        navigate("/getResources")
        break;
      case 'rules':
        navigate("/getAdaptationRules")
        break;
      default:
        console.log("Something went wrong");
    }
  }

  //ICONS THAT MAY BE NICE TO USE -> eye, HEARTBEAT, database, tasks, cogs, stethoscope, user md, band aid/ wrench,
  //dollar,euro, privacy, spy, chart bar outline
    return (
      <Grid style={{background: "#a7abae"}}>
        <Grid.Row centered>
          <Image src="/TMA_InitialLogo.png" wrapped size="medium"/>
          <Menu icon='labeled' stackable pointing secondary compact style={{marginLeft: "10px", marginTop: "auto", marginBottom: "auto"}}>
            <Menu.Item name='home' active={ pathname === '/'} onClick={handleItemClick}>
              <Icon name='dashboard' />
              Home
            </Menu.Item>

            <Menu.Item name='metrics' active={pathname === '/getMetrics'} onClick={handleItemClick}>
              <Icon name='info' />
              Metrics
            </Menu.Item>

            <Menu.Item name='qms' active={pathname === '/getQualityModels'} onClick={handleItemClick}>
              <Icon name='balance' />
              Quality Models
            </Menu.Item>

            <Menu.Item name='resources' active={pathname === '/getResources'} onClick={handleItemClick}>
              <Icon name='cloud' />
              Resources
            </Menu.Item>
            <Menu.Item name='rules' active={pathname === '/getAdaptationRules'} onClick={handleItemClick}>
              <Icon name='tasks' />
              Adaptation Rules
            </Menu.Item>
          </Menu>
        </Grid.Row>
      </Grid>
    )
}

export default NavBar;