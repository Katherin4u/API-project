import "./Footer.css"

const Footer = () =>{

    return (
        <div className='main-footer-container'>
            <div className="tech-and-about-container">
                <div className="first-column">
                    <p style = {{textDecoration:"underline", color:"rgb(30, 30, 30)"}}>Technology:</p>
                    <p><a href = "https://www.javascript.com/"  style={{textDecoration: "none", color:"rgb(30, 30, 30)"}}>Javascript</a></p>
                    <p><a href = "https://reactjs.org/"  style={{textDecoration: "none", color:"rgb(30, 30, 30)"}}>React</a></p>
                    <p><a href = "https://redux.js.org/"  style={{textDecoration: "none", color:"rgb(30, 30, 30)"}}>Redux</a></p>
                </div>
                <div className="second-column">
                    <p><a href = "https://flask.palletsprojects.com/en/2.2.x/"  style={{textDecoration: "none", color:"rgb(30, 30, 30)"}}>Flask</a></p>
                    <p><a href = "https://www.sqlalchemy.org/"  style={{textDecoration: "none", color:"rgb(30, 30, 30)"}}>SqlAlchemy</a></p>
                    <p><a href = "https://www.postgresql.org/"  style={{textDecoration: "none", color:"rgb(30, 30, 30)"}}>PostgresSQL</a></p>
                    <p><a href = "https://alembic.sqlalchemy.org/en/latest/"  style={{textDecoration: "none", color:"rgb(30, 30, 30)"}}>Alembic</a></p>
                </div>
                <div className="third-column">
                    <p style = {{textDecoration:"underline", color:"rgb(30, 30, 30)"}}>Developer:</p>
                    <p><a href = "https://github.com/Katherin4u" target="_blank" rel="noopener noreferrer" style={{textDecoration: "none", color:"rgb(30, 30, 30)"}}>Github</a></p>
                    <p><a href = "https://www.linkedin.com/in/katherin-garcia-9845a8194/" target="_blank" rel="noopener noreferrer" style={{textDecoration: "none", color:"rgb(30, 30, 30)"}}>Linkedin</a></p>
                </div>
            </div>
            <p style={{color:"rgb(30, 30, 30)"}}>dupe-brb-loka is a fake site, only a clone of AirBnb</p>
            
        </div>
    )
}

export default Footer;
