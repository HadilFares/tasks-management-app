import React from 'react'
import './About.css';
import '../../assets/picture1.png'

const About = () => {
    return (
  
      <section className="about" id="about">

    <div className="image">
    <img src="assets/images/about-img.png" alt=""></img>
    </div>

      <div className="content">
    <h3>why choose us?</h3>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam aperiam quaerat dolor voluptas nobis voluptates illum? Inventore voluptas dolore voluptates.</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex delectus ducimus dignissimos pariatur. Amet sed distinctio earum dolorum nulla, in obcaecati aliquid modi quos magni ducimus culpa nobis laudantium incidunt.</p>
    <a href="#"><button className="btn">learn more</button></a>
    </div>

</section>
       
    )
}

export default About