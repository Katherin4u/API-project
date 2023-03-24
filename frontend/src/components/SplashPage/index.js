import { useEffect, useState } from 'react';
import './splashPage.css'


const SplashPage = () => {

    return (
        <div className="wrapper">
            <div className='main-contianer-splashpage'>
                <div className='container-above-footer'>
                    <div className='intro-about-container'>
                        <div className='introduction-container'>
                            <h1 className='welcome-main-container'>Welcome to dupe-brb-loka</h1>
                        </div>
                        <div className='about-container'>
                            <h2 className='about-main-container'>Great homes are in wait of renting, spend some time over the weekend with family!!!</h2>
                        </div>
                    </div>
                    <div className='images-container-splashpage'>
                        <div className='images-container'>
                            <div className='spacing-image'>
                                <img className='image-one' src='https://a0.muscache.com/im/pictures/prohost-api/Hosting-22915429/original/38a8a49d-fee5-4853-9fa4-a954953e0560.jpeg?im_w=720'>
                                </img>
                            </div>
                            <div className='spacing-image3'>
                                <img className='image-two' src='https://a0.muscache.com/im/pictures/562dffb2-0b7c-457b-95e9-35c38dca1aa4.jpg?im_w=720'>
                                </img>
                            </div>
                        </div>
                        <div className='images-container2'>
                            <div className='spacing-image1'>
                                <img className='image-three' src='https://a0.muscache.com/im/pictures/40537407-3901-4a14-80b2-94c7059031ae.jpg?im_w=720'>
                                </img>
                            </div>
                            <div className='spacing-image2'>
                                <img className='image-four' src='https://a0.muscache.com/im/pictures/e5915c54-26b6-4710-a5c0-3448aebf05e0.jpg?im_w=720'>
                                </img>
                            </div>
                            <div className='spacing-image4'>
                                <img className='image-five' src='https://a0.muscache.com/im/pictures/miso/Hosting-34461302/original/17b997a7-fa97-440f-bc3c-2066325c55fc.jpeg?im_w=720'>
                                </img>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='main-footer-container'>
                    <div className="tech-and-about-container">
                        <div className="first-column">
                            <p style={{ textDecoration: "underline", color: "rgb(30, 30, 30)" }}>Technology:</p>
                            <p><a href="https://www.javascript.com/" style={{ textDecoration: "none", color: "rgb(30, 30, 30)" }}>Javascript</a></p>
                            <p><a href="https://www.python.org/" style={{ textDecoration: "none", color: "rgb(30, 30, 30)" }}>Python</a></p>
                            <p><a href="https://reactjs.org/" style={{ textDecoration: "none", color: "rgb(30, 30, 30)" }}>React</a></p>
                            <p><a href="https://redux.js.org/" style={{ textDecoration: "none", color: "rgb(30, 30, 30)" }}>Redux</a></p>
                        </div>
                        <div className="second-column">
                            <p><a href="https://flask.palletsprojects.com/en/2.2.x/" style={{ textDecoration: "none", color: "rgb(30, 30, 30)" }}>Flask</a></p>
                            <p><a href="https://www.sqlalchemy.org/" style={{ textDecoration: "none", color: "rgb(30, 30, 30)" }}>SqlAlchemy</a></p>
                            <p><a href="https://www.postgresql.org/" style={{ textDecoration: "none", color: "rgb(30, 30, 30)" }}>PostgresSQL</a></p>
                            <p><a href="https://alembic.sqlalchemy.org/en/latest/" style={{ textDecoration: "none", color: "rgb(30, 30, 30)" }}>Alembic</a></p>
                        </div>
                        <div className="third-column">
                            <p style={{ textDecoration: "underline", color: "rgb(30, 30, 30)" }}>Developer:</p>
                            <p><a href="https://github.com/Katherin4u" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "rgb(30, 30, 30)" }}>Github</a></p>
                            <p><a href="https://www.linkedin.com/in/katherin-garcia-9845a8194/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "rgb(30, 30, 30)" }}>Linkedin</a></p>
                        </div>
                    </div>
                    <p style={{ color: "rgb(30, 30, 30)" }}>Pin-it is a fake site, only a clone of AirBnb</p>

                </div>
            </div>

        </div>
    )

}
export default SplashPage