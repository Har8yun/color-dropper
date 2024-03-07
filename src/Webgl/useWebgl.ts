import {useEffect, useRef} from "react";
import { initBuffers } from "./init-buffers.js";
import { drawScene } from "./draw-scene.js";
import {initShaderProgram} from "./shaderHelper";


// Vertex shader program

const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;


const fsSource = `
    varying lowp vec4 vColor;

    void main(void) {
      gl_FragColor = vColor;
    }
  `;

let cubeRotation = 0.0;
let deltaTime = 0;

export const useWebgl = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);


    useEffect(() => {
        const canvas = canvasRef.current;


        if (canvas) {
            const gl = canvas.getContext("webgl") as WebGLRenderingContext;

            if (gl) {
                gl.clearColor(0.0, 0.0, 0.0, 1.0);
                gl.clear(gl.COLOR_BUFFER_BIT);

                // Initialize a shader program; this is where all the lighting
                // for the vertices and so forth is established.
                const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

                // Collect all the info needed to use the shader program.
                // Look up which attribute our shader program is using
                // for aVertexPosition and look up uniform locations.
                const programInfo = {
                    program: shaderProgram,
                    attribLocations: {
                        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
                        vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
                    },
                    uniformLocations: {
                        projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
                        modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
                    },
                };

                // Here's where we call the routine that builds all the
                // objects we'll be drawing.
                const buffers = initBuffers(gl);

                // Draw the scene
                // drawScene(gl, programInfo, buffers);

                let then = 0;

                // Draw the scene repeatedly
                const render = (now: number) => {
                    now *= 0.001; // convert to seconds
                    deltaTime = now - then;
                    then = now;
                    drawScene(gl, programInfo, buffers, cubeRotation);
                    cubeRotation += deltaTime;

                    requestAnimationFrame(render);
                }
                requestAnimationFrame(render);

            } else {
                const msg = "Unable to initialize WebGL. Your browser or machine may not support it.";
                alert(msg);
                throw Error(msg);
            }
        }

    }, [])


    return {
        canvasRef,
    }
};
