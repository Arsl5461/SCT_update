import React from "react";
import Particles from "react-tsparticles"
import bgim from "./assets/img/background.png";


export default function ParticleBackground() {
    const particlesInit = (main) => {
        console.log(main);
    
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
      };
    
      const particlesLoaded = (container) => {
        console.log(container);
      };
    return (
      <Particles 
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          img: {
            bgim}
          // color: {
          //   value: "#000000",
          // },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 1,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0,
            width: 1,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 7,
          },
          opacity: {
            value: 0.5,
          },
          // shape: {
          //   type: "circle",
          // },
          shape: {
            // character: {
            //   fill: false,
            //   font: "Verdana",
            //   style: "",
            //   value: "*",
            //   weight: "6"
            // },
            image: [
              // {
              //   src: "images/grave.png",
              //   width: 100,
              //   height: 100
              // },
              {
                src: "images/bone.png",
                width: 100,
                height: 100
              },
              {
                src: "images/skull.png",
                width: 100,
                height: 100
              },
              
            ],
            polygon: {
              nb_sides: 10
            },
            stroke: {
              color: "#000000",
              width: 50
            },
            type: "image"
          },
         

          size: {
            random: true,
            value: 40,
          },
        },
        detectRetina: true,
      }}
    />
    );
}

