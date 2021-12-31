import {Link} from 'react-router-dom'

const About = () => {
    return (
        <div>
            <h3 style={{textAlign: 'center',color: 'blue'}}>About As</h3><br></br>
            <h5>This App is use to show the information about  the task</h5>
            <p>version 1.0.0</p>
            <Link to="/"  >Go Back</Link> 
        </div>
    )
}

export default About
