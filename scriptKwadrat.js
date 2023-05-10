const vertexShaderTxt = `

    precision mediump float;

    attribute vec3 vertPosition;
    void main() {
        gl_Position = vec4(vertPosition, 1.0);
    }
`;

const fragmentShaderTxt = `

    precision mediump float;
    void main() {
        gl_FragColor = vec4(4.0, 0.3, 0.6, 1.0);
    }
`;

const Triangle = function () {
    const canvas = document.getElementById('main-canvas');
    // console.log(canvas);
    const gl = canvas.getContext('webgl');

    if (!gl) {
        alert('no webgl');
    }

    // wierzcholki kwadratu:
   const vertices = 
   [
    -0.5, 0.5, 0.0,
    -0.5, -0.5, 0.0,
    0.5, -0.5, 0.0,
    0.5, 0.5, 0.0
   ];

   // kolejnosc wierzcholkow: (dwa trojkaty skladajace sie w kwadrat)
   const indices = 
   [
    0, 1, 2,
    0, 2, 3
   ];
    
    const triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW); // since everything in JS is 64 bit floating point we need to convert to 32 bits

    const indexTriangleBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexTriangleBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderTxt);
    gl.shaderSource(fragmentShader, fragmentShaderTxt);
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

   const posAttrLocation = gl.getAttribLocation(program, 'vertPosition');
   gl.enableVertexAttribArray(posAttrLocation);
   gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
   gl.vertexAttribPointer(
    posAttrLocation,
    3,
    gl.FLOAT,
    false,
    0,
    0,
   );

   gl.useProgram(program);
   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexTriangleBuffer);
   gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
};

