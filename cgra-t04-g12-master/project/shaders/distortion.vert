#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform sampler2D texture;
uniform sampler2D map;
uniform float timeFactor;
float s, t;

varying vec2 vTextureCoord;
varying vec3 position;

void main() {
    vec4 change = texture2D(map, aTextureCoord + vec2(timeFactor, timeFactor));

    s = (change.r - 0.5) / 3.0;
    t = (change.g - 0.5) / 3.0;

    if (s > 1.0) s = 1.0;
    if (s < 0.0) s = 0.0;
    if (t > 1.0) t = 1.0;
    if (t < 0.0) t = 0.0;

    vTextureCoord = aTextureCoord + vec2(s, t);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}